import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: String,
    subject: String,
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["new", "read", "resolved"],
        default: "new",
    }
}, { timestamps: true });

export default mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
