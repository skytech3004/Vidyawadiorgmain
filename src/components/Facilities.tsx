"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Dna,
    BookOpen,
    Home,
    Palette,
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
        features: ["Digital Access", "Offline Study"]
    },
    {
        title: "Skill Center",
        description: "Life skills training including Baking, Culinary, and Grooming.",
        icon: "🍰",
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {facilities.map((fac, i) => (
                        <motion.div
                            key={fac.title}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className={cn(
                                "group rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col",
                                fac.theme || "bg-white"
                            )}
                        >
                            <div className="h-48 relative">
                                {fac.image ? (
                                    <img src={fac.image} alt={fac.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-5xl bg-white/10 backdrop-blur-sm">
                                        {fac.icon}
                                    </div>
                                )}
                            </div>
                            <div className="p-8 flex-grow flex flex-col justify-between">
                                <div className="space-y-3">
                                    <h3 className={cn(
                                        "text-2xl font-black tracking-tight",
                                        fac.theme === "bg-sandstone" ? "text-oxford" : "text-white"
                                    )}>
                                        {fac.title}
                                    </h3>
                                    <p className={cn(
                                        "text-sm leading-relaxed",
                                        fac.theme === "bg-sandstone" ? "text-oxford/80" : "text-white/80"
                                    )}>
                                        {fac.description}
                                    </p>
                                </div>
                                <div className="space-y-6 mt-6">
                                    <div className="flex flex-wrap gap-2">
                                        {fac.features?.map(feat => (
                                            <span key={feat} className={cn(
                                                "px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border",
                                                fac.theme === "bg-sandstone"
                                                    ? "bg-oxford/5 border-oxford/10 text-oxford"
                                                    : "bg-white/10 border-white/10 text-white"
                                            )}>
                                                {feat}
                                            </span>
                                        ))}
                                    </div>

                                    <button className={cn(
                                        "w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 group/btn",
                                        fac.theme === "bg-sandstone"
                                            ? "bg-oxford text-white hover:bg-oxford-dark"
                                            : "bg-white text-oxford hover:bg-sandstone hover:text-oxford"
                                    )}>
                                        <span className="flex items-center justify-center gap-2">
                                            Explore More
                                            <div className="w-4 h-px bg-current group-hover/btn:w-6 transition-all" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
