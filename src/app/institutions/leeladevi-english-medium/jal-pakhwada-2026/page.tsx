"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, X, Image as ImageIcon, Film } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mediaItems = [
    { type: "image", src: "/WhatsApp Image 2026-04-30 at 10.34.08.jpeg", alt: "Jal Pakhwada 2026 Featured" },
    { type: "image", src: "/images copy/001pi.jpg", alt: "Jal Pakhwada 2026 Event" },
    { type: "image", src: "/images copy/001pi22.jpg", alt: "Student Activities" },
    { type: "image", src: "/images copy/WhatsApp Image 2026-04-27 at 15.58.34 (2).jpeg", alt: "Awareness Campaign" },
    { type: "image", src: "/images copy/WhatsApp Image 2026-04-27 at 15.58.37 (2).jpeg", alt: "Water Conservation Poster" },
    { type: "image", src: "/images copy/WhatsApp Image 2026-04-27 at 15.58.47 (1).jpeg", alt: "Group Photo" },
    { type: "image", src: "/images copy/WhatsApp Image 2026-04-27 at 15.59.15.jpeg", alt: "Water Conservation Initiative" },
    { type: "image", src: "/images copy/WhatsApp Image 2026-04-27 at 20.50.27 (1).jpeg", alt: "Creative Work" },
    { type: "image", src: "/images copy/WhatsApp Image 2026-04-27 at 20.59.36 (1).jpeg", alt: "Event Highlights" },
    { type: "image", src: "/images copy/WhatsApp Image 2026-04-29 at 18.35.47 (1).jpeg", alt: "Student Engagement" },
    { type: "image", src: "/images copy/WhatsApp Image 2026-04-29 at 18.35.47.jpeg", alt: "Workshop Session" },
    { type: "image", src: "/images copy/WhatsApp Image 2026-04-29 at 18.37.00.jpeg", alt: "Presentation" },
    { type: "image", src: "/images copy/WhatsApp Image 2026-04-29 at 18.40.52.jpeg", alt: "Concluding Ceremony" },
    { type: "video", src: "/images copy/WhatsApp Video 2026-04-27 at 15.59.23.mp4", alt: "Event Video 1" },
    { type: "video", src: "/images copy/WhatsApp Video 2026-04-27 at 21.00.10.mp4", alt: "Event Video 2" },
];

export default function JalPakhwadaPage() {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-sandstone-light pt-32 pb-20">
                {/* Header */}
                <section className="px-6 mb-16">
                    <div className="max-w-7xl mx-auto">
                        <Link 
                            href="/institutions/leeladevi-english-medium"
                            className="inline-flex items-center gap-2 text-oxford/60 hover:text-sandstone font-bold transition-colors mb-8 group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Back to School Page
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4 text-center">Special Event Gallery</span>
                            <h1 className="text-5xl md:text-7xl font-black text-oxford mb-8 text-center leading-tight">
                                JAL PAKHWADA 2026
                            </h1>
                            <div className="h-1.5 w-32 bg-sandstone mx-auto rounded-full mb-10" />
                            <p className="text-gray-600 max-w-3xl mx-auto text-xl text-center leading-relaxed italic">
                                “A fortnight dedicated to the conservation of our most precious resource. Glimpses of the passion and creativity shown by our students in spreading awareness about water preservation.”
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Gallery Grid */}
                <section className="px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mediaItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                onClick={() => setSelectedItem(item)}
                                className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] cursor-pointer shadow-xl hover:shadow-2xl transition-all bg-white border border-sandstone/10"
                            >
                                {item.type === "image" ? (
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full relative bg-oxford/10">
                                        <video 
                                            className="w-full h-full object-cover"
                                            muted
                                            playsInline
                                            preload="metadata"
                                        >
                                            <source src={item.src} type="video/mp4" />
                                        </video>
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform">
                                                <Play fill="white" size={28} className="translate-x-0.5" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Overlay UI */}
                                <div className="absolute inset-0 bg-gradient-to-t from-oxford/90 via-oxford/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                                    <div className="flex items-center gap-2 mb-2 text-sandstone">
                                        {item.type === "image" ? <ImageIcon size={16} /> : <Film size={16} />}
                                        <span className="text-[10px] font-black uppercase tracking-widest">{item.type}</span>
                                    </div>
                                    <h3 className="text-white font-bold text-lg leading-tight">{item.alt}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-oxford/95 backdrop-blur-2xl"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/10"
                            onClick={() => setSelectedItem(null)}
                        >
                            <X size={28} />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-6xl w-full h-full max-h-[85vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedItem.type === "image" ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={selectedItem.src}
                                        alt={selectedItem.alt}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ) : (
                                <video
                                    autoPlay
                                    controls
                                    playsInline
                                    className="max-w-full max-h-full rounded-2xl shadow-2xl"
                                >
                                    <source src={selectedItem.src} type="video/mp4" />
                                </video>
                            )}
                            <div className="mt-8 text-center">
                                <h3 className="text-white font-bold text-2xl mb-2">{selectedItem.alt}</h3>
                                <p className="text-sandstone font-medium uppercase tracking-[0.2em] text-sm">JAL PAKHWADA 2026</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </>
    );
}
