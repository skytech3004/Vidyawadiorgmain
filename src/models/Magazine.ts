import mongoose from "mongoose";

const MagazineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    coverImage: {
        type: String,
        default: "",
    },
    pdfUrl: {
        type: String,
        required: true,
    },
    issueDate: {
        type: Date,
        required: true,
    },
    volume: {
        type: String,
        default: "",
    },
    published: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

if (process.env.NODE_ENV === "development") {
    delete mongoose.models.Magazine;
}

const Magazine = mongoose.models.Magazine || mongoose.model("Magazine", MagazineSchema);
export default Magazine;
