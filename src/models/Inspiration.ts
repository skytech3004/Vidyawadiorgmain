import mongoose from "mongoose";

const InspirationSchema = new mongoose.Schema({
    title: { type: String, default: "Our Inspiration" },
    name: { type: String, default: "Smt. Subhadraji Jain" },
    description: { type: String, default: "" },
    image: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.models.Inspiration || mongoose.model("Inspiration", InspirationSchema);
