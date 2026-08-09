"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

type BlogCard = {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    slug: string;
};

export default function BlogSection() {
    const [posts, setPosts] = useState<BlogCard[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch("/api/blog");
                const data = await res.json();
                if (data.success && Array.isArray(data.posts)) {
                    setPosts(
                        data.posts.slice(0, 3).map((post: any) => ({
                            title: post.title,
                            excerpt: (post.content || "")
                                .replace(/<[^>]*>/g, " ")
                                .replace(/\s+/g, " ")
                                .trim()
                                .slice(0, 140) + "…",
                            date: new Date(post.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            }),
                            category: post.category || "General",
                            slug: post.slug,
                        }))
                    );
                }
            } catch (error) {
                console.error("Failed to load blog posts:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

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
                    <Link href="/blog">
                        <motion.button
                            whileHover={{ gap: "2rem" }}
                            className="flex items-center gap-4 text-oxford font-black text-xs uppercase tracking-[0.2em] group"
                        >
                            View All Articles
                            <div className="w-12 h-12 rounded-full border border-oxford/20 flex items-center justify-center group-hover:bg-oxford group-hover:text-white transition-all">
                                <ArrowRight size={20} />
                            </div>
                        </motion.button>
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-16 text-gray-400 font-medium">Loading articles…</div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-16">
                        <FileText className="mx-auto text-gray-300 mb-3" size={32} />
                        <p className="text-gray-500">No published articles yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, i) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`}>
                                <motion.article
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group cursor-pointer bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-black/5 flex flex-col justify-between h-full"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="px-4 py-1.5 bg-oxford/5 text-oxford text-[10px] font-bold uppercase tracking-widest rounded-full">
                                                {post.category}
                                            </span>
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-oxford/30">
                                                <Calendar size={12} />
                                                <span>{post.date}</span>
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
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
