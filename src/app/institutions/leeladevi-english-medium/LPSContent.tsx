"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    BookOpen, Trophy, School, Users, Star, Microscope,
    Medal, Phone, MapPin, Mail, CheckCircle2,
    Music, Calendar, User, FileText, Sparkles
} from "lucide-react";
import Image from "next/image";

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
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-sandstone overflow-hidden bg-white shrink-0 shadow-xl">
                            {/* Placeholder for School Logo if specific one exists, else using existing or generic */}
                            <School size={80} className="text-oxford m-auto h-full" />
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
                            <a href="tel:8764250887" className="hover:text-sandstone transition-colors">8764250887</a>
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
                                    <Medal className="text-sandstone" />
                                    Co-Scholastic & Clubs
                                </h3>
                                <p className="text-white/70 leading-relaxed">
                                    Maximum subject choices and activities like Kids, Literary, Drama, Oratory, Eco, IT, and more. House system (Rani Lakshmi Bai, Padmavati, Sarojini Naidu, Vijaya Lakshmi) fosters teamwork and competition.
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
                        </div>

                        <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-6">Sports Achievements 2024-25</h3>
                            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
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

            {/* Staff List */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-oxford">LPS School Navigators</h2>
                        <p className="text-gray-500 mt-2">Meet our dedicated faculty and staff</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {staffList.map((staff) => (
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
