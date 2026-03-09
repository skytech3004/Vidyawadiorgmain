import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Achievement from "@/models/Achievement";
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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const payload = await verifyAuth(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const data = await request.json();

        const updatedAchievement = await Achievement.findByIdAndUpdate(
            params.id,
            { $set: data },
            { new: true, runValidators: true }
        );

        if (!updatedAchievement) {
            return NextResponse.json({ success: false, error: "Achievement not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, achievement: updatedAchievement });
    } catch (error: any) {
        console.error("Error updating achievement:", error);
        return NextResponse.json({ success: false, error: error.message || "Failed to update achievement" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const payload = await verifyAuth(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const deletedAchievement = await Achievement.findByIdAndDelete(params.id);

        if (!deletedAchievement) {
            return NextResponse.json({ success: false, error: "Achievement not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Achievement deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting achievement:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
