import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Achievement from "@/models/Achievement";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const institution = searchParams.get('institution');
        const category = searchParams.get('category');

        let query: any = {};
        if (institution) {
            query.institution = institution;
        }
        if (category) {
            query.category = category;
        }

        await connectDB();
        const achievements = await Achievement.find(query).sort({ order: 1, createdAt: -1 });

        return NextResponse.json({ success: true, achievements });
    } catch (error: any) {
        console.error("Error fetching achievements:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
