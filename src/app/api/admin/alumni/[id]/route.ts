import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Alumni from "@/models/Alumni";
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const alumni = await Alumni.findByIdAndDelete(id);
        if (!alumni) {
            return NextResponse.json({ success: false, error: "Alumni record not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Alumni record deleted" });
    } catch (error: unknown) {
        console.error("Error deleting alumni:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
