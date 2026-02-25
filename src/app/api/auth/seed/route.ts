import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = await Admin.findOneAndUpdate(
            { username: "admin" },
            {
                password: hashedPassword,
                role: "superadmin"
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({ success: true, message: "Admin account secured: admin / admin123" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
