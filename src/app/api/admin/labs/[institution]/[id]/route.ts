import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CollegeLab from "@/models/CollegeLab";
import MarudharFacility from "@/models/MarudharFacility";
import EnglishInfrastructure from "@/models/EnglishInfrastructure";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ institution: string, id: string }> }) {
    try {
        await dbConnect();
        const { institution, id } = await params;
        const data = await req.json();
        
        let doc;
        if (institution === "college") doc = await CollegeLab.findByIdAndUpdate(id, data, { new: true });
        else if (institution === "marudhar") doc = await MarudharFacility.findByIdAndUpdate(id, data, { new: true });
        else if (institution === "english") doc = await EnglishInfrastructure.findByIdAndUpdate(id, data, { new: true });
        else return NextResponse.json({ success: false, error: "Invalid institution" }, { status: 400 });

        if (!doc) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, results: doc });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ institution: string, id: string }> }) {
    try {
        await dbConnect();
        const { institution, id } = await params;
        
        let doc;
        if (institution === "college") doc = await CollegeLab.findByIdAndDelete(id);
        else if (institution === "marudhar") doc = await MarudharFacility.findByIdAndDelete(id);
        else if (institution === "english") doc = await EnglishInfrastructure.findByIdAndDelete(id);
        else return NextResponse.json({ success: false, error: "Invalid institution" }, { status: 400 });

        if (!doc) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
