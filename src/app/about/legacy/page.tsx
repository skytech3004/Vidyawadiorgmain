"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Heritage from "@/components/Heritage";
import { motion } from "framer-motion";
import { History, Calendar, Award, Star } from "lucide-react";

export default function LegacyPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Page Header */}
            <div className="relative pt-40 pb-20 bg-oxford overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-sandstone/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sandstone font-black uppercase tracking-[0.4em] text-sm mb-4 block"
                    >
                        Our Journey of Excellence
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white"
                    >
                        LEGACY SINCE 1956
                    </motion.h1>
                </div>
            </div>

            {/* Intro section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="w-20 h-20 bg-sandstone-light rounded-full flex items-center justify-center mx-auto mb-10 text-sandstone">
                        <History size={40} />
                    </div>
                    <h2 className="text-4xl font-black text-oxford mb-8">A Tradition of Empowerment</h2>
                    <p className="text-oxford/70 text-xl leading-relaxed">
                        The roots of Vidyawadi run deep, going back to 1956 when it was established with a singular vision:
                        to provide quality education to girls and empower them to lead.
                        Over the decades, we have transformed from a modest school into a premier residential institution,
                        all while staying true to our core values of discipline, safety, and holistic growth.
                    </p>
                </div>
            </section>

            {/* Timeline Section */}
            <Heritage />

            {/* Milestones / Stats */}
            <section className="py-24 bg-oxford text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-10 bg-white/5 rounded-3xl border border-white/10"
                        >
                            <Calendar size={48} className="text-sandstone mx-auto mb-6" />
                            <div className="text-5xl font-black mb-2 text-white">1956</div>
                            <div className="text-sandstone font-bold uppercase tracking-widest text-sm">Year Established</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-10 bg-white/5 rounded-3xl border border-white/10"
                        >
                            <Award size={48} className="text-sandstone mx-auto mb-6" />
                            <div className="text-5xl font-black mb-2 text-white">65+</div>
                            <div className="text-sandstone font-bold uppercase tracking-widest text-sm">Years of Excellence</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-10 bg-white/5 rounded-3xl border border-white/10"
                        >
                            <Star size={48} className="text-sandstone mx-auto mb-6" />
                            <div className="text-5xl font-black mb-2 text-white">5000+</div>
                            <div className="text-sandstone font-bold uppercase tracking-widest text-sm">Global Alumni</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
