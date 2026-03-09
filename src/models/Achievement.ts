import mongoose from "mongoose";

const AchievementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: "Sports", // Can be extended to other categories
    },
    institution: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
        default: "2024-25"
    },
    order: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

// Force delete the model in development to ensure schema changes are applied
if (process.env.NODE_ENV === "development") {
    delete mongoose.models.Achievement;
}

const Achievement = mongoose.models.Achievement || mongoose.model("Achievement", AchievementSchema);
export default Achievement;
