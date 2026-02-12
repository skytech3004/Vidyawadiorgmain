import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },
    slug: {
        type: String,
        required: [true, "Please provide a slug"],
        unique: true,
    },
    content: {
        type: String,
        required: [true, "Please provide content"],
    },
    category: {
        type: String,
        required: [true, "Please provide a category"],
    },
    coverImage: {
        type: String,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    author: {
        type: String,
        default: "Admin",
    },
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
