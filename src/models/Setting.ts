import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    group: {
        type: String,
        default: "general"
    }
}, { timestamps: true });

export default mongoose.models.Setting || mongoose.model("Setting", SettingSchema);
