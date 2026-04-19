import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Setting from "@/models/Setting";
import { jwtVerify } from "jose";
import { recordActivity } from "@/lib/logger";

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

export async function GET() {
    try {
        await dbConnect();
        const settings = await Setting.find();

        // Convert array to key-value object
        const settingsMap = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});

        return NextResponse.json({ success: true, settings: settingsMap }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const data = await req.json();

        // Data should be an object of key-value pairs
        // Example: { "smtp_host": "smtp.gmail.com", "smtp_port": "587" }

        const operations = Object.entries(data).map(([key, value]) => ({
            updateOne: {
                filter: { key },
                update: { $set: { value, group: key.split('_')[0] } },
                upsert: true
            }
        }));

        if (operations.length > 0) {
            await Setting.bulkWrite(operations);
            
            // Record activity
            const keysChanged = Object.keys(data).join(", ");
            await recordActivity(
                req, 
                { id: auth.id as string, username: auth.username as string }, 
                "SETTINGS_UPDATE", 
                `Updated system settings: ${keysChanged}`
            );
        }

        return NextResponse.json({ success: true, message: "Settings saved successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
