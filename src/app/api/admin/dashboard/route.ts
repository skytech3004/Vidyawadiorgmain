import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import GalleryAlbum from "@/models/GalleryAlbum";
import Faculty from "@/models/Faculty";
import Inquiry from "@/models/Inquiry";
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

        const [blogCount, albums, staffCount, inquiryCount, recentPosts] = await Promise.all([
            Post.countDocuments(),
            GalleryAlbum.find({ isActive: true }).select('images'),
            Faculty.countDocuments(),
            Inquiry.countDocuments({ status: "New" }).catch(() => Inquiry.countDocuments()), // Handle missing status field
            Post.find().sort({ createdAt: -1 }).limit(5)
        ]);

        const galleryImageCount = albums.reduce((acc: number, album: any) => acc + (album.images?.length || 0), 0);

        return NextResponse.json({
            success: true,
            stats: [
                { name: "Total Blog Posts", value: blogCount.toString() },
                { name: "Gallery Images", value: galleryImageCount.toString() },
                { name: "Active Staff", value: staffCount.toString() },
                { name: "New Inquiries", value: inquiryCount.toString() },
            ],
            recentActivity: recentPosts.map(post => ({
                id: post._id,
                title: post.title,
                category: post.category,
                time: "Recently Added", // Simple for now
                author: post.author
            }))
        });
    } catch (error: any) {
        console.error("DASHBOARD_API_ERROR:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
