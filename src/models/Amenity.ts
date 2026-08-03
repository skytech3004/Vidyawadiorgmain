import mongoose from "mongoose";

const AmenitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

if (process.env.NODE_ENV === "development") {
    delete mongoose.models.Amenity;
}

const Amenity = mongoose.models.Amenity || mongoose.model("Amenity", AmenitySchema);

export default Amenity;
