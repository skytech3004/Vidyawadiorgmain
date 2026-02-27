"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ImageIcon, ExternalLink } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryAlbum {
    _id: string;
    albumTitle: string;
    images: string[];
    category: string;
    date?: string;
    updatedAt: string;
}

export default function GallerySection() {
    const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
    const [dynamicCategories, setDynamicCategories] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState("Recent");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [galleryRes, catsRes] = await Promise.all([
                    fetch("/api/gallery"),
                    fetch("/api/admin/gallery-categories")
                ]);

                const galleryData = await galleryRes.json();
                const catsData = await catsRes.json();

                if (galleryData.success && galleryData.data) {
                    setAlbums(galleryData.data);
                }
                if (catsData.success && catsData.categories) {
                    setDynamicCategories(catsData.categories.map((c: any) => c.name));
                }
            } catch (error) {
                console.error("Failed to fetch gallery data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const categories = useMemo(() => {
        const albumCats = new Set(albums.map(a => a.category).filter(Boolean));
        const merged = Array.from(new Set(["Recent", ...dynamicCategories, ...Array.from(albumCats)]));
        return merged;
    }, [albums, dynamicCategories]);

    const displayAlbums = useMemo(() => {
        let filtered;
        if (activeCategory === "Recent") {
            filtered = [...albums].sort((a, b) =>
                new Date(b.date || b.updatedAt).getTime() - new Date(a.date || a.updatedAt).getTime()
            );
        } else {
            filtered = albums.filter(a => a.category === activeCategory);
        }
        return filtered.slice(0, 8);
    }, [albums, activeCategory]);

    if (loading) {
        return (
            <div className="py-24 px-6 bg-white flex flex-col items-center justify-center min-h-[600px] gap-4">
                <div className="w-12 h-12 border-4 border-sandstone/20 border-t-sandstone rounded-full animate-spin" />
                <p className="text-oxford/40 font-bold uppercase tracking-widest text-[10px]">Loading Gallery...</p>
            </div>
        );
    }

    if (albums.length === 0) return null;

    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-12">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-sandstone font-bold uppercase tracking-[0.4em] text-sm block mb-4"
                        >
                            Our Visual Journey
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black text-oxford leading-tight uppercase"
                        >
                            Moments of <span className="text-sandstone">Excellence</span>
                        </motion.h2>

                        <div className="flex flex-wrap gap-2 mt-10">
                            {categories.slice(0, 10).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border",
                                        activeCategory === cat
                                            ? "bg-oxford text-white border-oxford shadow-lg scale-105"
                                            : "bg-transparent text-oxford/40 border-oxford/10 hover:border-oxford/30"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="shrink-0"
                    >
                        <Link
                            href={activeCategory === "Recent" ? "/gallery" : `/gallery?category=${activeCategory}`}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-oxford text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-sandstone hover:text-oxford transition-all group shadow-xl"
                        >
                            View {activeCategory === "Recent" ? "All Moments" : `${activeCategory} Albums`}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AnimatePresence mode="popLayout">
                        {displayAlbums.map((album, idx) => (
                            <motion.div
                                key={album._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl cursor-pointer"
                            >
                                <Link href={`/gallery?category=${album.category}`}>
                                    <Image
                                        src={album.images[0] || '/images/placeholder.webp'}
                                        alt={album.albumTitle}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Rich Reddish-Pink Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#B02A30]/90 via-[#B02A30]/30 to-transparent opacity-100 group-hover:opacity-90 transition-opacity" />

                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-tight leading-none mb-1 shadow-sm">
                                            {album.albumTitle}
                                        </h3>
                                        <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em]">
                                            {album.category}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
