import mongoose from "mongoose";

const HomeFacilitySchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        icon: { type: String, default: "" },
        theme: { type: String, default: "bg-oxford" },
        features: { type: [String], default: [] },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

if (process.env.NODE_ENV === "development") {
    delete mongoose.models.HomeFacility;
}

const HomeFacility = mongoose.models.HomeFacility || mongoose.model("HomeFacility", HomeFacilitySchema);

export default HomeFacility;
