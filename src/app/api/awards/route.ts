import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import HomeAward from "@/models/HomeAward";
import { seedHomeAwardsIfEmpty } from "@/lib/home-seed";

export async function GET() {
    try {
        await seedHomeAwardsIfEmpty();
        await connectDB();
        const awards = await HomeAward.find({}).sort({ order: 1, createdAt: -1 });
        return NextResponse.json({ success: true, awards });
    } catch (error) {
        console.error("Error fetching awards:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
