"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Page Header */}
            <div className="relative pt-40 pb-20 bg-oxford overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sandstone/20 via-transparent to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sandstone font-black uppercase tracking-[0.4em] text-sm mb-4 block"
                    >
                        Learn More
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white"
                    >
                        ABOUT VIDYAWADI
                    </motion.h1>
                </div>
            </div>

            {/* Content Section */}
            <About />

            {/* Additional Detailed Content can go here */}
            <section className="py-20 bg-sandstone-light/10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-black text-oxford mb-8">Nurturing Excellence Since 1956</h2>
                    <p className="text-oxford/70 text-lg leading-relaxed mb-12">
                        Vidyawadi is more than just a school and college; it is a community dedicated to the holistic development of girls.
                        Our campus is spread over 50 acres of lush greenery, providing an ideal environment for learning and growth.
                        With a legacy of over 65 years, we have consistently produced leaders who excel in various fields across the globe.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-4xl font-black text-sandstone mb-2">65+</div>
                            <div className="text-sm font-bold text-oxford/60 uppercase tracking-widest">Acres Campus</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-sandstone mb-2">2000+</div>
                            <div className="text-sm font-bold text-oxford/60 uppercase tracking-widest">Students</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-sandstone mb-2">70+</div>
                            <div className="text-sm font-bold text-oxford/60 uppercase tracking-widest">Years Legacy</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-sandstone mb-2">100%</div>
                            <div className="text-sm font-bold text-oxford/60 uppercase tracking-widest">Safety Record</div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
