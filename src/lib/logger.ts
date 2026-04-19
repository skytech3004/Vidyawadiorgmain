import { NextRequest } from "next/server";
import dbConnect from "./mongodb";
import ActivityLog from "@/models/ActivityLog";

/**
 * Records an administrative activity in the database.
 * @param req The incoming NextRequest to extract IP and user agent.
 * @param admin User info containing id and username.
 * @param action Short string identifying the action (e.g. "LOGIN", "SETTINGS_UPDATE").
 * @param details Human-readable description of the activity.
 */
export async function recordActivity(
    req: NextRequest, 
    admin: { id: string, username: string }, 
    action: string, 
    details: string
) {
    try {
        await dbConnect();
        
        // Extract IP (handling Nginx proxies)
        const ip = req.headers.get("x-forwarded-for")?.split(',')[0] || 
                   req.headers.get("x-real-ip") || 
                   "unknown";
                   
        const userAgent = req.headers.get("user-agent") || "unknown";

        await ActivityLog.create({
            adminId: admin.id,
            username: admin.username,
            action,
            details,
            ip,
            userAgent
        });
        
        console.log(`[ACTIVITY_LOG] ${admin.username} performed ${action}: ${details} (IP: ${ip})`);
    } catch (error) {
        console.error("FAILED_TO_RECORD_ACTIVITY:", error);
    }
}
