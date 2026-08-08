import mongoose from "mongoose";

const ImportantContactSchema = new mongoose.Schema({
    office: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    order: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export default mongoose.models.ImportantContact || mongoose.model("ImportantContact", ImportantContactSchema);
