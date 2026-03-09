import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Admission from "@/models/Admission";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const data = await req.json();

        const admission = await Admission.create({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            board: data.board,
            grade: data.grade,
            message: data.message || "",
        });

        return NextResponse.json(
            { success: true, message: "Application submitted successfully", admission },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error submitting admission:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to submit application" },
            { status: 500 }
        );
    }
}
