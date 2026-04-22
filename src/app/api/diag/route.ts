import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
    const cwd = process.cwd();
    const publicPath = path.join(cwd, "public");
    const standalonePublicPath = path.join(cwd, ".next/standalone/public");
    
    return NextResponse.json({
        cwd,
        publicExists: fs.existsSync(publicPath),
        standalonePublicExists: fs.existsSync(standalonePublicPath),
        uploadsExists: fs.existsSync(path.join(publicPath, "uploads")),
        musicExists: fs.existsSync(path.join(publicPath, "uploads/music")),
        env: process.env.NODE_ENV
    });
}
