import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Inspiration from "@/models/Inspiration";
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
        if (!auth) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        let record = await Inspiration.findOne({});
        if (!record) {
            record = await Inspiration.create({
                title: "Our Inspiration",
                name: "Smt. Subhadraji Jain",
                description: "",
                image: ""
            });
        }
        return NextResponse.json({ success: true, data: record });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        const body = await req.json();
        
        let record = await Inspiration.findOne({});
        if (record) {
            record.title = body.title;
            record.name = body.name;
            record.description = body.description;
            record.image = body.image;
            await record.save();
        } else {
            record = await Inspiration.create(body);
        }

        return NextResponse.json({ success: true, data: record });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
    }
}
