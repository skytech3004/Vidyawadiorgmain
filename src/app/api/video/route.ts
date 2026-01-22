import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
    const videoPath = path.join(process.cwd(), "public", "ritu_vaishnav_created.mp4");

    if (!fs.existsSync(videoPath)) {
        return new NextResponse("Video not found", { status: 404 });
    }

    const stats = fs.statSync(videoPath);
    const fileSize = stats.size;
    const range = request.headers.get("range");

    if (!range) {
        const file = fs.readFileSync(videoPath);
        return new NextResponse(file, {
            headers: {
                "Content-Length": fileSize.toString(),
                "Content-Type": "video/mp4",
            },
        });
    }

    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;

    const file = fs.createReadStream(videoPath, { start, end });

    const stream = new ReadableStream({
        start(controller) {
            file.on("data", (chunk) => {
                if (controller.desiredSize !== null) {
                    try {
                        controller.enqueue(chunk);
                    } catch (e) {
                        file.destroy();
                    }
                }
            });
            file.on("end", () => {
                try {
                    controller.close();
                } catch (e) { }
            });
            file.on("error", (err) => {
                try {
                    controller.error(err);
                } catch (e) { }
                file.destroy();
            });
        },
        cancel() {
            file.destroy();
        },
    });

    return new NextResponse(stream, {
        status: 206,
        headers: {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize.toString(),
            "Content-Type": "video/mp4",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}
