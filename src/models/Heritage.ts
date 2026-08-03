import mongoose from "mongoose";

const HeritageSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    side: {
        type: String,
        enum: ["left", "right"],
        default: "left",
    },
    order: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

if (process.env.NODE_ENV === "development") {
    delete mongoose.models.Heritage;
}

const Heritage = mongoose.models.Heritage || mongoose.model("Heritage", HeritageSchema);

export default Heritage;
