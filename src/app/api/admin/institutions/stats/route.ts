import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Faculty from "@/models/Faculty";
import Topper from "@/models/Topper";

export const dynamic = "force-dynamic";


export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const institutions = ["marudhar", "english", "primary", "college"];
        
        const stats: any = {};

        for (const inst of institutions) {
            const [facultyCount, topperCount] = await Promise.all([
                Faculty.countDocuments({ institution: inst }),
                Topper.countDocuments({ institution: inst })
            ]);
            
            stats[inst] = {
                faculty: facultyCount,
                toppers: topperCount
            };
        }

        return NextResponse.json({ success: true, stats });
    } catch (error: any) {
        console.error("STATS_API_ERROR:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
