import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Amenity from "@/models/Amenity";
import { jwtVerify } from "jose";
import { revalidatePath } from "next/cache";

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

        const amenity = await Amenity.findByIdAndUpdate(
            id,
            {
                title: data.title,
                description: data.description,
                image: data.image,
                order: data.order || 0,
            },
            { new: true, runValidators: true }
        );

        if (!amenity) {
            return NextResponse.json({ success: false, error: "Amenity not found" }, { status: 404 });
        }

        revalidatePath("/amenities");
        return NextResponse.json({ success: true, amenity });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Error updating amenity:", error);
        return NextResponse.json({ success: false, error: message || "Failed to update amenity" }, { status: 500 });
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
        const amenity = await Amenity.findByIdAndDelete(id);

        if (!amenity) {
            return NextResponse.json({ success: false, error: "Amenity not found" }, { status: 404 });
        }

        revalidatePath("/amenities");
        return NextResponse.json({ success: true, message: "Amenity deleted successfully" });
    } catch (error: unknown) {
        console.error("Error deleting amenity:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
