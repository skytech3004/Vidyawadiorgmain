import mongoose from "mongoose";

const HomeAwardSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        organization: { type: String, required: true },
        year: { type: String, required: true },
        images: { type: [String], default: [] },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

if (process.env.NODE_ENV === "development") {
    delete mongoose.models.HomeAward;
}

const HomeAward = mongoose.models.HomeAward || mongoose.model("HomeAward", HomeAwardSchema);

export default HomeAward;
