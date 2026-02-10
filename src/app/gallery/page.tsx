"use client";

import { motion } from "framer-motion";
import { galleryAlbums } from "@/data/galleryData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Calendar, Image as ImageIcon, ArrowRight } from "lucide-react";

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Header */}
            <section id="home" data-theme="dark" className="pt-32 pb-16 px-6 bg-oxford text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-sandstone/10 skew-x-12 translate-x-1/4 rounded-full blur-3xl" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif mb-6"
                    >
                        Our Gallery
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-white/70 max-w-2xl font-light"
                    >
                        Witness the journey of excellence, creativity, and joy through our curated collection of moments.
                    </motion.p>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.1 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {galleryAlbums.map((album) => (
                            <motion.div
                                key={album.id}
                                variants={{
                                    initial: { opacity: 0, y: 30 },
                                    whileInView: { opacity: 1, y: 0 }
                                }}
                                className="group relative flex flex-col bg-slate-50 rounded-[2rem] overflow-hidden border border-black/5 hover:shadow-2xl transition-all duration-500"
                            >
                                <Link href={`/gallery/${album.id}`} className="block relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={album.coverImage}
                                        alt={album.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                        <ImageIcon className="w-4 h-4 text-sandstone" />
                                        <span className="text-xs font-bold text-oxford">{album.images.length} Photos</span>
                                    </div>
                                </Link>

                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-sandstone text-xs font-bold uppercase tracking-widest mb-3">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(album.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </div>
                                    <h2 className="text-2xl font-serif text-oxford mb-3 group-hover:text-sandstone transition-colors">
                                        {album.title}
                                    </h2>
                                    <p className="text-gray-500 font-light text-sm mb-6 line-clamp-2">
                                        {album.description}
                                    </p>
                                    <Link
                                        href={`/gallery/${album.id}`}
                                        className="mt-auto inline-flex items-center gap-2 text-oxford font-bold group/link"
                                    >
                                        View Album
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
