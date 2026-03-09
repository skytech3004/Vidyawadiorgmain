import mongoose from "mongoose";

const AdmissionSchema = new mongoose.Schema({
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
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    board: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        enum: ["new", "under_review", "approved", "rejected"],
        default: "new",
    }
}, { timestamps: true });

export default mongoose.models.Admission || mongoose.model("Admission", AdmissionSchema);
