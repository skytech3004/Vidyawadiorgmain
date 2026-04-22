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
    admin: { id: any, username: string }, // eslint-disable-line @typescript-eslint/no-explicit-any
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

        // Ensure adminId is a string or valid ObjectId
        let finalAdminId = admin.id;
        if (typeof finalAdminId === 'object' && finalAdminId !== null) {
            // If it has a toString method that doesn't return [object Object], use it
            const str = finalAdminId.toString();
            if (str !== '[object Object]') {
                finalAdminId = str;
            } else if ((finalAdminId as any).buffer) { // eslint-disable-line @typescript-eslint/no-explicit-any
                // Handle the mangled object { buffer: { '0': ... } }
                try {
                    const buf = Buffer.from(Object.values((finalAdminId as any).buffer) as number[]); // eslint-disable-line @typescript-eslint/no-explicit-any
                    finalAdminId = buf.toString('hex');
                } catch (e) {
                    console.error("Failed to reconstruct ObjectId from buffer:", e);
                }
            }
        }

        await ActivityLog.create({
            adminId: finalAdminId,
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
