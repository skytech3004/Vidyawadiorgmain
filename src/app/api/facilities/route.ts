import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import HomeFacility from "@/models/HomeFacility";
import { seedHomeFacilitiesIfEmpty } from "@/lib/home-seed";
import { HOME_FACILITY_DEMO_ITEMS } from "@/lib/home-demo-data";

export async function GET() {
    try {
        await seedHomeFacilitiesIfEmpty();
        await connectDB();
        const facilities = await HomeFacility.find({}).sort({ order: 1, createdAt: 1 });
        return NextResponse.json({ success: true, facilities });
    } catch (error) {
        console.error("Error fetching facilities:", error);
        return NextResponse.json({
            success: true,
            facilities: HOME_FACILITY_DEMO_ITEMS.map((item, index) => ({
                _id: `demo-facility-${index + 1}`,
                ...item,
            })),
            fallback: true,
        });
    }
}
