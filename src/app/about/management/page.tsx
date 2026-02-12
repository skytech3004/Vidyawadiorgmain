"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Staff from "@/components/Staff";
import { motion } from "framer-motion";
import { Users, ShieldCheck, Heart, GraduationCap } from "lucide-react";

export default function ManagementPage() {
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
                        Guiding Our Vision
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white"
                    >
                        MANAGEMENT & LEADERSHIP
                    </motion.h1>
                </div>
            </div>

            {/* Leadership Message */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-black text-oxford mb-8">Guided by Excellence</h2>
                            <p className="text-oxford/70 text-lg leading-relaxed mb-6">
                                The management of Vidyawadi is committed to creating an environment where girls can flourish.
                                Our leadership team consists of experienced educationists, social workers, and industry leaders who bring a wealth of knowledge and a shared passion for women's empowerment.
                            </p>
                            <p className="text-oxford/70 text-lg leading-relaxed mb-8">
                                We believe in transparent governance, continuous innovation, and maintaining the highest standards of safety and academic rigor.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { icon: ShieldCheck, title: "Integrity", desc: "Honest & transparent governance" },
                                    { icon: Heart, title: "Compassion", desc: "Student-centric approach" },
                                    { icon: GraduationCap, title: "Innovation", desc: "Modern teaching methods" },
                                    { icon: Users, title: "Community", desc: "Strong stakeholder bonds" }
                                ].map((item, i) => (
                                    <div key={i} className="p-4 bg-sandstone-light/10 rounded-2xl border border-sandstone/10">
                                        <item.icon size={24} className="text-sandstone mb-3" />
                                        <h4 className="font-bold text-oxford mb-1">{item.title}</h4>
                                        <p className="text-sm text-oxford/60">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-oxford p-12 rounded-[3rem] text-white shadow-2xl"
                        >
                            <h3 className="text-2xl font-black mb-6 text-sandstone">Our Leadership Structure</h3>
                            <div className="space-y-6">
                                <div className="pb-6 border-b border-white/10">
                                    <h4 className="font-bold text-white text-lg">General Committee</h4>
                                    <p className="text-white/60 text-sm mt-1 uppercase tracking-widest">Decision-making body</p>
                                </div>
                                <div className="pb-6 border-b border-white/10">
                                    <h4 className="font-bold text-white text-lg">Managing Committee</h4>
                                    <p className="text-white/60 text-sm mt-1 uppercase tracking-widest">Operational leadership</p>
                                </div>
                                <div className="pb-6 border-b border-white/10">
                                    <h4 className="font-bold text-white text-lg">Academic Council</h4>
                                    <p className="text-white/60 text-sm mt-1 uppercase tracking-widest">Educational standards</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">Parent-Teacher Association</h4>
                                    <p className="text-white/60 text-sm mt-1 uppercase tracking-widest">Collaborative growth</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Office Bearers Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-oxford mb-4"
                        >
                            OFFICE BEARERS (2024-2027)
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="space-y-2"
                        >
                            <h3 className="text-xl font-bold text-sandstone uppercase tracking-widest">Marudhar Mahila Shikshan Sangh,Vidyawadi, Vidyawaadi (Khimel)</h3>
                            <p className="text-oxford/60 font-medium">Station Rani, Dist-Pali 306115 (Rajasthan)</p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[
                            { name: "Shri Kantilal Nagraj Mehta", post: "President" },
                            { name: "Shri Pradeep Ghisulal Rathod", post: "Vice President" },
                            { name: "Shri Chandan Magraj Parmar", post: "Vice President" },
                            { name: "Shri Kantilal Multanmal Mehta", post: "Vice President" },
                            { name: "Shri Arvind kumar Pannalal Ranawat", post: "Vice President" },
                            { name: "Shri Kailash Tejraj Kaveria", post: "Secretary" },
                            { name: "Mrs. Chandra Pradeep Mehta", post: "Joint Secretary" },
                            { name: "Shri Hasmukhlal Ramanlal Sanghvi", post: "Joint Secretary" },
                            { name: "Shri Mahendra Kumar Dhoka", post: "Treasurer" },
                            { name: "Shri Bharat Bakhtawarmal Rathod", post: "JT. Treasurer" },
                            { name: "Shri Popatlal Fulchand Sundesha", post: "Past President" }
                        ].map((bearer, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group bg-white rounded-3xl p-8 border border-oxford/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="aspect-square w-full mb-6 relative overflow-hidden rounded-2xl bg-sandstone-light/20 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-t from-oxford/20 to-transparent" />
                                    <Users size={64} className="text-oxford/20" />
                                </div>
                                <h4 className="text-xl font-black text-oxford mb-2 group-hover:text-sandstone transition-colors truncate" title={bearer.name}>
                                    {bearer.name}
                                </h4>
                                <p className="text-sandstone font-black uppercase tracking-widest text-xs">
                                    {bearer.post}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet the Faculty / Management Team */}
            <Staff />

            <Footer />
        </main>
    );
}
