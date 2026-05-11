import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import Institution from "../src/models/Institution";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function check() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("No MONGODB_URI found");
        return;
    }
    await mongoose.connect(uri);
    
    // We need to use the model to see the virtuals in action
    const inst = await Institution.findOne({ id: "primary" });
    if (!inst) {
        console.log("Not found");
        process.exit(0);
    }

    console.log("Raw object 'id':", inst.id);
    console.log("JSON.stringify output 'id':", JSON.parse(JSON.stringify(inst)).id);
    console.log("Full JSON:", JSON.stringify(inst, null, 2));

    process.exit(0);
}

check().catch(console.error);
