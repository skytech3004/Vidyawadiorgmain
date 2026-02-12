import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
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

export async function GET(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const posts = await Post.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, posts });
    } catch (error: any) {
        console.error("BLOG_GET_ERROR:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const data = await req.json();

        if (!data.title || !data.slug || !data.content || !data.category) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const post = await Post.create(data);
        return NextResponse.json({ success: true, post });
    } catch (error: any) {
        console.error("BLOG_POST_ERROR:", error);
        if (error.code === 11000) {
            return NextResponse.json({ success: false, error: "Slug must be unique" }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
