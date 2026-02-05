import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Page from '../models/Page';
import Section from '../models/Section';
import dbConnect from '../lib/mongodb';

dotenv.config({ path: '.env.local' });

async function seedCMS() {
    await dbConnect();
    console.log("Connected to MongoDB for CMS Seeding...");

    // Helper to create/get Page and set sections
    const setupPage = async (title: string, slug: string, sections: any[]) => {
        console.log(`Setting up page: ${title} (${slug})`);

        // 1. Upsert Page
        const page = await Page.findOneAndUpdate(
            { slug },
            { title, slug, status: 'published', lastModified: new Date() },
            { upsert: true, new: true }
        );

        // 2. Clear old sections for this page
        await Section.deleteMany({ pageId: page._id });

        // 3. Create new sections
        const sectionDocs = sections.map((s, idx) => ({
            pageId: page._id,
            type: s.type,
            content: s.content,
            order: s.order ?? idx,
            isVisible: true
        }));

        await Section.insertMany(sectionDocs);
        console.log(`Created ${sectionDocs.length} sections for ${title}`);
    };

    // --- HOSTEL SECTIONS ---
    const hostelSections = [
        {
            type: 'hero',
            content: {
                title: 'Boarding',
                subtitle: 'At Vidyawadi',
                image: '/hostel.jpg'
            }
        },
        {
            type: 'text-content',
            content: {
                title: 'Your Home Away From Home',
                content: 'At Vidyawadi, hundreds of girls from across India live in a safe, caring, and structured environment—fostering growth, independence, and lifelong friendships.'
            }
        },
        {
            type: 'amenities',
            content: {
                title: 'Amenities',
                description: 'Explore thoughtfully designed spaces and services that ensure comfort, safety, and well-being.',
                items: [
                    { id: "ac", label: "Central AC", title: "Central AC with Cooling & Heating", desc: "Spacious, well-ventilated hostel buildings equipped with central cooling and heating ensure year-round comfort.", image: "/011.png" },
                    { id: "wifi", label: "Wi-Fi", title: "Dormitories with Wi-Fi", desc: "Each dormitory is equipped with secure Wi-Fi, allowing students to use their personal tablets for researched based learning.", image: "/hostel.jpg" },
                    { id: "security", label: "Safety", title: "Safety Surveillance", desc: "Round-the-clock security with CCTV monitoring and dedicated female residential caretakers ensure a completely safe environment.", image: "/leeladevi.jpg" },
                    { id: "laundry", label: "Laundry", title: "Dedicated Laundry Facilities", desc: "In-house modern laundry services ensure that students have clean uniforms and clothes without hassle.", image: "/marudhar_balika.jpg" },
                    { id: "phone", label: "Calling", title: "Phone Access Points", desc: "Designated calling times and phone access points allow students to stay connected with their families regularly.", image: "/011.png" }
                ]
            }
        },
        {
            type: 'pillars',
            content: {
                title: 'Pillars of Care',
                description: 'From daily care to guided learning and weekend fun, we support your child\'s growth.',
                secondaryHeading: 'Sanrakshika',
                secondaryDescription: 'Compassionate protectors, our Sanrakshikas are dedicated female caretakers who ensure safety, structure, and discipline—offering protective oversight that feels like family.',
                image: '/hostel.jpg'
            }
        },
        {
            type: 'gallery',
            content: {
                title: 'A Glimpse into Campus Living',
                images: [
                    "/011.png", "/hostel.jpg", "/leeladevi.jpg",
                    "/marudhar_balika.jpg", "/science-lab.jpg", "/011.png"
                ]
            }
        }
    ];

    // --- CO-CURRICULAR SECTIONS ---
    const cocurricularSections = [
        {
            type: 'hero',
            content: {
                title: 'Co Curricular',
                image: '/sports-day.jpg',
                subtitle: 'Beyond the Classroom'
            }
        },
        {
            type: 'text-content',
            content: {
                title: 'Holistic Growth',
                content: 'At Vidyawadi, we believe that true education nurtures every part of a child\'s being. As a leading Gurukul academy focused on holistic growth, our students go far beyond academics—engaging in music, yoga, sports, creative arts, and leadership-building programs that cultivate balance, creativity, and inner discipline.'
            }
        },
        {
            type: 'gallery',
            content: {
                title: 'Sports & Activities',
                images: ["/sports-day.jpg", "/011.png", "/marudhar_balika.jpg", "/leeladevi.jpg"]
            }
        },
        {
            type: 'features',
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
        }
    ];

    // --- LEELADEVI SECTIONS ---
    const leeladeviSections = [
        {
            type: 'hero',
            content: {
                title: 'Leeladevi Sancheti School',
                subtitle: 'Affiliated to CBSE, New Delhi',
                image: '/leeladevi.jpg'
            }
        },
        {
            type: 'text-content',
            content: {
                title: 'Principal’s Message',
                content: 'Founded in 2004, situated in the rural belt of Pali District in Rajasthan, this Vidyalaya is a residential school providing quality education from Nursery to XII primarily for girls...'
            }
        }
    ];

    await setupPage('Hostel', 'hostel', hostelSections);
    await setupPage('Co-Curricular', 'co-curricular', cocurricularSections);
    await setupPage('Leeladevi School', 'leeladevi', leeladeviSections);

    console.log("CMS Seeding completed successfully!");
    mongoose.disconnect();
}

seedCMS().catch(err => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
