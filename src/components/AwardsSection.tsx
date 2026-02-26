"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const awards = [
    {
        id: 1,
        title: "Best Residential School",
        organization: "National Education Excellence Awards",
        year: "2024",
        image: "/award1.jpg",
        color: "bg-sandstone"
    },
    {
        id: 2,
        title: "Excellence in Girls' Education",
        organization: "State Education Board",
        year: "2023",
        image: "/award.jpg",
        color: "bg-oxford text-white"
    },
    {
        id: 3,
        title: "Top Holistic Development Hub",
        organization: "Educational Leaders Forum",
        year: "2024",
        image: "/award3.jpg",
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
                                className="absolute w-full max-w-2xl bg-white rounded-[3rem] border border-oxford/5 shadow-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                                onClick={() => setCurrentIndex(index)}
                            >
                                <div className="flex flex-col items-center">
                                    {/* Award Image */}
                                    <div className="relative w-full aspect-[4/3] bg-white overflow-hidden border-b border-oxford/5">
                                        <Image
                                            src={award.image}
                                            alt={award.title}
                                            fill
                                            className="object-contain p-8 md:p-12"
                                            priority
                                        />
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 md:p-12 text-center w-full bg-white">
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
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Navigation Overlays */}
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
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-3 mt-12">
                    {awards.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-12 bg-sandstone" : "w-2 bg-oxford/20"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
