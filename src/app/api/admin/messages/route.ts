import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import LeadershipMessage from "@/models/LeadershipMessage";
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

export async function GET(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const messages = await LeadershipMessage.find({}).sort({ role: 1 });
        return NextResponse.json({ success: true, messages });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();
        const input = Array.isArray(body?.messages) ? body.messages : Array.isArray(body) ? body : [];

        if (input.length === 0) {
            return NextResponse.json({ success: false, error: "No messages provided" }, { status: 400 });
        }

        const allowedRoles = ["president", "secretary", "ceo"];
        for (const message of input) {
            if (!allowedRoles.includes(message.role)) continue;
            await LeadershipMessage.findOneAndUpdate(
                { role: message.role },
                {
                    role: message.role,
                    title: message.title || "",
                    name: message.name || "",
                    photo: message.photo || "",
                    content: message.content || "",
                },
                { upsert: true, new: true }
            );
        }

        const messages = await LeadershipMessage.find({}).sort({ role: 1 });
        return NextResponse.json({ success: true, messages });
    } catch (error: any) {
        console.error("MESSAGES_SAVE_ERROR:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
