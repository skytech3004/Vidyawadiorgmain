import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GalleryCategory from "@/models/GalleryCategory";
import { jwtVerify } from "jose";

export const dynamic = 'force-dynamic';

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

export async function GET() {
    try {
        await dbConnect();
        const categories = await GalleryCategory.find({}).sort({ order: 1, name: 1 });
        return NextResponse.json({ success: true, categories });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        const data = await req.json();

        if (!data.name) return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });

        const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        const category = await GalleryCategory.create({ ...data, slug });

        return NextResponse.json({ success: true, category });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ success: false, error: "Category already exists" }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
