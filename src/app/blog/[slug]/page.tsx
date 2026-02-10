"use client";

import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import React from "react";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params);
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white pb-24">
            <Navbar />

            {/* Post Hero */}
            <section id="home" data-theme="light" className="pt-32 pb-16 px-6 bg-slate-50 border-b border-black/5">
                <div className="max-w-4xl mx-auto">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sandstone font-bold mb-8 hover:-translate-x-1 transition-transform">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-sandstone" />
                                {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-sandstone" />
                                {post.author}
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif text-oxford mb-8 leading-tight">
                            {post.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Post Content */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 aspect-video">
                            <img src={post.image} className="w-full h-full object-cover" />
                        </div>

                        <div className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed whitespace-pre-wrap">
                            {post.content}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
