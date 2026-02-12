import mongoose from "mongoose";

const TopperSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    percentage: {
        type: String,
        required: [true, "Please provide a percentage"],
    },
    stream: {
        type: String,
        default: "-",
    },
    class: {
        type: String,
        enum: ["X", "XII"],
        required: [true, "Please provide a class"],
    },
    year: {
        type: String,
        required: [true, "Please provide a year"],
    },
    image: {
        type: String,
    },
    institution: {
        type: String,
        enum: ["LPS", "Marudhar"],
        required: [true, "Please provide an institution"],
    },
    order: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

export default mongoose.models.Topper || mongoose.model("Topper", TopperSchema);
