import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import AdminStaff from "@/models/AdminStaff";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const staff = await AdminStaff.find({}).sort({ order: 1, createdAt: 1 });
        return NextResponse.json({ success: true, staff });
    } catch (error: any) {
        console.error("PUBLIC_ADMIN_STAFF_API_ERROR:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
