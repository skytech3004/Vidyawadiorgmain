import mongoose from "mongoose";

const TrustMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    order: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

export default mongoose.models.TrustMember || mongoose.model("TrustMember", TrustMemberSchema);
