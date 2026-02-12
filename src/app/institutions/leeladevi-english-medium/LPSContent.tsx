"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    BookOpen, Trophy, School, Users, Star, Microscope,
    Medal, Phone, MapPin, Mail, CheckCircle2,
    Music, Calendar, User, FileText, Sparkles, ShieldCheck,
    Globe, ArrowRight
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

const toppers12 = [
    { name: "Ms. Ankur Kanwar", stream: "Science", percentage: "97.40%", image: "/images/english school/Ankur Kunwar.jpg" },
    { name: "Ms. Himanshi Jain", stream: "Science", percentage: "94.80%", image: "/images/english school/Himanshi Jain.jpg" },
    { name: "Ms. Niral", stream: "Commerce", percentage: "93.60%", image: "/images/english school/Niral.jpg" },
    { name: "Ms. Ishita Chouhan", stream: "Humanities", percentage: "92.60%", image: "" },
    { name: "Ms. Manjari Vaishnav", stream: "Humanities", percentage: "92.40%", image: "/images/english school/Manjari vaishnav.jpg" },
    { name: "Ms. Alfina", stream: "Humanities", percentage: "91.00%", image: "/images/english school/alfina.jpg" },
    { name: "Ms. Laxita Rahore", stream: "Humanities", percentage: "90.00%", image: "/images/english school/Lakshita rathore.jpg" },
    { name: "Ms. Yuti Sharma", stream: "Humanities", percentage: "89.80%", image: "/images/english school/Yuti Sharma.jpg" },
    { name: "Ms. Sofia Khan", stream: "Humanities", percentage: "89.20%", image: "/images/english school/Sofia khan.jpg" },
    { name: "Ms. Taruna", stream: "Humanities", percentage: "89.00%", image: "/images/english school/taruna.jpg" },
];

const toppers10 = [
    { name: "Ms. Rajal Rajpurohit", percentage: "93.80%", image: "" },
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
    { name: "Ms. Sakshi Deora", percentage: "85.00%", image: "/images/english school/sakshi deora.jpg" },
];

const nonBoardToppers = [
    { name: "Ms. Shivgami Chouhan", class: "I", image: "" },
    { name: "Ms. Priyadarshni", class: "II", image: "" },
    { name: "Ms. Kinjal Dewasi", class: "III", image: "" },
    { name: "Ms. Poorvi Pareek", class: "IV", image: "" },
    { name: "Ms. Chetnya Rathore", class: "V", image: "" },
    { name: "Ms. Abhigya", class: "VI", image: "" },
    { name: "Ms. Dimpy Malviya", class: "VII", image: "" },
    { name: "Ms. Tamanna", class: "VIII", image: "" },
    { name: "Ms. Preksha", class: "IX", image: "" },
    { name: "Ms. Tanisha Jain", class: "XI Sci", image: "/images/english school/Tanisha jain.jpg" },
    { name: "Ms. Mehak Jain", class: "XI Com", image: "" },
    { name: "Ms. Jaishree", class: "XI Hum", image: "" },
];

export default function LPSContent() {
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Pagination states
    const [visibleToppers, setVisibleToppers] = useState(10);
    const [visibleStaff, setVisibleStaff] = useState(12);

    // Combined toppers for the table
    const allToppers = [
        ...toppers12.map(t => ({ ...t, class: "XII", description: `Class XII ${t.stream} Topper` })),
        ...toppers10.map(t => ({ ...t, class: "X", stream: "-", description: "Class X Board Exam Topper" }))
    ];

    const openModal = (student: any) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedStudent(null), 300);
    };

    return (
        <main className="min-h-screen bg-white">
            <StudentModal isOpen={isModalOpen} onClose={closeModal} student={selectedStudent} />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 bg-oxford/90 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sandstone/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <span className="text-sandstone font-bold uppercase tracking-widest text-sm mb-4 block">Affiliated to CBSE, New Delhi</span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        Leeladevi Parasmal Sancheti English Medium Sr.Sec.School
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-light mb-10 max-w-3xl">
                        A premier residential school for girls in Pali, Rajasthan
                    </p>

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
                                <a href="mailto:lpsvidhyawadi@gmail.com" className="hover:text-sandstone transition-colors">lpsvidhyawadi@gmail.com</a>
                                <a href="http://www.lpsvidhyawadi.com" target="_blank" rel="noopener noreferrer" className="hover:text-sandstone transition-colors">www.lpsvidhyawadi.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section (Principal's Message & Vision) */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-oxford mb-6">Principal’s Message</h2>
                        <div className="prose text-gray-600 leading-relaxed space-y-4 mb-8">
                            <p className="italic">
                                "Welcome to LPS, Vidyawadi, where we take pride in fostering a nurturing environment that empowers every learner to grow into a confident, compassionate, and globally-minded citizen."
                            </p>
                            <p>
                                Dear Students, Parents, and Community Members,
                            </p>
                            <p>
                                Founded in 2004, situated in the rural belt of Pali District in Rajasthan, this Vidyalaya is a residential school providing quality education from Nursery to XII primarily for girls, with a noble thought of promoting girls’ education. Presently, the School accommodates more than 1000 girls.
                            </p>
                            <p>
                                At our core, we embrace a vision to nurture global citizens who are equipped to thrive in an ever-changing world. Our mission is to provide a healthy learning environment where every student feels safe, valued, and inspired to pursue excellence.
                            </p>
                            <p>
                                Together, let us work to create a future where every child shines brightly, empowered to shape their destiny and contribute meaningfully to the global community.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sandstone shadow-lg">
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
                            <h3 className="text-2xl font-bold text-oxford mb-6 flex items-center gap-3">
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
                            <h3 className="text-xl font-bold mb-4 relative z-10">Our School</h3>
                            <p className="text-white/80 text-sm leading-relaxed relative z-10">
                                LPS Vidyawadi is known for its reputation and adherence to quality education, State of Art Infrastructure, and facilities like Sports, Bharat Scout & Guide, and National Cadet Corps (NCC). We offer maximum subject choices and engage students in traditional and innovative educational methods.
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
                        <h2 className="text-3xl md:text-5xl font-bold text-oxford mt-2">Curriculum & Structure</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Providing a comprehensive and balanced educational framework from foundational to secondary levels.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {[
                            { title: "Foundational", level: "Nursery – II", icon: Star },
                            { title: "Preparatory", level: "III to V", icon: BookOpen },
                            { title: "Middle", level: "VI to VIII", icon: School },
                            { title: "Secondary", level: "IX & XII", icon: Trophy },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-sandstone text-center hover:-translate-y-2 transition-transform group">
                                <div className="w-12 h-12 bg-oxford/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sandstone transition-colors">
                                    <stat.icon className="text-sandstone group-hover:text-white transition-colors" size={24} />
                                </div>
                                <h3 className="text-gray-500 font-bold uppercase text-xs tracking-wider mb-2">{stat.title}</h3>
                                <p className="text-2xl font-black text-oxford">{stat.level}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-oxford/10">
                        <h3 className="text-3xl font-bold text-oxford mb-8 flex items-center gap-3">
                            <Sparkles className="text-sandstone" />
                            Senior Secondary Streams (XI & XII)
                        </h3>
                        <div className="grid md:grid-cols-3 gap-12">
                            {[
                                {
                                    title: "Science",
                                    color: "bg-blue-500",
                                    subjects: ["English Core", "Physics", "Chemistry", "Maths / Biology", "Economics", "Optional: CS, Painting, Dance, PE"]
                                },
                                {
                                    title: "Commerce",
                                    color: "bg-green-500",
                                    subjects: ["English Core", "Accountancy", "Business Studies", "Economics", "Maths", "Optional: CS, Painting, Dance, PE"]
                                },
                                {
                                    title: "Humanities",
                                    color: "bg-orange-500",
                                    subjects: ["English Elective / Core", "Political Science", "History", "Geography / Music / Economics", "Hindi Core", "Optional: CS, Painting, Dance (Kathak)"]
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

                        <div className="mt-16 pt-10 border-t border-gray-100">
                            <h4 className="font-bold text-oxford mb-6 uppercase tracking-wider text-sm">Skill & Vocational Courses</h4>
                            <div className="flex flex-wrap gap-3">
                                {["Information Technology", "Food Nutrition & Dietetics", "AI", "Block Printing", "Rockets", "Design Thinking", "Satellites", "Financial Literacy", "Handicraft", "Marketing", "Tourism", "Digital Citizenship", "Beauty & Wellness"].map((skill, i) => (
                                    <span key={i} className="px-4 py-2 bg-oxford/5 text-oxford text-xs rounded-full font-bold hover:bg-sandstone hover:text-white transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meritorious Students Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Meritorious Students</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-oxford mt-2">Result Highlights 2023-24</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Celebrating the academic excellence and dedication of our top performers in board exams.
                        </p>
                    </div>

                    <div className="space-y-16">
                        {/* Class XII & X Table */}
                        <div className="overflow-x-auto rounded-3xl border border-oxford/10 shadow-xl bg-white">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-oxford text-white">
                                        <th className="p-6 font-bold uppercase tracking-wider text-xs">S.No.</th>
                                        <th className="p-6 font-bold uppercase tracking-wider text-xs">Student Name</th>
                                        <th className="p-6 font-bold uppercase tracking-wider text-xs">Class</th>
                                        <th className="p-6 font-bold uppercase tracking-wider text-xs">Stream</th>
                                        <th className="p-6 font-bold uppercase tracking-wider text-xs text-right">Percentage</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {allToppers.slice(0, visibleToppers).map((student, i) => (
                                        <motion.tr
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            key={i}
                                            className="hover:bg-oxford/5 transition-colors group cursor-pointer"
                                            onClick={() => openModal(student)}
                                        >
                                            <td className="p-6 text-sm text-gray-500 font-medium">{i + 1}</td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-oxford/10 group-hover:border-sandstone transition-colors">
                                                        {student.image ? (
                                                            <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <User className="w-full h-full p-2 text-oxford/20" />
                                                        )}
                                                    </div>
                                                    <span className="font-bold text-oxford group-hover:text-sandstone transition-colors">{student.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-sm font-bold text-gray-600">{student.class}</td>
                                            <td className="p-6 text-sm text-gray-500 font-medium">{student.stream}</td>
                                            <td className="p-6 text-right">
                                                <span className="px-4 py-1 bg-sandstone/10 text-sandstone font-black rounded-lg">{student.percentage}</span>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {visibleToppers < allToppers.length && (
                            <div className="flex justify-center mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setVisibleToppers(prev => prev + 10)}
                                    className="px-8 py-3 bg-oxford text-white rounded-full font-bold uppercase tracking-wider shadow-lg hover:bg-sandstone transition-colors flex items-center gap-2"
                                >
                                    Load 10 More Results
                                    <ArrowRight size={18} />
                                </motion.button>
                            </div>
                        )}

                        {/* Non-Board Tags */}
                        <div className="bg-oxford rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden text-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-sandstone/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                            <h3 className="text-2xl font-bold text-white mb-8 relative z-10 flex items-center justify-center gap-3">
                                <Star className="text-sandstone fill-sandstone" />
                                Class Toppers (Non-Board)
                            </h3>
                            <div className="flex flex-wrap justify-center gap-4 relative z-10">
                                {nonBoardToppers.map((student, i) => (
                                    <div
                                        key={i}
                                        className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center gap-3 text-sm hover:bg-white/20 transition-all cursor-pointer group"
                                        onClick={() => openModal({ ...student, description: `Class ${student.class} Topper` })}
                                    >
                                        <span className="font-bold text-white group-hover:text-sandstone transition-colors">{student.name}</span>
                                        <span className="px-2 py-0.5 bg-sandstone text-oxford text-[10px] font-black rounded">{student.class}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Beyond Academics (Facilities & Activities) */}
            <section className="py-20 px-6 bg-oxford text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Co-Curricular Excellence</span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-2">Beyond Academics</h2>
                        <p className="text-white/80 mt-4 max-w-2xl mx-auto">
                            “With wings of courage and dreams, the sky is the limit.”
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                                <div className="w-12 h-12 bg-sandstone/20 rounded-2xl flex items-center justify-center text-sandstone mb-6 group-hover:scale-110 transition-transform">
                                    <Microscope size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">Laboratories</h3>
                                <p className="text-white/60 text-xs leading-relaxed">
                                    Maths, Biology, Physics, Chemistry, Painting, Music, Computer labs integral to curriculum.
                                </p>
                            </div>
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                                <div className="w-12 h-12 bg-sandstone/20 rounded-2xl flex items-center justify-center text-sandstone mb-6 group-hover:scale-110 transition-transform">
                                    <BookOpen size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">Library</h3>
                                <p className="text-white/60 text-xs leading-relaxed">
                                    Well-equipped with newspapers, magazines, and encyclopedias to foster reading habits.
                                </p>
                            </div>
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                                <div className="w-12 h-12 bg-sandstone/20 rounded-2xl flex items-center justify-center text-sandstone mb-6 group-hover:scale-110 transition-transform">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">NCC & Scouts</h3>
                                <p className="text-white/60 text-xs leading-relaxed">
                                    50 NCC cadets and 51 Bharat Scouts & Guides training for duty and excellence.
                                </p>
                            </div>
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                                <div className="w-12 h-12 bg-sandstone/20 rounded-2xl flex items-center justify-center text-sandstone mb-6 group-hover:scale-110 transition-transform">
                                    <Medal size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">Clubs</h3>
                                <p className="text-white/60 text-xs leading-relaxed">
                                    Kids, Literary, Drama, Oratory, Eco, and IT clubs for all-round development.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <div className="bg-sandstone p-6">
                                <h3 className="text-xl font-bold text-oxford flex items-center gap-3">
                                    <Trophy />
                                    Sports Achievements 2024-25
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-oxford/50 text-white border-b border-white/10">
                                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest">Competition</th>
                                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-right">Result</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[
                                            { title: "District Badminton (U-19)", desc: "2nd position. One selected for state." },
                                            { title: "District Rifle Shooting (U-17)", desc: "2nd position. 3 selected for state." },
                                            { title: "Rifle Shooting (U-19)", desc: "1st position. 2 selected for state." },
                                            { title: "District Skating", desc: "3rd position & selected for state." },
                                            { title: "Athletics (U-19)", desc: "1st (Long Jump), 2nd (Shot Put)." },
                                            { title: "Athletics (U-17)", desc: "Top positions. 4 selected for state." },
                                            { title: "Athletics (U-14)", desc: "Overall Championship. 4 selected for state." }
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
                        <h2 className="text-3xl md:text-5xl font-bold text-oxford mt-2">LPS School Navigators</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Meet our dedicated faculty and staff members committed to excellence.</p>
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
                                Load 12 More Navigators
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
                            School Uniform
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-sandstone text-sm uppercase tracking-wider mb-3">Nursery to VIII</h4>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Black & white check tunic, off-white shirt & belt</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Black ankle length socks with off white strips</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Black shoes, white band/hair pins</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-sandstone text-sm uppercase tracking-wider mb-3">Class IX & XII</h4>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Black & white check kurta, off-white salwar</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Off-white dupatta</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-oxford">General Instructions</h2>
                        <div className="grid gap-4">
                            {[
                                { title: "Regularity", desc: "Minimum 75% attendance is mandatory." },
                                { title: "Mobile Phones", desc: "Strictly prohibited on campus." },
                                { title: "Bullying", desc: "Zero tolerance policy for any form of harassment." },
                                { title: "Hygiene", desc: "Nails trimmed, clean uniform, no makeup/jewelry." }
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
                    <h2 className="text-4xl font-black text-oxford mb-6 uppercase tracking-tight">Admissions Open</h2>
                    <p className="text-xl text-oxford/80 font-medium mb-10">
                        Give your daughter the opportunity to grow into a confident, educated, and successful individual.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="tel:8764250887" className="px-8 py-4 bg-oxford text-white rounded-full font-bold uppercase tracking-wider shadow-lg hover:bg-white hover:text-oxford transition-all flex items-center justify-center gap-2">
                            Call: 8764250887
                            <Phone size={18} />
                        </a>
                        <a href="#contact" className="px-8 py-4 bg-white text-oxford rounded-full font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                            Visit Campus
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
