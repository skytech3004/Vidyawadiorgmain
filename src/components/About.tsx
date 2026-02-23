"use client";

import React from "react";
import { motion } from "framer-motion";
import { History, Shield, Target, GraduationCap, Users } from "lucide-react";

const features = [
    {
        title: "Leeladevi Parasmal Sancheti Kanya Mahavidyalaya",
        icon: GraduationCap,
    },
    {
        title: "Marudhar Balika Vidyapeeth (Sr. Sec.) – Vidyawadi (RBSE Hindi & English)",
        icon: GraduationCap,
    },
    {
        title: "Sushiladevi Prakashraj Modi Primary School",
        icon: GraduationCap,
    },
    {
        title: "Leeladevi Parasmal Sancheti English Medium Sr. Sec. School",
        icon: GraduationCap,
    },
    {
        title: "Girls’ Hostel (A.C. & Non A.C. )",
        icon: Shield,
        highlight: true,
    }
];

export default function About() {
    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-sandstone-light/10 -skew-x-12 translate-x-1/3 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Content - Story */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-sandstone font-black uppercase tracking-[0.3em] text-sm mb-4 block">
                            Our Journey
                        </span>
                        <h5 className="text-2xl md:text-3xl font-black leading-tight mb-8 uppercase">
                            <span className="text-sandstone">Vidyawadi</span> <br />
                            <span className="text-oxford">Best Residential Girls’ Education Campus in Khimel Rani</span>
                        </h5>

                        <div className="space-y-6 text-oxford/70 text-lg leading-relaxed">
                            <p>
                                Located at <span className="font-bold text-oxford">Khimel Rani Station, District Pali, Rajasthan (306115)</span>, Marudhar Mahila Shikshan Sangh Vidyawadi is one of the most trusted and established residential girls’ education campuses in Rajasthan.
                            </p>
                            <p>
                                Spread across a massive <span className="text-oxford font-bold underline decoration-2 underline-offset-4 tracking-tight">65-acre green campus</span>, the institute is dedicated to academic excellence, character building, and holistic development. Our campus is designed to provide a safe, disciplined, and growth-oriented learning environment for girls.
                            </p>
                            <div className="bg-sandstone/5 p-6 rounded-2xl border border-sandstone/10 mt-8">
                                <h4 className="font-black text-oxford mb-4 uppercase tracking-wider text-sm">Campus Infrastructure & Facilities:</h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm font-medium text-oxford/80">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sandstone" /> 4 Academic Educational Units</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sandstone" /> 8 Fully Operational Hostels (700+ Capacity)</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sandstone" /> 24×7 CCTV Surveillance for Safety</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sandstone" /> RO Water Purification Plant</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sandstone" /> Spacious Sports Ground</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sandstone" /> Kids Activity Park</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sandstone" /> Modern Science & Computer Labs</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sandstone" /> 16 School Buses serving 83+ villages</li>
                                </ul>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-12">
                            {features.map((item: any, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${item.highlight
                                        ? "bg-sandstone text-oxford border-oxford/20 shadow-lg scale-105 z-10"
                                        : "bg-sandstone-light/20 border-sandstone/10"
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg shadow-sm ${item.highlight ? "bg-oxford text-sandstone" : "bg-white text-sandstone"}`}>
                                        <item.icon size={20} />
                                    </div>
                                    <span className={`text-sm font-bold ${item.highlight ? "text-oxford" : "text-oxford/80"}`}>{item.title}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Content - Vision & Mission */}
                    <div className="grid gap-8">
                        {/* Vision Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-oxford p-10 rounded-[2rem] text-white relative overflow-hidden group shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                <Target size={120} />
                            </div>
                            <div className="relative z-10">
                                <span className="inline-flex items-center justify-center w-12 h-12 bg-sandstone rounded-full mb-6">
                                    <Target className="text-oxford" size={24} />
                                </span>
                                <h3 className="text-3xl font-black mb-6 tracking-wide">VISION</h3>
                                <p className="text-white/80 leading-relaxed text-lg italic">
                                    "To provide affordable, high-quality education that empowers students with knowledge, skills, and strong values. We aim to nurture hidden talents, encourage innovation, and create future leaders, entrepreneurs, and responsible citizens."
                                </p>
                            </div>
                        </motion.div>

                        {/* Mission Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-sandstone-light p-10 rounded-[2rem] text-oxford relative overflow-hidden shadow-xl"
                        >
                            <div className="relative z-10">
                                <span className="inline-flex items-center justify-center w-12 h-12 bg-oxford rounded-full mb-6">
                                    <Shield className="text-white" size={24} />
                                </span>
                                <h3 className="text-3xl font-black mb-6 tracking-wide">MISSION</h3>
                                <p className="text-oxford/80 leading-relaxed text-lg italic">
                                    "Our mission is to deliver excellence in education through value-based and holistic learning. We focus on developing creativity, critical thinking, and entrepreneurial skills while promoting gender equality, social responsibility, and environmental awareness."
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section >
    );
}
