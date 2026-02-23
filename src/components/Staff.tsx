"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, GraduationCap, Briefcase, Calendar, X, ExternalLink, Trophy, Medal, Star } from "lucide-react";
import Image from "next/image";

interface StaffMember {
    id: number;
    name: string;
    role: string;
    email: string;
    image: string;
    education: string;
    experience: string;
    dob: string;
    previousWork: string;
    bio: string;
}

const awardsData = [
    {
        id: 1,
        name: "Excellence in Girl Empowerment",
        role: "State Level Honor",
        email: "Education Excellence Award",
        image: "/images/trophy.png",
        education: "Awarded by Rajasthan Education Board",
        experience: "2024 Recognition",
        dob: "Academic Year 2024",
        previousWork: "State Level Achievement",
        bio: "Vidyawadi has been recognized for its outstanding contribution to girls' education and personality development through various co-curricular programs."
    },
    {
        id: 2,
        name: "Best Skill Development Program",
        role: "Skill Excellence",
        email: "Award for Creativity",
        image: "/images/trophy.png",
        education: "National Skill Council Recognition",
        experience: "2023-24 Awards",
        dob: "Feb 2024",
        previousWork: "National Level Achievement",
        bio: "Our unique blend of traditional values and modern skill-based programs including horse riding, karate, and culinary training have won national acclaim."
    },
    {
        id: 3,
        name: "Sports & Equestrian Excellence",
        role: "Championship Award",
        email: "State Level Sports",
        image: "/images/trophy.png",
        education: "Rajasthan Sports Federation",
        experience: "Continuous Excellence",
        dob: "Multiple Honors",
        previousWork: "Regional Championship",
        bio: "Recognized as the premier institution for equestrian training and diverse sports opportunities for girl students in the region."
    }
];

export default function Staff() {
    const [selectedAward, setSelectedAward] = useState<any | null>(null);

    return (
        <section id="awards" data-theme="light" className="py-32 px-6 bg-[#fcf9f2] scroll-mt-24">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm">Recognition</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-oxford mt-4">Awards & Accolades</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {awardsData.map((award, i) => (
                        <motion.div
                            key={award.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedAward(award)}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 shadow-2xl bg-white flex items-center justify-center p-12">
                                <Trophy className="w-32 h-32 text-sandstone opacity-20 group-hover:opacity-40 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-t from-oxford/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                    <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest">
                                        <span>View Details</span>
                                        <ExternalLink size={16} />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center px-4">
                                <h3 className="text-2xl font-bold text-oxford mb-1">{award.name}</h3>
                                <p className="text-sandstone-dark font-semibold uppercase tracking-widest text-xs mb-3">{award.role}</p>
                                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                                    <Medal size={14} />
                                    <span>{award.email}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Backdrop */}
            <AnimatePresence>
                {selectedAward && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedAward(null)}
                            className="fixed inset-0 bg-oxford/90 backdrop-blur-md z-[60] cursor-pointer"
                        />
                        <motion.div
                            layoutId={selectedAward.id.toString()}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[900px] md:h-[600px] bg-white rounded-[2rem] md:rounded-[3rem] z-[70] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        >
                            <button
                                onClick={() => setSelectedAward(null)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-white/80 md:bg-white/20 hover:bg-white/40 text-oxford rounded-full backdrop-blur-md z-[80] transition-colors shadow-lg md:shadow-none"
                                title="Close"
                            >
                                <X size={20} className="md:w-6 md:h-6" />
                            </button>

                            {/* Image Side */}
                            <div className="w-full md:w-2/5 h-64 md:h-full relative bg-oxford flex items-center justify-center p-12">
                                <Trophy className="w-48 h-48 text-sandstone" />
                                <div className="absolute inset-0 bg-gradient-to-t from-oxford/60 to-transparent md:bg-gradient-to-r" />
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
                                <div className="mb-8">
                                    <span className="text-sandstone-dark font-bold uppercase tracking-widest text-xs">{selectedAward.role}</span>
                                    <h3 className="text-4xl font-bold text-oxford mt-2">{selectedAward.name}</h3>
                                </div>

                                <div className="grid gap-8">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-sandstone-light flex items-center justify-center shrink-0">
                                            <Medal className="text-oxford" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-oxford text-sm uppercase tracking-widest mb-1">Recognition</h4>
                                            <p className="text-gray-600 text-sm">{selectedAward.education}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-teal-blue/10 flex items-center justify-center shrink-0">
                                            <Star className="text-oxford" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-oxford text-sm uppercase tracking-widest mb-1">Impact</h4>
                                            <p className="text-gray-600 text-sm">{selectedAward.experience}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-sandstone-light flex items-center justify-center shrink-0">
                                            <Calendar className="text-oxford" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-oxford text-sm uppercase tracking-widest mb-1">Date</h4>
                                            <p className="text-gray-600 text-sm">{selectedAward.dob}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 pt-8 border-t border-oxford">
                                    <p className="text-gray-600 leading-relaxed italic">
                                        "{selectedAward.bio}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
