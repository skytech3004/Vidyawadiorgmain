"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const awards = [
    {
        id: 1,
        title: "Awarded by Marwad Ratna",
        organization: "Excellence in Education",
        year: "2025",
        images: ["/award1.jpg", "/award.jpg", "/award3.jpg"],
        color: "bg-sandstone"
    }
];

export default function AwardsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % awards.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrentIndex((prev) => (prev + 1) % awards.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + awards.length) % awards.length);

    const getCardStyles = (index: number) => {
        const diff = (index - currentIndex + awards.length) % awards.length;

        // Center
        if (diff === 0) {
            return {
                zIndex: 30,
                scale: 1,
                x: 0,
                opacity: 1,
                filter: "blur(0px)",
            };
        }

        // Right
        if (diff === 1 || (diff === -2 && awards.length === 3)) {
            return {
                zIndex: 20,
                scale: 0.8,
                x: "40%",
                opacity: 0.4,
                filter: "blur(4px)",
            };
        }

        // Left
        return {
            zIndex: 20,
            scale: 0.8,
            x: "-40%",
            opacity: 0.4,
            filter: "blur(4px)",
        };
    };

    return (
        <section className="py-24 px-6 bg-stone-50 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sandstone font-bold uppercase tracking-[0.4em] text-sm block mb-4"
                    >
                        Legacy of Achievement
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-oxford leading-tight uppercase"
                    >
                        Award <span className="text-sandstone">Winning</span> Excellence
                    </motion.h2>
                </div>

                <div className="relative h-[600px] md:h-[700px] w-full flex items-center justify-center">
                    {awards.map((award, index) => {
                        const styles = getCardStyles(index);
                        return (
                            <motion.div
                                key={award.id}
                                animate={styles}
                                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                className="absolute w-full max-w-5xl bg-white rounded-[3rem] border border-oxford/5 shadow-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                                onClick={() => setCurrentIndex(index)}
                            >
                                <div className="flex flex-col items-center">
                                    {/* Content Area */}
                                    <div className="p-8 md:p-12 pb-4 text-center w-full bg-white border-b border-oxford/5">
                                        <span className="text-sandstone font-black text-base uppercase tracking-[0.4em] mb-3 block">
                                            {award.year}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-black text-oxford mb-4 leading-tight uppercase line-clamp-2">
                                            {award.title}
                                        </h3>
                                        <div className="w-16 h-1 bg-sandstone rounded-full mb-6 mx-auto" />
                                        <p className="text-base text-gray-500 font-bold uppercase tracking-widest line-clamp-1">
                                            {award.organization}
                                        </p>
                                    </div>

                                    {/* Award Images */}
                                    <div className="relative w-full bg-white overflow-hidden flex flex-wrap items-center justify-center p-8 gap-6 md:gap-10 min-h-[350px]">
                                        {award.images?.map((img, i) => (
                                            <div key={i} className="relative w-full sm:w-[30%] aspect-[4/3] max-w-[280px]">
                                                <Image
                                                    src={img}
                                                    alt={`${award.title} ${i + 1}`}
                                                    fill
                                                    className="object-contain hover:scale-105 transition-transform duration-500"
                                                    priority
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Navigation Overlays */}
                    {awards.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-40 px-4 md:px-0">
                            <button
                                onClick={(e) => { e.stopPropagation(); prev(); }}
                                className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur shadow-2xl flex items-center justify-center text-oxford hover:bg-sandstone hover:text-white transition-all pointer-events-auto active:scale-90 border border-oxford/5"
                            >
                                <ChevronLeft size={40} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); next(); }}
                                className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur shadow-2xl flex items-center justify-center text-oxford hover:bg-sandstone hover:text-white transition-all pointer-events-auto active:scale-90 border border-oxford/5"
                            >
                                <ChevronRight size={40} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Indicators */}
                {awards.length > 1 && (
                    <div className="flex justify-center gap-3 mt-12">
                        {awards.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-12 bg-sandstone" : "w-2 bg-oxford/20"}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
