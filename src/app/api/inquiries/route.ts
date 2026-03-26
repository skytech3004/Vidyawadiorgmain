import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const data = await req.json();

        const inquiry = await Inquiry.create({
            name: data.fullName || data.name,
            email: data.email,
            phone: data.phone || "",
            subject: data.board ? `${data.grade} - ${data.board}` : (data.subject || "General Inquiry"),
            message: data.message,
        });

        return NextResponse.json(
            { success: true, message: "Inquiry submitted successfully", inquiry },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error submitting inquiry:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to submit inquiry" },
            { status: 500 }
        );
    }
}
