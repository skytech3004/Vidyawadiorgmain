import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GalleryAlbum from "@/models/GalleryAlbum";
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

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const album = await GalleryAlbum.findById(id);
        if (!album) {
            return NextResponse.json({ success: false, error: "Album not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, album });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const data = await req.json();
        const album = await GalleryAlbum.findByIdAndUpdate(id, data, { new: true });

        if (!album) {
            return NextResponse.json({ success: false, error: "Album not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, album });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const album = await GalleryAlbum.findByIdAndDelete(id);

        if (!album) {
            return NextResponse.json({ success: false, error: "Album not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Album deleted" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
