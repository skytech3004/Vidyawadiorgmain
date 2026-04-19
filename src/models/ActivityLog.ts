import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    action: {
        type: String, // e.g., "LOGIN", "LOGOUT", "UPLOAD", "SETTINGS_UPDATE", "CONTENT_DELETE"
        required: true,
    },
    details: {
        type: String, // Description or JSON string of changes
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    userAgent: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.models.ActivityLog || mongoose.model("ActivityLog", ActivityLogSchema);
