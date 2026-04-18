import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CollegeLab from "@/models/CollegeLab";
import MarudharFacility from "@/models/MarudharFacility";
import EnglishInfrastructure from "@/models/EnglishInfrastructure";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const institution = searchParams.get("institution");

        let results = [];
        if (institution === "college") {
            results = await CollegeLab.find({}).sort({ order: 1 });
        } else if (institution === "marudhar") {
            results = await MarudharFacility.find({}).sort({ order: 1 });
        } else if (institution === "english") {
            results = await EnglishInfrastructure.find({}).sort({ order: 1 });
        } else {
            return NextResponse.json({ success: false, error: "Invalid institution" }, { status: 400 });
        }

        return NextResponse.json({ success: true, results });
    } catch (error: any) {
        console.error("PUBLIC_INFRASTRUCTURE_API_ERROR:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
