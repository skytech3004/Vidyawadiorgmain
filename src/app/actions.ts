"use server";
// Wait, Server Actions should be "use server".

import pool from "@/lib/db";

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
        const connection = await pool.getConnection();
        await connection.query(
            "INSERT INTO inquiries (fullName, email, phone, grade, message) VALUES (?, ?, ?, ?, ?)",
            [fullName, email, phone, grade, message]
        );
        connection.release();
        return { success: true };
    } catch (error) {
        console.error("Database error:", error);
        return { success: false, error: "Database connection failed. Please ensure MySQL is running." };
    }
}
