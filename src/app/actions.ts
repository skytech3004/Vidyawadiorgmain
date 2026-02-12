"use server";

import dbConnect from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export async function submitInquiry(formData: FormData) {

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const grade = formData.get("grade") as string;
    const message = formData.get("message") as string;

    if (!fullName || !email || !phone || !grade || !message) {
        return { success: false, error: "All fields are required" };
    }

    try {
        await dbConnect();
        await Inquiry.create({
            fullName,
            email,
            phone,
            grade,
            message,
            status: "new"
        });

        return { success: true };
    } catch (error) {
        console.error("INQUIRY_SUBMIT_ERROR:", error);
        return { success: false, error: "Failed to submit inquiry. Please try again." };
    }
}
