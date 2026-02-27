import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ success: false, error: "Missing username or password" }, { status: 400 });
        }

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
        }

        // Create JWT
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        if (!process.env.JWT_SECRET) {
            console.warn("WARN: JWT_SECRET is not defined, using fallback_secret");
        }

        const token = await new SignJWT({ id: admin._id, username: admin.username, role: admin.role })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("24h")
            .sign(secret);

        const response = NextResponse.json({ success: true });

        // Set cookie
        response.cookies.set("adminToken", token, {
            httpOnly: true,
            secure: true, // Always true for production, usually fine for local dev with modern browsers
            sameSite: "strict",
            maxAge: 86400, // 24 hours
            path: "/",
        });

        console.log(`LOGIN_SUCCESS: User ${username} logged in successfully`);
        return response;
    } catch (error: any) {
        console.error("LOGIN_ERROR_DETAILS:", {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        return NextResponse.json({
            success: false,
            error: "Internal Server Error",
            details: process.env.NODE_ENV === "development" ? error.message : "Check server logs for details"
        }, { status: 500 });
    }
}
