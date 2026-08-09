import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Magazine from "@/models/Magazine";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get("limit") || "50");

        const magazines = await Magazine.find({ published: true })
            .sort({ issueDate: -1 })
            .limit(limit);

        return NextResponse.json({ success: true, magazines });
    } catch (error: any) {
        console.error("Error fetching magazines:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
