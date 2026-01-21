"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, School, Users, ArrowRight, Star } from "lucide-react";
import Image from "next/image";

const institutions = [
    {
        title: "L.D. Sancheti Kanya Mahavidyalaya",
        type: "College",
        description: "A premier NAAC B++ accredited girls college offering quality UG education with a focus on holistic development.",
        icon: <GraduationCap className="w-6 h-6" />,
        stats: "NAAC B++ Grade",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
        tags: ["UG Courses", "Empowering Girls"]
    },
    {
        title: "ITEP Teacher Training College",
        type: "College",
        description: "Pioneering the Integrated Teacher Education Programme in Rajasthan. Offering B.Sc. B.Ed, B.Com. B.Ed, and B.A. B.Ed.",
        icon: <BookOpen className="w-6 h-6" />,
        stats: "First in Rajasthan",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
        tags: ["ITEP Program", "Future Educators"]
    },
    {
        title: "Vidyawadi CBSE School",
        type: "School",
        description: "English medium Senior Secondary School following the CBSE curriculum, focused on modern pedagogy and academic excellence.",
        icon: <School className="w-6 h-6" />,
        stats: "English Medium",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
        tags: ["CBSE Curriculum", "Holistic Growth"]
    },
    {
        title: "Vidyawadi RBSE Schools",
        type: "School",
        description: "Dual medium (Hindi & English) Senior Secondary Schools offering value-based education under the State Board.",
        icon: <Users className="w-6 h-6" />,
        stats: "Hindi & English",
        image: "https://images.unsplash.com/photo-1577891729319-f48710d3a929?q=80&w=2070&auto=format&fit=crop",
        tags: ["RBSE Board", "Cultural Values"]
    }
];

export default function Institutions() {
    return (
        <section id="institutions" className="py-24 px-6 bg-white relative overflow-hidden" data-theme="light">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-oxford/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-sandstone/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4"
                    >
                        Pillars of Excellence
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-oxford leading-tight"
                    >
                        Our Institutions
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {institutions.map((inst, i) => (
                        <motion.div
                            key={inst.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-oxford/5 shadow-xl hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Card Image Wrapper */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={inst.image}
                                    alt={inst.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-oxford/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full flex items-center gap-2">
                                    <span className="text-oxford text-xs font-black uppercase tracking-widest">{inst.type}</span>
                                </div>

                                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
                                    <div className="flex items-center gap-2 bg-sandstone/90 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-oxford">
                                        <Star size={12} fill="currentColor" />
                                        {inst.stats}
                                    </div>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-8 md:p-10">
                                <div className="flex gap-3 mb-4">
                                    {inst.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-bold text-sand-dark opacity-60 uppercase tracking-widest">{tag}</span>
                                    ))}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-oxford mb-4 group-hover:text-sandstone transition-colors leading-tight">
                                    {inst.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-8 line-clamp-2">
                                    {inst.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 rounded-2xl bg-oxford/5 flex items-center justify-center text-oxford group-hover:bg-oxford group-hover:text-white transition-all duration-300">
                                        {inst.icon}
                                    </div>
                                    <button className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-oxford group-hover:gap-4 transition-all overflow-hidden relative pr-8">
                                        Explore More
                                        <ArrowRight size={16} className="absolute right-0 group-hover:-right-2 transition-all" />
                                    </button>
                                </div>
                            </div>

                            {/* Decorative Line */}
                            <div className="absolute bottom-0 left-0 h-1.5 bg-sandstone w-0 group-hover:w-full transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-oxford/60 font-medium italic mb-8">
                        "Empowering daughters with modern knowledge and traditional values since 1956."
                    </p>
                    <button className="px-10 py-4 bg-oxford text-white rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-sandstone hover:text-oxford transition-all">
                        View All Programmes
                    </button>
                </div>
            </div>
        </section>
    );
}
