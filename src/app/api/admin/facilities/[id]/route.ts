import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import HomeFacility from "@/models/HomeFacility";

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

        const facility = await HomeFacility.findByIdAndUpdate(
            id,
            {
                title: data.title,
                description: data.description,
                image: data.image,
                icon: data.icon || "",
                theme: data.theme || "bg-oxford",
                features: Array.isArray(data.features) ? data.features : [],
                order: data.order || 0,
            },
            { new: true, runValidators: true }
        );

        if (!facility) {
            return NextResponse.json({ success: false, error: "Facility not found" }, { status: 404 });
        }

        revalidatePath("/");
        return NextResponse.json({ success: true, facility });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to update facility";
        console.error("Error updating facility:", error);
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
        const facility = await HomeFacility.findByIdAndDelete(id);

        if (!facility) {
            return NextResponse.json({ success: false, error: "Facility not found" }, { status: 404 });
        }

        revalidatePath("/");
        return NextResponse.json({ success: true, message: "Facility deleted successfully" });
    } catch (error: unknown) {
        console.error("Error deleting facility:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
