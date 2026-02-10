"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/data/blogData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Header */}
            <section id="home" data-theme="light" className="pt-32 pb-16 px-6 bg-slate-50 border-b border-black/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-sandstone/5 skew-x-12 translate-x-1/4 rounded-full blur-3xl" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif mb-6 text-oxford"
                    >
                        Our Blog
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-500 max-w-2xl font-light"
                    >
                        Insights, stories, and updates from the vibrant life at Vidyawadi.
                    </motion.p>
                </div>
            </section>

            {/* Blog List */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.1 }}
                        className="space-y-16"
                    >
                        {blogPosts.map((post) => (
                            <motion.article
                                key={post.slug}
                                variants={{
                                    initial: { opacity: 0, y: 30 },
                                    whileInView: { opacity: 1, y: 0 }
                                }}
                                className="group grid md:grid-cols-5 gap-8 items-start"
                            >
                                <div className="md:col-span-2 aspect-[16/10] rounded-[2rem] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                                    <Link href={`/blog/${post.slug}`}>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </Link>
                                </div>

                                <div className="md:col-span-3 pt-4">
                                    <div className="flex items-center gap-6 text-gray-400 text-sm mb-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-sandstone" />
                                            {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-sandstone" />
                                            {post.author}
                                        </div>
                                    </div>

                                    <h2 className="text-3xl font-serif text-oxford mb-4 group-hover:text-sandstone transition-colors leading-tight">
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h2>

                                    <p className="text-gray-500 font-light mb-8 leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-2 text-oxford font-bold group/link relative overflow-hidden"
                                    >
                                        Read Full Article
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 text-sandstone" />
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sandstone transform scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
