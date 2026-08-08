import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Alumni from "@/models/Alumni";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const data = await req.json();

        const alumni = await Alumni.create({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            passingYear: data.passingYear,
            course: data.course,
            currentOrganization: data.currentOrganization || "",
            currentDesignation: data.currentDesignation || "",
            city: data.city || "",
            message: data.message || "",
        });

        return NextResponse.json(
            { success: true, message: "Alumni registration submitted successfully", alumni },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("Error submitting alumni:", error);
        const message = error instanceof Error ? error.message : "Failed to submit alumni registration";
        return NextResponse.json(
            { success: false, error: message },
            { status: 500 }
        );
    }
}
