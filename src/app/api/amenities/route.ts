import { NextResponse } from "next/server";
import Amenity from "@/models/Amenity";
import { seedAmenitiesIfEmpty } from "@/lib/amenities-seed";

export async function GET() {
    try {
        await seedAmenitiesIfEmpty();
        const amenities = await Amenity.find({}).sort({ order: 1, createdAt: 1 });
        return NextResponse.json({ success: true, amenities });
    } catch (error: unknown) {
        console.error("Error fetching amenities:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
