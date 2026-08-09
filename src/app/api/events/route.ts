import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const institution = searchParams.get('institution');
        const type = searchParams.get('type');
        const limit = parseInt(searchParams.get('limit') || '50');

        let query: any = {};
        if (institution && institution !== 'all') {
            query.$or = [{ institution: institution }, { institution: 'all' }];
        }
        if (type && (type === 'event' || type === 'news')) {
            query.type = type;
        }

        // Fetch events sorted by date descending
        const events = await Event.find(query).sort({ date: -1 }).limit(limit);

        return NextResponse.json({ success: true, events });
    } catch (error: any) {
        console.error("Error fetching events:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
