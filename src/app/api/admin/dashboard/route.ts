import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import GalleryAlbum from "@/models/GalleryAlbum";
import Faculty from "@/models/Faculty";
import Inquiry from "@/models/Inquiry";
import Admission from "@/models/Admission";
import Topper from "@/models/Topper";
import ActivityLog from "@/models/ActivityLog";
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

        const [
            blogCount, 
            albums, 
            staffCount, 
            newInquiries, 
            totalInquiries,
            newAdmissions,
            totalAdmissions,
            topperCount,
            recentLogs
        ] = await Promise.all([
            Post.countDocuments(),
            GalleryAlbum.find({ isActive: true }).select('images'),
            Faculty.countDocuments(),
            Inquiry.countDocuments({ status: "New" }).catch(() => 0),
            Inquiry.countDocuments(),
            Admission.countDocuments({ status: "new" }),
            Admission.countDocuments(),
            Topper.countDocuments(),
            ActivityLog.find().sort({ createdAt: -1 }).limit(10)
        ]);

        const galleryImageCount = albums.reduce((acc: number, album: any) => acc + (album.images?.length || 0), 0);

        return NextResponse.json({
            success: true,
            stats: [
                { name: "New Admissions", value: newAdmissions.toString(), total: totalAdmissions },
                { name: "New Inquiries", value: newInquiries.toString(), total: totalInquiries },
                { name: "Blog Posts", value: blogCount.toString() },
                { name: "Gallery Images", value: galleryImageCount.toString() },
                { name: "Staff Members", value: staffCount.toString() },
                { name: "Board Toppers", value: topperCount.toString() },
            ],
            recentActivity: recentLogs.map(log => ({
                id: log._id,
                username: log.username,
                action: log.action,
                details: log.details,
                time: log.createdAt,
                ip: log.ip
            }))
        });
    } catch (error: any) {
        console.error("DASHBOARD_API_ERROR:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
