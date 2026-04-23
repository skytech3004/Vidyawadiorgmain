import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subjects: {
        type: String,
    },
    requirements: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export default mongoose.models.Career || mongoose.model("Career", CareerSchema);
