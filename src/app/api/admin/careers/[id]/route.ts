import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Career from "@/models/Career";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const data = await req.json();
        const { id } = await params;

        const career = await Career.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        );

        if (!career) {
            return NextResponse.json(
                { error: "Career not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, career });
    } catch (error) {
        console.error("Error updating career:", error);
        return NextResponse.json(
            { error: "Failed to update career" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const career = await Career.findByIdAndDelete(id);

        if (!career) {
            return NextResponse.json(
                { error: "Career not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting career:", error);
        return NextResponse.json(
            { error: "Failed to delete career" },
            { status: 500 }
        );
    }
}
