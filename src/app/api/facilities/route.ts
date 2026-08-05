import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import HomeFacility from "@/models/HomeFacility";
import { seedHomeFacilitiesIfEmpty } from "@/lib/home-seed";

export async function GET() {
    try {
        await seedHomeFacilitiesIfEmpty();
        await connectDB();
        const facilities = await HomeFacility.find({}).sort({ order: 1, createdAt: 1 });
        return NextResponse.json({ success: true, facilities });
    } catch (error) {
        console.error("Error fetching facilities:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
