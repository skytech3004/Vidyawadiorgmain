"use server";

export async function submitInquiry(formData: FormData) {

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const grade = formData.get("grade") as string;
    const message = formData.get("message") as string;

    if (!fullName || !email || !phone || !grade || !message) {
        return { success: false, error: "All fields are required" };
    }

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true };
}
