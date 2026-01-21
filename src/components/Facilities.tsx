"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Dna,
    BookOpen,
    Home,
    Palette,
    ShieldCheck,
    Component
} from "lucide-react";

const facilities = [
    {
        title: "Equestrian Center",
        description: "State-of-the-art horse riding facilities with trained instructors and 12 horses.",
        icon: "🐴",
        className: "md:col-span-2 md:row-span-2 bg-oxford text-white",
        features: ["12 Well-trained Horses", "Professional Instructors", "Competition Track"]
    },
    {
        title: "NCC Training",
        description: "Building discipline and leadership through National Cadet Corps.",
        icon: "🎖️",
        className: "md:col-span-2 bg-sandstone text-oxford",
        features: ["Army Wing", "Navy Wing"]
    },
    {
        title: "Science Laboratories",
        description: "Fully equipped physics, chemistry, and biology labs for practical excellence.",
        icon: <Dna className="w-12 h-12" />,
        className: "md:col-span-2 bg-white border-2 border-oxford/10 text-oxford",
        features: ["Physics", "Chemistry", "Biology"]
    },
    {
        title: "Digital Library",
        description: "10,000+ books and global digital resources.",
        icon: <BookOpen className="w-10 h-10" />,
        className: "bg-teal-blue text-white"
    },
    {
        title: "Hostel",
        description: "24/7 care, security, and a home-away-from-home.",
        icon: <Home className="w-10 h-10" />,
        className: "bg-sandstone-dark text-white"
    },
    {
        title: "Arts & Culture",
        description: "Creative spaces for holistic development through music, dance, and art.",
        icon: <Palette className="w-12 h-12 md:col-span-2" />,
        className: "md:col-span-2 bg-oxford-dark text-white",
        features: ["Art Studio", "Music Room", "Dance Hall"]
    }
];

export default function Facilities() {
    return (
        <section id="facilities" data-theme="light" className="py-32 px-6 bg-[#fcf9f2] scroll-mt-24">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-oxford mb-4">World-Class Facilities</h2>
                    <p className="text-xl text-oxford/70 max-w-2xl mx-auto">
                        Empowering students with comprehensive learning environments that foster growth and excellence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:auto-rows-[240px]">
                    {facilities.map((fac, i) => (
                        <motion.div
                            key={fac.title}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`rounded-[2.5rem] p-8 md:p-8 flex flex-col shadow-xl transition-shadow hover:shadow-2xl w-full min-h-[400px] md:min-h-0 ${fac.className}`}
                        >
                            <div className="flex-1">
                                <div className="mb-8 text-6xl">
                                    {typeof fac.icon === 'string' ? fac.icon : fac.icon}
                                </div>
                                <h3 className="text-3xl font-bold mb-4">{fac.title}</h3>
                                <p className="text-base opacity-95 leading-relaxed max-w-full md:max-w-sm">{fac.description}</p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-current/10 flex flex-col gap-6">
                                {fac.features && (
                                    <div className="flex flex-wrap gap-2">
                                        {fac.features.map(feat => (
                                            <span key={feat} className="px-3 py-1 rounded-full bg-white/20 text-[10px] uppercase tracking-widest font-bold">
                                                {feat}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <button className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] group/btn self-start">
                                    <span>Enquire Now</span>
                                    <span className="w-8 h-px bg-current transition-all group-hover/btn:w-12" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
