import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Setting from "@/models/Setting";

export async function GET() {
    try {
        await dbConnect();
        const brochure = await Setting.findOne({ key: "brochure_pdf_url" });
        return NextResponse.json({
            success: true,
            brochurePdfUrl: brochure?.value || "/brochures/prospectus.pdf",
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
