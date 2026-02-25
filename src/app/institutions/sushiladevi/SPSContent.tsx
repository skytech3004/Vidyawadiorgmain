"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    BookOpen, Trophy, Star, Microscope,
    Medal, Phone, MapPin, Mail, CheckCircle2,
    User, Sparkles, ShieldCheck, ArrowRight
} from "lucide-react";
import Image from "next/image";
import StudentModal from "@/components/StudentModal";
import StudentResultsTable from "@/components/StudentResultsTable";

// --- Data ---

const staffList = [
    { no: 1, name: "Ms. Jyoti Nath", designation: "Principal", image: "/images/english school/principle.jpg" },
    { no: 2, name: "Ms. Kusum Vaishnav", designation: "PGT (History)" },
    { no: 3, name: "Dr. Nidhi Upadhyay", designation: "PGT (Painting)" },
    { no: 4, name: "Ms. Bhagwanti", designation: "PGT (Maths)" },
    { no: 5, name: "Mr. Ghanshyam Singh", designation: "PGT (English)" },
    { no: 6, name: "Ms. Mamta Rajpurohit", designation: "PGT (B.St.)" },
    { no: 7, name: "Mr. Mahendra Kumar", designation: "PGT (Physics)" },
    { no: 8, name: "Ms. Deepshikha Khangarot", designation: "PGT (Biology)" },
    { no: 9, name: "Ms. Priya Sharma", designation: "PGT (Hindi)" },
    { no: 10, name: "Mr. Ronak Singh", designation: "PGT (Accountancy)" },
    { no: 11, name: "Ms. Priyanka Lakhawat", designation: "PGT (Pol. Sci.)" },
    { no: 12, name: "Ms. Dimpal", designation: "PGT (Chemistry)" },
    { no: 13, name: "Dr. Purnima Bhati", designation: "PGT (English)" },
    { no: 14, name: "Mr. Rahul Joshi", designation: "PGT (Geography)" },
    { no: 15, name: "Ms. Neha Srivastva", designation: "PGT (English)" },
    { no: 16, name: "Ms. Roshni Bano", designation: "PGT (Music)" },
    { no: 17, name: "Mr. Pradeep Singh", designation: "PGT (Comp. Sci.)" },
    { no: 18, name: "Ms. Deepa Tolani", designation: "TGT (S.St.)" },
    { no: 19, name: "Ms. Rajkumari Choudhary", designation: "TGT (Science)" },
    { no: 20, name: "Ms. Varsha Palrecha", designation: "TGT (Hindi)" },
    { no: 21, name: "Ms. Krishana Kanta Pareek", designation: "TGT (Sanskrit)" },
    { no: 22, name: "Mr. Kantilal Prajapat", designation: "TGT (Maths)" },
    { no: 23, name: "Ms. Veena Kumari", designation: "TGT (English)" },
    { no: 24, name: "Ms. Divya Soni", designation: "TGT (Maths)" },
    { no: 25, name: "Ms. Manglem Singh", designation: "TGT (Science)" },
    { no: 26, name: "Ms. Priyanka Saxena", designation: "TGT (Sanskrit)" },
    { no: 27, name: "Ms. Bhawna", designation: "TGT (Hindi)" },
    { no: 28, name: "Ms. Mamta Kanwar", designation: "TGT (Maths)" },
    { no: 29, name: "Ms. Kalal Nilam", designation: "TGT (Comp. Sci.)" },
    { no: 30, name: "Ms. Neelam Parihar", designation: "TGT (English)" },
    { no: 31, name: "Ms. Kalpna Vaishnav", designation: "TGT" },
    { no: 32, name: "Ms. Meena Sirvi", designation: "TGT (S.St.)" },
    { no: 33, name: "Ms. Rashmi Tripathi", designation: "PET" },
    { no: 34, name: "Ms. Suman", designation: "PET" },
    { no: 35, name: "Ms. Megha Arora", designation: "PRT Co-ordinator" },
    { no: 36, name: "Ms. Sunder Dewasi", designation: "PRT (Hindi)" },
    { no: 37, name: "Ms. Rathod Gopal Kunwar", designation: "PRT (M.T.)" },
    { no: 38, name: "Ms. Anjali Rathore", designation: "PRT (EVS)" },
    { no: 39, name: "Ms. Yumnum Reena Devi", designation: "PRT (English)" },
    { no: 40, name: "Ms. Monika", designation: "PRT" },
    { no: 41, name: "Ms. Jyoti Choudhary", designation: "PRT" },
    { no: 42, name: "Ms. Hemlata Suthar", designation: "PRT" },
    { no: 43, name: "Ms. Gracy Soni", designation: "PRT" },
    { no: 44, name: "Ms. Chitrakshi Kalet", designation: "PRT" },
    { no: 45, name: "Ms. Bharti Mali", designation: "PRT" },
    { no: 46, name: "Mr. Md Asfak", designation: "Office Superintendent" },
    { no: 47, name: "Mr. Niranjan Gehlot", designation: "Accountant" },
    { no: 48, name: "Ms. Jaya Gehlot", designation: "Librarian" },
    { no: 49, name: "Ms. Soniya Arya", designation: "Sci. Lab Asst." },
    { no: 50, name: "Ms. Chanchal Suthar", designation: "Comp. Lab Asst." },
];

export default function SPSContent() {
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleToppers, setVisibleToppers] = useState(10);
    const [visibleStaff, setVisibleStaff] = useState(12);
    const [selectedCategory, setSelectedCategory] = useState("XII");

    // --- Mock Results Data ---
    const allResults = [
        { name: "Anjali Prajapat", class: "X", percentage: "93.33", image: null, resultType: "Board" },
        { name: "Poonam Kanwar", class: "X", percentage: "92.17", image: null, resultType: "Board" },
        { name: "Kirtika Kanwar", class: "XII", percentage: "95.80", stream: "Science", image: null, resultType: "Board" },
        { name: "Sanjana", class: "XII", percentage: "95.00", stream: "Science", image: null, resultType: "Board" },
        { name: "Mahima Surana", class: "XII", percentage: "96.00", stream: "Arts", image: null, resultType: "Board" },
        { name: "Himanshi Kanwar", class: "XII", percentage: "95.40", stream: "Arts", image: null, resultType: "Board" },
        { name: "Gudiya Kumari", class: "XII", percentage: "90.60", stream: "Commerce", image: null, resultType: "Board" }
    ];

    // Filtered results based on category
    const getFilteredResults = () => {
        if (selectedCategory === "XII") {
            return allResults
                .filter(r => r.class === "XII" && (r.resultType === "Board" || !r.resultType))
                .map(t => ({ ...t, description: `Class XII ${t.stream || ""} Topper` }));
        }
        if (selectedCategory === "X") {
            return allResults
                .filter(r => r.class === "X" && (r.resultType === "Board" || !r.resultType))
                .map(t => ({ ...t, stream: t.stream || "-", description: "Class X Board Exam Topper" }));
        }
        if (selectedCategory === "Non-Board") {
            return allResults
                .filter(r => r.resultType === "Non-Board")
                .map(t => ({ ...t, stream: t.stream || "-", description: `Class ${t.class} Topper` }));
        }
        return [];
    };

    const displayResults = getFilteredResults();

    const openModal = (student: any) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedStudent(null), 300);
    };

    const classToppers = [
        { name: "Ms. Shivgami Chouhan", rank: "I" },
        { name: "Ms. Priyadarshni", rank: "II" },
        { name: "Ms. Kinjal Dewasi", rank: "III" },
        { name: "Ms. Poorvi Pareek", rank: "IV" },
        { name: "Ms. Chetnya Rathore", rank: "V" },
        { name: "Ms. Abhigya", rank: "VI" },
        { name: "Ms. Dimpy Malviya", rank: "VII" },
        { name: "Ms. Tamanna", rank: "VIII" },
        { name: "Ms. Preksha", rank: "IX" },
        { name: "Ms. Tanisha Jain", rank: "XI Sci" },
        { name: "Ms. Mehak Jain", rank: "XI Com" },
        { name: "Ms. Jaishree", rank: "XI Hum" },
    ];

    const categories = [
        { id: "XII", name: "Class XII", icon: Trophy, count: allResults.filter(r => r.class === "XII").length, desc: "Aissce Board Result" },
        { id: "X", name: "Class X", icon: Medal, count: allResults.filter(r => r.class === "X").length, desc: "Aisse Board Result" },
        { id: "Non-Board", name: "Non-Board", icon: Star, count: allResults.filter(r => r.resultType === "Non-Board").length, desc: "Class Toppers" }
    ];

    return (
        <main className="min-h-screen bg-white">
            <StudentModal isOpen={isModalOpen} onClose={closeModal} student={selectedStudent} />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 bg-oxford/90 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sandstone/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row gap-8 items-center mb-10"
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-sandstone overflow-hidden bg-white shrink-0">
                            <img src="/shushiladevi.jpg" alt="SPS Logo" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <span className="text-sandstone font-bold uppercase tracking-widest text-sm mb-4 block">Affiliated to CBSE, New Delhi</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight uppercase font-serif">
                                Sushiladevi Prakashraj Modi Primary School
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl">
                                Nurturing young minds with care, values, and quality education.
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 text-sm font-medium text-white/80 border-t border-white/10 pt-10">
                        <div className="flex items-start gap-3">
                            <MapPin className="text-sandstone shrink-0" size={20} />
                            <span>Vidyawadi, Khimel, Station-Rani,<br />Distt.-Pali (Raj.) 306115</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="text-sandstone shrink-0" size={20} />
                            <a href="tel:8764250887" className="hover:text-sandstone transition-colors">8764250887</a>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail className="text-sandstone shrink-0" size={20} />
                            <div className="flex flex-col">
                                <a href="mailto:info@vidyawadi.org" className="hover:text-sandstone transition-colors">info@vidyawadi.org</a>
                                <a href="http://www.vidyawadi.org" target="_blank" rel="noopener noreferrer" className="hover:text-sandstone transition-colors">www.vidyawadi.org</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section (Principal's Message & Vision) */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-oxford mb-6 font-serif">Principal’s Message</h2>
                        <div className="prose text-gray-600 leading-relaxed space-y-4 mb-8">
                            <p className="">
                                "Welcome to SPS, Vidyawadi, where we take pride in fostering a nurturing environment that empowers every learner to grow into a confident, compassionate, and globally-minded citizen."
                            </p>
                            <p>
                                Dear Students, Parents, and Community Members,
                            </p>
                            <p>
                                Sushiladevi Primary School, situated in the rural belt of Pali District in Rajasthan, is a residential school providing quality education primarily for girls, with a noble thought of promoting girls’ education.
                            </p>
                            <p>
                                At our core, we embrace a vision to nurture global citizens who are equipped to thrive in an ever-changing world. Our mission is to provide a healthy learning environment where every student feels safe, valued, and inspired to pursue excellence.
                            </p>
                            <p>
                                Together, let us work to create a future where every child shines brightly, empowered to shape their destiny and contribute meaningfully to the global community.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-sandstone shadow-lg">
                                <Image
                                    src="/images/english school/principle.jpg"
                                    alt="Principal"
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="font-bold text-oxford">
                                <p className="text-lg">Ms. Jyoti Nath</p>
                                <p className="text-xs text-sandstone uppercase tracking-widest">Principal</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-oxford/5 rounded-3xl p-8 border border-oxford/10">
                            <h3 className="text-2xl font-bold text-oxford mb-6 flex items-center gap-3 font-serif">
                                <Star className="text-sandstone fill-sandstone" />
                                Our Core Values
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    { title: "Discover Yourself", desc: "Explore unique talents and interests." },
                                    { title: "Be Your Own Light", desc: "Lead with integrity and wisdom." },
                                    { title: "Make Your Own Path", desc: "Inspire independent thinking and courage." }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700">
                                        <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-1" />
                                        <div>
                                            <span className="font-bold text-oxford block">{item.title}</span>
                                            <span className="text-sm">{item.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-8 bg-oxford rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sandstone/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Our School</h3>
                            <p className="text-white/80 text-sm leading-relaxed relative z-10">
                                SPS Vidyawadi is known for its reputation and adherence to quality education, State of Art Infrastructure, and facilities like Sports, Bharat Scout & Guide, and National Cadet Corps (NCC). We offer maximum subject choices and engage students in traditional and innovative educational methods.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Academics Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Academic Excellence</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-oxford mt-2 font-serif">Curriculum & Structure</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Providing a comprehensive and balanced educational framework from foundational to primary levels.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 mb-16">
                        {[
                            { title: "Foundational", level: "Nursery – II", icon: Star },
                            { title: "Preparatory", level: "III to V", icon: BookOpen },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border-2 border-b-4 border-oxford text-center hover:-translate-y-2 transition-transform group">
                                <div className="w-12 h-12 bg-oxford/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sandstone transition-colors">
                                    <stat.icon className="text-sandstone group-hover:text-white transition-colors" size={24} />
                                </div>
                                <h3 className="text-gray-500 font-bold uppercase text-xs tracking-wider mb-2 font-serif">{stat.title}</h3>
                                <p className="text-2xl font-black text-oxford">{stat.level}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-oxford/10 shadow-oxford/40 shadow-lg">
                        <h3 className="text-3xl font-bold text-oxford mb-8 flex items-center gap-3 font-serif">
                            <Sparkles className="text-sandstone" />
                            Senior Secondary Streams (XI & XII)
                        </h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Science",
                                    color: "bg-blue-500",
                                    subjects: ["English", "Hindi", "Physics", "Chemistry", "Biology / Maths"]
                                },
                                {
                                    title: "Arts",
                                    color: "bg-purple-500",
                                    subjects: ["English", "Hindi", "Drawing / History", "Political Science / Geography", "Hindi Literature / English Literature"]
                                },
                                {
                                    title: "Commerce",
                                    color: "bg-emerald-500",
                                    subjects: ["English", "Hindi", "Accountancy", "Business Studies", "Economics"]
                                }
                            ].map((stream, i) => (
                                <div key={i} className="relative p-6 rounded-2xl bg-gray-50 hover:shadow-md transition-shadow border-1 border-oxford">
                                    <div className={`h-1.5 w-12 ${stream.color} rounded-full mb-4`} />
                                    <h4 className="text-xl font-black text-oxford mb-4 uppercase tracking-tight">{stream.title}</h4>
                                    <ul className="space-y-3">
                                        {stream.subjects.map((sub, j) => (
                                            <li key={j} className="flex items-start gap-2 text-gray-600 text-sm">
                                                <div className={`w-1.5 h-1.5 rounded-full ${stream.color} shrink-0 mt-1.5`} />
                                                <span>{sub}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-oxford/10">
                        <h3 className="text-3xl font-bold text-oxford mb-8 flex items-center gap-3 font-serif">
                            <Sparkles className="text-sandstone" />
                            Academic Streams & Focus Areas
                        </h3>
                        <div className="grid md:grid-cols-3 gap-12">
                            {[
                                {
                                    title: "Curriculum",
                                    color: "bg-blue-500",
                                    subjects: ["English Core", "Mathematics", "EVS / Science", "Social Studies", "Hindi & Sanskrit", "Value Education"]
                                },
                                {
                                    title: "Co-Curricular",
                                    color: "bg-green-500",
                                    subjects: ["Art & Craft", "Music & Dance", "Physical Education", "Computer Literacy", "Library Skills", "Yoga"]
                                },
                                {
                                    title: "Development",
                                    color: "bg-orange-500",
                                    subjects: ["Personality Development", "Communication Skills", "Ethical Studies", "Storytelling", "Nature Walks", "Activity Based Learning"]
                                }
                            ].map((stream, i) => (
                                <div key={i} className="relative">
                                    <div className={`h-2 w-12 ${stream.color} rounded-full mb-6`} />
                                    <h4 className="text-2xl font-black text-oxford mb-4">{stream.title}</h4>
                                    <ul className="space-y-3">
                                        {stream.subjects.map((sub, j) => (
                                            <li key={j} className="flex items-center gap-2 text-gray-600 text-sm">
                                                <div className={`w-1.5 h-1.5 rounded-full ${stream.color} shrink-0`} />
                                                {sub}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>
            </section>

            {/* Student Life Gallery Section */}
            <section className="py-20 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Student Life</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-oxford mt-2 uppercase">Our Vibrant Campus</h2>
                        <div className="w-24 h-1.5 bg-sandstone mx-auto mt-6 rounded-full mb-8" />
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Glimpses of daily life, activities, and the joy of learning at SPS.
                        </p>
                    </div>

                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        {[
                            "/images/childern/003a7719-8bae-4407-9429-1585f4ac5dc9.jpg",
                            "/images/childern/8a899886-71df-4f7a-8ca1-4b3c8c83407f.jpg",
                            "/images/childern/93b4f897-0aca-4189-a717-16c13f8372d5.jpg",
                            "/images/childern/9e95aa2a-d491-4f6a-ab87-97894a9529f0.jpg",
                            "/images/childern/e128b918-b695-43f8-a7d7-fed49ae70294.jpg",
                            "/images/childern/1290780e-b8e3-4a73-86c2-035a68ef944c.jpg",
                            "/images/childern/1c926537-394f-4233-be78-ed6a3c980eb7.jpg",
                            "/images/childern/3c98151a-177a-411c-a689-96fb2a6bc7fb.jpg",
                            "/images/childern/85c9f954-079d-4803-b3b4-7acf4b451544.jpg",
                            "/images/childern/c5f0ebd8-5b00-4a0f-8a1c-f53e1ff65aee.jpg",
                            "/images/childern/f865022a-1f6c-409f-9866-8b073b608d3f.jpg",
                            "/images/childern/01c2c50c-98b7-46bd-b44f-af8f897e0c7e.jpg",
                            "/images/childern/1c96c2da-8eb7-4af9-a61e-09b1cec14802.jpg",
                            "/images/childern/2da6f752-6901-4999-9fab-b80e216618c1.jpg",
                            "/images/childern/488b49a5-f698-41f2-a478-9a3666798d84.jpg",
                            "/images/childern/4f25b7f8-9ac3-4c38-b04a-9acbd28f7d29.jpg",
                            "/images/childern/550b7d5a-c8d4-4500-aa1f-fd2ab566ee25.jpg",
                            "/images/childern/93947ad7-766e-4633-acc4-2f9ec377f41d.jpg",
                            "/images/childern/940bf23d-9913-4b47-b0be-1793145cc0b1.jpg",
                            "/images/childern/WhatsApp Image 2026-02-25 at 18.27.53.jpeg",
                            "/images/childern/WhatsApp Image 2026-02-25 at 18.34.15 (1).jpeg",
                            "/images/childern/WhatsApp Image 2026-02-25 at 18.34.15.jpeg",
                            "/images/childern/WhatsApp Image 2026-02-25 at 18.34.16 (1).jpeg",
                            "/images/childern/WhatsApp Image 2026-02-25 at 18.34.16 (2).jpeg",
                            "/images/childern/WhatsApp Image 2026-02-25 at 18.34.16 (3).jpeg",
                            "/images/childern/WhatsApp Image 2026-02-25 at 18.34.16.jpeg",
                            "/images/childern/a723594c-f4ac-4b1b-a847-d7a461e8a1cc.jpg",
                            "/images/childern/b53ef50d-d9a5-4dd8-bb30-1c894b06611a.jpg"
                        ].map((src, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                            >
                                <img
                                    src={src}
                                    alt={`Gallery detail ${i}`}
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Class Toppers (Non-Board) Section */}
            <section className="py-24 px-6 bg-oxford relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sandstone/10 via-transparent to-transparent opacity-50" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center gap-3 mb-4"
                        >
                            <Star className="text-sandstone fill-sandstone" size={28} />
                            <h2 className="text-3xl md:text-5xl font-black text-white font-serif uppercase tracking-tight">
                                Class Toppers <span className="text-sandstone">(Non-Board)</span>
                            </h2>
                        </motion.div>
                        <div className="w-24 h-1 bg-sandstone mx-auto rounded-full" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        {classToppers.map((topper, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 hover:bg-white/10 transition-all cursor-default shadow-lg"
                            >
                                <span className="text-white font-bold whitespace-nowrap">{topper.name}</span>
                                <div className="bg-sandstone px-2 py-0.5 rounded-md min-w-[32px] text-center">
                                    <span className="text-oxford font-black text-[15px] gap-2 uppercase tracking-tighter">
                                        {topper.rank}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Beyond Academics (Facilities & Activities) */}
            <section className="py-20 px-6 bg-oxford text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Co-Curricular Excellence</span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-2 font-serif">Beyond Academics</h2>
                        <p className="text-white/80 mt-4 max-w-2xl mx-auto">
                            “Nurturing talents beyond textbooks.”
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                                <div className="w-12 h-12 bg-sandstone/20 rounded-2xl flex items-center justify-center text-sandstone mb-6 group-hover:scale-110 transition-transform">
                                    <Microscope size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 font-serif">Discovery Lab</h3>
                                <p className="text-white/60 text-xs leading-relaxed">
                                    Engaging science and discovery activities tailored for primary explorers.
                                </p>
                            </div>
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                                <div className="w-12 h-12 bg-sandstone/20 rounded-2xl flex items-center justify-center text-sandstone mb-6 group-hover:scale-110 transition-transform">
                                    <BookOpen size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 font-serif">Junior Library</h3>
                                <p className="text-white/60 text-xs leading-relaxed">
                                    Collection of storybooks, pictorials, and educational games.
                                </p>
                            </div>
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                                <div className="w-12 h-12 bg-sandstone/20 rounded-2xl flex items-center justify-center text-sandstone mb-6 group-hover:scale-110 transition-transform">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 font-serif">Values Training</h3>
                                <p className="text-white/60 text-xs leading-relaxed">
                                    Foundational ethics and community service projects.
                                </p>
                            </div>
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                                <div className="w-12 h-12 bg-sandstone/20 rounded-2xl flex items-center justify-center text-sandstone mb-6 group-hover:scale-110 transition-transform">
                                    <Medal size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 font-serif">Kids Club</h3>
                                <p className="text-white/60 text-xs leading-relaxed">
                                    Fun-filled activities: oratory, drama, and eco-consciousness.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <div className="bg-sandstone p-6">
                                <h3 className="text-xl font-bold text-oxford flex items-center gap-3 font-serif">
                                    <Trophy />
                                    Primary Sports Highlights
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-oxford/50 text-white border-b border-white/10">
                                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest">Activity</th>
                                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-right">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[
                                            { title: "Junior Athletics", desc: "100% Participation in Annual Sports Meet." },
                                            { title: "Fun Race Events", desc: "Winners identified across all categories." },
                                            { title: "Yoga & Meditation", desc: "Daily morning sessions for all students." },
                                            { title: "Indoor Games", desc: "Chess and Carrom competitions held bi-monthly." },
                                            { title: "Rhythm & Dance", desc: "Performed at district level cultural events." }
                                        ].map((ach, i) => (
                                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                                <td className="p-4 text-xs font-bold text-white">{ach.title}</td>
                                                <td className="p-4 text-xs text-white/70 text-right">{ach.desc}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Staff Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Our Faculty</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-oxford mt-2 font-serif">SPS School Mentors</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Meet our dedicated faculty members committed to foundational excellence.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {staffList.slice(0, visibleStaff).map((staff, i) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: (i % 12) * 0.05 }}
                                key={staff.no}
                                className="bg-white p-4 rounded-xl shadow-sm border border-oxford/10 flex items-center gap-3 hover:border-sandstone transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-full bg-oxford/5 flex items-center justify-center text-oxford font-bold text-xs shrink-0 group-hover:bg-sandstone group-hover:text-white transition-colors">
                                    {staff.no}
                                </div>
                                <div>
                                    <h4 className="font-bold text-oxford text-xs">{staff.name}</h4>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">{staff.designation}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {visibleStaff < staffList.length && (
                        <div className="flex justify-center mt-12">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setVisibleStaff(prev => prev + 12)}
                                className="px-8 py-3 bg-white text-oxford border-2 border-oxford rounded-full font-bold uppercase tracking-wider shadow-lg hover:bg-oxford hover:text-white transition-all flex items-center gap-2"
                            >
                                Load More Mentors
                                <ArrowRight size={18} />
                            </motion.button>
                        </div>
                    )}
                </div>
            </section>

            {/* Rules & Uniform Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="bg-oxford/5 rounded-3xl p-8 md:p-12 border border-oxford/10">
                        <h3 className="text-2xl font-bold text-oxford mb-6 flex items-center gap-3">
                            <Sparkles className="text-sandstone" />
                            Primary School Uniform
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-sandstone text-sm uppercase tracking-wider mb-3">Nursery to VIII (SPS)</h4>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Black & white check tunic, off-white shirt & belt</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Black ankle length socks with off white strips</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Black shoes, white band/hair pins</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-oxford font-serif">General Guidelines</h2>
                        <div className="grid gap-4">
                            {[
                                { title: "Punctuality", desc: "Consistent and timely attendance is encouraged." },
                                { title: "Uniform Pride", desc: "Strict adherence to the prescribed uniform code." },
                                { title: "Conduct", desc: "Respectful behavior towards peers and mentors." },
                                { title: "Involvement", desc: "Participation in all school activities is mandatory." }
                            ].map((rule, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-sandstone/10 flex items-center justify-center shrink-0 mt-1">
                                        <span className="text-oxford font-bold text-xs">{i + 1}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-oxford">{rule.title}</h4>
                                        <p className="text-sm text-gray-600">{rule.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-sandstone">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-black text-oxford mb-6 uppercase tracking-tight font-serif">Enroll Her Potential</h2>
                    <p className="text-xl text-oxford/80 font-medium mb-10">
                        Join Sushiladevi Primary School for a remarkable foundational journey.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="tel:8764250887" className="px-8 py-4 bg-oxford text-white rounded-full font-bold uppercase tracking-wider shadow-lg hover:bg-white hover:text-oxford transition-all flex items-center justify-center gap-2">
                            Enquire: 8764250887
                            <Phone size={18} />
                        </a>
                        <a href="/contact" className="px-8 py-4 bg-white text-oxford rounded-full font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                            Campus Visit
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
