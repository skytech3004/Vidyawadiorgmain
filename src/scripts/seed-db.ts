import dotenv from 'dotenv';
import mongoose from 'mongoose';
import PageContent from '../models/PageContent';
import Admin from '../models/Admin';
import dbConnect from '../lib/mongodb';

dotenv.config({ path: '.env.local' });

const seedData = async () => {
    await dbConnect();

    console.log("Connected to MongoDB for seeding...");

    // 1. Create Default Admin
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
        await Admin.create({
            username: 'admin',
            password: 'password123'
        });
        console.log("Default admin created.");
    }

    // --- HOSTEL DATA ---
    const hostelData = [
        {
            page: 'hostel',
            section: 'hero',
            content: {
                title: 'Boarding',
                subtitle: 'At Vidyawadi',
                image: '/hostel.jpg'
            }
        },
        {
            page: 'hostel',
            section: 'banner',
            content: {
                title: 'Your Home Away From Home',
                description: 'At Vidyawadi, hundreds of girls from across India live in a safe, caring, and structured environment—fostering growth, independence, and lifelong friendships.'
            }
        },
        {
            page: 'hostel',
            section: 'amenities',
            content: {
                title: 'Amenities',
                description: 'Explore thoughtfully designed spaces and services that ensure comfort, safety, and well-being.',
                items: [
                    { title: "Central AC with Cooling & Heating", desc: "Spacious, well-ventilated hostel buildings equipped with central cooling and heating ensure year-round comfort.", img: "/011.png" },
                    { title: "Dormitories with Wi-Fi", desc: "Each dormitory is equipped with secure Wi-Fi, allowing students to use their personal tablets for researched based learning.", img: "/hostel.jpg" },
                    { title: "Safety Surveillance", desc: "Round-the-clock security with CCTV monitoring and dedicated female residential caretakers ensure a completely safe environment.", img: "/leeladevi.jpg" },
                    { title: "Dedicated Laundry Facilities", desc: "In-house modern laundry services ensure that students have clean uniforms and clothes without hassle.", img: "/marudhar_balika.jpg" },
                    { title: "Phone Access Points", desc: "Designated calling times and phone access points allow students to stay connected with their families regularly.", img: "/011.png" }
                ]
            }
        },
        {
            page: 'hostel',
            section: 'chetna_prabha',
            content: {
                title: 'Chetna Prabha',
                description: 'Our signature initiative dedicated to empowering young minds through holistic development and self-awareness.',
                cards: [
                    { title: "Emotional Well-being", img: "/011.png" },
                    { title: "Social Well-being", img: "/marudhar_balika.jpg" },
                    { title: "Cognitive Well-being", img: "/leeladevi.jpg" },
                    { title: "Ethics & Integrity", img: "/hostel.jpg" }
                ]
            }
        },
        {
            page: 'hostel',
            section: 'food',
            content: {
                title1: 'Nutritious',
                title2: 'Satvik Food',
                description: 'Fresh, farm-to-plate meals grown on campus nourish the body and mind. Dining together on the floor fosters humility, gratitude, and a strong sense of community.',
                images: ["/011.png", "/hostel.jpg", "/marudhar_balika.jpg"]
            }
        },
        {
            page: 'hostel',
            section: 'pillars',
            content: {
                title: 'Pillars of Care',
                description: 'From daily care to guided learning and weekend fun, we support your child\'s growth.',
                card: {
                    title: "Sanrakshika",
                    description: "Compassionate protectors, our Sanrakshikas are dedicated female caretakers who ensure safety, structure, and discipline.",
                    image: "/hostel.jpg",
                    features: ["24/7 Supervision", "Emotional Support"]
                }
            }
        },
        {
            page: 'hostel',
            section: 'gallery',
            content: {
                images: [
                    "/011.png", "/hostel.jpg", "/leeladevi.jpg",
                    "/marudhar_balika.jpg", "/science-lab.jpg", "/011.png"
                ]
            }
        }
    ];

    // --- CO-CURRICULAR DATA ---
    const coCurricularData = [
        {
            page: 'co-curricular',
            section: 'hero',
            content: {
                title: 'Co Curricular',
                image: '/sports-day.jpg'
            }
        },
        {
            page: 'co-curricular',
            section: 'sports',
            content: {
                title: 'Sports',
                description: 'At Vidyawadi, the spirit of discipline, teamwork, and excellence is forged on the field.',
                images: ["/sports-day.jpg", "/011.png", "/marudhar_balika.jpg"]
            }
        },
        {
            page: 'co-curricular',
            section: 'fine_arts',
            content: {
                title: 'Fine Arts',
                description: 'Exploring creativity through diverse mediums, our Fine Arts program nurtures expression.',
                cards: [
                    { title: "Drawing", img: "/011.png" },
                    { title: "Paper Recycling", img: "/marudhar_balika.jpg", desc: "Teaches eco-friendly habits by turning waste paper into useful and creative items." },
                    { title: "Quilling", img: "/leeladevi.jpg" }
                ]
            }
        },
        {
            page: 'co-curricular',
            section: 'ncc',
            content: {
                title: 'NCC',
                description: 'As part of the 10th Rajasthan Battalion Senior Wing, our NCC unit instills discipline, leadership, and national pride.',
                images: ["/sports-day.jpg", "/hostel.jpg"]
            }
        },
        {
            page: 'co-curricular',
            section: 'elevate_clubs',
            content: {
                title: 'Elevate Clubs',
                description: 'Our Elevate Clubs spark creativity and innovation.',
                items: [
                    { id: "fashion", label: "Fashion Designing", desc: "Students explore creativity and style.", img: "/leeladevi.jpg" },
                    { id: "shark", label: "Shark Tank", desc: "Budding entrepreneurs pitch ideas.", img: "/011.png" },
                    { id: "tech", label: "Tech Hackathon", desc: "Coding, problem-solving, and innovation.", img: "/science-lab.jpg" },
                    { id: "vedic", label: "Vedic Math", desc: "Ancient Indian mathematical techniques.", img: "/marudhar_balika.jpg" }
                ]
            }
        },
        {
            page: 'co-curricular',
            section: 'cooking',
            content: {
                title: 'Cooking',
                description: 'Cooking is a creative life skill woven into everyday learning. Students explore nutrition, hygiene, food science, and meal planning.',
                image: '/hostel.jpg'
            }
        },
        {
            page: 'co-curricular',
            section: 'literary',
            content: {
                title: 'From Words to Expression',
                description: 'Building strong language skills to inspire imagination, clarity, and confident communication.',
                cards: [
                    { title: "Reading", desc: "Invites focus, imagination, and a lifelong love for books.", img: "/marudhar_balika.jpg" },
                    { title: "Creative Writing", desc: "Encouraging self-expression through stories, poems, and ideas.", img: "/011.png" },
                    { title: "Debating", desc: "Sharpening thinking, confidence, and the power to speak with clarity.", img: "/science-lab.jpg" }
                ]
            }
        }
    ];

    // --- LEELADEVI DATA (Simplified for brevity as user prioritized Hostel) ---
    const leeladeviData = [
        {
            page: 'leeladevi',
            section: 'hero',
            content: {
                title: 'Leeladevi Parasmal Sancheti English Medium Sr.Sec.School',
                affiliation: 'Affiliated to CBSE, New Delhi',
                location: 'Vidyawadi, Pali',
                type: 'Residential School for Girls'
            }
        }
    ];

    // Insert or Update
    const allContent = [...hostelData, ...coCurricularData, ...leeladeviData];

    for (const item of allContent) {
        await PageContent.findOneAndUpdate(
            { page: item.page, section: item.section },
            item,
            { upsert: true, new: true }
        );
    }

    console.log("Database seeded successfully with ALL sections!");
    process.exit(0);
};

seedData().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
