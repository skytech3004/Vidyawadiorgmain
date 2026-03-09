import mongoose from "mongoose";

const HostelApplicationSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    className: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    parentPhone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    emergencyContact: {
        type: String,
        required: true,
    },
    message: String,
    status: {
        type: String,
        enum: ["new", "read", "resolved"],
        default: "new",
    }
}, { timestamps: true });

export default mongoose.models.HostelApplication || mongoose.model("HostelApplication", HostelApplicationSchema);
