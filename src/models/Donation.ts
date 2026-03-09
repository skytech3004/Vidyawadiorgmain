import mongoose, { Schema, Document } from "mongoose";

export interface IDonation extends Document {
    donorName: string;
    email: string;
    phone: string;
    amount: number;
    type: "one-time" | "monthly";
    razorpayOrderId?: string;
    razorpaySubscriptionId?: string;
    razorpayPaymentId?: string;
    status: "pending" | "successful" | "failed";
    createdAt: Date;
    updatedAt: Date;
}

const DonationSchema: Schema = new Schema(
    {
        donorName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        amount: { type: Number, required: true },
        type: { type: String, enum: ["one-time", "monthly"], required: true },
        razorpayOrderId: { type: String },
        razorpaySubscriptionId: { type: String },
        razorpayPaymentId: { type: String },
        status: {
            type: String,
            enum: ["pending", "successful", "failed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Donation ||
    mongoose.model<IDonation>("Donation", DonationSchema);
