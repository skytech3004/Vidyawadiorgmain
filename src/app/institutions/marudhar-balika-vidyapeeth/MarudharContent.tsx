"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Trophy, School, Users, Star, Microscope, Medal, Phone, MapPin, Globe, CheckCircle2 } from "lucide-react";
import StudentResultsTable from "@/components/StudentResultsTable";
import StudentModal from "@/components/StudentModal";

export default function MarudharContent() {
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleStaff, setVisibleStaff] = useState(10);

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
                            {/* User: Add your image path here */}
                            <img src="/marudhar_balika.jpg" alt="Marudhar Balika Vidyapeeth Logo" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <span className="text-sandstone font-bold uppercase tracking-widest text-sm mb-4 block">Hindi & English Meduim Senior Secondary School (RBSE)</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                                Marudhar Balika Vidyapeeth
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl">
                                Empowering Girls Through Education, Excellence & Values
                            </p>
                        </div>
                    </motion.div>

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
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Leadership</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight">Principal’s Message</h2>
                        <div className="h-1.5 w-24 bg-sandstone mt-6 rounded-full mb-10" />
                        <div className="prose text-gray-600 leading-relaxed space-y-4 mb-8">
                            <p className="text-lg text-oxford/80">
                                “Education is the most powerful weapon which you can use to change the world.” – Nelson Mandela
                            </p>
                            <p>
                                Dear Students, Parents and Well-Wishers,
                            </p>
                            <p>
                                It gives me immense pleasure to welcome you to <span className="text-oxford font-bold">Marudhar Balika Vidyapeeth (Sr. Sec.) School, Vidyawadi</span>. Our institution stands as a symbol of <span className="text-oxford font-bold">dedication, discipline and excellence</span> in girls’ education. We believe that education is not merely the acquisition of knowledge, but the development of character, confidence and compassion.
                            </p>
                            <p>
                                Our aim is to provide a <span className="text-oxford font-bold">safe, supportive and inspiring environment</span> where every child can discover her potential and grow into a responsible and capable individual. We focus on <span className="text-oxford font-bold">academic excellence</span> along with moral values, leadership qualities and life skills. With the support of qualified and committed teachers, we strive to nurture creativity, critical thinking and a spirit of inquiry among our students.
                            </p>
                            <p>
                                In this rapidly changing world, we continuously update our teaching methods and <span className="text-oxford font-bold">integrate digital learning</span> to prepare our students for future challenges. We encourage participation in co-curricular and extracurricular activities to ensure the <span className="text-oxford font-bold">holistic development</span> of every learner.
                            </p>
                            <p>
                                I am confident that with the cooperation of parents and the dedication of our staff, we will continue to scale new heights of success and bring pride to our institution.
                            </p>
                            <p>
                                Let us work together to <span className="text-oxford font-bold">empower our daughters with knowledge, confidence and strong values</span> so that they may shine brightly in every sphere of life.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-sandstone shadow-lg">
                                <img
                                    src="/hindi-principal.png"
                                    alt="Principal Priya Sangeeta"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="font-bold text-oxford">
                                <p className="text-lg">Ms. Priya Sangeeta</p>
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
                            <div className="h-1 bg-sandstone w-16 mx-auto mb-8 rounded-full" />
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
                                Marudhar Balika Vidyapeeth is known for its reputation and adherence to quality education, State of the Art Infrastructure, and a nurturing environment. We offer a comprehensive curriculum and engage students in traditional and innovative educational methods to empower them for future success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Why Choose Us Section */}
            <section className="py-24 px-6 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Why Choose Us?</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight">Shaping Bright Futures</h2>
                        <div className="h-1.5 w-24 bg-sandstone mt-6 rounded-full mb-10" />
                        <div className="prose text-gray-600 leading-relaxed space-y-4">
                            <p>
                                Marudhar Balika Vidyapeeth is a premier girls’ senior secondary school dedicated to academic excellence, character building, and all-round development. Managed by Marudhar Mahila Shikshan Sangh,Vidyawadi, our institution provides quality education in Hindi & English Medium under RBSE.
                            </p>
                            <p className="text-lg font-medium text-oxford">
                                "We believe that educated girls build stronger families, communities, and the nation."
                            </p>
                        </div>
                        <a href="/apply" className="inline-block mt-8 px-8 py-3 bg-oxford text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-sandstone hover:text-oxford transition-all">
                            Apply for Admission
                        </a>
                    </div>
                    <div className="relative">
                        <div className="bg-white rounded-[2.5rem] p-10 border border-oxford/5 shadow-xl">
                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4 text-center">Excellence</span>
                            <h3 className="text-3xl font-bold text-oxford mb-6 flex justify-center items-center gap-3">
                                <Star className="text-sandstone fill-sandstone" />
                                Why Vidyawadi?
                            </h3>
                            <div className="h-1 bg-sandstone w-16 mx-auto mb-8 rounded-full" />
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
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Infrastructure</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight text-center">Modern Labs & Facilities</h2>
                        <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full mb-8" />
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg italic">
                            “Well-equipped laboratories with modern and best technological facilities”
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Physics Laboratory", icon: Microscope, img: "/images/Physics Laboratory.png" },
                            { name: "Chemistry Laboratory", icon: Microscope, img: "/images/Chemistry Laboratory.png" },
                            { name: "Biology Laboratory", icon: Microscope, img: "/images/Biology Laboratory.png" },
                            { name: "Geography Laboratory", icon: Globe, img: "/images/Geography Laboratory.png" },
                            { name: "NCC & Guide", icon: Trophy, img: "/llll-AAA.jpeg" },
                            { name: "Library", icon: Globe, img: "/llll-BBB.jpeg" },
                            { name: "Art & Craft Lab", icon: Trophy, img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWM0VDuzqiY7GKHYNiuLdOiI7NeBpeOLzD8rQ4xWGJnwBcENRmGbgaQuXdZCdb1_Jo2vfdGOarAbvU_jduXSt9pSejENdN_TZGKOTTYaLnDGUVrn-NJryFo1Y3QjC4d9zL7tMd6Aq9J40/s1600/photo+4-3.JPG" },
                            { name: "RS-CIT IT Computer Center", icon: School, img: "/images/RS-CIT IT Computer Center.png" },
                            { name: "CCTV Camera Surveillance", icon: CheckCircle2, img: "https://journalistsresource.org/wp-content/uploads/2014/02/surveillance-camera-860x466.jpg" },
                            { name: "Fire Safety Systems", icon: CheckCircle2, img: "https://static.vecteezy.com/system/resources/previews/065/840/675/non_2x/a-firefighter-presenting-fire-safety-tips-with-a-fire-extinguisher-illustration-vector.jpg" },
                            { name: "Practical Equipment (All Subjects)", icon: BookOpen, img: "https://www.labkafe.com/storage/blog/optimize/20-common-lab-equipment.jpg" }
                        ].map((facility, i) => (
                            <div key={i} className="group overflow-hidden rounded-[2rem] bg-white shadow-xl hover:shadow-2xl transition-all border border-oxford/5">
                                {facility.img ? (
                                    <div className="h-80 overflow-hidden relative">
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
                            <div key={i} className="bg-white p-10 rounded-[2rem] shadow-xl border border-oxford/5 text-center hover:-translate-y-2 transition-transform">
                                <h3 className="text-sandstone-dark font-bold uppercase text-xs tracking-[0.2em] mb-4">{stat.class}</h3>
                                <p className="text-4xl font-black text-oxford">{stat.score}</p>
                                <p className="text-[10px] text-green-600 font-bold mt-2 uppercase tracking-widest">Pass Percentage</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-oxford text-white p-8 rounded-2xl flex flex-col justify-center items-center text-center">
                            <Star size={48} className="text-sandstone mb-4" />
                            <h3 className="text-3xl font-bold mb-2">34 Students</h3>
                            <p className="text-white/80">Scored above 90% in board exams</p>
                            <h2 className="text-3xl font-bold mb-2">In 2025</h2>
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
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Meritorious Students</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight text-center">Board Exam Toppers</h2>
                        <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full mb-8" />
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Celebrating the dedication and hard work of our top performers.
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
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto font-medium">
                            By Balika Shiksha Foundation, Government of Rajasthan (Jaipur)
                        </p>
                    </div>

                    <div className="mb-20">
                        <div className="text-center mb-10">
                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4">State Level Recognition</span>
                            <h3 className="text-3xl font-bold text-oxford flex justify-center items-center gap-3">
                                <Trophy className="text-sandstone" />
                                EWS Merit Promotion Scheme
                            </h3>
                            <div className="h-1 bg-sandstone w-16 mx-auto mt-6 rounded-full" />
                        </div>
                        <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-center">
                            Under this scheme, three meritorious students who secured positions in the State Merit List were awarded ₹15,000 each.
                        </p>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 overflow-hidden rounded-[2.5rem] border border-oxford/5 shadow-xl bg-white">
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

                    <div>
                        <div className="text-center mb-10 mt-12">
                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4">District Level Recognition</span>
                            <h3 className="text-3xl font-bold text-oxford flex justify-center items-center gap-3">
                                <Medal className="text-sandstone" />
                                Padmakshi (Merit) Award Scheme
                            </h3>
                            <div className="h-1 bg-sandstone w-16 mx-auto mt-6 rounded-full" />
                        </div>
                        <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-center">
                            Under the Padmakshi Award Scheme, students who secured first position in Pali District in their respective classes were honored with cash prizes.
                        </p>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Visual Highlight for Padmakshi */}
                            <div className="bg-sandstone text-oxford p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center relative overflow-hidden order-2 lg:order-1 shadow-xl">
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
                    <div className="mt-20 bg-oxford text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sandstone/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 text-center">
                            <span className="text-sandstone-light font-bold uppercase tracking-[0.4em] text-xs block mb-4">Academic Brilliance</span>
                            <h3 className="text-4xl font-bold mb-6 flex items-center justify-center gap-3">
                                <Trophy className="text-sandstone" size={40} />
                                GARGI Award Recipients
                            </h3>
                            <div className="h-1.5 w-24 bg-sandstone mx-auto mb-10 rounded-full" />
                            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                                We are proud to announce that <span className="font-bold text-sandstone">115 students</span> from our institution have been honored under the GARGI AWARD Scheme for their academic excellence.
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
                        <p className="text-center text-gray-500 mt-6 max-w-2xl mx-auto text-sm">
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
                                                { camp: "ATC", date: "17 May 2026 – 27 Session May 2025", loc: "Jodhpur" },
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
                                                { name: "Durvisha Solanki", cls: "XII B", sport: "Rifle Shooting", img: "/images/duvisha_solanki.png" },
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
            {/* What We Do Section */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Our Activities</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight text-center">What We Do</h2>
                        <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full mb-8" />
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Glimpses of our vibrant school life and academic activities.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {[
                            { url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773142123/WhatsApp_Video_2026-03-10_at_12.21.30_r1zahz.mp4", title: "Campus Activity" },
                            { url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126080/WhatsApp_Video_2026-03-10_at_12.13.55_1_nmxdbj.mp4", title: "Student Life" },
                            { url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126079/WhatsApp_Video_2026-03-10_at_12.13.55_hbh5uh.mp4", title: "Learning & Growth" },
                            { url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126078/WhatsApp_Video_2026-03-10_at_12.13.54_zzosza.mp4", title: "Extracurriculars" },
                            { url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126078/WhatsApp_Video_2026-03-10_at_12.13.46_tlxxqk.mp4", title: "Special Events" },
                            { url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126078/WhatsApp_Video_2026-03-10_at_12.13.55_2_zjupvk.mp4", title: "Sports & Fitness" }
                        ].map((video, i) => (
                            <div key={i} className="group overflow-hidden rounded-[2rem] bg-white shadow-xl hover:shadow-2xl transition-all border border-oxford/5">
                                <div className="h-64 sm:h-80 xl:h-64 overflow-hidden relative">
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 bg-gray-100"
                                    >
                                        <source src={video.url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                {/* <div className="p-4 relative text-center bg-oxford text-white">
                                    <h3 className="font-bold text-sm md:text-base">{video.title}</h3>
                                </div> */}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Faculty Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Our Faculty</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-oxford mt-2">Marudhar Balika Vidyapeeth Navigators</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Meet our dedicated faculty and staff members committed to excellence.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[


                            // 🏫 School Leadership
                            { no: 1, name: "Priya Sangeeta", designation: "Principal", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 2, name: "Alka Tak", designation: "Vice Principal", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },

                            // 👩‍🏫 PGT Teachers
                            { no: 3, name: "Kushal Kunwar", designation: "PGT - History", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 4, name: "Prakash Gehlot", designation: "PGT - Mathematics", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 5, name: "Uttam Kunwar", designation: "PGT - English Literature", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 6, name: "Vishnu Kanwar", designation: "PGT - Drawing", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 7, name: "Santosh Kanwar", designation: "PGT - Economics", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 8, name: "Dimpal Kumari Sharma", designation: "PGT - Political Science", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 9, name: "Chandra Kunwar", designation: "PGT - Chemistry", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 10, name: "Suman Kanwar", designation: "PGT - Geography", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 11, name: "Jitendra Singh", designation: "PGT - Accounts", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 12, name: "Vandana Sharma", designation: "PGT - Hindi Literature", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 13, name: "Dinesh Kumar", designation: "PGT - Physics", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },

                            // 👨‍🏫 TGT Teachers
                            { no: 14, name: "Shruti Sharma", designation: "TGT - Sanskrit", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 15, name: "Heena Chouhan", designation: "TGT - Hindi", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 16, name: "Kamlesh", designation: "TGT - Computer", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 17, name: "Harshita Soni", designation: "TGT - Science", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 18, name: "Jitendra Kumar", designation: "TGT - Biology", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 19, name: "Neha Ashawat", designation: "TGT - English", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 20, name: "Yogita Malviya", designation: "TGT - Mathematics", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 21, name: "Soniya Kumari", designation: "TGT - Social Science", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },

                            // 🧪 Academic Support
                            { no: 22, name: "Uday Narayan Shukla", designation: "Science Lab Assistant", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 23, name: "Baby Kunwar", designation: "Librarian", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 24, name: "Monika", designation: "P.T.I.", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },

                            // 🏢 Administrative Staff
                            { no: 25, name: "Himmat Singh Rathore", designation: "U.D.C.", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 26, name: "Dilip Kumar", designation: "L.D.C.", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },

                            // 🛠 Support Staff
                            { no: 27, name: "Arvind Kumar", designation: "Office Boy", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 28, name: "Rekha", designation: "Peon", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 29, name: "Bhima Ram", designation: "Gardener", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 30, name: "Gordhan Singh Sisodia", designation: "Peon", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 31, name: "Dilip", designation: "Peon", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" },
                            { no: 32, name: "Hirwanti", designation: "Sweeper", image: "https://cdn-icons-png.flaticon.com/512/4288/4288270.png" }


                        ].slice(0, visibleStaff).map((staff, i) => (
                            <div
                                key={staff.no}
                                className="bg-white p-4 rounded-xl shadow-sm border border-oxford/10 flex items-center gap-3 hover:border-sandstone transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-full bg-oxford/5 flex items-center justify-center overflow-hidden border border-oxford/10 group-hover:border-sandstone transition-colors shrink-0">
                                    {staff.image ? (
                                        <img src={staff.image} alt={staff.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-oxford font-bold text-xs">{staff.no}</span>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-oxford text-xs">{staff.name}</h4>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">{staff.designation}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {visibleStaff < 32 && (
                        <div className="mt-12 text-center">
                            <button
                                onClick={() => setVisibleStaff(prev => prev + 12)}
                                className="px-8 py-3 bg-oxford text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-sandstone hover:text-oxford transition-all shadow-lg"
                            >
                                Show More Faculty
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
                            UNIFORM
                        </h3>
                        <div className="space-y-8 text-gray-700">
                            <div>
                                <h4 className="font-bold text-oxford text-lg mb-4 border-b border-oxford/10 pb-2">Class VI to VIII (Tunic-shirt)</h4>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex gap-3 items-start">
                                        <CheckCircle2 size={18} className="text-green-600 mt-0.5 shrink-0" />
                                        <span>Maroon checked shirt and grey tunic, black ribbon or hair band, black shoes and grey socks.</span>
                                    </li>
                                    <li className="flex gap-3 items-start text-oxford/80 ml-7">
                                        <span>Two days a week (Wednesday &amp; Saturday): White skirt and white shirt, white ribbon, black shoes and white socks.</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-oxford text-lg mb-4 border-b border-oxford/10 pb-2">Class IX to XII (Salwar-kurta and Dupatta)</h4>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex gap-3 items-start">
                                        <CheckCircle2 size={18} className="text-green-600 mt-0.5 shrink-0" />
                                        <span>Maroon checked kurta, white salwar and white dupatta, black ribbon, black shoes and grey socks.</span>
                                    </li>
                                    <li className="flex gap-3 items-start text-oxford/80 ml-7">
                                        <span>Two days a week (Wednesday &amp; Saturday): White salwar Kurta and maroon dupatta, white ribbon, black shoes and white socks.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-4 border-t border-oxford/10">
                                <h4 className="font-bold text-oxford flex items-center gap-2">
                                    <Medal size={20} className="text-sandstone" />
                                    Winter Code
                                </h4>
                                <p className="text-sm mt-2 ml-7">Class VI to XII: Navy Blue Blazer</p>
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

            {/* Infrastructure */}


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
