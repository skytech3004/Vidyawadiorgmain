import mongoose from "mongoose";

const CareerApplicationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    resume: {
        type: String, // URL/Path to the resume file
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["new", "reviewed", "shortlisted", "rejected"],
        default: "new",
    }
}, { timestamps: true });

export default mongoose.models.CareerApplication || mongoose.model("CareerApplication", CareerApplicationSchema);
