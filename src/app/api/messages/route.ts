import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import LeadershipMessage from "@/models/LeadershipMessage";

export async function GET() {
    try {
        await dbConnect();
        const messages = await LeadershipMessage.find({}).sort({ role: 1 });
        return NextResponse.json({ success: true, messages });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
