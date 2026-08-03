import connectDB from "@/lib/mongodb";
import Heritage from "@/models/Heritage";
import { HERITAGE_DEMO_ITEMS } from "@/lib/heritage-data";

export async function seedHeritageIfEmpty() {
    await connectDB();

    const count = await Heritage.countDocuments();
    if (count > 0) return false;

    await Heritage.insertMany(HERITAGE_DEMO_ITEMS);
    return true;
}
