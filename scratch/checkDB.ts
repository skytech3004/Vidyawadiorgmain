import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

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
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db!;
    const collections = await db.collections();
    const instCollection = collections.find(c => c.collectionName === "institutions");
    
    if (!instCollection) {
        console.log("No institutions collection found");
        process.exit(0);
    }

    const data = await instCollection.find({}).toArray();
    console.log("Found " + data.length + " institutions");
    
    data.forEach(inst => {
        console.log("-------------------");
        console.log("ID:", inst.id);
        console.log("Name:", inst.name);
        console.log("Fee Structure Keys:", inst.feeStructure ? Object.keys(inst.feeStructure) : "None");
        if (inst.feeStructure && inst.feeStructure.classes) {
            console.log("Classes Count:", inst.feeStructure.classes.length);
        }
    });

    process.exit(0);
}

check().catch(console.error);
