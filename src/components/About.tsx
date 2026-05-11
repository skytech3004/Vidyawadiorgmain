"use client";

import React from "react";
import { motion } from "framer-motion";
import { History, Shield, Target, GraduationCap, Users } from "lucide-react";
import Link from "next/link";

const features = [
    {
        title: "Leeladevi Parasmal Sancheti Kanya Mahavidyalaya",
        icon: GraduationCap,
        link: "/institutions/leela-devi-college"
    },
    {
        title: "Marudhar Balika Vidyapeeth (Sr. Sec.) – Vidyawadi (RBSE Hindi & English)",
        icon: GraduationCap,
        link: "/institutions/marudhar-balika-vidyapeeth"
    },
    {
        title: "Sushiladevi Prakashraj Modi Primary School",
        icon: GraduationCap,
        link: "/institutions/sushiladevi"
    },
    {
        title: "Leeladevi Parasmal Sancheti English Medium Sr. Sec. School",
        icon: GraduationCap,
        link: "/institutions/leeladevi-english-medium"
    },
    {
        title: "Girls’ Hostel (A.C. & Non A.C. )",
        icon: Shield,
        highlight: true,
        link: "/hostel"
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
                        className="lg:col-span-2"
                    >
                        <span className="text-sandstone font-black uppercase tracking-[0.3em] text-sm mb-4 block">
                            Our Journey
                        </span>
                        <h5 className="text-2xl md:text-3xl font-black leading-tight mb-8 uppercase">
                            <span className="text-sandstone">Vidyawadi</span> <br />
                            <span className="text-oxford">Best Residential Girls’ Education Campus in  <span className="text-sandstone bg-oxford rounded p-1 px-2">rajasthan</span> (India)</span>
                        </h5>

                        <div className="space-y-6 text-oxford/70 text-lg leading-relaxed">
                            <p>
                                <span className="font-bold text-oxford">Marudhar Mahila Shikshan Sangh<br />  Vidyawadi<br /> </span>
                                Located at <span className="font-bold text-oxford">Khimel Rani Station, Tehsil- Bali, District Pali, Rajasthan (306115)<br /> </span> It is one of the most trusted and established residential girls’ education campuses in Rajasthan.
                            </p>
                            <p>
                                Spread across a massive <span className="text-oxford font-bold  decoration-2 underline-offset-4 tracking-tight">65-acre green campus</span>, the institute is dedicated to academic excellence, character building, and holistic development of every Girl child enrolledin Vidyawadi. Our campus is designed to provide a safe, disciplined, and growth-oriented learning environment for girls.
                            </p>

                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-12">
                            {features.map((item: any, idx) => (
                                <Link href={item.link || "#"} key={idx} className="block group">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 h-full ${item.highlight
                                            ? "bg-sandstone text-oxford border-oxford/20 shadow-lg group-hover:scale-105 z-10"
                                            : "bg-sandstone-light/20 border-sandstone/10 hover:bg-sandstone-light/40 group-hover:-translate-y-1"
                                            }`}
                                    >
                                        <div className={`p-2 rounded-lg shadow-sm ${item.highlight ? "bg-oxford text-sandstone" : "bg-white text-sandstone group-hover:scale-110 transition-transform"}`}>
                                            <item.icon size={20} />
                                        </div>
                                        <span className={`text-sm font-bold ${item.highlight ? "text-oxford" : "text-oxford/80 group-hover:text-oxford"}`}>{item.title}</span>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section >
    );
}
