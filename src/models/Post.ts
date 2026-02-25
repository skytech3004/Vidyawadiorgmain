import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: String,
    tags: [String],
    author: String,
    published: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
