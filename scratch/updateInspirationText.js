const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    envContent.split("\n").forEach(line => {
        const parts = line.split("=");
        if (parts.length >= 2) {
            process.env[parts[0].trim()] = parts.slice(1).join("=").trim();
        }
    });
}

async function run() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("No MONGODB_URI found");
        process.exit(1);
    }
    await mongoose.connect(uri);

    const db = mongoose.connection.db;
    const collection = db.collection("inspirations");

    const newDescription = `<p>Smt. Subhadraji Jain was the first Vyasthapika & teacher of Vidyawadi and a remarkable pillar in the institution’s growth journey. With unwavering dedication, commitment, and selfless service, she devoted her entire life to the development and progress of Vidyawadi.</p><p>Beginning her journey as a teacher, she went on to serve the institution as a Principal and Administrator, carrying every responsibility with sincerity and determination. Her vision, leadership, and tireless efforts played an important role in nurturing Vidyawadi and strengthening its educational foundation.</p><p>Her lifelong association with Vidyawadi reflects a deep commitment to education, investiture, and the empowerment of girls. In recognition of her distinguished contribution and dedicated service, she was honoured with numerous awards and accolades at the district, state, and national levels.</p><p>Her life and legacy continue to inspire generations and remain an integral part of the Vidyawadi journey.</p>`;

    const res = await collection.updateOne(
        {},
        {
            $set: {
                title: "Our Inspiration",
                name: "Smt. Subhadraji Jain",
                description: newDescription,
                updatedAt: new Date()
            }
        },
        { upsert: true }
    );

    console.log("Update result:", JSON.stringify(res));
    process.exit(0);
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
