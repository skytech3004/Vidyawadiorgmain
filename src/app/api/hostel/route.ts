import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hostel from "@/models/Hostel";

export async function GET() {
    try {
        await dbConnect();
        const hostelData = await Hostel.findOne({});
        return NextResponse.json({ success: true, hostel: hostelData });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
