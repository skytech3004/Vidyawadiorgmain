import mongoose from "mongoose";

const AlumniSchema = new mongoose.Schema({
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
    passingYear: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    currentOrganization: {
        type: String,
        default: "",
    },
    currentDesignation: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    message: {
        type: String,
        default: "",
    },
}, { timestamps: true });

export default mongoose.models.Alumni || mongoose.model("Alumni", AlumniSchema);
