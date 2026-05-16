import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/models/Event";
import { jwtVerify } from "jose";

async function verifyAuth(req: NextRequest) {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        const payload = await verifyAuth(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const events = await Event.find({}).sort({ date: -1 });

        return NextResponse.json({ success: true, events });
    } catch (error: any) {
        console.error("Error fetching events:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const payload = await verifyAuth(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const data = await request.json();

        const newEvent = await Event.create({
            title: data.title,
            description: data.description,
            date: new Date(data.date),
            time: data.time || "",
            location: data.location || "",
            type: data.type || "event",
            institution: data.institution || "all",
            link: data.link || "",
            color: data.color || (data.type === 'news' ? '#14b8a6' : '#002147') // teal-blue for news, oxford for event
        });

        return NextResponse.json({ success: true, event: newEvent }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating event:", error);
        return NextResponse.json({ success: false, error: error.message || "Failed to create event" }, { status: 500 });
    }
}
