import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Magazine from "@/models/Magazine";
import { jwtVerify } from "jose";

async function verifyAuth(req: NextRequest) {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch {
        return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        const payload = await verifyAuth(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const magazines = await Magazine.find({}).sort({ issueDate: -1 });

        return NextResponse.json({ success: true, magazines });
    } catch (error: any) {
        console.error("Error fetching magazines:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const payload = await verifyAuth(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const data = await request.json();

        if (!data.title || !data.pdfUrl || !data.issueDate) {
            return NextResponse.json(
                { success: false, error: "Title, PDF, and issue date are required" },
                { status: 400 }
            );
        }

        const magazine = await Magazine.create({
            title: data.title,
            description: data.description || "",
            coverImage: data.coverImage || "",
            pdfUrl: data.pdfUrl,
            issueDate: new Date(data.issueDate),
            volume: data.volume || "",
            published: data.published !== undefined ? data.published : true,
        });

        return NextResponse.json({ success: true, magazine }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating magazine:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to create magazine" },
            { status: 500 }
        );
    }
}
