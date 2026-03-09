import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Admission from "@/models/Admission";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const data = await req.json();
        const { id } = await params;

        const admission = await Admission.findByIdAndUpdate(
            id,
            { status: data.status },
            { new: true }
        );

        if (!admission) {
            return NextResponse.json({ success: false, error: "Admission not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, admission }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();

        const { id } = await params;
        const admission = await Admission.findByIdAndDelete(id);

        if (!admission) {
            return NextResponse.json({ success: false, error: "Admission not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Admission deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
