import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Amenity from "@/models/Amenity";

export async function GET() {
    try {
        await connectDB();
        const amenities = await Amenity.find({}).sort({ order: 1, createdAt: 1 });
        return NextResponse.json({ success: true, amenities });
    } catch (error: unknown) {
        console.error("Error fetching amenities:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
