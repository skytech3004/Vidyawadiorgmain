import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
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

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get("x-forwarded-for")?.split(',')[0] || req.headers.get("x-real-ip") || "unknown";
        console.log(`==> [UPLOAD] Request received from IP: ${ip}`);
        
        const auth = await verifyAuth(req);
        if (!auth) {
            console.warn(`==> [UPLOAD] Unauthorized attempt from IP: ${ip}`);
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        let formData;
        try {
            formData = await req.formData();
        } catch (parseError: any) {
            console.error("==> [UPLOAD] Failed to parse form data:", parseError.message);
            return NextResponse.json({ 
                success: false, 
                error: "Failed to parse upload data. The file might be too large for the server's memory." 
            }, { status: 400 });
        }

        const file = formData.get("file") as File;
        const folder = (formData.get("folder") as string || "uploads").replace(/^\/+|\/+$/g, "");

        if (!file) {
            console.warn("==> [UPLOAD] No file found in form data");
            return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
        }

        console.log(`==> [UPLOAD] Processing file: ${file.name} | Size: ${(file.size / 1024 / 1024).toFixed(2)} MB | Folder: ${folder}`);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename and add timestamp to avoid collisions
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const relativePath = `uploads/${folder}/${filename}`.replace(/\/+/g, "/");
        const absolutePath = path.join(process.cwd(), "public", relativePath);
        const dir = path.dirname(absolutePath);

        // Ensure directory exists
        const { mkdir } = await import("fs/promises");
        await mkdir(dir, { recursive: true });

        console.log(`==> [UPLOAD] Writing file to: ${absolutePath}`);
        await writeFile(absolutePath, buffer);
        console.log(`==> [UPLOAD] Successfully uploaded: ${filename}`);

        // Record activity
        const { recordActivity } = await import("@/lib/logger");
        await recordActivity(req, { id: auth.id as string, username: auth.username as string }, "UPLOAD", `Uploaded file: ${file.name} to folder: ${folder}`);

        return NextResponse.json({
            success: true,
            url: `/${relativePath}`
        });
    } catch (error: any) {
        console.error("==> [UPLOAD] CRITICAL ERROR:", error);
        return NextResponse.json({ 
            success: false, 
            error: error.message || "An unexpected error occurred during upload." 
        }, { status: 500 });
    }
}
