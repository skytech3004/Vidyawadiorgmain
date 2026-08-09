import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        enum: ['event', 'news'],
        default: 'event',
    },
    institution: {
        type: String,
        default: "all", // all, lps, marudhar, sushiladevi
    },
    link: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
    color: {
        type: String,
        default: "#002147", // Default oxford blue
    }
}, { timestamps: true });

// Force delete the model in development to ensure schema changes are applied
if (process.env.NODE_ENV === "development") {
    delete mongoose.models.Event;
}

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
export default Event;
