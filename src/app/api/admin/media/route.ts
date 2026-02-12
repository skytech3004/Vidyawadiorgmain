import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readdir, stat, unlink } from "fs/promises";
import path from "path";
import { jwtVerify } from "jose";
import sharp from "sharp";

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

// GET: List all media files
export async function GET(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const uploadsDir = path.join(process.cwd(), "public/media");

        // Ensure directories exist
        await mkdir(uploadsDir, { recursive: true });

        const getFiles = async (dir: string): Promise<any[]> => {
            const entries = await readdir(dir, { withFileTypes: true });
            const files = await Promise.all(
                entries.map(async (entry) => {
                    const res = path.resolve(dir, entry.name);
                    if (entry.isDirectory()) {
                        return getFiles(res);
                    } else {
                        // Only include non-thumbnail images
                        if (entry.name.includes("-thumb.webp") || !entry.name.endsWith(".webp")) return [];

                        const stats = await stat(res);
                        const relativePath = path.relative(path.join(process.cwd(), "public"), res).replace(/\\/g, "/");

                        return {
                            name: entry.name,
                            url: `/${relativePath}`,
                            thumbnail: `/${relativePath.replace(".webp", "-thumb.webp")}`,
                            size: stats.size,
                            createdAt: stats.birthtime,
                        };
                    }
                })
            );
            return files.flat();
        };

        const allFiles = await getFiles(uploadsDir);
        // Sort by newest first
        allFiles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        return NextResponse.json({ success: true, files: allFiles });
    } catch (error: any) {
        console.error("MEDIA_LIST_ERROR:", error);
        return NextResponse.json({ success: false, error: "Failed to list media" }, { status: 500 });
    }
}

// POST: Upload and process image
export async function POST(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;
        const folder = formData.get("folder") as string || "general";

        const extension = file?.name?.split('.').pop()?.toLowerCase();
        const isImage = file?.type?.startsWith("image/") ||
            file?.type === "application/octet-stream" ||
            ["heic", "heif", "webp", "jpg", "jpeg", "png"].includes(extension || "");

        if (!file || !isImage) {
            return NextResponse.json({ success: false, error: "Invalid image file" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename
        const baseName = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, "-")}`;
        const relativeDir = `media`;
        const absoluteDir = path.join(process.cwd(), "public", relativeDir);

        await mkdir(absoluteDir, { recursive: true });

        // Process with sharp
        const sharpInstance = sharp(buffer);
        const metadata = await sharpInstance.metadata();

        // 1. Full size version (max 1200px width, WebP)
        const fullPath = path.join(absoluteDir, `${baseName}.webp`);
        await sharpInstance
            .resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(fullPath);

        // 2. Thumbnail version (300px width, WebP)
        const thumbPath = path.join(absoluteDir, `${baseName}-thumb.webp`);
        await sharp(buffer)
            .resize({ width: 300, withoutEnlargement: true })
            .webp({ quality: 70 })
            .toFile(thumbPath);

        return NextResponse.json({
            success: true,
            url: `/${relativeDir}/${baseName}.webp`,
            thumbnail: `/${relativeDir}/${baseName}-thumb.webp`,
            metadata: {
                width: metadata.width,
                height: metadata.height,
                format: "webp"
            }
        });
    } catch (error: any) {
        console.error("UPLOAD_ERROR:", error);
        return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
    }
}
