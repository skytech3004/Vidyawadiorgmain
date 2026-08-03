import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Amenity from "@/models/Amenity";
import { jwtVerify } from "jose";
import { seedAmenitiesIfEmpty } from "@/lib/amenities-seed";

async function verifyAuth(req: NextRequest) {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch {
        return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        const payload = await verifyAuth(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await seedAmenitiesIfEmpty();
        const amenities = await Amenity.find({}).sort({ order: 1, createdAt: 1 });
        return NextResponse.json({ success: true, amenities });
    } catch (error: unknown) {
        console.error("Error fetching amenities:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const payload = await verifyAuth(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const data = await request.json();

        const amenity = await Amenity.create({
            title: data.title,
            description: data.description,
            image: data.image,
            order: data.order || 0,
        });

        return NextResponse.json({ success: true, amenity }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Error creating amenity:", error);
        return NextResponse.json({ success: false, error: message || "Failed to create amenity" }, { status: 500 });
    }
}
