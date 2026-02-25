import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Institution from "@/models/Institution";
import Hostel from "@/models/Hostel";
import Faculty from "@/models/Faculty";
import Topper from "@/models/Topper";
import Post from "@/models/Post";
import GalleryItem from "@/models/GalleryItem";
import { jwtVerify } from "jose";

async function verifyAuth(req: NextRequest) {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}

export async function GET(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        // Force refresh models by clearing cache (useful for schema updates in dev)
        const mongoose = (await import("mongoose")).default;
        if (mongoose.models.Topper) delete mongoose.models.Topper;

        // 1. Seed Institutions
        const institutions = [
            {
                id: "marudhar",
                name: "Marudhar Balika Vidyapeeth",
                tagline: "Empowering Girls since 1956",
                affiliation: "RBSE",
                about: { content: "Marudhar Balika Vidyapeeth is a premier girls' senior secondary school dedicated to academic excellence, character building, and all-round development. Managed by Marudhar Mahila Shikshan Sangh, Vidyawadi, our institution provides quality education in Hindi & English Medium under RBSE." },
                vision: { content: "To be a leader in girls' education, fostering leadership and traditional values." },
                mission: { content: "To provide quality education that empowers girls to become independent and responsible citizens." },
                principalMessage: {
                    principalName: "Ms. Priya Sangeeta",
                    message: "It gives me immense pleasure to welcome you to Marudhar Balika Vidyapeeth (Sr. Sec.) School, Vidyawadi. Our institution stands as a symbol of dedication, discipline and excellence in girls' education. We believe that education is not merely the acquisition of knowledge, but the development of character, confidence and compassion.",
                    quote: "Education is the most powerful weapon which you can use to change the world."
                },
                contact: { address: "Khimel, Station Rani – 306115, District Pali (Rajasthan)", phone: "6377204205, 6377204207", email: "info@vidyawadi.org" }
            },
            {
                id: "lps",
                name: "Leela Devi English Medium School",
                tagline: "Nurturing Excellence in Every Child",
                affiliation: "CBSE",
                about: { content: "Founded in 2004, situated in the rural belt of Pali District in Rajasthan, this Vidyalaya is a residential school providing quality education from Nursery to XII primarily for girls, with a noble thought of promoting girls' education. Presently, the School accommodates more than 1000 girls." },
                vision: { content: "Global excellence in English medium education." },
                mission: { content: "Foster a love for learning in a globally competitive environment." },
                principalMessage: {
                    principalName: "Ms. Jyoti Nath",
                    message: "Welcome to LPS, Vidyawadi, where we take pride in fostering a nurturing environment that empowers every learner to grow into a confident, compassionate, and globally-minded citizen.",
                    quote: "The future belongs to those who believe in the beauty of their dreams."
                },
                contact: { address: "Vidyawadi, Khimel, Station-Rani, Distt.-Pali (Raj.) 306115", phone: "8764250887", email: "lpsvidhyawadi@gmail.com" }
            },
            {
                id: "college",
                name: "Leela Devi Parasmal Sancheti Kanya Mahavidyalaya",
                tagline: "Excellence in Higher Education",
                affiliation: "JNVU Jodhpur",
                about: { content: "Leela Devi Parasmal Sancheti Kanya Mahavidyalaya is a women-only higher education institution managed by Marudhar Mahila Shikshan Sangh, Vidyawadi. Established to empower girls in academics, leadership, and career preparedness, we provide a transformative learning experience." },
                vision: { content: "Excellence in women's higher education." },
                mission: { content: "Create professional and ethical leaders in every field." },
                principalMessage: {
                    principalName: "Dr. K.C. Sharma",
                    message: "Our college is dedicated to academic excellence and professional growth for our students.",
                    quote: "Innovation distinguishes between a leader and a follower."
                },
                contact: { address: "Vidyawadi, Khimel – Station Rani, Dist. Pali, Rajasthan – 306115, India.", phone: "+91-8764185993", email: "ldpsvidhyawadi@gmail.com" }
            }
        ];

        for (const inst of institutions) {
            await Institution.findOneAndUpdate({ id: inst.id }, inst, { upsert: true });
        }

        // 2. Seed Hostel
        const hostelData = {
            amenities: [
                { id: "1", label: "Modern Rooms", desc: "Spacious and ventilated AC/Non-AC rooms.", image: "/media/hostel/room.webp" },
                { id: "2", label: "Nutritious Food", desc: "Healthy Satvik meals prepared with care.", image: "/media/hostel/food.webp" },
                { id: "3", label: "24/7 Security", desc: "CCTV surveillance and professional female caretakers.", image: "/media/hostel/security.webp" },
                { id: "4", label: "Lush Green Campus", desc: "A peaceful environment for focused growth.", image: "/media/hostel/campus.webp" }
            ],
            foodMenu: {
                title: "Satvik Diet Plan",
                description: "Holistic nutrition for growing minds, following traditional values.",
                weeklyMenu: {
                    monday: ["Daliya", "Mixed Veg", "Roti", "Curd"],
                    tuesday: ["Poha", "Dal Tadka", "Rice", "Salad"],
                    wednesday: ["Upma", "Aloo Gobi", "Roti", "Sweets"],
                    thursday: ["Idli Sambhar", "Paneer", "Missi Roti", "Butter Milk"],
                    friday: ["Paratha", "Chana Masala", "Jeera Rice", "Fruit Bowl"],
                    saturday: ["Masala Oats", "Baati Choorma", "Kadhi", "Chatni"],
                    sunday: ["Puri Bhaji", "Special Thali", "Rice Kheer", "Fruits"]
                }
            },
            rules: { content: "1. No gadgets allowed. 2. Strict adherence to time schedule. 3. Zero tolerance for bullying. 4. Proper uniform is mandatory during sessions." },
            fees: { content: "Hostel fees vary by room type (AC/Non-AC). Detailed fee structure is available at the administrative office." },
            admission: { content: "Admission is open to students from Class VI onwards. Selection is based on merit and proximity from home." }
        };
        await Hostel.findOneAndUpdate({}, hostelData, { upsert: true });

        // 3. Seed Comprehensive Staff
        await Faculty.deleteMany({}); // Start fresh for staff

        const staffData = [
            // --- Marudhar Balika Vidyapeeth ---
            { name: "Priya Sangeeta", designation: "Principal", institution: "marudhar", order: 1, image: "/staff/priya-sangeeta.png" },
            { name: "Alka Tak", designation: "Vice Principal", institution: "marudhar", order: 2, image: "/staff/alka-tak.png" },
            { name: "Kushal Kunwar", designation: "PGT - History", institution: "marudhar", order: 3, image: "/staff/kushal-kunwar.png" },
            { name: "Prakash Gehlot", designation: "PGT - Mathematics", institution: "marudhar", order: 4, image: "/staff/prakash-gehlot.png" },
            { name: "Uttam Kunwar", designation: "PGT - English Literature", institution: "marudhar", order: 5, image: "/staff/uttam-kunwar.png" },
            { name: "Vishnu Kanwar", designation: "PGT - Drawing", institution: "marudhar", order: 6, image: "/staff/vishnu-kanwar.png" },
            { name: "Santosh Kanwar", designation: "PGT - Economics", institution: "marudhar", order: 7, image: "/staff/santosh-kanwar.png" },
            { name: "Dimpal Kumari Sharma", designation: "PGT - Political Science", institution: "marudhar", order: 8, image: "/staff/dimpal-kumari-sharma.png" },
            { name: "Chandra Kunwar", designation: "PGT - Chemistry", institution: "marudhar", order: 9, image: "/staff/chandra-kunwar.png" },
            { name: "Suman Kanwar", designation: "PGT - Geography", institution: "marudhar", order: 10, image: "/staff/suman-kanwar.png" },
            { name: "Jitendra Singh", designation: "PGT - Accounts", institution: "marudhar", order: 11, image: "/staff/jitendra-singh.png" },
            { name: "Vandana Sharma", designation: "PGT - Hindi Literature", institution: "marudhar", order: 12, image: "/staff/vandana-sharma.png" },
            { name: "Dinesh Kumar", designation: "PGT - Physics", institution: "marudhar", order: 13, image: "/staff/dinesh-kumar.png" },
            { name: "Shruti Sharma", designation: "TGT - Sanskrit", institution: "marudhar", order: 14, image: "/staff/shruti-sharma.png" },
            { name: "Heena Chouhan", designation: "TGT - Hindi", institution: "marudhar", order: 15, image: "/staff/heena-chouhan.png" },
            { name: "Kamlesh", designation: "TGT - Computer", institution: "marudhar", order: 16, image: "/staff/kamlesh.png" },
            { name: "Harshita Soni", designation: "TGT - Science", institution: "marudhar", order: 17, image: "/staff/harshita-soni.png" },
            { name: "Jitendra Kumar", designation: "TGT - Biology", institution: "marudhar", order: 18, image: "/staff/jitendra-kumar.png" },
            { name: "Neha Ashawat", designation: "TGT - English", institution: "marudhar", order: 19, image: "/staff/neha-ashawat.png" },
            { name: "Yogita Malviya", designation: "TGT - Mathematics", institution: "marudhar", order: 20, image: "/staff/yogita-malviya.png" },
            { name: "Soniya Kumari", designation: "TGT - Social Science", institution: "marudhar", order: 21, image: "/staff/soniya-kumari.png" },
            { name: "Uday Narayan Shukla", designation: "Science Lab Assistant", institution: "marudhar", order: 22, image: "/staff/uday-narayan-shukla.png" },
            { name: "Baby Kunwar", designation: "Librarian", institution: "marudhar", order: 23, image: "/staff/baby-kunwar.png" },
            { name: "Monika", designation: "P.T.I.", institution: "marudhar", order: 24, image: "/staff/monika.png" },
            { name: "Himmat Singh Rathore", designation: "U.D.C.", institution: "marudhar", order: 25, image: "/staff/himmat-singh-rathore.png" },
            { name: "Dilip Kumar", designation: "L.D.C.", institution: "marudhar", order: 26, image: "/staff/dilip-kumar.png" },
            { name: "Arvind Kumar", designation: "Office Boy", institution: "marudhar", order: 27, image: "/staff/arvind-kumar.png" },
            { name: "Rekha", designation: "Peon", institution: "marudhar", order: 28, image: "/staff/rekha.png" },
            { name: "Bhima Ram", designation: "Gardener", institution: "marudhar", order: 29, image: "/staff/bhima-ram.png" },
            { name: "Gordhan Singh Sisodia", designation: "Peon", institution: "marudhar", order: 30, image: "/staff/gordhan-singh-sisodia.png" },
            { name: "Dilip", designation: "Peon", institution: "marudhar", order: 31, image: "/staff/dilip.png" },
            { name: "Hirwanti", designation: "Sweeper", institution: "marudhar", order: 32, image: "/staff/hirwanti.png" },

            // --- Leela Devi English Medium School (LPS) ---
            { name: "Ms. Jyoti Nath", designation: "Principal", institution: "lps", order: 1, image: "/images/english school/principle.jpg" },
            { name: "Ms. Kusum Vaishnav", designation: "PGT (History)", institution: "lps", order: 2 },
            { name: "Dr. Nidhi Upadhyay", designation: "PGT (Painting)", institution: "lps", order: 3 },
            { name: "Ms. Bhagwanti", designation: "PGT (Maths)", institution: "lps", order: 4 },
            { name: "Mr. Ghanshyam Singh", designation: "PGT (English)", institution: "lps", order: 5 },
            { name: "Ms. Mamta Rajpurohit", designation: "PGT (B.St.)", institution: "lps", order: 6 },
            { name: "Mr. Mahendra Kumar", designation: "PGT (Physics)", institution: "lps", order: 7 },
            { name: "Ms. Deepshikha Khangarot", designation: "PGT (Biology)", institution: "lps", order: 8 },
            { name: "Ms. Priya Sharma", designation: "PGT (Hindi)", institution: "lps", order: 9 },
            { name: "Mr. Ronak Singh", designation: "PGT (Accountancy)", institution: "lps", order: 10 },
            { name: "Ms. Priyanka Lakhawat", designation: "PGT (Pol. Sci.)", institution: "lps", order: 11 },
            { name: "Ms. Dimpal", designation: "PGT (Chemistry)", institution: "lps", order: 12 },
            { name: "Dr. Purnima Bhati", designation: "PGT (English)", institution: "lps", order: 13 },
            { name: "Mr. Rahul Joshi", designation: "PGT (Geography)", institution: "lps", order: 14 },
            { name: "Ms. Neha Srivastva", designation: "PGT (English)", institution: "lps", order: 15 },
            { name: "Ms. Roshni Bano", designation: "PGT (Music)", institution: "lps", order: 16 },
            { name: "Mr. Pradeep Singh", designation: "PGT (Comp. Sci.)", institution: "lps", order: 17 },
            { name: "Ms. Deepa Tolani", designation: "TGT (S.St.)", institution: "lps", order: 18 },
            { name: "Ms. Rajkumari Choudhary", designation: "TGT (Science)", institution: "lps", order: 19 },
            { name: "Ms. Varsha Palrecha", designation: "TGT (Hindi)", institution: "lps", order: 20 },
            { name: "Ms. Krishana Kanta Pareek", designation: "TGT (Sanskrit)", institution: "lps", order: 21 },
            { name: "Mr. Kantilal Prajapat", designation: "TGT (Maths)", institution: "lps", order: 22 },
            { name: "Ms. Veena Kumari", designation: "TGT (English)", institution: "lps", order: 23 },
            { name: "Ms. Divya Soni", designation: "TGT (Maths)", institution: "lps", order: 24 },
            { name: "Ms. Manglem Singh", designation: "TGT (Science)", institution: "lps", order: 25 },
            { name: "Ms. Priyanka Saxena", designation: "TGT (Sanskrit)", institution: "lps", order: 26 },
            { name: "Ms. Bhawna", designation: "TGT (Hindi)", institution: "lps", order: 27 },
            { name: "Ms. Mamta Kanwar", designation: "TGT (Maths)", institution: "lps", order: 28 },
            { name: "Ms. Kalal Nilam", designation: "TGT (Comp. Sci.)", institution: "lps", order: 29 },
            { name: "Ms. Neelam Parihar", designation: "TGT (English)", institution: "lps", order: 30 },
            { name: "Ms. Kalpna Vaishnav", designation: "TGT", institution: "lps", order: 31 },
            { name: "Ms. Meena Sirvi", designation: "TGT (S.St.)", institution: "lps", order: 32 },
            { name: "Ms. Rashmi Tripathi", designation: "PET", institution: "lps", order: 33 },
            { name: "Ms. Suman", designation: "PET", institution: "lps", order: 34 },
            { name: "Ms. Megha Arora", designation: "PRT Co-ordinator", institution: "lps", order: 35 },
            { name: "Ms. Sunder Dewasi", designation: "PRT (Hindi)", institution: "lps", order: 36 },
            { name: "Ms. Rathod Gopal Kunwar", designation: "PRT (M.T.)", institution: "lps", order: 37 },
            { name: "Ms. Anjali Rathore", designation: "PRT (EVS)", institution: "lps", order: 38 },
            { name: "Ms. Yumnum Reena Devi", designation: "PRT (English)", institution: "lps", order: 39 },
            { name: "Ms. Monika", designation: "PRT", institution: "lps", order: 40 },
            { name: "Ms. Jyoti Choudhary", designation: "PRT", institution: "lps", order: 41 },
            { name: "Ms. Hemlata Suthar", designation: "PRT", institution: "lps", order: 42 },
            { name: "Ms. Gracy Soni", designation: "PRT", institution: "lps", order: 43 },
            { name: "Ms. Chitrakshi Kalet", designation: "PRT", institution: "lps", order: 44 },
            { name: "Ms. Bharti Mali", designation: "PRT", institution: "lps", order: 45 },
            { name: "Mr. Md Asfak", designation: "Office Superintendent", institution: "lps", order: 46 },
            { name: "Mr. Niranjan Gehlot", designation: "Accountant", institution: "lps", order: 47 },
            { name: "Ms. Jaya Gehlot", designation: "Librarian", institution: "lps", order: 48 },
            { name: "Ms. Soniya Arya", designation: "Sci. Lab Asst.", institution: "lps", order: 49 },
            { name: "Ms. Chanchal Suthar", designation: "Comp. Lab Asst.", institution: "lps", order: 50 },

            // --- Leela Devi College ---
            { name: "Dr. K.C. Sharma", designation: "Principal", institution: "college", order: 1 },
            { name: "Dr. Rajeshwar Singh", designation: "Lecturer - Hindi", institution: "college", order: 2 },
            { name: "Mrs. Meena Kanwar", designation: "Lecturer - Science", institution: "college", order: 3 }
        ];

        await Faculty.insertMany(staffData);

        // 4. Seed Board Results (Real data from StudentResultsTable)
        await Topper.deleteMany({});
        const resultsData = [
            // Class X
            { name: "Antra Prajapat", percentage: 93.33, class: "X", year: "2023-24", institution: "marudhar", order: 1 },
            { name: "Poonam Kanwar", percentage: 92.17, class: "X", year: "2023-24", institution: "marudhar", order: 2 },
            { name: "Kiran", percentage: 92.00, class: "X", year: "2023-24", institution: "marudhar", order: 3 },
            { name: "Pragya Dewal", percentage: 90.17, class: "X", year: "2023-24", institution: "marudhar", order: 4 },

            // Class XII Science
            { name: "Kirtika Kanwar", percentage: 95.80, class: "XII", stream: "Science", year: "2023-24", institution: "marudhar", order: 5 },
            { name: "Sanjana", percentage: 95.00, class: "XII", stream: "Science", year: "2023-24", institution: "marudhar", order: 6 },
            { name: "Pooja Bishnoi", percentage: 94.40, class: "XII", stream: "Science", year: "2023-24", institution: "marudhar", order: 7 },
            { name: "Manisha", percentage: 94.00, class: "XII", stream: "Science", year: "2023-24", institution: "marudhar", order: 8 },
            { name: "Dhara Gehlot", percentage: 93.60, class: "XII", stream: "Science", year: "2023-24", institution: "marudhar", order: 9 },
            { name: "Vaishali", percentage: 92.20, class: "XII", stream: "Science", year: "2023-24", institution: "marudhar", order: 10 },
            { name: "Aarti Vishnoi", percentage: 91.60, class: "XII", stream: "Science", year: "2023-24", institution: "marudhar", order: 11 },
            { name: "Ritika Sherawat", percentage: 91.20, class: "XII", stream: "Science", year: "2023-24", institution: "marudhar", order: 12 },
            { name: "Dimpal Kumari", percentage: 91.00, class: "XII", stream: "Science", year: "2023-24", institution: "marudhar", order: 13 },
            { name: "Sonu Borana", percentage: 91.00, class: "XII", stream: "Science", year: "2023-24", institution: "marudhar", order: 14 },

            // Class XII Arts
            { name: "Mahima Surana", percentage: 96.00, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 15 },
            { name: "Himanshi Kanwar", percentage: 95.40, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 16 },
            { name: "Harsha Kanwar Chundawat", percentage: 94.80, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 17 },
            { name: "Mamta", percentage: 94.40, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 18 },
            { name: "Radhika Rajpurohit", percentage: 94.40, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 19 },
            { name: "Vartika", percentage: 94.40, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 20 },
            { name: "Pinky Kunwar", percentage: 93.80, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 21 },
            { name: "Dikshita Rathore", percentage: 92.20, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 22 },
            { name: "Bhanu Priya", percentage: 92.00, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 23 },
            { name: "Khushi Kanwar", percentage: 92.00, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 24 },
            { name: "Digyasa Singh Rathore", percentage: 91.20, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 25 },
            { name: "Jaswant Kunwar", percentage: 91.20, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 26 },
            { name: "Muni Shreya Goswami", percentage: 91.00, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 27 },
            { name: "Seema Dewasi", percentage: 91.00, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 28 },
            { name: "Jinal Ranawat", percentage: 90.40, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 29 },
            { name: "Seema Dewasi (Pukhraj)", percentage: 90.40, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 30 },
            { name: "Anjali Bhati", percentage: 90.20, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 31 },
            { name: "Rajshree Karnot", percentage: 90.20, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 32 },
            { name: "Vidhu Kanwar Rathore", percentage: 90.00, class: "XII", stream: "Arts", year: "2023-24", institution: "marudhar", order: 33 },

            // Class XII Commerce
            { name: "Gudiya Kumari", percentage: 90.60, class: "XII", stream: "Commerce", year: "2023-24", institution: "marudhar", order: 34 },

            // Extra Results (including VIII)
            { name: "Nirma", percentage: 95.33, class: "VIII", year: "2023-24", institution: "marudhar", order: 35 },

            // LPS Results - XII
            { name: "Ankur Kanwar", percentage: 97.40, class: "XII", stream: "Science", year: "2023-24", institution: "lps", order: 1, image: "/images/english school/Ankur Kunwar.jpg" },
            { name: "Himanshi Jain", percentage: 94.80, class: "XII", stream: "Science", year: "2023-24", institution: "lps", order: 2, image: "/images/english school/Himanshi Jain.jpg" },
            { name: "Niral", percentage: 93.60, class: "XII", stream: "Commerce", year: "2023-24", institution: "lps", order: 3, image: "/images/english school/Niral.jpg" },
            { name: "Ishita Chouhan", percentage: 92.60, class: "XII", stream: "Humanities", year: "2023-24", institution: "lps", order: 4 },
            { name: "Manjari Vaishnav", percentage: 92.40, class: "XII", stream: "Humanities", year: "2023-24", institution: "lps", order: 5, image: "/images/english school/Manjari vaishnav.jpg" },
            { name: "Alfina", percentage: 91.00, class: "XII", stream: "Humanities", year: "2023-24", institution: "lps", order: 6, image: "/images/english school/alfina.jpg" },
            { name: "Laxita Rahore", percentage: 90.00, class: "XII", stream: "Humanities", year: "2023-24", institution: "lps", order: 7, image: "/images/english school/Lakshita rathore.jpg" },
            { name: "Yuti Sharma", percentage: 89.80, class: "XII", stream: "Humanities", year: "2023-24", institution: "lps", order: 8, image: "/images/english school/Yuti Sharma.jpg" },
            { name: "Sofia Khan", percentage: 89.20, class: "XII", stream: "Humanities", year: "2023-24", institution: "lps", order: 9, image: "/images/english school/Sofia khan.jpg" },
            { name: "Taruna", percentage: 89.00, class: "XII", stream: "Humanities", year: "2023-24", institution: "lps", order: 10, image: "/images/english school/taruna.jpg" },

            // LPS Results - X
            { name: "Rajal Rajpurohit", percentage: 93.80, class: "X", year: "2023-24", institution: "lps", order: 11 },
            { name: "Pragati Sirvi", percentage: 93.00, class: "X", year: "2023-24", institution: "lps", order: 12, image: "/images/english school/pragati sirvi.jpg" },
            { name: "Yajeshvi", percentage: 92.40, class: "X", year: "2023-24", institution: "lps", order: 13, image: "/images/english school/Yajeshvi.jpg" },
            { name: "Aisha Soni", percentage: 92.00, class: "X", year: "2023-24", institution: "lps", order: 14, image: "/images/english school/AAIsha soni.jpg" },
            { name: "Anju Kanwar", percentage: 91.20, class: "X", year: "2023-24", institution: "lps", order: 15, image: "/images/english school/anju kanwar.jpg" },
            { name: "Janvee Soni", percentage: 90.60, class: "X", year: "2023-24", institution: "lps", order: 16, image: "/images/english school/Janvee soni.jpg" },
            { name: "Saniya Soni", percentage: 89.00, class: "X", year: "2023-24", institution: "lps", order: 17, image: "/images/english school/saniya soni.jpg" },
            { name: "Bhavya Sharma", percentage: 87.80, class: "X", year: "2023-24", institution: "lps", order: 18, image: "/images/english school/bhavya wharma.jpg" },
            { name: "Renuka Bhati", percentage: 87.80, class: "X", year: "2023-24", institution: "lps", order: 19, image: "/images/english school/Renuka bhati.jpg" },
            { name: "Gayatri Rathore", percentage: 87.00, class: "X", year: "2023-24", institution: "lps", order: 20, image: "/images/english school/Gayatri Rathore.jpg" },
            { name: "Rudrakshi", percentage: 86.60, class: "X", year: "2023-24", institution: "lps", order: 21, image: "/images/english school/Rudrakshi.jpg" },
            { name: "Tanishi Choudhary", percentage: 85.40, class: "X", year: "2023-24", institution: "lps", order: 22, image: "/images/english school/Tanisi choudary.jpg" },
            { name: "Mumal Kanwar", percentage: 85.00, class: "X", year: "2023-24", institution: "lps", order: 23, image: "/images/english school/Mumal kanwar.jpg" },
            { name: "Sakshi Deora", percentage: 85.00, class: "X", year: "2023-24", institution: "lps", order: 24, image: "/images/english school/sakshi deora.jpg" },

            // LPS Results - Non-Board
            { name: "Shivgami Chouhan", percentage: 0, class: "I", year: "2023-24", institution: "lps", order: 25 },
            { name: "Priyadarshni", percentage: 0, class: "II", year: "2023-24", institution: "lps", order: 26 },
            { name: "Kinjal Dewasi", percentage: 0, class: "III", year: "2023-24", institution: "lps", order: 27 },
            { name: "Poorvi Pareek", percentage: 0, class: "IV", year: "2023-24", institution: "lps", order: 28 },
            { name: "Chetnya Rathore", percentage: 0, class: "V", year: "2023-24", institution: "lps", order: 29 },
            { name: "Abhigya", percentage: 0, class: "VI", year: "2023-24", institution: "lps", order: 30 },
            { name: "Dimpy Malviya", percentage: 0, class: "VII", year: "2023-24", institution: "lps", order: 31 },
            { name: "Tamanna", percentage: 0, class: "VIII", year: "2023-24", institution: "lps", order: 32 },
            { name: "Preksha", percentage: 0, class: "IX", year: "2023-24", institution: "lps", order: 33 },
            { name: "Tanisha Jain", percentage: 0, class: "XI Sci", year: "2023-24", institution: "lps", order: 34, image: "/images/english school/Tanisha jain.jpg" },
            { name: "Mehak Jain", percentage: 0, class: "XI Com", year: "2023-24", institution: "lps", order: 35 },
            { name: "Jaishree", percentage: 0, class: "XI Hum", year: "2023-24", institution: "lps", order: 36 }
        ];
        await Topper.insertMany(resultsData);

        // 5. Seed initial Blog Posts
        await Post.deleteMany({});
        const postsData = [
            { title: "Empowering Girls: The Vidyawadi Way", slug: "empowering-girls-vidyawadi", content: "Vidyawadi has been at the forefront of girls' education in Rajasthan for decades. Our holistic approach ensures every girl finds her light.", category: "Education", author: "Administration", published: true },
            { title: "National Level NCC Success", slug: "ncc-success-2025", content: "Congratulations to Cadet Harshita for her selection in the National Thal Sainik Camp 2025.", category: "Achievements", author: "Principal", published: true }
        ];
        await Post.insertMany(postsData);

        return NextResponse.json({ success: true, message: "Comprehensive content seeded successfully!" });
    } catch (error: any) {
        console.error("SEED_ERROR:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
