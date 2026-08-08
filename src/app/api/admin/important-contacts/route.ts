import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ImportantContact from "@/models/ImportantContact";
import { seedImportantContactsIfEmpty } from "@/lib/important-contacts-seed";
import { jwtVerify } from "jose";

export const dynamic = "force-dynamic";

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
        await seedImportantContactsIfEmpty();
        const contacts = await ImportantContact.find({}).sort({ order: 1, createdAt: 1 });
        return NextResponse.json({ success: true, contacts });
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
        const data = await req.json();

        if (!data.office) {
            return NextResponse.json({ success: false, error: "Office name is required" }, { status: 400 });
        }

        const contact = await ImportantContact.create({
            office: data.office,
            phone: data.phone || "",
            email: data.email || "",
            order: Number(data.order) || 0,
        });

        return NextResponse.json({ success: true, contact });
    } catch (error: any) {
        console.error("IMPORTANT_CONTACTS_POST_ERROR:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
