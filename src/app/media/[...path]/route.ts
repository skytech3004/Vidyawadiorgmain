import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

// This route serves files directly from the public/media folder
// to bypass the limitation where Next.js production doesn't 
// immediately pick up new files in the public directory.

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path: pathSegments } = await params;
        const filePath = pathSegments.join("/");

        // Define the absolute path to the file in public/media
        const absolutePath = path.join(process.cwd(), "public", "media", filePath);

        try {
            const fileBuffer = await readFile(absolutePath);

            // Determine content type based on extension
            let contentType = "application/octet-stream";
            if (filePath.endsWith(".webp")) contentType = "image/webp";
            else if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) contentType = "image/jpeg";
            else if (filePath.endsWith(".png")) contentType = "image/png";
            else if (filePath.endsWith(".svg")) contentType = "image/svg+xml";

            return new NextResponse(fileBuffer, {
                headers: {
                    "Content-Type": contentType,
                    "Cache-Control": "public, max-age=31536000, immutable",
                },
            });
        } catch (e) {
            return NextResponse.json({ error: "File not found" }, { status: 405 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
