import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Achievement from "@/models/Achievement";
import { jwtVerify } from "jose";

async function verifyAuth(req: NextRequest) {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        const payload = await verifyAuth(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const institution = searchParams.get('institution');

        let query = {};
        if (institution) {
            query = { institution };
        }

        await connectDB();
        const achievements = await Achievement.find(query).sort({ order: 1, createdAt: -1 });

        return NextResponse.json({ success: true, achievements });
    } catch (error: any) {
        console.error("Error fetching achievements:", error);
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

        const newAchievement = await Achievement.create({
            title: data.title,
            description: data.description,
            category: data.category || "Sports",
            institution: data.institution,
            year: data.year || "2024-25",
            order: data.order || 0
        });

        return NextResponse.json({ success: true, achievement: newAchievement }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating achievement:", error);
        return NextResponse.json({ success: false, error: error.message || "Failed to create achievement" }, { status: 500 });
    }
}
