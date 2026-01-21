"use client";

import React from "react";
import { motion } from "framer-motion";

const timelineEvents = [
    {
        year: "1960",
        title: "The Foundation",
        description: "Vidyawadi School established with 50 students and 5 teachers in a small building.",
        side: "left"
    },
    {
        year: "1975",
        title: "Campus Expansion",
        description: "New academic block and science laboratories inaugurated by the Governor.",
        side: "right"
    },
    {
        year: "1985",
        title: "NCC Introduction",
        description: "NCC unit established, promoting discipline, patriotism, and leadership.",
        side: "left"
    },
    {
        year: "1995",
        title: "Equestrian Center",
        description: "First school in the region to introduce a dedicated horse riding program.",
        side: "right"
    },
    {
        year: "2010",
        title: "Digital Revolution",
        description: "Integration of smart classes and a comprehensive digital learning system.",
        side: "left"
    },
    {
        year: "2025",
        title: "65 Years of Excellence",
        description: "Celebrating our diamond jubilee with over 5,000 alumni worldwide.",
        side: "right"
    }
];

export default function Heritage() {
    return (
        <section id="heritage" data-theme="light" className="py-32 bg-white relative scroll-mt-24">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm">Our Journey</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-oxford mt-4">Heritage & Legacy</h2>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-sandstone via-oxford to-sandstone-dark hidden md:block" />

                    <div className="space-y-24">
                        {timelineEvents.map((event, i) => (
                            <div key={event.year} className={`flex flex-col md:flex-row items-center gap-8 ${event.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                                {/* Content */}
                                <motion.div
                                    initial={{ opacity: 0, x: event.side === 'left' ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                    className="md:w-1/2"
                                >
                                    <div className={`p-8 rounded-[2rem] shadow-2xl ${event.side === 'left' ? 'bg-oxford text-white' : 'bg-sandstone-light text-oxford'} relative group hover:scale-[1.02] transition-transform`}>
                                        <span className={`text-5xl font-bold opacity-20 absolute top-4 right-6`}>{event.year}</span>
                                        <span className="text-sm font-bold uppercase tracking-widest mb-2 block">{event.year}</span>
                                        <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                                        <p className="opacity-90 leading-relaxed">{event.description}</p>
                                    </div>
                                </motion.div>

                                {/* Center Circle */}
                                <div className="relative z-10 hidden md:flex items-center justify-center w-12 h-12">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        className="w-4 h-4 rounded-full bg-sandstone ring-4 ring-white shadow-xl"
                                    />
                                </div>

                                {/* Empty space for alignment */}
                                <div className="md:w-1/2 hidden md:block" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
