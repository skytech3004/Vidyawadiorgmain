import dotenv from "dotenv";
import path from "path";

// Load environment variables immediately before any other local imports
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import dbConnect from "../lib/mongodb";
import Admin from "../models/Admin";
import bcrypt from "bcryptjs";

async function seed() {
    console.log("URI present:", !!process.env.MONGODB_URI);
    await dbConnect();
    console.log("Connected to MongoDB");

    const username = "admin";
    const password = "admin_password_123"; // Use a secure password in production

    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
        console.log("Admin already exists");
        process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
        username,
        password: hashedPassword,
        role: "superadmin",
    });

    console.log("Admin created successfully");
    process.exit(0);
}

seed().catch((err) => {
    console.error("SEED_ERROR_MESSAGE:", err.message);
    console.error("SEED_ERROR_STACK:", err.stack);
    process.exit(1);
});
