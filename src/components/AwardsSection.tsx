"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const award = {
    id: 1,
    title: "Awarded by Marwad Ratna",
    organization: "Excellence in Education",
    year: "2025",
    images: ["/award1.jpg", "/award.jpg", "/award3.jpg"],
};

export default function AwardsSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % award.images.length);
        }, 6000);

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % award.images.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + award.images.length) % award.images.length);

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

                <motion.div
                    key={award.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-6xl mx-auto bg-white rounded-[3rem] border border-oxford/5 shadow-2xl overflow-hidden"
                >
                    <div className="flex flex-col items-center">
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

                        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-2xl overflow-hidden group shadow-2xl border-4 border-white bg-mint/20">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <Image
                                        src={award.images[currentSlide]}
                                        alt=""
                                        fill
                                        className="object-cover blur-xl opacity-35 scale-110 pointer-events-none select-none"
                                        unoptimized
                                    />
                                    <Image
                                        src={award.images[currentSlide]}
                                        alt={`School Banner ${currentSlide + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 1200px"
                                        className="object-contain relative z-10"
                                        priority={currentSlide === 0}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            <div className="absolute inset-y-0 left-0 z-30 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    type="button"
                                    onClick={prevSlide}
                                    className="w-10 h-10 rounded-full bg-navy/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-navy transition-all"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                            </div>

                            <div className="absolute inset-y-0 right-0 z-30 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    type="button"
                                    onClick={nextSlide}
                                    className="w-10 h-10 rounded-full bg-navy/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-navy transition-all"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>

                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                                {award.images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setCurrentSlide(idx)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? "bg-navy scale-150" : "bg-teal/30 hover:bg-teal"}`}
                                        aria-label={`Go to banner ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
