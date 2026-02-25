import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Topper from "@/models/Topper";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const institution = searchParams.get("institution");
        const resultType = searchParams.get("resultType");

        let query: any = {};
        if (institution) query.institution = institution;
        if (resultType) query.resultType = resultType;

        const results = await Topper.find(query).sort({ year: -1, class: 1, order: 1 });
        return NextResponse.json({ success: true, results });
    } catch (error: any) {
        console.error("PUBLIC_RESULTS_API_ERROR:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
