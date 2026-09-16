import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import TrustMember from "@/models/TrustMember";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await dbConnect();
        const members = await TrustMember.find({}).sort({ order: 1, createdAt: 1 }).lean();
        return NextResponse.json({ success: true, data: members });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        if (!body.name || !body.title) {
            return NextResponse.json({ success: false, error: "Name and Title are required" }, { status: 400 });
        }

        const member = await TrustMember.create({
            name: body.name,
            title: body.title,
            image: body.image || "",
            order: Number(body.order) || 0
        });

        return NextResponse.json({ success: true, data: member });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
