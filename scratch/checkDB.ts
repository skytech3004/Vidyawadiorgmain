import dbConnect from "../src/lib/mongodb";
import Institution from "../src/models/Institution";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

async function check() {
    try {
        await dbConnect();
        const institutions = await Institution.find({});
        console.log(JSON.stringify(institutions, null, 2));
    } catch (err) {
        console.error(err);
    }
    process.exit(0);
}

check();
