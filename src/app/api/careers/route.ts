import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Career from "@/models/Career";

export async function GET() {
    try {
        await connectDB();
        // Only fetch active careers for the public page
        const careers = await Career.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        return NextResponse.json(careers);
    } catch (error) {
        console.error("Error fetching public careers:", error);
        return NextResponse.json(
            { error: "Failed to fetch careers" },
            { status: 500 }
        );
    }
}
