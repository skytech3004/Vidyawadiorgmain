import mongoose from "mongoose";

const TopperSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    stream: String,
    image: String,
    institution: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        default: 0,
    },
    resultType: {
        type: String,
        default: "Board", // e.g., 'Board', 'Non-Board', 'Sports', 'Competitive'
    }
}, { timestamps: true });

// Force delete the model in development to ensure schema changes are applied
if (process.env.NODE_ENV === "development") {
    delete mongoose.models.Topper;
}

const Topper = mongoose.models.Topper || mongoose.model("Topper", TopperSchema);
export default Topper;
