import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CollegeLab from "@/models/CollegeLab";
import MarudharFacility from "@/models/MarudharFacility";
import EnglishInfrastructure from "@/models/EnglishInfrastructure";

export async function GET(req: NextRequest, { params }: { params: Promise<{ institution: string }> }) {
    try {
        await dbConnect();
        const { institution } = await params;
        let results = [];
        
        if (institution === "college") results = await CollegeLab.find().sort({ order: 1 });
        else if (institution === "marudhar") results = await MarudharFacility.find().sort({ order: 1 });
        else if (institution === "english") results = await EnglishInfrastructure.find().sort({ order: 1 });
        else return NextResponse.json({ success: false, error: "Invalid institution" }, { status: 400 });

        return NextResponse.json({ success: true, results });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ institution: string }> }) {
    try {
        await dbConnect();
        const { institution } = await params;
        const data = await req.json();

        let doc;
        if (institution === "college") doc = await CollegeLab.create(data);
        else if (institution === "marudhar") doc = await MarudharFacility.create(data);
        else if (institution === "english") doc = await EnglishInfrastructure.create(data);
        else return NextResponse.json({ success: false, error: "Invalid institution" }, { status: 400 });

        return NextResponse.json({ success: true, results: doc });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
