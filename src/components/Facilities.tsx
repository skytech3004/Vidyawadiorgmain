"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Dna,
    BookOpen,
    Home,
    Palette, Medal,
    Crown
} from "lucide-react";

interface Facility {
    title: string;
    description: string;
    icon: React.ReactNode | string;
    theme?: string;
    features?: string[];
    image?: string;
}

const facilities: Facility[] = [
    {
        title: "Equestrian Center",
        description: "Professional horse riding training for personality development and confidence.",
        icon: "🐴",
        theme: "bg-oxford",
        features: ["Horse Riding", "Stable Management"]
    },
    {
        title: "NCC Training",
        description: "Building discipline and leadership through Army and Navy wings.",
        icon: "🎖️",
        image: "/images/english school/a9fa45d8-e14b-4e5f-b4c0-64cc9c49e22f.jpg",
        theme: "bg-sandstone",
        features: ["Army Wing", "Navy Wing"]
    },
    {
        title: "Science Labs",
        description: "Advanced physics, chemistry, and biology labs for practical excellence.",
        icon: <Dna className="w-12 h-12 text-white/30" />,
        image: "/Chemistry Laboratory.jpg",
        theme: "bg-teal-blue",
        features: ["Physics", "Chemistry", "Biology"]
    },
    {
        title: "Digital Library",
        description: "10,000+ books and global digital resources for research.",
        icon: <BookOpen className="w-12 h-12 text-white/30" />,
        theme: "bg-oxford-dark",
        image: "/uploads/mess/aa.jpg",

        features: ["Digital Access", "Offline Study"]
    },
    {
        title: "Skill Center",
        description: "Life skills training including Baking, Culinary, and Grooming.",
        icon: <Crown className="w-12 h-12 text-white/30" />,
        image: "/skill.jpg",

        theme: "bg-sandstone-dark",
        features: ["Baking", "Culinary", "Grooming"]
    },
    {
        title: "Arts & Culture",
        description: "Creative spaces for music, dance, and fine arts excellence.",
        icon: <Palette className="w-12 h-12 text-white/30" />,
        image: "/Music Laboratory.jpg",
        theme: "bg-oxford",
        features: ["Music", "Dance", "Art"]
    },
    {
        title: "Self Defense",
        description: "Empowering girls with Karate and advanced self-defense techniques.",
        icon: "🥋",
        image: "/karate.png",

        theme: "bg-teal-blue",
        features: ["Karate", "Safety Drills"]
    },
    {
        title: "Hostel Life",
        description: "Safe and nurturing environment with 24/7 care and security.",
        icon: <Home className="w-12 h-12 text-white/30" />,
        image: "/hostel.jpg",
        theme: "bg-sandstone",
        features: ["24/7 Care", "Security"]
    },
    {
        title: "NSS",
        description: "National Service Scheme for community service and leadership development.",
        icon: <Medal className="w-12 h-12 text-white/30" />,
        image: "/NSS.jpg",
        theme: "bg-sandstone",
        features: ["24/7 Care", "Security"]
    }
];

export default function Facilities() {
    return (
        <section id="facilities" data-theme="light" className="py-24 px-6 bg-[#fcf9f2] scroll-mt-24 font-inter">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20"
                >
                    <span className="text-sandstone font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Our Infrastructure</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-oxford mb-6 uppercase tracking-tight">
                        World-Class <span className="text-sandstone">Facilities</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-sandstone mx-auto rounded-full mb-8" />
                    <p className="text-lg text-oxford/70 max-w-2xl mx-auto leading-relaxed">
                        Providing an exceptional environment that nurtures academic brilliance and holistic growth in every student.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {facilities.map((fac, i) => (
                        <motion.div
                            key={fac.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-sandstone/20"
                        >
                            {/* Image Background */}
                            <div className="absolute inset-0 z-0">
                                {fac.image ? (
                                    <img
                                        src={fac.image}
                                        alt={fac.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className={cn(
                                        "w-full h-full flex items-center justify-center bg-gradient-to-br",
                                        fac.theme === "bg-sandstone" ? "from-sandstone to-sandstone-dark" : "from-oxford to-oxford-dark"
                                    )}>
                                        <div className="scale-150 opacity-20">{fac.icon}</div>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-oxford-dark/95 via-oxford-dark/40 to-transparent z-10" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                                <div className="mb-6 transform transition-all duration-500 delay-100 group-hover:translate-y-[-10px]">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-sandstone/10 backdrop-blur-md rounded-2xl text-sandstone border border-sandstone/20">
                                            {typeof fac.icon === 'string' ? <span className="text-2xl">{fac.icon}</span> : React.cloneElement(fac.icon as any, { className: "w-6 h-6" })}
                                        </div>
                                        <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
                                            {fac.title}
                                        </h3>
                                    </div>
                                    <p className="text-white/80 text-lg leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                        {fac.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 transform translate-y-4 group-hover:translate-y-0">
                                        {fac.features?.map(feat => (
                                            <span key={feat} className="px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-black bg-white/10 backdrop-blur-md border border-white/10 text-white">
                                                {feat}
                                            </span>
                                        ))}
                                    </div>

                                    <button className="flex items-center gap-4 text-sandstone font-black text-sm uppercase tracking-widest group/btn bg-white/5 hover:bg-sandstone hover:text-oxford px-6 py-4 rounded-2xl transition-all duration-300 w-fit backdrop-blur-sm border border-sandstone/30">
                                        Explore Excellence
                                        <div className="w-8 h-px bg-current group-hover/btn:w-12 transition-all duration-300" />
                                    </button>
                                </div>
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sandstone/10 backdrop-blur-3xl rounded-bl-[5rem] z-10 translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
