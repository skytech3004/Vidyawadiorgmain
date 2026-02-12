import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone number"],
    },
    grade: {
        type: String,
        required: [true, "Please provide a grade"],
    },
    message: {
        type: String,
        required: [true, "Please provide a message"],
    },
    status: {
        type: String,
        enum: ["new", "read", "replied"],
        default: "new",
    }
}, { timestamps: true });

export default mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
