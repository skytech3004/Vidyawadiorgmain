import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import TrustMember from "@/models/TrustMember";

export const dynamic = "force-dynamic";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        const updated = await TrustMember.findByIdAndUpdate(
            id,
            {
                name: body.name,
                title: body.title,
                image: body.image || "",
                order: Number(body.order) || 0
            },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ success: false, error: "Trust member not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updated });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const deleted = await TrustMember.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ success: false, error: "Trust member not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
