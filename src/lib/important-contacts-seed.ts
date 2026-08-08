import connectDB from "@/lib/mongodb";
import ImportantContact from "@/models/ImportantContact";
import { IMPORTANT_CONTACT_DEFAULTS } from "@/lib/important-contacts-data";

export async function seedImportantContactsIfEmpty() {
    await connectDB();

    const count = await ImportantContact.countDocuments();
    if (count > 0) return false;

    await ImportantContact.insertMany(IMPORTANT_CONTACT_DEFAULTS);
    return true;
}
