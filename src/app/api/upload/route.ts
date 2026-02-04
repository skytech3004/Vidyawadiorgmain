import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define upload path
        const uploadDir = path.join(process.cwd(), "public/uploads");

        // Ensure directory exists
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Clean filename and add timestamp
        const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
        const filename = `${Date.now()}-${originalName}`;
        const filePath = path.join(uploadDir, filename);

        // Write file
        await writeFile(filePath, buffer);

        // Return relative path for web access
        const relativePath = `/uploads/${filename}`;

        return NextResponse.json({
            success: true,
            url: relativePath
        });

    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
