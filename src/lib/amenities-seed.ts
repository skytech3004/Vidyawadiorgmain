import connectDB from "@/lib/mongodb";
import Amenity from "@/models/Amenity";
import { AMENITY_DEMO_ITEMS } from "@/lib/amenities-data";

export async function seedAmenitiesIfEmpty() {
    await connectDB();

    const count = await Amenity.countDocuments();
    if (count > 0) return false;

    await Amenity.insertMany(AMENITY_DEMO_ITEMS);
    return true;
}
