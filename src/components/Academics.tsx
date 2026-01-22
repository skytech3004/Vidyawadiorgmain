"use client";

import React, { useState } from "react";
import { Download, BookOpen, GraduationCap, Award, Microscope, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Academics() {
    const academicFeatures = [
        {
            title: "Expert Faculty",
            description: "Highly qualified and dedicated educators committed to student success.",
            icon: <GraduationCap className="w-8 h-8" />,
        },
        {
            title: "Modern Labs",
            description: "State-of-the-art science and computer laboratories for practical learning.",
            icon: <Microscope className="w-8 h-8" />,
        },
        {
            title: "Rich Library",
            description: "Extensive collection of books, journals, and digital resources.",
            icon: <BookOpen className="w-8 h-8" />,
        },
        {
            title: "Extra-Curriculars",
            description: "Focus on holistic development through sports, arts, and culture.",
            icon: <Award className="w-8 h-8" />,
        },
    ];

    return (
        <section id="academics" className="py-24 px-6 bg-white text-oxford relative overflow-hidden" data-theme="light">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16 text-center">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4"
                    >
                        Academic Excellence
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold leading-tight text-oxford"
                    >
                        Nurturing Bright Minds for the Future
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {academicFeatures.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[2.5rem] bg-oxford/5 border border-oxford/5 hover:bg-oxford hover:text-white transition-all group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-sandstone/10 flex items-center justify-center text-sandstone-dark mb-6 group-hover:bg-white group-hover:text-oxford transition-all">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                            <p className="opacity-70 leading-relaxed text-sm group-hover:text-white/80">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-sandstone/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-oxford/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        </section>
    );
}
