import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GalleryAlbum from "@/models/GalleryAlbum";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();

        // Fetch active albums sorted by date
        const albums = await GalleryAlbum.find({ isActive: true })
            .sort({ date: -1, createdAt: -1 });

        // Normalize image paths to fix existing double-slash bugs defensively
        const sanitizedAlbums = albums.map((album: any) => ({
            ...album.toObject(),
            images: Array.isArray(album.images) 
                ? album.images.map((img: string) => typeof img === 'string' ? img.replace(/\/+/g, "/") : img) 
                : []
        }));

        return NextResponse.json({
            success: true,
            data: sanitizedAlbums
        });
    } catch (error: any) {
        console.error("Local Gallery API Error:", error);
        return NextResponse.json(
            { success: false, error: `Failed to fetch gallery data: ${error?.message || "Unknown error"}` },
            { status: 500 }
        );
    }
}
