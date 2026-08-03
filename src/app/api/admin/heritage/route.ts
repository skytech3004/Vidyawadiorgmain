import { NextRequest, NextResponse } from "next/server";
import Heritage from "@/models/Heritage";
import { jwtVerify } from "jose";
import { seedHeritageIfEmpty } from "@/lib/heritage-seed";

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

        await seedHeritageIfEmpty();
        const heritage = await Heritage.find({}).sort({ order: 1, createdAt: 1 });

        return NextResponse.json({ success: true, heritage });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Error fetching heritage:", error);
        return NextResponse.json({ success: false, error: message || "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const payload = await verifyAuth(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const data = await request.json();

        const heritage = await Heritage.create({
            year: data.year,
            title: data.title,
            description: data.description,
            side: data.side || "left",
            order: data.order || 0,
        });

        return NextResponse.json({ success: true, heritage }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Error creating heritage item:", error);
        return NextResponse.json({ success: false, error: message || "Failed to create heritage item" }, { status: 500 });
    }
}
