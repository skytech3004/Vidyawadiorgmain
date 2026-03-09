import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Admission from "@/models/Admission";

export async function GET() {
    try {
        await dbConnect();
        const admissions = await Admission.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, admissions }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
