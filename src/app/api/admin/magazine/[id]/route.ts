import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Magazine from "@/models/Magazine";
import { jwtVerify } from "jose";

async function verifyAuth(req: NextRequest) {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch {
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

        const magazine = await Magazine.findByIdAndUpdate(
            id,
            {
                title: data.title,
                description: data.description || "",
                coverImage: data.coverImage || "",
                pdfUrl: data.pdfUrl,
                issueDate: new Date(data.issueDate),
                volume: data.volume || "",
                published: data.published !== undefined ? data.published : true,
            },
            { new: true }
        );

        if (!magazine) {
            return NextResponse.json({ success: false, error: "Magazine not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, magazine });
    } catch (error: any) {
        console.error("Error updating magazine:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to update magazine" },
            { status: 500 }
        );
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
        const magazine = await Magazine.findByIdAndDelete(id);

        if (!magazine) {
            return NextResponse.json({ success: false, error: "Magazine not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Magazine deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting magazine:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
