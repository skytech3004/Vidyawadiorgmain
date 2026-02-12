"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, Shield, Landmark, BookOpen, Heart, Award, Users } from "lucide-react";

export default function VisionMissionPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Page Header */}
            <div className="relative pt-40 pb-20 bg-oxford overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sandstone to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sandstone font-black uppercase tracking-[0.4em] text-sm mb-4 block"
                    >
                        Our Core Values
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white"
                    >
                        VISION & MISSION
                    </motion.h1>
                </div>
            </div>

            {/* Vision Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <span className="w-12 h-12 bg-oxford rounded-2xl flex items-center justify-center text-sandstone">
                                    <Target size={24} />
                                </span>
                                <h2 className="text-4xl font-black text-oxford tracking-wide uppercase">Vision</h2>
                            </div>
                            <div className="space-y-6">
                                <p className="text-oxford/70 text-xl font-medium leading-relaxed italic border-l-4 border-sandstone pl-8 bg-sandstone-light/10 py-8 rounded-r-3xl pr-8 shadow-sm">
                                    "To provide affordable, high-quality education that empowers students with knowledge, skills, and strong values. We aim to nurture hidden talents, encourage innovation, and create future leaders, entrepreneurs, and responsible citizens."
                                </p>
                                <p className="text-oxford/70 leading-relaxed text-lg">
                                    Our vision is to be a world-class academic institution that promotes lifelong learning, collaboration, and holistic development in a supportive and inclusive environment.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2"
                        >
                            <div className="aspect-square bg-sandstone-light rounded-[3rem] relative overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-oxford opacity-5" />
                                <div className="absolute inset-12 border-4 border-white/50 rounded-[2rem] flex items-center justify-center p-12 text-center text-oxford">
                                    <div>
                                        <Target size={80} className="mx-auto mb-6 text-oxford/20" />
                                        <h3 className="text-xl font-black uppercase tracking-widest text-oxford/40">Empowerment Through Education</h3>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 bg-oxford text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-sandstone/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="aspect-square bg-white rounded-[3rem] relative overflow-hidden shadow-2xl group">
                                <div className="absolute inset-0 bg-sandstone-light opacity-10 group-hover:opacity-20 transition-opacity" />
                                <div className="absolute inset-12 border-4 border-oxford/10 rounded-[2rem] flex items-center justify-center p-12 text-center text-oxford">
                                    <div>
                                        <Shield size={80} className="mx-auto mb-6 text-oxford/20" />
                                        <h3 className="text-xl font-black uppercase tracking-widest text-oxford/40">Excellence & Protection</h3>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-8 text-sandstone">
                                <span className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-oxford">
                                    <Shield size={24} />
                                </span>
                                <h2 className="text-4xl font-black tracking-wide uppercase">Mission</h2>
                            </div>

                            <div className="space-y-6">
                                <p className="text-white/90 text-xl font-medium leading-relaxed italic border-l-4 border-sandstone pl-8 bg-white/5 py-8 rounded-r-3xl pr-8 shadow-sm">
                                    "Our mission is to deliver excellence in education through value-based and holistic learning. We focus on developing creativity, critical thinking, and entrepreneurial skills while promoting gender equality, social responsibility, and environmental awareness."
                                </p>
                                <p className="text-white/80 leading-relaxed text-lg">
                                    We strive to prepare students for global opportunities and help them succeed in a rapidly changing world.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
