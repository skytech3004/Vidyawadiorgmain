"use client";

import React from "react";
import { motion } from "framer-motion";
import { galleryAlbums } from "@/data/galleryData";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import Image from "next/image";

export default function GallerySection() {
    // Show top 3 albums
    const displayAlbums = galleryAlbums.slice(0, 3);

    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
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
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/gallery"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-oxford text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-sandstone hover:text-oxford transition-all group"
                        >
                            View All Albums
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayAlbums.map((album, idx) => (
                        <motion.div
                            key={album.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative flex flex-col bg-slate-50 rounded-[2rem] overflow-hidden border border-black/5 hover:shadow-2xl transition-all duration-500"
                        >
                            <Link href={`/gallery/${album.id}`} className="block relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={album.coverImage}
                                    alt={album.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                    <ImageIcon className="w-4 h-4 text-sandstone" />
                                    <span className="text-xs font-bold text-oxford">{album.images.length} Photos</span>
                                </div>
                            </Link>

                            <div className="p-8 flex flex-col flex-1">
                                <h3 className="text-2xl font-bold text-oxford mb-3 group-hover:text-sandstone transition-colors uppercase">
                                    {album.title}
                                </h3>
                                <p className="text-gray-500 font-light text-sm mb-6 line-clamp-2">
                                    {album.description}
                                </p>
                                <Link
                                    href={`/gallery/${album.id}`}
                                    className="mt-auto inline-flex items-center gap-2 text-oxford font-bold group/link uppercase tracking-wider text-xs"
                                >
                                    View Album
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
