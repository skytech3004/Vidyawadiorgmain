import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import TrustMember from "@/models/TrustMember";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await dbConnect();
        const members = await TrustMember.find({}).sort({ order: 1, createdAt: 1 }).lean();
        return NextResponse.json({ success: true, data: members });
    } catch (error) {
        console.error("Failed to fetch trust members:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch trust members" }, { status: 500 });
    }
}
