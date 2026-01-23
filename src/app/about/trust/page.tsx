"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Users, Landmark, Heart } from "lucide-react";

export default function TrustPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Page Header */}
            <div className="relative pt-40 pb-20 bg-oxford overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sandstone to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sandstone font-black uppercase tracking-[0.4em] text-sm mb-4 block"
                    >
                        Foundation of Excellence
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white"
                    >
                        MARUDHAR MAHILA SHIKSHAN SANGH
                    </motion.h1>
                </div>
            </div>

            {/* About the Trust */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-black text-oxford mb-8">The Visionaries Behind Vidyawadi</h2>
                            <p className="text-oxford/70 text-lg leading-relaxed mb-6">
                                Marudhar Mahila Shikshan Sangh is a charitable educational trust dedicated to the upliftment and empowerment of women in Rajasthan and beyond.
                                Established with a philanthropic spirit, the trust has been the driving force behind the creation and evolution of Vidyawadi.
                            </p>
                            <p className="text-oxford/70 text-lg leading-relaxed mb-8">
                                Our mission is to provide high-quality, affordable education that blends modern technology with traditional Indian values, ensuring that every girl has the opportunity to realize her full potential.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: Landmark, text: "Established as a non-profit educational trust." },
                                    { icon: Heart, text: "Focus on rural and underprivileged girl education." },
                                    { icon: Users, text: "Governed by a committee of eminent educationists and philanthropists." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-oxford font-bold">
                                        <div className="w-10 h-10 bg-sandstone-light/30 rounded-lg flex items-center justify-center text-sandstone">
                                            <item.icon size={20} />
                                        </div>
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-oxford p-12 rounded-[3rem] text-white shadow-2xl relative"
                        >
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-sandstone rounded-full mix-blend-overlay opacity-20" />
                            <h3 className="text-2xl font-black mb-6 text-sandstone">Core Objectives</h3>
                            <ul className="space-y-4 text-white/80">
                                <li className="flex gap-4">
                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-sandstone" />
                                    <span>Promoting technical and professional education among women.</span>
                                </li>
                                <li className="flex gap-4">
                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-sandstone" />
                                    <span>Developing character and leadership qualities.</span>
                                </li>
                                <li className="flex gap-4">
                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-sandstone" />
                                    <span>Ensuring a safe and nurturing residential environment.</span>
                                </li>
                                <li className="flex gap-4">
                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-sandstone" />
                                    <span>Supporting students through scholarships and skill development.</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
