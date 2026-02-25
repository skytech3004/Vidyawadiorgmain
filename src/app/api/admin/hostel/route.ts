import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hostel from "@/models/Hostel";
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
        const hostelData = await Hostel.findOne({}); // We only have one hostel configuration
        return NextResponse.json({ success: true, hostel: hostelData });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const data = await req.json();

        // There's only one hostel settings document, so we use findOneAndUpdate with an empty filter
        const hostel = await Hostel.findOneAndUpdate(
            {},
            data,
            { upsert: true, new: true }
        );

        return NextResponse.json({ success: true, hostel });
    } catch (error: any) {
        console.error("HOSTEL_POST_ERROR:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
