import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";

export const dynamic = "force-dynamic";

import Faculty from "@/models/Faculty";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const institution = searchParams.get("institution");

        let query: any = {};
        if (institution) query.institution = institution;

        const faculty = await Faculty.find(query).sort({ order: 1 });
        return NextResponse.json({ success: true, faculty });
    } catch (error: any) {
        console.error("PUBLIC_STAFF_API_ERROR:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
