import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import HostelApplication from "@/models/HostelApplication";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        const application = await HostelApplication.create(body);

        return NextResponse.json({
            success: true,
            message: "Application submitted successfully",
            application
        }, { status: 201 });
    } catch (error: any) {
        console.error("HOSTEL_APPLICATION_ERROR:", error);
        return NextResponse.json({
            success: false,
            error: error.message || "Internal Server Error"
        }, { status: 500 });
    }
}
