import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id,
            type,
            mock_data
        } = await req.json();

        const RAZORPAY_SECRET = process.env.RAZORPAY_KEY_SECRET;

        // -- Mock Mode Bypass --
        if (razorpay_signature === "mock_signature_skip_verify" && mock_data) {
            console.log("Mock Mode Payment Verified. Saving direct to DB.");

            await Donation.create({
                donorName: mock_data.donorName,
                email: mock_data.email,
                phone: mock_data.phone,
                amount: mock_data.amount,
                type: type,
                razorpayOrderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id,
                status: "successful"
            });

            return NextResponse.json({ success: true, message: "Mock Payment verified successfully" });
        }
        // ----------------------

        if (!RAZORPAY_SECRET) {
            console.error("Missing RAZORPAY_KEY_SECRET");
            return NextResponse.json({ success: false, error: "Server Configuration Error" }, { status: 500 });
        }

        let generated_signature = "";

        // Verify Signature logic differs slightly for orders vs subscriptions
        if (type === "monthly") {
            // Subscription signature verification
            const text = `${razorpay_payment_id}|${razorpay_subscription_id}`;
            generated_signature = crypto
                .createHmac("sha256", RAZORPAY_SECRET)
                .update(text)
                .digest("hex");
        } else {
            // One-time payment signature verification
            const text = `${razorpay_order_id}|${razorpay_payment_id}`;
            generated_signature = crypto
                .createHmac("sha256", RAZORPAY_SECRET)
                .update(text)
                .digest("hex");
        }

        if (generated_signature !== razorpay_signature) {
            console.error("Signature mismatch");
            return NextResponse.json({ success: false, error: "Invalid Signature" }, { status: 400 });
        }

        // Signature Verified -> Update Database
        if (type === "monthly") {
            await Donation.findOneAndUpdate(
                { razorpaySubscriptionId: razorpay_subscription_id },
                { status: "successful", razorpayPaymentId: razorpay_payment_id },
                { new: true }
            );
        } else {
            await Donation.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "successful", razorpayPaymentId: razorpay_payment_id },
                { new: true }
            );
        }

        // Razorpay automatically handles sending emails to the user via the checkout form params.

        return NextResponse.json({ success: true, message: "Payment verified successfully" });
    } catch (error: any) {
        console.error("VERIFY_PAYMENT_ERROR:", error);
        return NextResponse.json({ success: false, error: "Failed to verify signature" }, { status: 500 });
    }
}
