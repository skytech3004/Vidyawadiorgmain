import mongoose from "mongoose";

const GalleryAlbumSchema = new mongoose.Schema({
    albumTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    category: {
        type: String,
        required: true,
        default: "Others"
    },
    images: [{
        type: String,
        required: true
    }],
    date: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.models.GalleryAlbum || mongoose.model("GalleryAlbum", GalleryAlbumSchema);
