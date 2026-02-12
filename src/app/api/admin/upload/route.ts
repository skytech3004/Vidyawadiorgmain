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
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;
        const folder = formData.get("folder") as string || "uploads";

        if (!file) {
            return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename and add timestamp to avoid collisions
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const relativePath = `uploads/${folder}/${filename}`;
        const absolutePath = path.join(process.cwd(), "public", relativePath);

        await writeFile(absolutePath, buffer);

        return NextResponse.json({
            success: true,
            url: `/${relativePath}`
        });
    } catch (error: any) {
        console.error("UPLOAD_ERROR:", error);
        return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
    }
}
