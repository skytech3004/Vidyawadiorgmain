import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ImportantContact from "@/models/ImportantContact";
import { seedImportantContactsIfEmpty } from "@/lib/important-contacts-seed";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await dbConnect();
        await seedImportantContactsIfEmpty();
        const contacts = await ImportantContact.find({}).sort({ order: 1, createdAt: 1 });
        return NextResponse.json({ success: true, contacts });
    } catch (error: any) {
        console.error("IMPORTANT_CONTACTS_API_ERROR:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
