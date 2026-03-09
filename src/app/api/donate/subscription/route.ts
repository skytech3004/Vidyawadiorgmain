import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import Donation from "@/models/Donation";

// Since razorpay plans must be pre-created, we will dynamically create a plan 
// for the requested subscription amount if one doesn't exist.
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

        // 1. Create a Plan for this amount (Monthly recurring)
        // Note: In production you might want to cache Plan IDs to avoid recreating the same plan.
        const plan = await razorpay.plans.create({
            period: "monthly",
            interval: 1,
            item: {
                name: `Monthly Donation - ₹${amount}`,
                amount: amount * 100, // paise
                currency: "INR",
                description: `Monthly secure donation towards Vidyawadi infrastructure and education.`
            }
        });

        // 2. Create a Subscription using the Plan ID
        const subscription = await razorpay.subscriptions.create({
            plan_id: plan.id,
            customer_notify: 1,
            total_count: 120, // 10 years by default
            quantity: 1,
        });

        // 3. Store Pending Subscription in DB
        await Donation.create({
            donorName,
            email,
            phone,
            amount,
            type: "monthly",
            razorpaySubscriptionId: subscription.id,
            status: "pending"
        });

        return NextResponse.json({ success: true, subscriptionId: subscription.id });
    } catch (error: any) {
        console.error("CREATE_SUBSCRIPTION_ERROR:", error);
        return NextResponse.json({ success: false, error: "Failed to create subscription" }, { status: 500 });
    }
}
