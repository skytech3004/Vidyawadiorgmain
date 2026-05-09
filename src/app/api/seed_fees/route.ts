import { NextResponse } from "next/server";
import { seedFees } from "@/lib/seedFees";

export async function GET() {
    try {
        await seedFees();
        return NextResponse.json({ success: true, message: "Fees seeded successfully" });
    } catch (error: any) {
        console.error("Seed error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
