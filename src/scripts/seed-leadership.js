const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const LeadershipMessageSchema = new mongoose.Schema({
    role: { type: String, required: true, unique: true, enum: ["president", "secretary", "ceo"] },
    title: { type: String, default: "" },
    photo: { type: String, default: "" },
    content: { type: String, default: "" },
}, { timestamps: true });

const LeadershipMessage = mongoose.models.LeadershipMessage || mongoose.model("LeadershipMessage", LeadershipMessageSchema);

const messages = [
    {
        role: "president",
        title: "Management's Message",
        photo: "/f837631c-4bc9-4494-b8f1-fff9b07554d8.jpg",
        content: `On behalf of the Management Committee, I extend a warm welcome to Leela Devi Parasmal Sancheti Kanya Mahavidyalaya. We are proud of our heritage and the values we instill in our students. 

Our mission is to provide an environment that fosters intellectual, emotional, and spiritual growth. We believe in empowering women through education and ensuring they have the tools necessary to succeed in a rapidly changing world. 

Our management is committed to continuous improvement, maintaining high academic standards, and providing state-of-the-art facilities. We look forward to partnering with you in your educational journey.`
    },
    {
        role: "secretary",
        title: "Principal's Message",
        photo: "/hostel.jpg",
        content: `Welcome to Leela Devi Parasmal Sancheti Kanya Mahavidyalaya. As the Principal, it is my privilege to lead this esteemed institution dedicated to the holistic development of young women.

Our dedicated faculty members are committed to providing quality education, nurturing talent, and shaping future leaders. We offer a comprehensive curriculum that balances academics with extracurricular activities, ensuring our students receive a well-rounded education.

We strive to create a safe, inclusive, and stimulating learning environment where every student can achieve her full potential. Together, let us embark on a journey of discovery, growth, and excellence.

Prof.(Dr.) Punita Soni
Principal`
    },
    {
        role: "ceo",
        title: "CEO's Message",
        photo: "/images/jain_meals.png",
        content: `It gives me immense pleasure to welcome you to Vidyawadi. As the Chief Executive Officer, I am proud to be part of an institution that has a rich legacy of empowering women through education.

Our vision is to build a vibrant learning community that celebrates diversity, encourages innovation, and instills a lifelong love for learning. We are constantly upgrading our infrastructure, introducing new programs, and forging partnerships to provide our students with the best possible opportunities.

I invite you to explore our campus, learn about our programs, and discover the Vidyawadi difference. Together, let us shape a brighter future for our students and our society.

Chief Executive Officer`
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB.");

        for (const msg of messages) {
            await LeadershipMessage.findOneAndUpdate(
                { role: msg.role },
                msg,
                { upsert: true, new: true }
            );
        }

        console.log("Leadership messages seeded successfully.");
    } catch (error) {
        console.error("Error seeding leadership messages:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

seed();
