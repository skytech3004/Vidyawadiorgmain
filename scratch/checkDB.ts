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
    
    const db = mongoose.connection.db!;
    const collections = await db.collections();
    const instCollection = collections.find(c => c.collectionName === "institutions");
    
    if (!instCollection) {
        console.log("No institutions collection found");
        process.exit(0);
    }

    const data = await instCollection.find({}).toArray();
    
    data.forEach(inst => {
        console.log("--- Document ---");
        console.log("Field 'id':", inst.id);
        console.log("Field '_id':", inst._id.toString());
        console.log("Are they same?", inst.id === inst._id.toString());
    });

    process.exit(0);
}

check().catch(console.error);
