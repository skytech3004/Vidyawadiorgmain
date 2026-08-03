import { NextRequest, NextResponse } from "next/server";
import Heritage from "@/models/Heritage";
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
        const data = await request.json();

        const heritage = await Heritage.findByIdAndUpdate(
            id,
            {
                year: data.year,
                title: data.title,
                description: data.description,
                side: data.side || "left",
                order: data.order || 0,
            },
            { new: true, runValidators: true }
        );

        if (!heritage) {
            return NextResponse.json({ success: false, error: "Heritage item not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, heritage });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Error updating heritage item:", error);
        return NextResponse.json({ success: false, error: message || "Failed to update heritage item" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const payload = await verifyAuth(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const heritage = await Heritage.findByIdAndDelete(id);

        if (!heritage) {
            return NextResponse.json({ success: false, error: "Heritage item not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Heritage item deleted successfully" });
    } catch (error: unknown) {
        console.error("Error deleting heritage item:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
