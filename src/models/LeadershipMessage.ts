import mongoose from "mongoose";

const LeadershipMessageSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        unique: true,
        enum: ["president", "secretary", "ceo"],
    },
    title: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "",
    },
    photo: {
        type: String,
        default: "",
    },
    content: {
        type: String,
        default: "",
    },
}, { timestamps: true });

export default mongoose.models.LeadershipMessage || mongoose.model("LeadershipMessage", LeadershipMessageSchema);
