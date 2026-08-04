import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import HomeAward from "@/models/HomeAward";

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

        const award = await HomeAward.findByIdAndUpdate(
            id,
            {
                title: data.title,
                organization: data.organization,
                year: data.year,
                images: Array.isArray(data.images) ? data.images : [],
                order: data.order || 0,
            },
            { new: true, runValidators: true }
        );

        if (!award) {
            return NextResponse.json({ success: false, error: "Award not found" }, { status: 404 });
        }

        revalidatePath("/");
        return NextResponse.json({ success: true, award });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to update award";
        console.error("Error updating award:", error);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
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
        const award = await HomeAward.findByIdAndDelete(id);

        if (!award) {
            return NextResponse.json({ success: false, error: "Award not found" }, { status: 404 });
        }

        revalidatePath("/");
        return NextResponse.json({ success: true, message: "Award deleted successfully" });
    } catch (error: unknown) {
        console.error("Error deleting award:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
