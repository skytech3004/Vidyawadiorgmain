import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Setting from "@/models/Setting";

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

export async function POST(req: Request) {
    try {
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
        }

        return NextResponse.json({ success: true, message: "Settings saved successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
