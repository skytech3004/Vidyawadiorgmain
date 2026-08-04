import connectDB from "./mongodb";
import HomeFacility from "../models/HomeFacility";
import HomeAward from "../models/HomeAward";
import { HOME_AWARD_DEMO_ITEMS, HOME_FACILITY_DEMO_ITEMS } from "./home-demo-data";

export async function seedHomeFacilitiesIfEmpty() {
    await connectDB();

    const count = await HomeFacility.countDocuments();
    if (count > 0) return false;

    await HomeFacility.insertMany(HOME_FACILITY_DEMO_ITEMS);
    return true;
}

export async function seedHomeAwardsIfEmpty() {
    await connectDB();

    const count = await HomeAward.countDocuments();
    if (count > 0) return false;

    await HomeAward.insertMany(HOME_AWARD_DEMO_ITEMS);
    return true;
}
