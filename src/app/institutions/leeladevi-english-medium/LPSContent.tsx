"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    BookOpen, Trophy, School, Users, Star, Microscope,
    Medal, Phone, MapPin, Mail, CheckCircle2,
    Music, Calendar, User, FileText, Sparkles
} from "lucide-react";
import Image from "next/image";

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

const houseList = [
    "Rani Lakshmi Bai",
    "Sarojani Naidu",
    "Padmawati",
    "Vijaya Lakshmi"
];

const clubList = [
    { id: 1, name: "LEGAL AWARENESS" },
    { id: 2, name: "N.C.C." },
    { id: 3, name: "GUIDE + BULBUL" },
    { id: 4, name: "ROAD SAFETY" },
    { id: 5, name: "LITERARY" },
    { id: 6, name: "MATHS" },
    { id: 7, name: "LIFE SKILL" },
    { id: 8, name: "RED CROSS" },
    { id: 9, name: "ECO" },
    { id: 10, name: "I.T." },
    { id: 11, name: "ORATORY" },
    { id: 12, name: "HERITAGE" },
    { id: 13, name: "ART & CRAFT" },
    { id: 14, name: "EK BHARAT SHRESTH BHARAT" },
    { id: 15, name: "CULTURAL" },
    { id: 16, name: "MUSIC" },
    { id: 17, name: "SCIENCE" },
    { id: 18, name: "READERS" },
    { id: 19, name: "DANCE" },
    { id: 20, name: "THEATER & DRAMA" },
    { id: 21, name: "SWACHHA VIDYALAYA" },
    { id: 22, name: "SUPW" },
    { id: 23, name: "CYBER CLUB" },
    { id: 24, name: "SANSKRIT" },
    { id: 25, name: "KIDS" },
    { id: 26, name: "SPORTS" },
    { id: 27, name: "YUVA TOURISM" },
    { id: 28, name: "ELECTORAL LITERACY CLUB" }
];

export default function LPSContent() {
    const [visibleClubs, setVisibleClubs] = useState(10);
    const [visibleStaff, setVisibleStaff] = useState(10);

    const loadMoreClubs = () => setVisibleClubs(prev => prev + 10);
    const loadMoreStaff = () => setVisibleStaff(prev => prev + 10);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 bg-oxford/90 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sandstone/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row gap-8 items-center mb-10"
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-sandstone overflow-hidden bg-white shrink-0 shadow-xl flex items-center justify-center">
                            <Image
                                src="/lps.jpg"
                                alt="LPS Logo"
                                width={160}
                                height={160}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div>
                            <span className="text-sandstone font-bold uppercase tracking-widest text-sm mb-4 block">Affiliated to CBSE, New Delhi</span>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                                Leeladevi Parasmal Sancheti English Medium Sr.Sec.School
                            </h1>
                            <div className="flex flex-wrap gap-4 items-center text-white/80">
                                <div className="px-4 py-1.5 bg-sandstone/20 rounded-full border border-sandstone/30 text-sandstone font-bold text-sm uppercase">
                                    Vidyawadi, Pali
                                </div>
                                <div className="px-4 py-1.5 bg-white/10 rounded-full border border-white/20 text-white font-bold text-sm uppercase">
                                    Residential School for Girls
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid md:grid-cols-3 gap-8 text-sm font-medium text-white/80 border-t border-white/10 pt-10"
                    >
                        <div className="flex items-start gap-3">
                            <MapPin className="text-sandstone shrink-0" size={20} />
                            <span>Vidyawadi, Khimel, Station-Rani,<br />Distt.-Pali (Raj.) 306115</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="text-sandstone shrink-0" size={20} />
                            <a href="tel:6377203204" className="hover:text-sandstone transition-colors">6377203204</a>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail className="text-sandstone shrink-0" size={20} />
                            <div className="flex flex-col">
                                <a href="mailto:lpsvidhyawadi@gmail.com" className="hover:text-sandstone transition-colors">lpsvidhyawadi@gmail.com</a>
                                <a href="http://www.lpsvidhyawadi.com" target="_blank" rel="noopener noreferrer" className="hover:text-sandstone transition-colors">www.lpsvidhyawadi.com</a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Principal's Message & Vision */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-oxford mb-6">Principal’s Message</h2>
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 italic text-gray-700 leading-relaxed relative">
                            <span className="absolute top-4 left-4 text-6xl text-sandstone/20 font-serif">"</span>
                            <p className="mb-4">
                                Dear Students, Parents, and Community Members,
                            </p>
                            <p className="mb-4">
                                Welcome to LPS, Vidyawadi, where we take pride in fostering a nurturing environment that empowers every learner to grow into a confident, compassionate, and globally-minded citizen.
                            </p>
                            <p className="mb-4">
                                Founded in 2004, situated in the rural belt of Pali District in Rajasthan, this Vidyalaya is a residential school providing quality education from Nursery to XII primarily for girls, with a noble thought of promoting girls’ education. Presently, the School accommodates more than 1000 girls.
                            </p>
                            <p className="mb-4">
                                At our core, we embrace a vision to nurture global citizens who are equipped to thrive in an ever-changing world. Our mission is to provide a healthy learning environment where every student feels safe, valued, and inspired to pursue excellence.
                            </p>
                            <p>
                                Together, let us work to create a future where every child shines brightly, empowered to shape their destiny and contribute meaningfully to the global community.
                            </p>
                            <div className="mt-8 flex flex-col items-center sm:items-start gap-4">
                                <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-sandstone shadow-xl">
                                    <Image
                                        src="/images/english school/principle.jpg"
                                        alt="Principal"
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="font-bold text-oxford">
                                    <p className="text-xl">Ms. Jyoti Nath</p>
                                    <p className="text-sm text-sandstone-dark uppercase tracking-widest">Principal</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-oxford mb-6">Our School</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                LPS Vidyawadi is known for its reputation and adherence to quality education, State of Art Infrastructure, and facilities like Sports, Bharat Scout & Guide, and National Cadet Corps (NCC). We offer maximum subject choices and engage students in traditional and innovative educational methods.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                                <h3 className="text-xl font-bold text-oxford mb-2 flex items-center gap-2">
                                    <Sparkles className="text-sandstone" />
                                    Values
                                </h3>
                                <ul className="space-y-3 text-gray-600 text-sm">
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-sandstone shrink-0" /><span><strong>Discover Yourself:</strong> Explore unique talents and interests.</span></li>
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-sandstone shrink-0" /><span><strong>Be Your Own Light:</strong> Lead with integrity and wisdom.</span></li>
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-sandstone shrink-0" /><span><strong>Make Your Own Path:</strong> Inspire independent thinking and courage.</span></li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Houses & Clubs Section */}
            <section className="py-24 px-6 bg-oxford/5 border-y border-oxford/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-1">
                            <span className="text-sandstone font-bold uppercase tracking-widest text-sm block mb-2">Internal Organization</span>
                            <h2 className="text-3xl md:text-4xl font-black text-oxford mb-6">Houses & Councils</h2>
                            <p className="text-gray-600 leading-relaxed mb-8 text-sm">
                                To foster competition, teamwork, and leadership, we follow a vibrant House system. Every student is part of a legacy that encourages them to excel in academics and co-curricular activities.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {houseList.map((house, i) => (
                                    <div key={i} className="p-4 bg-white border border-sandstone/10 rounded-2xl text-center text-sm font-black text-oxford shadow-sm hover:border-sandstone transition-colors group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-sandstone mx-auto mb-2 opacity-30 group-hover:opacity-100 transition-opacity" />
                                        {house}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <h3 className="text-2xl font-bold text-oxford mb-8 flex items-center gap-3">
                                <Trophy className="text-sandstone" />
                                Student Clubs
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {clubList.slice(0, visibleClubs).map((club) => (
                                    <div key={club.id} className="p-3 bg-white border border-gray-100 rounded-xl flex items-center gap-3 hover:border-sandstone transition-all hover:shadow-md group">
                                        <span className="w-8 h-8 flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center text-[11px] font-black text-gray-400 group-hover:bg-sandstone/10 group-hover:text-sandstone transition-colors">
                                            {club.id}
                                        </span>
                                        <span className="text-[11px] font-bold text-oxford/80 leading-tight uppercase tracking-tight group-hover:text-oxford transition-colors">
                                            {club.name}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {visibleClubs < clubList.length && (
                                <div className="mt-8 flex justify-center">
                                    <button
                                        onClick={loadMoreClubs}
                                        className="px-6 py-2.5 bg-oxford text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-sandstone transition-colors shadow-lg"
                                    >
                                        View More Clubs
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Academics */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm block mb-2">Academic Excellence</span>
                        <h2 className="text-3xl md:text-5xl font-black text-oxford">Curriculum & Structure</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {["Foundational (Nursery – II)", "Preparatory (III to V)", "Middle (VI to VIII)", "Secondary (IX & XII)"].map((stage, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm text-center font-bold text-oxford border border-gray-100 hover:border-sandstone transition-colors">
                                {stage}
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-oxford mb-6">Senior Secondary Streams (XI & XII)</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <div className="h-2 w-12 bg-blue-500 rounded-full" />
                                <h4 className="text-xl font-black text-oxford">Science</h4>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    <li>English Core</li>
                                    <li>Physics</li>
                                    <li>Chemistry</li>
                                    <li>Maths / Biology</li>
                                    <li>Economics</li>
                                    <li>Computer Science / Multimedia / Painting / Dance / PE</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <div className="h-2 w-12 bg-green-500 rounded-full" />
                                <h4 className="text-xl font-black text-oxford">Commerce</h4>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    <li>English Core</li>
                                    <li>Accountancy</li>
                                    <li>Business Studies</li>
                                    <li>Economics</li>
                                    <li>Maths</li>
                                    <li>Computer Science / Multimedia / Painting / Dance / PE</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <div className="h-2 w-12 bg-orange-500 rounded-full" />
                                <h4 className="text-xl font-black text-oxford">Humanities</h4>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    <li>English Elective / Core</li>
                                    <li>Political Science</li>
                                    <li>History</li>
                                    <li>Geography / Music / Economics</li>
                                    <li>Hindi Core / Computer Science / Multimedia</li>
                                    <li>Painting / Dance (Kathak)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <h4 className="font-bold text-oxford mb-4">Skill & Vocational Courses</h4>
                            <div className="flex flex-wrap gap-2">
                                {["Information Technology", "Food Nutrition & Dietetics", "AI", "Block Printing", "Rockets", "Design Thinking", "Satellites", "Financial Literacy", "Handicraft", "Marketing", "Tourism", "Digital Citizenship", "Beauty & Wellness"].map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Toppers */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm block mb-2">Hall of Fame</span>
                        <h2 className="text-3xl md:text-5xl font-black text-oxford">Result Highlights 2023-24</h2>
                    </div>

                    <div className="space-y-16">
                        {/* Class XII */}
                        <div>
                            <h3 className="text-2xl font-bold text-oxford mb-8 text-center flex items-center justify-center gap-3">
                                <Trophy className="text-sandstone" />
                                Class XII Toppers
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {toppers12.map((student, i) => (
                                    <div key={i} className="bg-gray-50 p-6 rounded-2xl text-center border border-transparent hover:border-sandstone/30 hover:shadow-lg transition-all group">
                                        <div className="w-16 h-16 rounded-full bg-sandstone/10 mx-auto mb-4 flex items-center justify-center text-sandstone font-black text-xl group-hover:bg-sandstone group-hover:text-white transition-colors overflow-hidden">
                                            {student.image ? (
                                                <Image
                                                    src={student.image}
                                                    alt={student.name}
                                                    width={100}
                                                    height={100}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                student.percentage.split('.')[0]
                                            )}
                                        </div>
                                        <h4 className="font-bold text-oxford mb-1">{student.name}</h4>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{student.stream}</p>
                                        <p className="text-lg font-black text-sandstone mt-2">{student.percentage}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Class X */}
                        <div>
                            <h3 className="text-2xl font-bold text-oxford mb-8 text-center flex items-center justify-center gap-3">
                                <Star className="text-sandstone" />
                                Class X Toppers
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {toppers10.map((student, i) => (
                                    <div key={i} className="bg-gray-50 p-6 rounded-2xl text-center border border-transparent hover:border-sandstone/30 hover:shadow-lg transition-all">
                                        {student.image && (
                                            <div className="w-20 h-20 rounded-full bg-sandstone/10 mx-auto mb-4 overflow-hidden border-2 border-transparent hover:border-sandstone transition-all">
                                                <Image
                                                    src={student.image}
                                                    alt={student.name}
                                                    width={100}
                                                    height={100}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <h4 className="font-bold text-oxford mb-1">{student.name}</h4>
                                        <p className="text-lg font-black text-sandstone mt-2">{student.percentage}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Non-Board */}
                        <div>
                            <h3 className="text-xl font-bold text-oxford mb-8 text-center">Class Toppers (Non-Board)</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                {nonBoardToppers.map((student, i) => (
                                    <div key={i} className="px-6 py-3 bg-gray-50 rounded-full border border-gray-100 flex items-center gap-3 text-sm pr-2">
                                        {student.image && (
                                            <div className="w-8 h-8 rounded-full overflow-hidden border border-sandstone/20">
                                                <Image
                                                    src={student.image}
                                                    alt={student.name}
                                                    width={50}
                                                    height={50}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <span className="font-bold text-oxford">{student.name}</span>
                                        <span className="px-2 py-0.5 bg-sandstone/20 text-sandstone text-xs font-black rounded mr-2">{student.class}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities & Activities */}
            <section className="py-24 px-6 bg-oxford text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <Microscope className="text-sandstone" />
                                    Laboratories & Library
                                </h3>
                                <p className="text-white/70 leading-relaxed">
                                    Our laboratories (Maths, Biology, Physics, Chemistry, Painting, Music, Computer) are integral to our curriculum, enabling deep conceptual understanding. Our library is well-equipped with newspapers, magazines, and encyclopedias to foster reading habits.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <ShieldStar className="text-sandstone" />
                                    NCC & Scouts
                                </h3>
                                <p className="text-white/70 leading-relaxed">
                                    <strong>NCC:</strong> Introduced in 2014, now with 50 cadets preparing for the Indian Armed Forces.<br />
                                    <strong>Bharat Scout & Guide:</strong> Active since 2016-17, currently training 51 students.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                                {[
                                    { src: "/images/english school/7e7ad0cf-7675-40dc-b2d9-a7a4dc3053a4.jpg", alt: "Yoga" },
                                    { src: "/images/english school/6d8b41a6-cf4a-4f8f-9530-ea59b75c9377.jpg", alt: "Hula Hoop" },
                                    { src: "/images/english school/a200f34b-f2de-4939-9049-944380c69594.jpg", alt: "Athletics - Manisha" },
                                    { src: "/images/english school/da326549-dcf6-4c5d-baa6-425a657140c6.jpg", alt: "Rifle Shooting - Kritika" },
                                    { src: "/images/english school/9bd3aa78-5651-4fab-b2c0-c30cde54fb2b.jpg", alt: "Sports Achievement" },
                                    { src: "/uploads/mess/skate.jpg", alt: "Sports Achievement" },
                                ].map((img, i) => (
                                    <div key={i} className="aspect-[4/5] rounded-xl overflow-hidden border border-white/10 group relative">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                            <p className="text-[10px] font-bold text-white uppercase tracking-tight">{img.alt}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-6">Sports Achievements 2024-25</h3>

                            <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                                <AchievementItem title="District Badminton (U-19)" desc="Girls secured 2nd position. One selected for state-level." />
                                <AchievementItem title="District Rifle Shooting (U-17)" desc="Team secured 2nd position. Pratibha (1st), Kritika (2nd), KirtiRaj (3rd). All selected for state." />
                                <AchievementItem title="Rifle Shooting (U-19)" desc="Team secured 1st position. Hrishija & Himakshi Khechi selected for state." />
                                <AchievementItem title="District Skating" desc="Dhruvi (Class 6th) secured 3rd position & selected for state." />
                                <AchievementItem title="Athletics (U-19)" desc="Manisha (1st in Long Jump), Chetna (2nd in Shot Put)." />
                                <AchievementItem title="Athletics (U-17)" desc="Poonam, Bhawna, Mamta, Bhavya secured top positions and selected for state." />
                                <AchievementItem title="Athletics (U-14)" desc="Overall Championship. Multiple students (Leela, Rushkarshi, Hetal, Kanishka) selected for state." />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Modern Infrastructure Section */}
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
                            { name: "Physics Laboratory" },
                            { name: "Chemistry Laboratory", img: "/chemistry.jpg" },
                            { name: "Biology Laboratory", img: "/bio.jpg" },
                            { name: "Mathematics Lab" },
                            { name: "Music & Painting Studio", img: "/images/english school/93b4f897-0aca-4189-a717-16c13f8372d5.jpg" },
                            { name: "Geography Laboratory" },
                            { name: "NCC & Guide", img: "/llll-AAA.jpeg" },
                            { name: "Library", img: "/images/english school/706b5bd7-1cbd-40f0-a48f-2ec78225ac48.jpg" },
                            { name: "Computer Center", img: "/images/english school/344537e3-f907-4894-b74e-6c120656cc03.jpg" },
                            { name: "Multimedia Room", img: "/images/english school/a40160d0-ce25-4bad-818d-e2e729dc47f4.jpg" },
                            { name: "Safe & Secure Campus", img: "https://journalistsresource.org/wp-content/uploads/2014/02/surveillance-camera-860x466.jpg" }
                        ].map((facility, i) => (
                            <div key={i} className="group overflow-hidden rounded-[2.5rem] bg-white shadow-xl hover:shadow-2xl transition-all border border-oxford/5">
                                <div className="h-64 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-oxford/20 group-hover:bg-transparent transition-colors z-10" />
                                    {facility.img ? (
                                        <img
                                            src={facility.img}
                                            alt={facility.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-white flex items-center justify-center">
                                            <Microscope className="text-gray-100 w-20 h-20" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 inset-x-0 p-6 z-20 bg-gradient-to-t from-oxford/90 to-transparent">
                                        <h3 className="font-bold text-white text-lg">{facility.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Staff List */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-oxford">LPS School Navigators</h2>
                        <p className="text-gray-500 mt-2">Meet our dedicated faculty and staff</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {staffList.slice(0, visibleStaff).map((staff) => (
                            <div key={staff.no} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 hover:border-sandstone transition-colors">
                                <div className="w-10 h-10 rounded-full bg-oxford/5 flex items-center justify-center text-oxford font-bold text-sm shrink-0">
                                    {staff.no}
                                </div>
                                <div>
                                    <h4 className="font-bold text-oxford text-sm">{staff.name}</h4>
                                    <p className="text-xs text-gray-500">{staff.designation}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {visibleStaff < staffList.length && (
                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={loadMoreStaff}
                                className="px-8 py-3 bg-white border-2 border-oxford text-oxford text-sm font-black uppercase tracking-widest rounded-full hover:bg-oxford hover:text-white transition-all shadow-md"
                            >
                                View More Navigators
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Rules & Regulations */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-oxford mb-8 text-center">General Instructions & Uniform</h2>

                    <div className="space-y-8">
                        <div className="bg-gray-50 p-8 rounded-3xl">
                            <h3 className="font-bold text-oxford mb-4">School Uniform</h3>
                            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                                <div>
                                    <strong className="block text-sandstone mb-2">Nursery to VIII</strong>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>Black & white check tunic with off-white shirt & belt.</li>
                                        <li>Black ankle length socks with off white strips & Black shoes.</li>
                                        <li>White band/hair pins.</li>
                                    </ul>
                                </div>
                                <div>
                                    <strong className="block text-sandstone mb-2">Class IX & XII</strong>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>Black & white check kurta, off-white salwar and off-white dupatta.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm text-gray-600">
                            <p><strong>Regularity:</strong> Minimum 75% attendance is mandatory.</p>
                            <p><strong>Mobile Phones:</strong> Strictly prohibited. Confiscated gadgets will not be returned.</p>
                            <p><strong>Bullying:</strong> Zero tolerance policy. Immediate disciplinary action for offenders.</p>
                            <p><strong>Hygiene:</strong> Nails trimmed, clean uniform. Makeup/jewelry not permitted.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 px-6 bg-sandstone relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-oxford mb-8 uppercase tracking-tighter">Admissions Open 2025-26</h2>
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
        </div>

    );
}

function AchievementItem({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-full bg-sandstone/20 flex items-center justify-center text-sandstone shrink-0">
                <Trophy size={18} />
            </div>
            <div>
                <h4 className="font-bold text-white text-sm">{title}</h4>
                <p className="text-xs text-white/70 mt-1">{desc}</p>
            </div>
        </div>
    );
}

function ShieldStar({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m12 8 2 2 2-2-2 4 2 2H8l2-2-2-4 2 2 2-2z" />
        </svg>
    )
}
