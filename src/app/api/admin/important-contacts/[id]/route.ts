import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ImportantContact from "@/models/ImportantContact";
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

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await dbConnect();
        const data = await req.json();

        const contact = await ImportantContact.findByIdAndUpdate(
            id,
            {
                office: data.office,
                phone: data.phone || "",
                email: data.email || "",
                order: Number(data.order) || 0,
            },
            { new: true }
        );

        return NextResponse.json({ success: true, contact });
    } catch (error: any) {
        console.error("IMPORTANT_CONTACTS_PUT_ERROR:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await dbConnect();
        await ImportantContact.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("IMPORTANT_CONTACTS_DELETE_ERROR:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
