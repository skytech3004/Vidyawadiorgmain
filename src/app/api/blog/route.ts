import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await dbConnect();
        const posts = await Post.find({ published: true }).sort({ createdAt: -1 }).lean();
        return NextResponse.json({ success: true, posts });
    } catch (error) {
        console.error("BLOG_PUBLIC_GET_ERROR:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
