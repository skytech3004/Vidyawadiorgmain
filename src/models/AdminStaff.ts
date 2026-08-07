import mongoose from "mongoose";

const AdminStaffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export default mongoose.models.AdminStaff || mongoose.model("AdminStaff", AdminStaffSchema);
