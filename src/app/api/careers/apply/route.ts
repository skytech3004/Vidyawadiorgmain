import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import dbConnect from "@/lib/mongodb";
import CareerApplication from "@/models/CareerApplication";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const formData = await req.formData();

        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const experience = formData.get("experience") as string;
        const jobTitle = formData.get("jobTitle") as string;
        const resumeFile = formData.get("resume") as File;

        if (!resumeFile) {
            return NextResponse.json({ success: false, error: "Resume is required" }, { status: 400 });
        }

        // 1. Upload Resume
        const bytes = await resumeFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const sanitizedFileName = resumeFile.name.replace(/[^a-z0-9.]/gi, "_").toLowerCase();
        const filename = `${Date.now()}-${sanitizedFileName}`;
        const relativePath = `/uploads/resumes/${filename}`;
        const absolutePath = path.join(process.cwd(), "public", relativePath);

        await mkdir(path.dirname(absolutePath), { recursive: true });
        await writeFile(absolutePath, buffer);

        // 2. Save to DB
        const application = await CareerApplication.create({
            fullName,
            email,
            phone,
            experience,
            jobTitle,
            resume: `/api${relativePath}`,
        });

        return NextResponse.json({
            success: true,
            message: "Application submitted successfully",
            application
        }, { status: 201 });

    } catch (error: any) {
        console.error("Career Application Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message || "Failed to submit application"
        }, { status: 500 });
    }
}
