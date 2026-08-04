import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import HomeFacility from "@/models/HomeFacility";
import { seedHomeFacilitiesIfEmpty } from "@/lib/home-seed";
import { HOME_FACILITY_DEMO_ITEMS } from "@/lib/home-demo-data";

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

        try {
            await seedHomeFacilitiesIfEmpty();
            const facilities = await HomeFacility.find({}).sort({ order: 1, createdAt: 1 });
            return NextResponse.json({ success: true, facilities });
        } catch (dbError) {
            console.error("Falling back to demo facilities:", dbError);
            return NextResponse.json({
                success: true,
                facilities: HOME_FACILITY_DEMO_ITEMS.map((item, index) => ({
                    _id: `demo-facility-${index + 1}`,
                    ...item,
                })),
                fallback: true,
            });
        }
    } catch (error) {
        console.error("Error fetching facilities:", error);
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

        if (!data.title || !data.description || !data.image) {
            return NextResponse.json({ success: false, error: "Title, description, and image are required" }, { status: 400 });
        }

        const facility = await HomeFacility.create({
            title: data.title,
            description: data.description,
            image: data.image,
            icon: data.icon || "",
            theme: data.theme || "bg-oxford",
            features: Array.isArray(data.features) ? data.features : [],
            order: data.order || 0,
        });

        revalidatePath("/");
        return NextResponse.json({ success: true, facility }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to create facility";
        console.error("Error creating facility:", error);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
