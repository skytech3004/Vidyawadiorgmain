import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables IMMEDIATELY
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function seedCMS() {
    try {
        console.log('MONGODB_URI present:', !!process.env.MONGODB_URI);

        // Dynamic imports
        const dbConnect = (await import('../lib/mongodb')).default;
        const Page = (await import('../models/Page')).default;
        const Section = (await import('../models/Section')).default;

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
            { type: 'hero', content: { title: 'Boarding', subtitle: 'At Vidyawadi', image: '/hostel.jpg' } },
            { type: 'text-content', content: { title: 'Your Home Away From Home', content: 'At Vidyawadi, hundreds of girls from across India live in a safe, caring, and structured environment—fostering growth, independence, and lifelong friendships.' } },
            {
                type: 'amenities', content: {
                    title: 'Amenities', description: 'Explore thoughtfully designed spaces and services.', items: [
                        { id: "ac", label: "Central AC", title: "Central AC with Cooling & Heating", desc: "Spacious buildings with year-round comfort.", image: "/011.png" },
                        { id: "wifi", label: "Wi-Fi", title: "Dormitories with Wi-Fi", desc: "Secure Wi-Fi for research-based learning.", image: "/hostel.jpg" },
                        { id: "security", label: "Safety", title: "Safety Surveillance", desc: "24/7 CCTV and female residential caretakers.", image: "/leeladevi.jpg" },
                        { id: "laundry", label: "Laundry", title: "Dedicated Laundry Facilities", desc: "Modern in-house laundry services.", image: "/marudhar_balika.jpg" },
                        { id: "phone", label: "Calling", title: "Phone Access Points", desc: "Designated times to connect with families.", image: "/011.png" }
                    ]
                }
            },
            {
                type: 'grid-features', content: {
                    title: 'Chetna Prabha', description: 'Empowering young minds through holistic development.', items: [
                        { title: "Emotional Well-being", img: "/011.png" }, { title: "Social Well-being", img: "/marudhar_balika.jpg" },
                        { title: "Cognitive Well-being", img: "/leeladevi.jpg" }, { title: "Ethics & Integrity", img: "/hostel.jpg" }
                    ]
                }
            },
            {
                type: 'program-icons', content: {
                    title: 'Programs and Practices', description: 'Supporting adolescent well-being with empathy.', items: [
                        { icon: "MessageCircle", title: "Individual Counseling", desc: "One-on-one support in a private space." },
                        { icon: "Users", title: "Group Workshops", desc: "Life skills like handling peer pressure." },
                        { icon: "Brain", title: "Mindfulness", desc: "Daily meditation and reflection." },
                        { icon: "HeartHandshake", title: "Ethical Dialogues", desc: "Conversations inspired by Indian values." }
                    ]
                }
            },
            { type: 'pillars', content: { title: 'Pillars of Care', description: 'Comprehensive support inside and outside the classroom.', secondaryHeading: 'Sanrakshika', secondaryDescription: 'Compassionate protectors ensuring safety and discipline.', image: '/hostel.jpg' } },
            { type: 'video', content: { title: 'A Glimpse into Campus Living', thumbnail: '/sports-day.jpg' } },
            { type: 'food', content: { title: 'Nutritious Satvik Food', description: 'Fresh farm-to-plate meals grown on campus. Dining on the floor fosters humility and community.', images: ["/011.png", "/hostel.jpg", "/marudhar_balika.jpg"] } },
            { type: 'gallery', content: { title: 'Hostel Gallery', images: ["/011.png", "/hostel.jpg", "/leeladevi.jpg", "/marudhar_balika.jpg", "/science-lab.jpg"] } }
        ];

        // --- CO-CURRICULAR SECTIONS ---
        const cocurricularSections = [
            { type: 'hero', content: { title: 'Co Curricular', subtitle: 'Beyond the Classroom', image: '/sports-day.jpg' } },
            { type: 'text-content', content: { title: 'Holistic growth', content: 'We believe true education nurtures every part of a child\'s being. From music to yoga, we cultivate balance and creativity.' } },
            { type: 'gallery', content: { title: 'Activity Highlights', images: ["/leeladevi.jpg", "/sports-day.jpg", "/011.png", "/hostel.jpg", "/science-lab.jpg"] } },
            { type: 'text-content', content: { title: 'Sports', content: 'The spirit of discipline and excellence is forged on the field.' } },
            { type: 'side-by-side', content: { title: 'NCC Leadership', description: 'As part of the 10th Rajasthan Battalion Senior Wing, 50 cadets are trained in leadership and discipline.', images: ["/sports-day.jpg", "/hostel.jpg"] } },
            {
                type: 'grid-features', content: {
                    dark: true, title: 'Fine Arts', description: 'Nurturing expression through diverse mediums.', items: [
                        { title: "Drawing", img: "/011.png" }, { title: "Paper Recycling", img: "/marudhar_balika.jpg", desc: "Eco-friendly habits." }, { title: "Quilling", img: "/leeladevi.jpg" }
                    ]
                }
            },
            {
                type: 'features', content: {
                    title: 'Elevate Clubs', description: 'Sparking creativity and innovation.', items: [
                        { id: "fashion", label: "Fashion Designing", desc: "Exploring creativity and style.", img: "/leeladevi.jpg" },
                        { id: "shark", label: "Shark Tank", desc: "Budding entrepreneurs pitch ideas.", img: "/011.png" },
                        { id: "tech", label: "Tech Hackathon", desc: "Coding and problem-solving.", img: "/science-lab.jpg" },
                        { id: "vedic", label: "Vedic Math", desc: "Mental agility techniques.", img: "/marudhar_balika.jpg" }
                    ]
                }
            },
            { type: 'side-by-side', content: { reverse: true, title: 'Cooking', description: 'Cooking is a creative life skill woven into everyday learning.', secondaryDescription: 'Every Sunday, senior classes prepare Sunday Snacks for the hostel.', image: "/hostel.jpg" } },
            {
                type: 'grid-features', content: {
                    title: 'Literary Expression', description: 'Building strong language skills.', items: [
                        { title: "Reading", desc: "Focus and imagination.", img: "/marudhar_balika.jpg" },
                        { title: "Creative Writing", desc: "Self-expression through stories.", img: "/011.png" },
                        { title: "Debating", desc: "Confidence and clarity.", img: "/science-lab.jpg" }
                    ]
                }
            },
            {
                type: 'features', content: {
                    title: 'Performing Arts', description: 'Exploring voice, presence, and passion.', items: [
                        { id: "music", label: "Music", desc: "Instruments and Indian vocals.", img: "/leeladevi.jpg" },
                        { id: "dance", label: "Dance", desc: "Classical and folk forms.", img: "/marudhar_balika.jpg" },
                        { id: "theatre", label: "Theatre", desc: "Public speaking and empathy.", img: "/011.png" }
                    ]
                }
            },
            { type: 'video', content: { title: 'Creative Expressions', thumbnail: '/science-lab.jpg' } }
        ];

        // --- LEELADEVI SECTIONS ---
        const leeladeviSections = [
            { type: 'hero', content: { title: 'Leeladevi Parasmal Sancheti English Medium Sr.Sec.School', subtitle: 'Affiliated to CBSE, New Delhi', image: '/leeladevi.jpg', location: 'Vidyawadi, Pali', affiliation: 'Affiliated to CBSE, New Delhi' } },
            {
                type: 'text-content', content: {
                    title: 'Principal’s Message',
                    content: 'Founded in 2004, situated in the rural belt of Pali District in Rajasthan, this Vidyalaya is a residential school providing quality education from Nursery to XII primarily for girls, with a noble thought of promoting girls’ education. Presently, the School accommodates more than 1000 girls.\n\nAt our core, we embrace a vision to nurture global citizens who are equipped to thrive in an ever-changing world. Our mission is to provide a healthy learning environment where every student feels safe, valued, and inspired to pursue excellence.',
                    principalName: 'Ms. Jyoti Nath',
                    image: '/images/english school/principle.jpg'
                }
            },
            {
                type: 'academics', content: {
                    title: 'Curriculum & Structure',
                    stages: ["Foundational (Nursery – II)", "Preparatory (III to V)", "Middle (VI to VIII)", "Secondary (IX & XII)"],
                    secondaryTitle: "Senior Secondary Streams",
                    streams: [
                        { name: "Science", subjects: ["English Core", "Physics", "Chemistry", "Maths / Biology", "Economics", "Computer Science / Multimedia / Painting / Dance / PE"] },
                        { name: "Commerce", subjects: ["English Core", "Accountancy", "Business Studies", "Economics", "Maths", "Computer Science / Multimedia / Painting / Dance / PE"] },
                        { name: "Humanities", subjects: ["English Elective / Core", "Political Science", "History", "Geography / Music / Economics", "Hindi Core / Computer Science / Multimedia", "Painting / Dance (Kathak)"] }
                    ]
                }
            },
            {
                type: 'toppers', content: {
                    title: 'Hall of Fame',
                    categories: [
                        {
                            name: "Class XII Toppers", students: [
                                { name: "Ms. Ankur Kanwar", stream: "Science", percentage: "97.40%", image: "/images/english school/Ankur Kunwar.jpg" },
                                { name: "Ms. Himanshi Jain", stream: "Science", percentage: "94.80%", image: "/images/english school/Himanshi Jain.jpg" },
                                { name: "Ms. Niral", stream: "Commerce", percentage: "93.60%", image: "/images/english school/Niral.jpg" },
                                { name: "Ms. Ishita Chouhan", stream: "Humanities", percentage: "92.60%" },
                                { name: "Ms. Manjari Vaishnav", stream: "Humanities", percentage: "92.40%", image: "/images/english school/Manjari vaishnav.jpg" },
                                { name: "Ms. Alfina", stream: "Humanities", percentage: "91.00%", image: "/images/english school/alfina.jpg" },
                                { name: "Ms. Laxita Rahore", stream: "Humanities", percentage: "90.00%", image: "/images/english school/Lakshita rathore.jpg" },
                                { name: "Ms. Yuti Sharma", stream: "Humanities", percentage: "89.80%", image: "/images/english school/Yuti Sharma.jpg" },
                                { name: "Ms. Sofia Khan", stream: "Humanities", percentage: "89.20%", image: "/images/english school/Sofia khan.jpg" },
                                { name: "Ms. Taruna", stream: "Humanities", percentage: "89.00%", image: "/images/english school/taruna.jpg" }
                            ]
                        },
                        {
                            name: "Class X Toppers", students: [
                                { name: "Ms. Rajal Rajpurohit", percentage: "93.80%" },
                                { name: "Ms. Pragati Sirvi", percentage: "93.00%", image: "/images/english school/pragati sirvi.jpg" },
                                { name: "Ms. Yajeshvi", percentage: "92.40%", image: "/images/english school/Yajeshvi.jpg" },
                                { name: "Ms. Aisha Soni", percentage: "92.00%", image: "/images/english school/AAIsha soni.jpg" },
                                { name: "Ms. Anju Kanwar", percentage: "91.20%", image: "/images/english school/anju kanwar.jpg" },
                                { name: "Ms. Janvee Soni", percentage: "90.60%", image: "/images/english school/Janvee soni.jpg" },
                                { name: "Ms. Saniya Soni", percentage: "89.00%", image: "/images/english school/saniya soni.jpg" },
                                { name: "Ms. Bhavya Sharma", percentage: "87.80%", image: "/images/english school/bhavya sharma.jpg" },
                                { name: "Ms. Renuka Bhati", percentage: "87.80%", image: "/images/english school/Renuka bhati.jpg" },
                                { name: "Ms. Gayatri Rathore", percentage: "87.00%", image: "/images/english school/Gayatri Rathore.jpg" },
                                { name: "Ms. Rudrakshi", percentage: "86.60%", image: "/images/english school/Rudrakshi.jpg" },
                                { name: "Ms. Tanishi Choudhary", percentage: "85.40%", image: "/images/english school/Tanisi choudary.jpg" },
                                { name: "Ms. Mumal Kanwar", percentage: "85.00%", image: "/images/english school/Mumal kanwar.jpg" },
                                { name: "Ms. Sakshi Deora", percentage: "85.00%", image: "/images/english school/sakshi deora.jpg" }
                            ]
                        },
                        {
                            name: "Class Toppers (Non-Board)", students: [
                                { name: "Ms. Shivgami Chouhan", class: "I" },
                                { name: "Ms. Priyadarshni", class: "II" },
                                { name: "Ms. Kinjal Dewasi", class: "III" },
                                { name: "Ms. Poorvi Pareek", class: "IV" },
                                { name: "Ms. Chetnya Rathore", class: "V" },
                                { name: "Ms. Abhigya", class: "VI" },
                                { name: "Ms. Dimpy Malviya", class: "VII" },
                                { name: "Ms. Tamanna", class: "VIII" },
                                { name: "Ms. Preksha", class: "IX" },
                                { name: "Ms. Tanisha Jain", class: "XI Sci", image: "/images/english school/Tanisha jain.jpg" },
                                { name: "Ms. Mehak Jain", class: "XI Com" },
                                { name: "Ms. Jaishree", class: "XI Hum" }
                            ]
                        }
                    ]
                }
            },
            {
                type: 'staff', content: {
                    title: 'School Navigators',
                    staff: [
                        { name: "Ms. Jyoti Nath", designation: "Principal", image: "/images/english school/principle.jpg" },
                        { name: "Ms. Kusum Vaishnav", designation: "PGT (History)" },
                        { name: "Dr. Nidhi Upadhyay", designation: "PGT (Painting)" },
                        { name: "Ms. Bhagwanti", designation: "PGT (Maths)" },
                        { name: "Mr. Ghanshyam Singh", designation: "PGT (English)" },
                        { name: "Ms. Mamta Rajpurohit", designation: "PGT (B.St.)" },
                        { name: "Mr. Mahendra Kumar", designation: "PGT (Physics)" },
                        { name: "Ms. Deepshikha Khangarot", designation: "PGT (Biology)" },
                        { name: "Ms. Priya Sharma", designation: "PGT (Hindi)" },
                        { name: "Mr. Ronak Singh", designation: "PGT (Accountancy)" },
                        { name: "Ms. Priyanka Lakhawat", designation: "PGT (Pol. Sci.)" },
                        { name: "Ms. Dimpal", designation: "PGT (Chemistry)" },
                        { name: "Dr. Purnima Bhati", designation: "PGT (English)" },
                        { name: "Mr. Rahul Joshi", designation: "PGT (Geography)" },
                        { name: "Ms. Neha Srivastva", designation: "PGT (English)" },
                        { name: "Ms. Roshni Bano", designation: "PGT (Music)" },
                        { name: "Mr. Pradeep Singh", designation: "PGT (Comp. Sci.)" },
                        { name: "Ms. Deepa Tolani", designation: "TGT (S.St.)" },
                        { name: "Ms. Rajkumari Choudhary", designation: "TGT (Science)" },
                        { name: "Ms. Varsha Palrecha", designation: "TGT (Hindi)" },
                        { name: "Ms. Krishana Kanta Pareek", designation: "TGT (Sanskrit)" },
                        { name: "Mr. Kantilal Prajapat", designation: "TGT (Maths)" },
                        { name: "Ms. Veena Kumari", designation: "TGT (English)" },
                        { name: "Ms. Divya Soni", designation: "TGT (Maths)" },
                        { name: "Ms. Manglem Singh", designation: "TGT (Science)" },
                        { name: "Ms. Priyanka Saxena", designation: "TGT (Sanskrit)" },
                        { name: "Ms. Bhawna", designation: "TGT (Hindi)" },
                        { name: "Ms. Mamta Kanwar", designation: "TGT (Maths)" },
                        { name: "Ms. Kalal Nilam", designation: "TGT (Comp. Sci.)" },
                        { name: "Ms. Neelam Parihar", designation: "TGT (English)" },
                        { name: "Ms. Kalpna Vaishnav", designation: "TGT" },
                        { name: "Ms. Meena Sirvi", designation: "TGT (S.St.)" },
                        { name: "Ms. Rashmi Tripathi", designation: "PET" },
                        { name: "Ms. Suman", designation: "PET" },
                        { name: "Ms. Megha Arora", designation: "PRT Co-ordinator" },
                        { name: "Ms. Sunder Dewasi", designation: "PRT (Hindi)" },
                        { name: "Ms. Rathod Gopal Kunwar", designation: "PRT (M.T.)" },
                        { name: "Ms. Anjali Rathore", designation: "PRT (EVS)" },
                        { name: "Ms. Yumnum Reena Devi", designation: "PRT (English)" },
                        { name: "Ms. Monika", designation: "PRT" },
                        { name: "Ms. Jyoti Choudhary", designation: "PRT" },
                        { name: "Ms. Hemlata Suthar", designation: "PRT" },
                        { name: "Ms. Gracy Soni", designation: "PRT" },
                        { name: "Ms. Chitrakshi Kalet", designation: "PRT" },
                        { name: "Ms. Bharti Mali", designation: "PRT" },
                        { name: "Mr. Md Asfak", designation: "Office Superintendent" },
                        { name: "Mr. Niranjan Gehlot", designation: "Accountant" },
                        { name: "Ms. Jaya Gehlot", designation: "Librarian" },
                        { name: "Ms. Soniya Arya", designation: "Sci. Lab Asst." },
                        { name: "Ms. Chanchal Suthar", designation: "Comp. Lab Asst." }
                    ]
                }
            },
            {
                type: 'rules', content: {
                    title: 'General Instructions & Uniform',
                    groups: [
                        {
                            name: "School Uniform", subgroups: [
                                { name: "Nursery to VIII", items: ["Black & white check tunic with off-white shirt & belt", "Black ankle length socks with off white strips & Black shoes", "White band/hair pins"] },
                                { name: "Class IX & XII", items: ["Black & white check kurta, off-white salwar and off-white dupatta"] }
                            ]
                        }
                    ],
                    general: [
                        "Regularity: Minimum 75% attendance is mandatory.",
                        "Mobile Phones: Strictly prohibited. Confiscated gadgets will not be returned.",
                        "Bullying: Zero tolerance policy. Immediate disciplinary action for offenders.",
                        "Hygiene: Nails trimmed, clean uniform. Makeup/jewelry not permitted."
                    ]
                }
            }
        ];

        await setupPage('Hostel', 'hostel', hostelSections);
        await setupPage('Co-Curricular', 'co-curricular', cocurricularSections);
        await setupPage('Leeladevi School', 'institutions/leeladevi-english-medium', leeladeviSections);

        console.log("CMS Seeding completed successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
}

seedCMS();
