const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const HostelSchema = new mongoose.Schema({
    prospectus: { type: String, default: "" },
    about: {
        title: { type: String, default: "Your Second Home for Holistic Growth." },
        description: { type: String, default: "Spread across a lush 65-acre campus..." },
        stats: [{
            value: String,
            label: String,
        }],
        features: [{
            icon: String,
            text: String,
        }]
    },
    gallery: [{
        src: String,
        title: String,
    }],
    facilities: [{
        image: String,
        title: String,
        desc: String,
    }],
    fees: {
        table: [{
            className: String,
            nonAc: String,
            ac: String,
        }],
        shortDuration: {
            nonAc: { type: String, default: "₹10,000" },
            ac: { type: String, default: "₹12,000" },
        },
        cancellation: {
            penalty: { type: String, default: "₹10,000" },
            schoolDate: { type: String, default: "August 15" },
            collegeDate: { type: String, default: "October 30" },
        }
    },
    rules: [{
        id: String,
        title: String,
        content: String,
        icon: String,
    }],
    scholarships: [{
        title: String,
        desc: String,
    }],
    banking: {
        accountName: { type: String, default: "Marudhar Mahila Shikshan Sangh" },
        bankAndBranch: { type: String, default: "ICICI Bank – Rani Branch" },
        accountNumber: { type: String, default: "684605601184" },
        ifscCode: { type: String, default: "ICIC0006846" },
    }
}, { timestamps: true });

const Hostel = mongoose.models.Hostel || mongoose.model("Hostel", HostelSchema);

const hostelData = {
    prospectus: "/brochures/prospectus.pdf",
    about: {
        title: "Your Second Home for\nHolistic Growth.",
        description: "Spread across a lush 65-acre campus, Vidyawadi offers a secure and nurturing residential environment. With 8 double-storied hostel buildings, we provide class-wise accommodation for students from Nursery to Graduation.",
        stats: [
            { value: "800+", label: "Student Capacity" }
        ],
        features: [
            { icon: "MapPin", text: "65-Acre Safe Campus" },
            { icon: "Dumbbell", text: "International Sports Stadium" },
            { icon: "Users", text: "Class-wise Accommodation" },
            { icon: "Star", text: "Warden & Maid Support" }
        ]
    },
    gallery: [
        { src: "/hostel.jpg", title: "Premium Residence" },
        { src: "/Cafeteria.png", title: "Student Cafeteria" },
        { src: "/Hostels.png", title: "Hostel View" },
        { src: "/Hostels_1.png", title: "Comfortable Living" },
        { src: "/Hostels_2.png", title: "Modern Facilities" },
        { src: "/Hostels_3.png", title: "Nurturing Environment" },
        { src: "/Hostels_4.png", title: "Safe & Secure" }
    ],
    facilities: [
        { image: "/uploads/mess/security.jpg", title: "Safety & CCTV", desc: "Round-the-clock security with full CCTV coverage." },
        { image: "/images/jain_meals.png", title: "Pure Jain Food", desc: "Nutritious Satvik meals with 5 servings per day." },
        { image: "/uploads/mess/RO.jpg", title: "RO Drinking Water", desc: "Pure and safe RO purified drinking water available 24/7." },
        { image: "/uploads/mess/HOT.jpg", title: "Hot Water", desc: "Constant supply of hot water during winter months." },
        { image: "/uploads/mess/aa.jpg", title: "Digital Library", desc: "24/7 access to educational resources and quiet study space." },
        { image: "/uploads/mess/yoga.jpeg", title: "Yoga & Meditation", desc: "Daily morning sessions for physical and mental well-being." },
        { image: "/uploads/mess/sport.jpg", title: "Sports Facilities", desc: "International standard stadium and sports ground." },
        { image: "/uploads/mess/Health.jpg", title: "Health Care 24x7", desc: "On-campus medical assistance and annual checkups." }
    ],
    fees: {
        table: [
            { className: "Nursery to Class 5", nonAc: "₹87,500", ac: "₹1,20,500" },
            { className: "Class 6", nonAc: "₹87,500", ac: "₹1,22,500" },
            { className: "Class 7 to 9", nonAc: "₹90,500", ac: "₹1,22,500" },
            { className: "Class 10 to XII", nonAc: "₹95,500", ac: "₹1,22,500" },
            { className: "College (UG/PG)", nonAc: "₹95,500", ac: "₹1,22,500" },
            { className: "B.Ed (1st & 2nd Year)", nonAc: "₹95,500", ac: "-" },
            { className: "B.Ed 3rd Year", nonAc: "₹61,500", ac: "-" },
            { className: "B.Ed 4th Year", nonAc: "₹56,500", ac: "-" }
        ],
        shortDuration: {
            nonAc: "₹10,000",
            ac: "₹12,000"
        },
        cancellation: {
            penalty: "₹10,000",
            schoolDate: "August 15",
            collegeDate: "October 30"
        }
    },
    rules: [
        {
            id: "entry",
            title: "Entry Policy",
            icon: "History",
            content: "An Entry Pass is required for all visitors, which must be signed by the Hostel Incharge & Chief Resident Officer. Parents are welcome to meet their children only on Sundays between 9:30 AM and 6:00 PM."
        },
        {
            id: "exit",
            title: "Exit Policy",
            icon: "FileCheck",
            content: "Students are permitted to exit the campus only with approved relatives. An Exit Pass is mandatory and requires official approvals from the administration."
        }
    ],
    scholarships: [
        { title: "Merit Scholarship", desc: "10% discount for students securing 95% and above." },
        { title: "Sports Excellence", desc: "Special scholarships for National level sports players." }
    ],
    banking: {
        accountName: "Marudhar Mahila Shikshan Sangh",
        bankAndBranch: "ICICI Bank – Rani Branch",
        accountNumber: "684605601184",
        ifscCode: "ICIC0006846"
    }
};

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB.");

        await Hostel.findOneAndUpdate({}, hostelData, { upsert: true, new: true });
        
        console.log("Hostel data seeded successfully.");
    } catch (error) {
        console.error("Error seeding hostel data:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

seed();
