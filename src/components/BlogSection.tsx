"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import Image from "next/image";

const recentPosts = [
    {
        title: "Pioneering Teacher Education: Understanding the ITEP Programme",
        excerpt: "Vidyawadi becomes the first private college in Rajasthan to receive the LOI for the Integrated Teacher Education Programme...",
        date: "Oct 24, 2025",
        author: "Admin",
        readTime: "5 min read",
        category: "Academics",
        image: "/images/RS-CIT IT Computer Center.png"
    },
    {
        title: "Shiksha bhi, Sanskar bhi: Our Core Philosophy in Action",
        excerpt: "Exploring how we balance modern academic curriculum with traditional Indian values to nurture the next generation of leaders...",
        date: "Oct 15, 2025",
        author: "Principal",
        readTime: "4 min read",
        category: "Philosophy",
        image: "/images/devika_sharma.png"
    },
    {
        title: "Ensuring 100% Safety: A Look into Our Residential Protocols",
        excerpt: "A deep dive into the safety measures, warden supervision, and secure environment provided at Vidyawadi Girls Hostel...",
        date: "Oct 02, 2025",
        author: "Hostel Warden",
        readTime: "7 min read",
        category: "Safety",
        image: "/images/garima_kawar.png"
    }
];

export default function BlogSection() {
    return (
        <section id="blog" className="py-24 px-6 bg-[#fcf9f2] relative overflow-hidden" data-theme="light">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4"
                        >
                            Latest Updates
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black text-oxford leading-tight"
                        >
                            Articles & Insights
                        </motion.h2>
                    </div>
                    <motion.button
                        whileHover={{ gap: "2rem" }}
                        className="flex items-center gap-4 text-oxford font-black text-xs uppercase tracking-[0.2em] group"
                    >
                        View All Articles
                        <div className="w-12 h-12 rounded-full border border-oxford/20 flex items-center justify-center group-hover:bg-oxford group-hover:text-white transition-all">
                            <ArrowRight size={20} />
                        </div>
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentPosts.map((post, i) => (
                        <motion.article
                            key={post.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-black/5 flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-4 py-1.5 bg-oxford/5 text-oxford text-[10px] font-bold uppercase tracking-widest rounded-full">
                                        {post.category}
                                    </span>
                                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-oxford/30">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={12} />
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl text-oxford group-hover:text-sandstone transition-colors leading-snug">
                                    {post.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 font-light">
                                    {post.excerpt}
                                </p>
                            </div>
                            <div className="pt-8 flex items-center gap-2 text-oxford font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                                Read Full Article
                                <ArrowRight size={14} className="text-sandstone" />
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
