import mongoose from "mongoose";

const MarudharFacilitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    img: { type: String, required: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.MarudharFacility || mongoose.model("MarudharFacility", MarudharFacilitySchema);
