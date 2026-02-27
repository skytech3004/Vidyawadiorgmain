import mongoose from "mongoose";

const GalleryCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    order: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

export default mongoose.models.GalleryCategory || mongoose.model("GalleryCategory", GalleryCategorySchema);
