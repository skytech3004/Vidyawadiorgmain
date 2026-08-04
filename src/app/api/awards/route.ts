import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import HomeAward from "@/models/HomeAward";
import { seedHomeAwardsIfEmpty } from "@/lib/home-seed";
import { HOME_AWARD_DEMO_ITEMS } from "@/lib/home-demo-data";

export async function GET() {
    try {
        await seedHomeAwardsIfEmpty();
        await connectDB();
        const awards = await HomeAward.find({}).sort({ order: 1, createdAt: 1 });
        return NextResponse.json({ success: true, awards });
    } catch (error) {
        console.error("Error fetching awards:", error);
        return NextResponse.json({
            success: true,
            awards: HOME_AWARD_DEMO_ITEMS.map((item, index) => ({
                _id: `demo-award-${index + 1}`,
                ...item,
            })),
            fallback: true,
        });
    }
}
