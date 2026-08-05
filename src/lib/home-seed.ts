import connectDB from "./mongodb";

export async function seedHomeFacilitiesIfEmpty() {
    await connectDB();
    return false;
}

export async function seedHomeAwardsIfEmpty() {
    await connectDB();
    return false;
}
