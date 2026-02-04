"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import { BookOpen, Trophy, School, Users, Star, Microscope, Medal, Phone, MapPin, Globe, CheckCircle2 } from "lucide-react";
import StudentResultsTable from "@/components/StudentResultsTable";
import StudentModal from "@/components/StudentModal";

export default function MarudharContent() {
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 bg-oxford/90 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sandstone/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <span className="text-sandstone font-bold uppercase tracking-widest text-sm mb-4 block">Senior Secondary School (RBSE)</span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        Marudhar Balika Vidyapeeth
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-light mb-10 max-w-3xl">
                        Empowering Girls Through Education, Excellence & Values
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 text-sm font-medium text-white/80">
                        <div className="flex items-start gap-3">
                            <MapPin className="text-sandstone shrink-0" size={20} />
                            <span>Khimel, Station Rani – 306115,<br />District Pali (Rajasthan)</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="text-sandstone shrink-0" size={20} />
                            <div className="flex flex-col">
                                <a href="tel:6377204205" className="hover:text-sandstone transition-colors">6377204205</a>
                                <a href="tel:6377204207" className="hover:text-sandstone transition-colors">6377204207</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Globe className="text-sandstone shrink-0" size={20} />
                            <a href="https://www.vidyawadi.org" target="_blank" rel="noopener noreferrer" className="hover:text-sandstone transition-colors">www.vidyawadi.org</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-oxford mb-6">Shaping Bright Futures for Girls (Class VI–XII)</h2>
                        <div className="prose text-gray-600 leading-relaxed space-y-4">
                            <p>
                                Marudhar Balika Vidyapeeth is a premier girls’ senior secondary school dedicated to academic excellence, character building, and all-round development. Managed by Marudhar Mahila Shikshan Sangh, our institution provides quality education in Hindi & English Medium under RBSE.
                            </p>
                            <p className="text-lg font-medium text-oxford">
                                "We believe that educated girls build stronger families, communities, and the nation."
                            </p>
                        </div>
                        <button className="mt-8 px-8 py-3 bg-oxford text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-sandstone hover:text-oxford transition-all">
                            Apply for Admission
                        </button>
                    </div>
                    <div className="relative">
                        <div className="bg-oxford/5 rounded-3xl p-8 border border-oxford/10">
                            <h3 className="text-2xl font-bold text-oxford mb-6 flex items-center gap-3">
                                <Star className="text-sandstone fill-sandstone" />
                                Why Choose Us?
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "100% Board Results",
                                    "Experienced & Dedicated Faculty",
                                    "Focus on Girls’ Empowerment",
                                    "Strong Academic & Co-curricular Balance",
                                    "Safe & Supportive Environment",
                                    "Proven Record of State & National Achievements"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700">
                                        <CheckCircle2 size={18} className="text-green-600 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Academic Results */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Academic Excellence</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-oxford mt-2">Outstanding Results</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Our students consistently achieve top results at district and state levels, proving our commitment to quality education.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { class: "XII Arts", score: "100%" },
                            { class: "XII Science", score: "100%" },
                            { class: "XII Commerce", score: "100%" },
                            { class: "X & VIII (All)", score: "100%" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-sandstone text-center hover:-translate-y-2 transition-transform">
                                <h3 className="text-gray-500 font-bold uppercase text-sm tracking-wider mb-2">{stat.class}</h3>
                                <p className="text-5xl font-black text-oxford">{stat.score}</p>
                                <p className="text-xs text-green-600 font-bold mt-2 uppercase">Pass Percentage</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-oxford text-white p-8 rounded-2xl flex flex-col justify-center items-center text-center">
                            <Star size={48} className="text-sandstone mb-4" />
                            <h3 className="text-3xl font-bold mb-2">34 Students</h3>
                            <p className="text-white/80">Scored above 90% in board exams</p>
                        </div>
                        <div className="bg-oxford text-white p-8 rounded-2xl flex flex-col justify-center items-center text-center">
                            <Medal size={48} className="text-sandstone mb-4" />
                            <h3 className="text-3xl font-bold mb-2">Perfect Scores</h3>
                            <p className="text-white/80">Multiple students achieved 100/100 marks in subjects</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Scorers Table */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Meritorious Students</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-oxford mt-2">Board Exam Toppers (2024-25)</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Celebrating the dedication and hard work of our top performers.
                        </p>
                    </div>
                    <StudentResultsTable />
                </div>
            </section>

            {/* Scholarships & Merit Awards */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Recognition & Rewards</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-oxford mt-2">Scholarships & Merit Awards</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            By Balika Shiksha Foundation, Government of Rajasthan (Jaipur)
                        </p>
                    </div>

                    {/* EWS Scheme */}
                    <div className="mb-20">
                        <h3 className="text-2xl font-bold text-oxford mb-6 flex items-center gap-3">
                            <Star className="text-sandstone fill-sandstone" />
                            EWS Merit Promotion Scheme (State Level)
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-3xl">
                            Under this scheme, three meritorious students who secured positions in the State Merit List were awarded ₹15,000 each.
                        </p>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-oxford/10 shadow-lg bg-white">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-oxford text-white">
                                        <tr>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm">Student Name</th>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm">Class & Stream</th>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm">Percentage</th>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm text-right">Scholarship</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-oxford/10 text-gray-700">
                                        {[
                                            { name: "Mahima Surana", class: "XII Arts", percent: "96.00%", amount: "₹15,000", img: "/images/mahima_surana.png" },
                                            { name: "Kirtika Kanwar", class: "XII Science", percent: "95.80%", amount: "₹15,000", img: "/images/kitika_kuwar.png" },
                                            { name: "Himanshi Kanwar", class: "XII Arts", percent: "95.40%", amount: "₹15,000", img: "/images/himanshi_kanwar.png" }
                                        ].map((student, i) => (
                                            <tr
                                                key={i}
                                                className="hover:bg-oxford/5 transition-colors cursor-pointer"
                                                onClick={() => openModal({ ...student, percentage: student.percent, description: "EWS Merit Promotion Scheme Awardee" })}
                                            >
                                                <td className="p-4 md:p-6 font-bold text-oxford flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative border border-gray-300">
                                                        <img src={student.img} alt={student.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    {student.name}
                                                </td>
                                                <td className="p-4 md:p-6">{student.class}</td>
                                                <td className="p-4 md:p-6 font-bold">{student.percent}</td>
                                                <td className="p-4 md:p-6 text-right font-black text-green-600">{student.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Visual Highlight for EWS */}
                            <div className="bg-oxford text-white p-8 rounded-2xl flex flex-col justify-center items-center text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-sandstone/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <Trophy size={64} className="text-sandstone mb-6" />
                                <h4 className="text-4xl font-black mb-2">₹45,000</h4>
                                <p className="text-white/80 font-medium">Total Scholarship Distributed</p>
                                <div className="mt-6 px-4 py-2 bg-white/10 rounded-lg text-sm font-bold uppercase tracking-wider">
                                    State Level Recognition
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Padmakshi Award Scheme */}
                    <div>
                        <h3 className="text-2xl font-bold text-oxford mb-6 flex items-center gap-3">
                            <Medal className="text-sandstone fill-sandstone" />
                            Padmakshi (Merit) Award Scheme – District Level Toppers
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-3xl">
                            Under the Padmakshi Award Scheme, students who secured first position in Pali District in their respective classes were honored with cash prizes.
                        </p>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Visual Highlight for Padmakshi */}
                            <div className="bg-sandstone text-oxford p-8 rounded-2xl flex flex-col justify-center items-center text-center relative overflow-hidden order-2 lg:order-1">
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                                <Star size={64} className="text-oxford mb-6" />
                                <h4 className="text-4xl font-black mb-2">₹1,25,000</h4>
                                <p className="text-oxford/80 font-medium">Total Cash Prizes Awarded</p>
                                <div className="mt-6 px-4 py-2 bg-oxford/10 rounded-lg text-sm font-bold uppercase tracking-wider">
                                    District Toppers
                                </div>
                            </div>

                            <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-oxford/10 shadow-lg bg-white order-1 lg:order-2">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-oxford text-white">
                                        <tr>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm">Student Name</th>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm">Class & Stream</th>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm">Percentage</th>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm text-right">Award Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-oxford/10 text-gray-700">
                                        {[
                                            { name: "Nirma", class: "Class VIII", percent: "95.33%", amount: "₹25,000", img: "/images/nirma.png" },
                                            { name: "Mahima Surana", class: "XII Arts", percent: "96.00%", amount: "₹75,000", img: "/images/mahima_surana.png" },
                                            { name: "Mamata Kumari", class: "XII Commerce", percent: "82.40%", amount: "₹75,000", img: "/images/mamtakuwari.png" }
                                        ].map((student, i) => (
                                            <tr
                                                key={i}
                                                className="hover:bg-oxford/5 transition-colors cursor-pointer"
                                                onClick={() => openModal({ ...student, percentage: student.percent, description: "Padmakshi Merit Award Winner" })}
                                            >
                                                <td className="p-4 md:p-6 font-bold text-oxford flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative border border-gray-300">
                                                        <img src={student.img} alt={student.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    {student.name}
                                                </td>
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
                    <div className="mt-20 bg-oxford text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sandstone/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 text-center">
                            <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                                <Trophy className="text-sandstone" size={32} />
                                GARGI Award
                            </h3>
                            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                                We are proud to announce that <span className="font-bold text-sandstone">115 students</span> will be honored under the GARGI AWARD Scheme for their academic excellence.
                            </p>

                            <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                                    <p className="text-sm font-medium uppercase tracking-wider text-sandstone mb-1">Class X</p>
                                    <p className="text-3xl font-black">₹6,000</p>
                                    <p className="text-xs text-white/70 mt-1">Award Amount</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                                    <p className="text-sm font-medium uppercase tracking-wider text-sandstone mb-1">Class XII</p>
                                    <p className="text-3xl font-black">₹5,000</p>
                                    <p className="text-xs text-white/70 mt-1">Award Amount</p>
                                </div>
                            </div>

                            <p className="text-sm text-white/60">
                                Eligibility: Students scoring 75% or more marks in board exams.
                            </p>
                        </div>
                    </div>

                    {/* Perfect Score Achievers */}
                    <div className="mt-20">
                        <div className="text-center mb-10">
                            <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Academic Excellence</span>
                            <h3 className="text-3xl font-bold text-oxford mt-2">Perfect Score Achievers</h3>
                            <p className="text-gray-600 mt-2">Students who scored 100 out of 100 marks in Board Exams</p>
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
                                        { name: "Mahima Surana", class: "XII Arts", subject: "Hindi Literature", marks: "100/100", img: "/images/mahima_surana.png" },
                                        { name: "Vartika", class: "XII Arts", subject: "Hindi Literature", marks: "100/100", img: "/images/vitika.png" },
                                        { name: "Manisha", class: "XII Science", subject: "Chemistry", marks: "100/100", img: "/images/manisha.png" },
                                        { name: "Ritika Sherawat", class: "XII Science", subject: "Biology", marks: "100/100", img: "/images/ritika.png" }
                                    ].map((student, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-oxford/5 transition-colors cursor-pointer"
                                            onClick={() => openModal({ ...student, description: "Achieved 100/100 Perfect Score" })}
                                        >
                                            <td className="p-6 font-bold text-oxford flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                                                    <img src={student.img} alt={student.name} className="w-full h-full object-cover" />
                                                </div>
                                                {student.name}
                                            </td>
                                            <td className="p-6">{student.class}</td>
                                            <td className="p-6">{student.subject}</td>
                                            <td className="p-6 text-right font-black text-green-600">{student.marks}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-center text-gray-500 italic mt-6 max-w-2xl mx-auto text-sm">
                            "These students achieved full marks in their respective subjects, bringing pride to the school through their outstanding academic excellence."
                        </p>
                    </div>
                </div>
            </section>

            {/* Beyond Academics */}
            <section className="py-20 px-6 bg-oxford text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Co-Curricular Excellence</span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-2">Beyond Academics</h2>
                        <p className="text-white/80 mt-4 max-w-2xl mx-auto">
                            “With wings of courage and dreams, the sky is the limit.”
                        </p>
                    </div>

                    {/* NCC Achievement - Harshita */}
                    <div
                        className="mb-20 bg-white/5 rounded-3xl p-8 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                        onClick={() => openModal({
                            name: "Cadet Harshita",
                            class: "IX A",
                            img: "/images/harishta.png",
                            achievement: "NCC National Thal Sainik Camp 2025",
                            description: "Selected for AITSC 2025"
                        })}
                    >
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="md:w-1/3 text-center">
                                <div className="w-48 h-48 mx-auto rounded-full bg-sandstone/20 overflow-hidden mb-6 border-4 border-sandstone/30 relative">
                                    <img src="/images/harishta.png" alt="Cadet Harshita" className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">Cadet Harshita</h3>
                                <p className="text-sandstone font-medium mb-4">Class: IX A</p>
                                <div className="inline-block px-4 py-2 bg-white/10 rounded-lg text-sm font-bold uppercase tracking-wider text-white">
                                    Selected for AITSC 2025
                                </div>
                            </div>
                            <div className="md:w-2/3">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Medal className="text-sandstone" />
                                    NCC Achievement – National Thal Sainik Camp
                                </h3>
                                <p className="text-white/80 mb-6">
                                    We are proud of our girl for her selection in the National Thal Sainik Camp 2025 (AITSC).
                                </p>
                                <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                                    <table className="w-full text-left text-white/90">
                                        <thead className="bg-white/10 text-sandstone">
                                            <tr>
                                                <th className="p-4 font-bold uppercase text-xs tracking-wider">Camp Name</th>
                                                <th className="p-4 font-bold uppercase text-xs tracking-wider">Dates</th>
                                                <th className="p-4 font-bold uppercase text-xs tracking-wider">Location</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10 text-sm">
                                            {[
                                                { camp: "ATC", date: "17 May 2025 – 26 May 2025", loc: "Jodhpur" },
                                                { camp: "Pre TSC – I", date: "04 July 2025 – 13 July 2025", loc: "Jodhpur" },
                                                { camp: "Pre TSC – II", date: "21 July 2025 – 30 July 2025", loc: "Sri Ganganagar" },
                                                { camp: "IG SC TSC", date: "02 Aug 2025 – 11 Aug 2025", loc: "Udaipur" }
                                            ].map((row, i) => (
                                                <tr key={i}>
                                                    <td className="p-4 font-medium">{row.camp}</td>
                                                    <td className="p-4">{row.date}</td>
                                                    <td className="p-4">{row.loc}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Sports Achievements */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Trophy className="text-sandstone" />
                                District, State & National Level Talents
                            </h3>

                            {/* National Level */}
                            <div className="mb-8">
                                <h4 className="text-lg font-bold text-sandstone mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                                    <Globe size={16} /> National Level (Sports)
                                </h4>
                                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                    <table className="w-full text-left text-white/90 text-sm">
                                        <thead className="bg-white/10">
                                            <tr>
                                                <th className="p-3">Student Name</th>
                                                <th className="p-3">Class</th>
                                                <th className="p-3">Sport</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10">
                                            {[
                                                { name: "Kanchan Kanwar", cls: "IX A", sport: "Volleyball", img: "/images/kanchan_kawar.png" },
                                                { name: "Umrao Kanwar", cls: "X B", sport: "Volleyball", img: "/images/kamraw_kawar.png" },
                                                { name: "Durkisha Solanki", cls: "XII B", sport: "Rifle Shooting", img: "/images/duvisha_solanki.png" },
                                                { name: "Hemu Kanwar", cls: "XI B", sport: "Wrestling", img: "/images/hemu_kawar.png" }
                                            ].map((row, i) => (
                                                <tr
                                                    key={i}
                                                    className="hover:bg-white/5 transition-colors cursor-pointer"
                                                    onClick={() => openModal({
                                                        name: row.name,
                                                        class: row.cls,
                                                        img: row.img,
                                                        sport: row.sport,
                                                        description: "National Level Sports Achievement"
                                                    })}
                                                >
                                                    <td className="p-3 font-bold flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden">
                                                            <img src={row.img} alt={row.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        {row.name}
                                                    </td>
                                                    <td className="p-3">{row.cls}</td>
                                                    <td className="p-3 text-sandstone">{row.sport}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* State Level */}
                            <div>
                                <h4 className="text-lg font-bold text-sandstone mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                                    <MapPin size={16} /> State Level (Sports)
                                </h4>
                                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                    <table className="w-full text-left text-white/90 text-sm">
                                        <thead className="bg-white/10">
                                            <tr>
                                                <th className="p-3">Student Name</th>
                                                <th className="p-3">Class</th>
                                                <th className="p-3">Sport</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10">
                                            {[
                                                { name: "Kanchan Kanwar", cls: "IX A", sport: "Athletics (Shot Put)", img: "/images/kanchan_kawar.png" }
                                            ].map((row, i) => (
                                                <tr
                                                    key={i}
                                                    className="hover:bg-white/5 transition-colors cursor-pointer"
                                                    onClick={() => openModal({
                                                        name: row.name,
                                                        class: row.cls,
                                                        img: row.img,
                                                        sport: row.sport,
                                                        description: "State Level Sports Achievement"
                                                    })}
                                                >
                                                    <td className="p-3 font-bold flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden">
                                                            <img src={row.img} alt={row.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        {row.name}
                                                    </td>
                                                    <td className="p-3">{row.cls}</td>
                                                    <td className="p-3 text-sandstone">{row.sport}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Science Achievements */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Microscope className="text-sandstone" />
                                Science Models & Quiz
                            </h3>

                            {/* District Level */}
                            <div>
                                <h4 className="text-lg font-bold text-sandstone mb-4 uppercase tracking-wider text-sm">District Level</h4>
                                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                    <table className="w-full text-left text-white/90 text-sm">
                                        <thead className="bg-white/10">
                                            <tr>
                                                <th className="p-3">Student Name</th>
                                                <th className="p-3">Class</th>
                                                <th className="p-3">Achievement</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10">
                                            {[
                                                { name: "Prithvi Charan", cls: "VIII A", ach: "Quiz Competition", img: "/images/puthvi_charn.png" },
                                                { name: "Vedika Sharma", cls: "XII A", ach: "Smart Fire Safety Device", img: "/images/devika_sharma.png" },
                                                { name: "Garima Kanwar", cls: "VIII A", ach: "Smart Fire Safety Device Model", img: "/images/garima_kawar.png" },
                                                { name: "Heena Kanwar", cls: "VII B", ach: "Geometrical Park Model", img: "/images/hina_kawar.png" }
                                            ].map((row, i) => (
                                                <tr
                                                    key={i}
                                                    className="hover:bg-white/5 transition-colors cursor-pointer"
                                                    onClick={() => openModal({
                                                        name: row.name,
                                                        class: row.cls,
                                                        img: row.img,
                                                        achievement: row.ach,
                                                        description: "District Level Science Achievement"
                                                    })}
                                                >
                                                    <td className="p-3 font-bold flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden">
                                                            <img src={row.img} alt={row.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        {row.name}
                                                    </td>
                                                    <td className="p-3">{row.cls}</td>
                                                    <td className="p-3 text-sandstone">{row.ach}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Infrastructure */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-oxford mb-6">Modern Labs & Facilities</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg italic">
                            “Well-equipped laboratories with modern and best technological facilities”
                        </p>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            The school provides hand-on practical learning in a safe and modern environment.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Physics Laboratory", icon: Microscope, img: "/images/Physics Laboratory.png" },
                            { name: "Chemistry Laboratory", icon: Microscope, img: "/images/Chemistry Laboratory.png" },
                            { name: "Biology Laboratory", icon: Microscope, img: "/images/Biology Laboratory.png" },
                            { name: "Geography Laboratory", icon: Globe, img: "/images/Geography Laboratory.png" },
                            { name: "Art & Craft Lab", icon: Trophy, img: "/images/Art & Craft Lab.png" },
                            { name: "RS-CIT IT Computer Center", icon: School, img: "/images/RS-CIT IT Computer Center.png" },
                            { name: "CCTV Camera Surveillance", icon: CheckCircle2, img: null },
                            { name: "Fire Safety Systems", icon: CheckCircle2, img: null },
                            { name: "Practical Equipment (All Subjects)", icon: BookOpen, img: null }
                        ].map((facility, i) => (
                            <div key={i} className="group overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all border border-gray-100">
                                {facility.img ? (
                                    <div className="h-48 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-oxford/20 group-hover:bg-transparent transition-colors z-10" />
                                        <img
                                            src={facility.img}
                                            alt={facility.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-48 bg-gray-50 flex items-center justify-center">
                                        <facility.icon className="text-gray-300 group-hover:text-sandstone transition-colors" size={64} />
                                    </div>
                                )}
                                <div className="p-6 relative">
                                    <div className="flex items-start gap-4">
                                        {!facility.img && <facility.icon className="text-sandstone shrink-0 mt-1" size={24} />}
                                        <h3 className="font-bold text-oxford text-lg">{facility.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-sandstone">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-black text-oxford mb-6 uppercase tracking-tight">Admissions Open</h2>
                    <p className="text-xl text-oxford/80 font-medium mb-10">
                        Give your daughter the opportunity to grow into a confident, educated, and successful individual.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="tel:6377204205" className="px-8 py-4 bg-oxford text-white rounded-full font-bold uppercase tracking-wider shadow-lg hover:bg-white hover:text-oxford transition-all">
                            Call: 6377204205
                        </a>
                        <a href="#contact" className="px-8 py-4 bg-white text-oxford rounded-full font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all">
                            Visit Campus
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
