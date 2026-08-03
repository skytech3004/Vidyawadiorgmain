import { NextResponse } from "next/server";
import Heritage from "@/models/Heritage";
import { seedHeritageIfEmpty } from "@/lib/heritage-seed";

export async function GET() {
    try {
        await seedHeritageIfEmpty();
        const heritage = await Heritage.find({}).sort({ order: 1, createdAt: 1 });

        return NextResponse.json({ success: true, heritage });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Error fetching heritage:", error);
        return NextResponse.json({ success: false, error: message || "Internal Server Error" }, { status: 500 });
    }
}
