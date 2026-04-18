import mongoose from "mongoose";

const EnglishInfrastructureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: false },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.EnglishInfrastructure || mongoose.model("EnglishInfrastructure", EnglishInfrastructureSchema);
