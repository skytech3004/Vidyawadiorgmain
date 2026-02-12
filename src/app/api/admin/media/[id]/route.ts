import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id } = await params;

        const url = req.nextUrl.searchParams.get("url");
        if (!url) {
            return NextResponse.json({ success: false, error: "No URL provided" }, { status: 400 });
        }

        const publicDir = path.join(process.cwd(), "public");
        const absolutePath = path.join(publicDir, url);
        const thumbPath = absolutePath.replace(".webp", "-thumb.webp");

        try {
            await unlink(absolutePath);
            await unlink(thumbPath).catch(() => { }); // Thumbnail might not exist or be named differently
        } catch (e) {
            // Ignore if file already deleted
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("DELETE_ERROR:", error);
        return NextResponse.json({ success: false, error: "Deletion failed" }, { status: 500 });
    }
}
