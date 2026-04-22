import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const resolvedParams = await params;
        const filePath = resolvedParams.path.join("/");
        const absolutePath = path.join(process.cwd(), "public/uploads", filePath);

        console.log(`==> [PROXY] Requested: ${filePath}`);
        console.log(`==> [PROXY] Looking at: ${absolutePath}`);

        if (!fs.existsSync(absolutePath)) {
            console.error(`==> [PROXY] 404: File not found on disk at ${absolutePath}`);
            return new NextResponse("File Not Found", { status: 404 });
        }

        console.log(`==> [PROXY] 200: Serving file from disk`);
        const fileBuffer = fs.readFileSync(absolutePath);
        const extension = filePath.split(".").pop()?.toLowerCase();
        
        const contentTypes: Record<string, string> = {
            mp3: "audio/mpeg",
            mp4: "video/mp4",
            webp: "image/webp",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            png: "image/png",
            svg: "image/svg+xml",
        };

        const contentType = contentTypes[extension || ""] || "application/octet-stream";

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("==> [PROXY] CRITICAL ERROR:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
