import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    institution: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
    },
    email: String,
    phone: String,
}, { timestamps: true });

export default mongoose.models.Faculty || mongoose.model("Faculty", FacultySchema);
