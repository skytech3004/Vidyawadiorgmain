"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const galleryItems = [
    {
        id: 1,
        src: "/hostel.jpg",
        alt: "Vidyawadi Hostel Building",
        span: "md:col-span-2 md:row-span-2",
        title: "A Home Away From Home"
    },
    {
        id: 2,
        src: "/leeladevi.jpg",
        alt: "Leeladevi Parasmal Sancheti Kanya Mahavidyalaya",
        span: "md:col-span-1 md:row-span-1",
        title: "College Campus"
    },
    {
        id: 3,
        src: "/lps.jpg",
        alt: "LPS English Medium School",
        span: "md:col-span-1 md:row-span-1",
        title: "School Premises"
    },
    {
        id: 4,
        src: "/marudhar_balika.jpg",
        alt: "Marudhar Balika Vidyapeeth",
        span: "md:col-span-1 md:row-span-1",
        title: "Vidyapeeth Campus"
    },
    {
        id: 5,
        src: "/011.png",
        alt: "Campus Life",
        span: "md:col-span-1 md:row-span-1",
        title: "Campus Activities"
    },
];

export default function HostelGallery() {
    return (
        <section className="py-20 px-6 bg-oxford">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-sandstone mb-4 uppercase tracking-widest">Life at Vidyawadi</h2>
                    <p className="text-white/60 text-lg">Glimpses of daily life, camaraderie, and growth.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px] auto-rows-[300px]">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "relative group overflow-hidden rounded-3xl border border-white/5 cursor-pointer bg-oxford-dark",
                                item.span
                            )}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-oxford-dark/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                            {/* Text Content */}
                            <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-md">{item.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
