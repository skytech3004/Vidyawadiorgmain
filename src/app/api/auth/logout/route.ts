import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { recordActivity } from "@/lib/logger";

export async function POST(req: NextRequest) {
    const token = req.cookies.get("adminToken")?.value;
    let userInfo = { id: "unknown", username: "unknown" };

    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
            const { payload } = await jwtVerify(token, secret);
            userInfo = { 
                id: (payload.id as string) || "unknown", 
                username: (payload.username as string) || "unknown" 
            };
        } catch (err) {
            // Token might be invalid, proceed with clearing cookie
        }
    }

    const response = NextResponse.json({ success: true, message: "Logged out successfully" });

    // Clear the adminToken cookie
    response.cookies.delete("adminToken");

    if (userInfo.username !== "unknown") {
        await recordActivity(req, userInfo, "LOGOUT", "Logged out of the administration portal");
    }

    console.log(`LOGOUT_SUCCESS: Admin ${userInfo.username} logged out`);
    return response;
}
