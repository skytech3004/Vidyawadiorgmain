"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const images = [
    { src: "/hostel.jpg", title: "Premium Residence" },
    { src: "/Cafeteria.png", title: "Student Cafeteria" },
    { src: "/Hostels.png", title: "Hostel View" },
    { src: "/Hostels_1.png", title: "Comfortable Living" },
    { src: "/Hostels_2.png", title: "Modern Facilities" },
    { src: "/Hostels_3.png", title: "Nurturing Environment" },
    { src: "/Hostels_4.png", title: "Safe & Secure" },

];

const HostelGallery = () => {
    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Visual Journey</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight">Campus & Hostel <span className="text-sandstone">Gallery</span></h2>
                    <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {images.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white border-opacity-50 bg-slate-50"
                        >
                            <Image
                                src={img.src}
                                alt={img.title}
                                fill
                                className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-oxford/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <p className="text-white font-black uppercase tracking-widest text-sm">
                                    {img.title}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HostelGallery;
