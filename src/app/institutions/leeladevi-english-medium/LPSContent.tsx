"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    BookOpen, Trophy, School, Users, Star, Microscope,
    Medal, Phone, MapPin, Globe, CheckCircle2, User,
    ShieldCheck, Sparkles, ChevronRight
} from "lucide-react";
import StudentResultsTable from "@/components/StudentResultsTable";
import StudentModal from "@/components/StudentModal";

// --- Data ---

const staffList = [
    { "no": 1, "name": "Ms. Jyoti Nath", "designation": "Principal" },
    { "no": 2, "name": "Ms. Deepshikha Khangarot", "designation": "PGT (Biology) & V.P." },
    { "no": 3, "name": "Dr. Nidhi Upadhyay", "designation": "PGT (Drawing & Painting)" },
    { "no": 4, "name": "Mrs. Bhagwanti", "designation": "PGT (Maths)" },
    { "no": 5, "name": "Mr. Ghanshyam Singh", "designation": "PGT (English)" },
    { "no": 6, "name": "Ms. Mamta Rajpurohit", "designation": "PGT (B.St.)" },
    { "no": 7, "name": "Mr. Mahendra Kumar", "designation": "PGT (Physics)" },
    { "no": 8, "name": "Mrs. Priya Sharma", "designation": "PGT (Hindi)" },
    { "no": 9, "name": "Mr. Ronak Singh", "designation": "PGT (Accountancy)" },
    { "no": 10, "name": "Ms. Roshni Bano", "designation": "PGT (Music)" },
    { "no": 11, "name": "Mr. Pradeep Singh Sevarsa", "designation": "PGT (Comp. Sci.)" },
    { "no": 12, "name": "Mr. Andrew Daimari", "designation": "PGT(English)" },
    { "no": 13, "name": "Ms. Sonal", "designation": "PGT(Chemistry)" },
    { "no": 14, "name": "Ms. Princi Saxena", "designation": "PGT (English)" },
    { "no": 15, "name": "Mr. Pushpendra Singh", "designation": "PGT (Geography)" },
    { "no": 16, "name": "Mr. Rahul Joshi", "designation": "PGT (Polt. Scie.)" },
    { "no": 17, "name": "Mrs. Deepa Tolani", "designation": "TGT (S.St.)" },
    { "no": 18, "name": "Mrs. Rajkumari Choudhary", "designation": "TGT (Science)" },
    { "no": 19, "name": "Ms. Varsha Palrecha", "designation": "TGT (Hindi)" },
    { "no": 20, "name": "Ms. Aruna Mali", "designation": "TGT (Sanskrit)" },
    { "no": 21, "name": "Mr. Kantilal Prajapat", "designation": "TGT (Maths)" },
    { "no": 22, "name": "Ms. Divya Soni", "designation": "TGT (Maths)" },
    { "no": 23, "name": "Ms. Priyanka Saxena", "designation": "TGT (Sanskrit)" },
    { "no": 24, "name": "Ms. Kalal Nilam", "designation": "TGT (Comp. Sci.)" },
    { "no": 25, "name": "Ms. Mamta Kanwar", "designation": "TGT (Maths)" },
    { "no": 26, "name": "Ms. Neelam Parihar", "designation": "TGT (English)" },
    { "no": 27, "name": "Ms. Meena Sirvi", "designation": "TGT (S.St.)" },
    { "no": 28, "name": "Ms. Yumnum Manglem Singh", "designation": "TGT(Science)" },
    { "no": 29, "name": "Ms. Sunder Dewasi", "designation": "TGT (Hindi), Guide-Incharge" },
    { "no": 30, "name": "Ms. Sudiksha Soni", "designation": "TGT (IT)" },
    { "no": 31, "name": "Ms. Kareena Shaikh", "designation": "TGT(S.ST. & English)" },
    { "no": 32, "name": "Ms. Chhaya Rajpurohit", "designation": "TGT(English) & PGT (B.ST)" },
    { "no": 33, "name": "Ms. Honey Agrawat", "designation": "PRT (Eng.) Primary Coordinator" },
    { "no": 34, "name": "Ms. Jyoti Choudhary", "designation": "PRT" },
    { "no": 35, "name": "Ms. Yumnum Reena Devi", "designation": "PRT" },
    { "no": 36, "name": "Ms. Monika", "designation": "PRT" },
    { "no": 37, "name": "Ms. Hemlata Suthar", "designation": "PRT" },
    { "no": 38, "name": "Ms. Suman Gurjar", "designation": "PET" },
    { "no": 39, "name": "Ms. Gracy Soni", "designation": "PRT" },
    { "no": 40, "name": "Ms. Bharti Mali", "designation": "PRT" },
    { "no": 41, "name": "Ms. Pista Kumari", "designation": "PRT" },
    { "no": 42, "name": "Ms. Mary Grace", "designation": "PRT" },
    { "no": 43, "name": "Ms. Monika Kumari", "designation": "PRT" },
    { "no": 44, "name": "Ms. Leena Sharma", "designation": "PRT" },
    { "no": 45, "name": "Ms. Leela Choudhary", "designation": "PET" },
    { "no": 46, "name": "Ms. Gopal Kanwar", "designation": "PRT" },
    { "no": 47, "name": "Ms. Chtrakshi Kalet", "designation": "PRT" },
    { "no": 48, "name": "Mr. Md. Asfak", "designation": "Office Supdt." },
    { "no": 49, "name": "Ms. Jaya Gehlot", "designation": "Librarian" },
    { "no": 50, "name": "Ms. Bhawana Solanki", "designation": "PRT+Lab Asst." },
    { "no": 51, "name": "Ms. Gayatri Mali", "designation": "Front Desk Executive" },
    { "no": 52, "name": "Mr. Ramesh Choudhary", "designation": "Peon" },
    { "no": 53, "name": "Mr. Suresh Puri", "designation": "Peon" },
    { "no": 54, "name": "Mr. Heeral Lal Prajapat", "designation": "Peon" },
    { "no": 55, "name": "Mrs. Rukmini", "designation": "Peon" },
    { "no": 56, "name": "Mrs. Champa", "designation": "Peon" },
    { "no": 57, "name": "Ms. Anju Kanwar", "designation": "Peon" },
    { "no": 58, "name": "Ms. Nenu Vaishnav", "designation": "Peon" },
    { "no": 59, "name": "Mr. Ramesh Prajapat", "designation": "Peon" },
    { "no": 60, "name": "Mrs. Basanti Devi", "designation": "Sweeper" },
    { "no": 61, "name": "Mrs. Krishna", "designation": "Sweeper" },
    { "no": 62, "name": "Ms. Mamta Goswami", "designation": "Peon" }
];

export default function LPSContent() {
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleStaff, setVisibleStaff] = useState(12);

    const openModal = (student: any) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedStudent(null), 300);
    };

    return (
        <main className="min-h-screen bg-white font-devanagari">
            <StudentModal isOpen={isModalOpen} onClose={closeModal} student={selectedStudent} />
            <Navbar />

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
                            <img src="/lps.jpg" alt="Leeladevi School Logo" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <span className="text-sandstone font-bold uppercase tracking-widest text-sm mb-4 block">Affiliated to CBSE, New Delhi</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                                Leeladevi Parasmal Sancheti English Medium School
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl">
                                Nurturing Minds, Shaping Futures through Academic Excellence & Values
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 text-sm font-medium text-white/80">
                        <div className="flex items-start gap-3">
                            <MapPin className="text-sandstone shrink-0" size={20} />
                            <span>Vidyawadi, Khimel, Station Rani – 306115,<br />District Pali (Rajasthan)</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="text-sandstone shrink-0" size={20} />
                            <div className="flex flex-col">
                                <a href="tel:6377203204" className="hover:text-sandstone transition-colors font-bold">6377203204</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Globe className="text-sandstone shrink-0" size={20} />
                            <a href="https://www.vidyawadi.org" target="_blank" rel="noopener noreferrer" className="hover:text-sandstone transition-colors font-bold">www.vidyawadi.org</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* About & Leadership Section */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Leadership</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight">Principal’s Message</h2>
                        <div className="h-1.5 w-24 bg-sandstone mt-6 rounded-full mb-10" />
                        <div className="prose text-gray-600 leading-relaxed space-y-4 mb-8">
                            <p className="text-lg text-oxford/80 font-medium italic">
                                “Welcome to LPS, Vidyawadi, where we take pride in fostering a nurturing environment that empowers every learner to grow into a confident, compassionate, and globally-minded citizen.”
                            </p>
                            <p>
                                Founded in 2004, situated in the rural belt of Pali District in Rajasthan, this Vidyalaya is a residential school providing quality education from Nursery to XII primarily for girls, with a noble thought of promoting girls’ education. Presently, the School accommodates more than 1000 girls.
                            </p>
                            <p>
                                Together, let us work to create a future where every child shines brightly, empowered to shape their destiny and contribute meaningfully to the global community.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-sandstone shadow-lg">
                                <img
                                    src="/images/english school/principle.jpg"
                                    alt="Principal Jyoti Nath"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="font-bold text-oxford">
                                <p className="text-xl">Ms. Jyoti Nath</p>
                                <p className="text-xs text-sandstone uppercase tracking-widest">Principal</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-oxford/5 rounded-[2.5rem] p-10 border border-oxford/10 shadow-xl">
                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4 text-center">Our Ethos</span>
                            <h3 className="text-3xl font-bold text-oxford mb-6 flex justify-center items-center gap-3">
                                <Star className="text-sandstone fill-sandstone" />
                                Our Core Values
                            </h3>
                            <div className="h-1 bg-sandstone w-16 mx-auto mb-10 rounded-full" />
                            <ul className="space-y-6">
                                {[
                                    { title: "Discover Yourself", desc: "Explore unique talents and interests." },
                                    { title: "Be Your Own Light", desc: "Lead with integrity and wisdom." },
                                    { title: "Make Your Own Path", desc: "Inspire independent thinking and courage." }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-gray-700">
                                        <div className="bg-green-100 p-1 rounded-full shadow-sm">
                                            <CheckCircle2 size={18} className="text-green-600 shrink-0" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-oxford block text-lg">{item.title}</span>
                                            <span className="text-sm">{item.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-8 bg-oxford rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sandstone/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <School className="text-sandstone" />
                                Premium Residential Campus
                            </h4>
                            <p className="text-white/80 text-sm leading-relaxed">
                                LPS Vidyawadi is known for its reputation and adherence to quality education, State of Art Infrastructure, and facilities like Sports, Bharat Scout & Guide, and National Cadet Corps (NCC). We empower girls for future success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Toppers Section */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Meritorious Students</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight text-center">Board Exam Toppers</h2>
                        <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full mb-8" />
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto font-medium">
                            Celebrating the academic excellence of our students in CBSE Board Examinations.
                        </p>
                    </div>
                    <StudentResultsTable />
                </div>
            </section>

            {/* Scholarships & Merit Awards */}
            <section className="py-24 px-6 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Recognition & Rewards</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight text-center">Scholarships & Awards</h2>
                        <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full mb-8" />
                    </div>

                    <div className="mb-20">
                        <div className="text-center mb-10">
                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4 text-center">District Level Recognition</span>
                            <h3 className="text-3xl font-bold text-oxford flex justify-center items-center gap-3">
                                <Medal className="text-sandstone" />
                                Padmakshi (Merit) Award Scheme
                            </h3>
                            <div className="h-1 bg-sandstone w-16 mx-auto mt-6 rounded-full" />
                        </div>
                        <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-center">
                            Honoring students who secured top positions in Pali District.
                        </p>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="bg-sandstone text-oxford p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center relative overflow-hidden order-2 lg:order-1 shadow-xl">
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                                <Star size={64} className="text-oxford mb-6" />
                                <h4 className="text-4xl font-black mb-2">₹1,25,000</h4>
                                <p className="text-oxford/80 font-medium">Total Cash Prizes Awarded</p>
                            </div>

                            <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-oxford/10 shadow-lg bg-white order-1 lg:order-2">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-oxford text-white">
                                        <tr>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs">Student Name</th>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs">Class & Stream</th>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs">Percentage</th>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs text-right">Award Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-oxford/10 text-gray-700">
                                        {[
                                            { name: "Mahima Surana", class: "XII Arts", percent: "96.00%", amount: "₹75,000" },
                                            { name: "Kirtika Kanwar", class: "XII Science", percent: "95.80%", amount: "₹75,000" },
                                            { name: "Mamata Kumari", class: "XII Commerce", percent: "82.40%", amount: "₹75,000" }
                                        ].map((student, i) => (
                                            <tr key={i} className="hover:bg-oxford/5 transition-colors">
                                                <td className="p-4 md:p-6 font-bold text-oxford">{student.name}</td>
                                                <td className="p-4 md:p-6">{student.class}</td>
                                                <td className="p-4 md:p-6 font-bold">{student.percent}</td>
                                                <td className="p-4 md:p-6 text-right font-black text-green-600">{student.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* GARGI AWARD */}
                    <div className="mt-20 bg-oxford text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sandstone/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 text-center">
                            <h3 className="text-3xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-4">
                                <Trophy className="text-sandstone" size={48} />
                                GARGI Award Recipients
                            </h3>
                            <div className="h-1.5 w-24 bg-sandstone mx-auto mb-10 rounded-full" />
                            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                                We celebrate our brilliant girls honored under the <span className="font-bold text-sandstone">GARGI AWARD</span> Scheme for securing 75% or more in Board Exams.
                            </p>
                            <div className="flex flex-col md:flex-row justify-center gap-6">
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                                    <p className="text-3xl font-black">₹6,000</p>
                                    <p className="text-xs uppercase tracking-widest mt-1">Class X Award</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                                    <p className="text-3xl font-black">₹5,000</p>
                                    <p className="text-xs uppercase tracking-widest mt-1">Class XII Award</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Perfect Score Achievers */}
                    <div className="mt-24">
                        <div className="text-center mb-10">
                            <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Subject Brilliance</span>
                            <h3 className="text-4xl font-bold text-oxford mt-2">Perfect Score Achievers</h3>
                            <p className="text-gray-600 mt-2">100/100 Marks in CBSE Board Exams</p>
                        </div>
                        <div className="overflow-x-auto rounded-3xl border border-oxford/10 shadow-lg bg-white">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead className="bg-oxford text-white">
                                    <tr>
                                        <th className="p-6 font-bold uppercase tracking-wider text-sm">Student Name</th>
                                        <th className="p-6 font-bold uppercase tracking-wider text-sm">Class & Stream</th>
                                        <th className="p-6 font-bold uppercase tracking-wider text-sm">Subject</th>
                                        <th className="p-6 font-bold uppercase tracking-wider text-sm text-right">Marks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-oxford/10 text-gray-700 font-medium">
                                    {[
                                        { name: "Mahima Surana", class: "XII Arts", subject: "Hindi Literature", marks: "100/100" },
                                        { name: "Vartika", class: "XII Arts", subject: "Hindi Literature", marks: "100/100" },
                                        { name: "Manisha", class: "XII Science", subject: "Chemistry", marks: "100/100" },
                                        { name: "Ritika Sherawat", class: "XII Science", subject: "Biology", marks: "100/100" }
                                    ].map((student, i) => (
                                        <tr key={i} className="hover:bg-oxford/5 transition-colors">
                                            <td className="p-6 font-bold text-oxford">{student.name}</td>
                                            <td className="p-6">{student.class}</td>
                                            <td className="p-6">{student.subject}</td>
                                            <td className="p-6 text-right font-black text-green-600">{student.marks}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Beyond Academics Section */}
            <section className="py-24 px-6 bg-oxford text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm block mb-4">Holistic Development</span>
                        <h2 className="text-4xl md:text-5xl font-bold">Beyond Academics</h2>
                        <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full" />
                    </div>

                    {/* National Achievement Highlight */}
                    <div className="mb-20 bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="md:w-1/3 text-center">
                                <div className="w-48 h-48 mx-auto rounded-full bg-sandstone/20 overflow-hidden mb-6 border-4 border-sandstone/30 flex items-center justify-center">
                                    <User size={80} className="text-sandstone/50" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">Lakshya Singh</h3>
                                <p className="text-sandstone font-bold mb-2">Class X</p>
                                <div className="inline-block px-4 py-2 bg-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-white border border-white/10">
                                    Selected for SGFI
                                </div>
                            </div>
                            <div className="md:w-2/3">
                                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <Medal className="text-sandstone" />
                                    National KVS Yoga Excellence
                                </h3>
                                <p className="text-white/80 text-lg leading-relaxed font-light">
                                    Proudly representing our school at the national level, Lakshya Singh secured the <span className="text-sandstone font-bold">1st Position</span> in Yoga and has been selected for the prestigious SGFI national meet.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Sports Achievements Tables */}
                        <div>
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <Trophy className="text-sandstone" />
                                District & State Level Talents
                            </h3>

                            <div className="space-y-10">
                                {/* State Level */}
                                <div>
                                    <h4 className="text-sandstone font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
                                        <Globe size={16} /> State Level Selections
                                    </h4>
                                    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                        <table className="w-full text-left text-sm text-white/90">
                                            <thead className="bg-white/10 font-bold">
                                                <tr>
                                                    <th className="p-4">Student Name</th>
                                                    <th className="p-4">Sport</th>
                                                    <th className="p-4 text-right">Result</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {[
                                                    { name: "Dhruvi (VI)", sport: "Skating", result: "State Selected" },
                                                    { name: "Poonam (X)", sport: "Hammer Throw", result: "State Selected" },
                                                    { name: "Bhawna (XI)", sport: "Shotput", result: "State Selected" },
                                                    { name: "Leela (IX)", sport: "Shotput", result: "State Selected" }
                                                ].map((row, i) => (
                                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                                        <td className="p-4 font-bold">{row.name}</td>
                                                        <td className="p-4">{row.sport}</td>
                                                        <td className="p-4 text-right text-sandstone font-bold italic">{row.result}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* District Level */}
                                <div>
                                    <h4 className="text-sandstone font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
                                        <MapPin size={16} /> District Level Achievements
                                    </h4>
                                    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                        <table className="w-full text-left text-sm text-white/90">
                                            <thead className="bg-white/10 font-bold">
                                                <tr>
                                                    <th className="p-4">Team / Name</th>
                                                    <th className="p-4">Sport</th>
                                                    <th className="p-4 text-right">Position</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {[
                                                    { name: "U-19 Girls Team", sport: "Badminton", pos: "Second (State Selected: 1)" },
                                                    { name: "U-17 Team (Pratibha, Kritika, KirtiRaj)", sport: "Rifle Shooting", pos: "Winners (State Selected)" },
                                                    { name: "U-19 Team (Hrishija, Himakshi)", sport: "Rifle Shooting", pos: "Winners (State Selected)" },
                                                    { name: "U-14 Girls Team", sport: "Athletics", pos: "Overall Champs (Leela, Rushkarshi, Hetal, Kanishka selected)" },
                                                    { name: "Dhruvi (VI)", sport: "Skating", pos: "3rd Position (State Selected)" },
                                                    { name: "Manisha & Chetna", sport: "Athletics", pos: "1st & 2nd Position" }
                                                ].map((row, i) => (
                                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                                        <td className="p-4 font-bold">{row.name}</td>
                                                        <td className="p-4">{row.sport}</td>
                                                        <td className="p-4 text-right text-sandstone font-bold italic">{row.pos}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Stats Section */}
                        <div className="flex flex-col gap-8">
                            <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                                <Sparkles className="text-sandstone" />
                                Special Recognitions
                            </h3>
                            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-sandstone/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <h4 className="text-4xl font-black mb-4">23 Girls</h4>
                                <p className="text-white/80 text-lg mb-8">Selected for various State Level Tournaments in 2024-25.</p>
                                <ul className="space-y-4 text-sm font-medium">
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-sandstone" />
                                        <span>Softball State Selection (Shrutika, IX)</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-sandstone" />
                                        <span>8 Girls selected for State Wrestling</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-sandstone" />
                                        <span>State Athletics Champions in 100m hurdles & Discus</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-sandstone text-oxford p-6 rounded-2xl text-center shadow-lg">
                                    <School size={24} className="mx-auto mb-2 opacity-60" />
                                    <p className="text-xs font-bold uppercase tracking-widest mb-1">Affiliation</p>
                                    <p className="text-lg font-black">CBSE</p>
                                </div>
                                <div className="bg-white/10 p-6 rounded-2xl text-center border border-white/10">
                                    <ShieldCheck size={24} className="mx-auto mb-2 text-sandstone" />
                                    <p className="text-xs font-bold uppercase tracking-widest mb-1">Campus</p>
                                    <p className="text-lg font-black">Co-Ed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Infrastructure Section */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Facilities</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight text-center">Modern Infrastructure</h2>
                        <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full mb-8" />
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg italic">
                            “Equipped with state-of-the-art laboratories and technological resources”
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Physics Laboratory", img: "/psy.png" },
                            { name: "Chemistry Laboratory", img: "/chemistry.jpg" },
                            { name: "Biology Laboratory", img: "/bio.jpg" },
                            { name: "Mathematics Lab", img: "/math.png" },
                            { name: "Music & Painting Studio", img: "/images/english school/93b4f897-0aca-4189-a717-16c13f8372d5.jpg" },
                            { name: "Geography Laboratory", img: "/images/uploads/vidywadi_main/_29012022131850936.jpg" },
                            { name: "NCC & Guide", img: "/llll-AAA.jpeg" },
                            { name: "Library", img: "/images/english school/706b5bd7-1cbd-40f0-a48f-2ec78225ac48.jpg" },
                            { name: "Computer Center", img: "/images/english school/344537e3-f907-4894-b74e-6c120656cc03.jpg" },
                            { name: "Multimedia Room", img: "/images/uploads/vidywadi_main/_29012022131942147.jpg" },
                            { name: "Safe & Secure Campus", img: "https://journalistsresource.org/wp-content/uploads/2014/02/surveillance-camera-860x466.jpg" }
                        ].map((facility, i) => (
                            <div key={i} className="group overflow-hidden rounded-[2.5rem] bg-white shadow-xl hover:shadow-2xl transition-all border border-oxford/5">
                                <div className="h-64 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-oxford/20 group-hover:bg-transparent transition-colors z-10" />
                                    <img
                                        src={facility.img}
                                        alt={facility.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 inset-x-0 p-6 z-20 bg-gradient-to-t from-oxford/90 to-transparent">
                                        <h3 className="font-bold text-white text-lg">{facility.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="py-24 px-6 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Activities</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight text-center">What We Do</h2>
                        <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full mb-8" />
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773142123/WhatsApp_Video_2026-03-10_at_12.21.30_r1zahz.mp4",
                            "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126080/WhatsApp_Video_2026-03-10_at_12.13.55_1_nmxdbj.mp4",
                            "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126079/WhatsApp_Video_2026-03-10_at_12.13.55_hbh5uh.mp4",
                            "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126078/WhatsApp_Video_2026-03-10_at_12.13.54_zzosza.mp4",
                            "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126078/WhatsApp_Video_2026-03-10_at_12.13.46_tlxxqk.mp4",
                            "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126078/WhatsApp_Video_2026-03-10_at_12.13.55_2_zjupvk.mp4"
                        ].map((url, i) => (
                            <div key={i} className="overflow-hidden rounded-[2rem] bg-black aspect-video shadow-2xl">
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="h-full w-full object-cover opacity-80"
                                >
                                    <source src={url} type="video/mp4" />
                                </video>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Faculty Section */}
            <section className="py-24 px-6 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Our Faculty</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight">School Navigators</h2>
                        <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full mb-8" />
                        <p className="text-gray-600 max-w-2xl mx-auto">Our highly qualified faculty members are dedicated to building a brighter future for our students.</p>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-[2rem] shadow-xl border border-oxford-100">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-oxford/5 border-b border-gray-100">
                                    <th className="py-5 px-8 font-black text-oxford text-sm uppercase tracking-wider w-24">S.No.</th>
                                    <th className="py-5 px-8 font-black text-oxford text-sm uppercase tracking-wider">Designation</th>
                                    <th className="py-5 px-8 font-black text-oxford text-sm uppercase tracking-wider">Faculty Member</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffList.slice(0, visibleStaff).map((staff, i) => (
                                    <tr key={staff.no} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                                        <td className="py-5 px-8 text-gray-400 font-bold">{i + 1}</td>
                                        <td className="py-5 px-8 text-gray-600 font-medium">
                                            {staff.designation}
                                        </td>
                                        <td className="py-5 px-8">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 rounded-full overflow-hidden bg-white shrink-0 border border-gray-200 group-hover:border-sandstone transition-colors shadow-sm flex items-center justify-center">
                                                    <User className="text-oxford/20" size={24} />
                                                </div>
                                                <span className="font-bold text-oxford text-lg group-hover:text-sandstone transition-colors">{staff.name}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {visibleStaff < staffList.length && (
                        <div className="mt-12 text-center">
                            <button
                                onClick={() => setVisibleStaff(prev => prev + 12)}
                                className="inline-flex items-center gap-3 px-10 py-4 bg-white text-oxford border border-gray-200 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:border-sandstone hover:text-sandstone transition-all group"
                            >
                                Meet All Faculty Members
                                <div className="w-6 h-6 rounded-full bg-oxford/5 flex items-center justify-center group-hover:bg-sandstone/10 transition-colors">
                                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* School Uniform & General Instructions Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                    <div className="bg-oxford/5 rounded-3xl p-8 md:p-12 border border-oxford/10">
                        <h3 className="text-2xl font-bold text-oxford mb-6 flex items-center gap-3">
                            <Star className="text-sandstone fill-sandstone" />
                            SCHOOL UNIFORM
                        </h3>
                        <div className="space-y-8 text-gray-700">
                            <div>
                                <h4 className="font-bold text-oxford text-lg mb-4 border-b border-oxford/10 pb-2">Nursery to VIII</h4>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex gap-3 items-start">
                                        <CheckCircle2 size={18} className="text-green-600 mt-0.5 shrink-0" />
                                        <span>Black & white check tunic with off-white shirt & belt.</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <CheckCircle2 size={18} className="text-green-600 mt-0.5 shrink-0" />
                                        <span>Black ankle length socks with off white strips & Black shoes.</span>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <CheckCircle2 size={18} className="text-green-600 mt-0.5 shrink-0" />
                                        <span>White band/hair pins.</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-oxford text-lg mb-4 border-b border-oxford/10 pb-2">Class IX & XII</h4>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex gap-3 items-start">
                                        <CheckCircle2 size={18} className="text-green-600 mt-0.5 shrink-0" />
                                        <span>Black & white check kurta, off-white salwar and off-white dupatta.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-oxford">General Instructions</h2>
                        <div className="grid gap-4">
                            {[
                                { title: "Regularity", desc: "Minimum 75% attendance is mandatory." },
                                { title: "Mobile Phones", desc: "Strictly prohibited. Confiscated gadgets will not be returned." },
                                { title: "Bullying", desc: "Zero tolerance policy. Immediate disciplinary action for offenders." },
                                { title: "Hygiene", desc: "Nails trimmed, clean uniform. Makeup/jewelry not permitted." }
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
            <section className="py-20 px-6 bg-sandstone relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-oxford mb-8 uppercase tracking-tighter">Admissions Open 2024-25</h2>
                    <p className="text-xl text-oxford/70 font-medium mb-12 max-w-2xl mx-auto">
                        Empower your daughter with quality education and a nurturing environment. Join the LPS family today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <a href="tel:6377203204" className="px-10 py-5 bg-oxford text-white rounded-full font-bold uppercase tracking-widest text-xs shadow-2xl hover:bg-white hover:text-oxford transition-all flex items-center justify-center gap-3">
                            <Phone size={18} /> Call Us: 6377203204
                        </a>
                        <a href="#contact" className="px-10 py-5 bg-white text-oxford rounded-full font-bold uppercase tracking-widest text-xs shadow-2xl hover:shadow-inner transition-all flex items-center justify-center gap-3">
                            Visit Our Campus
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
