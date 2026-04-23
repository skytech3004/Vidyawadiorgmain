import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Career from "@/models/Career";

export async function GET() {
    try {
        await connectDB();
        const careers = await Career.find().sort({ order: 1, createdAt: -1 });
        return NextResponse.json(careers);
    } catch (error) {
        console.error("Error fetching careers:", error);
        return NextResponse.json(
            { error: "Failed to fetch careers" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const data = await req.json();
        const career = await Career.create(data);
        return NextResponse.json({ success: true, career });
    } catch (error) {
        console.error("Error creating career:", error);
        return NextResponse.json(
            { error: "Failed to create career" },
            { status: 500 }
        );
    }
}
