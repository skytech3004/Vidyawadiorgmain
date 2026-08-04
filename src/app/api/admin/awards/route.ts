import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import HomeAward from "@/models/HomeAward";
import { seedHomeAwardsIfEmpty } from "@/lib/home-seed";
import { HOME_AWARD_DEMO_ITEMS } from "@/lib/home-demo-data";

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
            await seedHomeAwardsIfEmpty();
            const awards = await HomeAward.find({}).sort({ order: 1, createdAt: 1 });
            return NextResponse.json({ success: true, awards });
        } catch (dbError) {
            console.error("Falling back to demo awards:", dbError);
            return NextResponse.json({
                success: true,
                awards: HOME_AWARD_DEMO_ITEMS.map((item, index) => ({
                    _id: `demo-award-${index + 1}`,
                    ...item,
                })),
                fallback: true,
            });
        }
    } catch (error) {
        console.error("Error fetching awards:", error);
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

        if (!data.title || !data.organization || !data.year) {
            return NextResponse.json({ success: false, error: "Title, organization, and year are required" }, { status: 400 });
        }

        const award = await HomeAward.create({
            title: data.title,
            organization: data.organization,
            year: data.year,
            images: Array.isArray(data.images) ? data.images : [],
            order: data.order || 0,
        });

        revalidatePath("/");
        return NextResponse.json({ success: true, award }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to create award";
        console.error("Error creating award:", error);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
