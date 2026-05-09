import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Institution from "@/models/Institution";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();
        const institution = await Institution.findOne({ id });

        if (!institution) {
            return NextResponse.json({ success: false, error: "Institution not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, institution });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
