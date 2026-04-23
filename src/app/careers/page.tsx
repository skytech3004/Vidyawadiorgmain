"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, Mail, Loader2 } from "lucide-react";

export default function CareersPage() {
    const [careers, setCareers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const res = await fetch("/api/careers");
                const data = await res.json();
                if (res.ok) {
                    setCareers(data);
                }
            } catch (error) {
                console.error("Failed to fetch careers", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCareers();
    }, []);

    // Group careers by category
    const groupedCareers = careers.reduce((acc: any, career: any) => {
        if (!acc[career.category]) {
            acc[career.category] = [];
        }
        acc[career.category].push(career);
        return acc;
    }, {});

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
                        Join Our Team
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white"
                    >
                        CAREERS
                    </motion.h1>
                </div>
            </div>

            <section className="py-24 px-6 relative">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-sandstone/5 skew-x-12 translate-x-1/4 rounded-full blur-3xl -z-10" />

                <div className="max-w-4xl mx-auto space-y-20">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-5xl font-black text-oxford mb-6">Current Openings</h2>
                        <p className="text-gray-500 font-light text-lg">
                            We are always looking for passionate educators and professionals to join our dynamic community.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4 text-sandstone">
                            <Loader2 size={40} className="animate-spin" />
                            <p className="text-lg font-bold text-gray-500">Loading opportunities...</p>
                        </div>
                    ) : careers.length === 0 ? (
                        <div className="text-center py-20">
                            <Briefcase size={64} className="mx-auto text-gray-200 mb-6" />
                            <h3 className="text-2xl font-bold text-oxford mb-2">No Openings Currently</h3>
                            <p className="text-gray-500">Please check back later for new opportunities.</p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {Object.entries(groupedCareers).map(([category, jobs]: [string, any], index) => (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100"
                                >
                                    <h3 className="text-2xl md:text-3xl font-black text-oxford mb-8 pb-4 border-b border-gray-100 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-sandstone/10 rounded-xl flex items-center justify-center text-sandstone">
                                            <Briefcase size={24} />
                                        </div>
                                        {category}
                                    </h3>

                                    <div className="space-y-8">
                                        {jobs.map((job: any) => (
                                            <div key={job._id} className="group">
                                                <h4 className="text-xl font-bold text-oxford mb-2 group-hover:text-sandstone transition-colors">
                                                    {job.title}
                                                </h4>
                                                {job.subjects && (
                                                    <p className="text-gray-600 font-medium mb-2">
                                                        <span className="text-gray-400">Subjects:</span> {job.subjects}
                                                    </p>
                                                )}
                                                {job.requirements && (
                                                    <p className="text-gray-500 text-sm leading-relaxed">
                                                        {job.requirements}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-oxford text-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sandstone rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />

                        <h3 className="text-2xl md:text-3xl font-black mb-8 relative z-10">Applicants Should:</h3>
                        <ul className="space-y-4 mb-12 relative z-10">
                            {[
                                "Have excellent communication skills in English.",
                                "Be passionate about teaching and student development.",
                                "Have basic knowledge of computers and modern teaching aids.",
                                "Be a team player with a positive attitude."
                            ].map((req, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-sandstone shrink-0 mt-0.5" />
                                    <span className="text-gray-300 text-lg">{req}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative z-10 text-center">
                            <p className="text-sandstone font-black tracking-widest text-sm uppercase mb-4">Salary no constraint for deserving candidates</p>
                            <h4 className="text-2xl font-bold mb-6">Interested candidates may send their resume to</h4>
                            <a
                                href="mailto:marudharmahila@gmail.com"
                                className="inline-flex items-center gap-3 bg-sandstone hover:bg-sandstone-dark text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
                            >
                                <Mail size={20} />
                                marudharmahila@gmail.com
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
