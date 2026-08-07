import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Inspiration from "@/models/Inspiration";

export async function GET() {
    try {
        await dbConnect();
        const record = await Inspiration.findOne({});
        return NextResponse.json({ success: true, data: record });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
    }
}
