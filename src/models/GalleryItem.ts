import mongoose from "mongoose";

const GalleryItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },
    category: {
        type: String,
        required: [true, "Please provide a category"],
        enum: ["Campus", "Events", "Sports", "Laboratories", "Academic", "Others"],
        default: "Others",
    },
    image: {
        type: String,
        required: [true, "Please provide an image URL"],
    },
    order: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

export default mongoose.models.GalleryItem || mongoose.model("GalleryItem", GalleryItemSchema);
