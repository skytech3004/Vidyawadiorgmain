import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { jwtVerify } from "jose";

async function verifyAuth(req: NextRequest) {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}

export async function GET(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        // Fetch all donations, sorted by newest first
        const donations = await Donation.find().sort({ createdAt: -1 });

        return NextResponse.json({ success: true, count: donations.length, data: donations });
    } catch (error: any) {
        console.error("FETCH_DONATIONS_ERROR:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch donations" }, { status: 500 });
    }
}
