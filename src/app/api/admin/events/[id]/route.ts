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

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const payload = await verifyAuth(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }
        const { id } = await params;
        await connectDB();
        const data = await request.json();

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            {
                title: data.title,
                description: data.description,
                date: new Date(data.date),
                time: data.time || "",
                location: data.location || "",
                type: data.type || "event",
                institution: data.institution || "all",
                link: data.link || "",
                color: data.color || (data.type === 'news' ? '#14b8a6' : '#002147')
            },
            { new: true }
        );

        if (!updatedEvent) {
            return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, event: updatedEvent });
    } catch (error: any) {
        console.error("Error updating event:", error);
        return NextResponse.json({ success: false, error: error.message || "Failed to update event" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const payload = await verifyAuth(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }
        const { id } = await params;
        await connectDB();
        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Event deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting event:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
