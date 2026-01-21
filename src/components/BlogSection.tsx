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
        image: "https://images.unsplash.com/photo-1544928147-3949a2cd7a72?q=80&w=1974&auto=format&fit=crop"
    },
    {
        title: "Shiksha bhi, Sanskar bhi: Our Core Philosophy in Action",
        excerpt: "Exploring how we balance modern academic curriculum with traditional Indian values to nurture the next generation of leaders...",
        date: "Oct 15, 2025",
        author: "Principal",
        readTime: "4 min read",
        category: "Philosophy",
        image: "https://images.unsplash.com/photo-1544717297-fa95b35c7a36?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Ensuring 100% Safety: A Look into Our Residential Protocols",
        excerpt: "A deep dive into the safety measures, warden supervision, and secure environment provided at Vidyawadi Girls Hostel...",
        date: "Oct 02, 2025",
        author: "Hostel Warden",
        readTime: "7 min read",
        category: "Safety",
        image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=2070&auto=format&fit=crop"
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
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-oxford uppercase tracking-widest">
                                    {post.category}
                                </div>
                            </div>

                            <div className="space-y-4 px-2">
                                <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-oxford/50">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-oxford group-hover:text-sandstone transition-colors leading-snug">
                                    {post.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <div className="pt-4 flex items-center gap-2 text-oxford font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                                    Continue Reading
                                    <ArrowRight size={14} className="text-sandstone" />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
