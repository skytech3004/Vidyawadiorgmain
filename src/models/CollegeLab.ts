import mongoose from "mongoose";

const CollegeLabSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    icon: { type: String, required: false },
    gradient: { type: String, required: false },
    description: { type: String, required: true },
    fullDescription: { type: String, required: true },
    keyFeatures: { type: [String], default: [] },
    activities: { type: String, required: false },
    impact: { type: String, required: false },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.CollegeLab || mongoose.model("CollegeLab", CollegeLabSchema);
