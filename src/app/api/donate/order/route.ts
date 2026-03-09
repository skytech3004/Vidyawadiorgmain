import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function POST(req: NextRequest) {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
            key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder",
        });

        await dbConnect();
        const { amount, donorName, email, phone } = await req.json();

        if (!amount || !donorName || !email || !phone) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        // Razorpay expects amount in paise (1 INR = 100 paise)
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Pre-create the pending donation record
        await Donation.create({
            donorName,
            email,
            phone,
            amount,
            type: "one-time",
            razorpayOrderId: order.id,
            status: "pending"
        });

        return NextResponse.json({ success: true, orderId: order.id, amount: options.amount });
    } catch (error: any) {
        console.error("CREATE_ORDER_ERROR:", error);
        return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 });
    }
}
