"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImagePlus } from "lucide-react";

interface AwardRecord {
    _id: string;
    title: string;
    organization: string;
    year: string;
    images: string[];
    order?: number;
    createdAt?: string;
}

function AwardCard({ award, index }: { award: AwardRecord; index: number }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = award.images?.length ? award.images : [];
    const hasSlides = slides.length > 0;

    useEffect(() => {
        if (!hasSlides) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => clearInterval(timer);
    }, [hasSlides, slides.length]);

    const nextSlide = () => {
        if (!hasSlides) return;
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        if (!hasSlides) return;
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            className="w-full bg-white rounded-[2.5rem] border border-oxford/5 shadow-2xl overflow-hidden"
        >
            <div className="p-7 md:p-10 pb-5 text-center w-full bg-white border-b border-oxford/5">
                <span className="text-sandstone font-black text-sm md:text-base uppercase tracking-[0.35em] mb-3 block">
                    {award.year}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-oxford mb-4 leading-tight uppercase line-clamp-2">
                    {award.title}
                </h3>
                <div className="w-16 h-1 bg-sandstone rounded-full mb-5 mx-auto" />
                <p className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-widest line-clamp-2">
                    {award.organization}
                </p>
            </div>

            <div className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden group bg-mint/20">
                {hasSlides ? (
                    <>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${award._id}-${currentSlide}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Image
                                    src={slides[currentSlide % slides.length]}
                                    alt=""
                                    fill
                                    className="object-cover blur-xl opacity-35 scale-110 pointer-events-none select-none"
                                    unoptimized
                                />
                                <Image
                                    src={slides[currentSlide % slides.length]}
                                    alt={`${award.title} ${currentSlide + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 1200px"
                                    className="object-contain relative z-10"
                                    priority={index === 0 && currentSlide === 0}
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

                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? "bg-navy scale-150" : "bg-teal/30 hover:bg-teal"}`}
                                    aria-label={`Go to banner ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center bg-gradient-to-br from-oxford/5 to-sandstone/10 px-6">
                        <ImagePlus size={40} className="text-sandstone" />
                        <p className="text-sm font-bold uppercase tracking-widest text-oxford/60">
                            No award images uploaded yet
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function AwardsSection() {
    const [awards, setAwards] = useState<AwardRecord[]>([]);

    useEffect(() => {
        let isMounted = true;

        const loadAwards = async () => {
            try {
                const res = await fetch("/api/awards", { cache: "no-store" });
                const data = await res.json();
                if (isMounted && data.success && Array.isArray(data.awards) && data.awards.length > 0) {
                    setAwards(data.awards);
                }
            } catch (error) {
                console.error("Error loading awards:", error);
            }
        };

        loadAwards();
        return () => {
            isMounted = false;
        };
    }, []);

    const sortedAwards = [...awards].sort((a, b) => {
        const orderDiff = (a.order ?? 0) - (b.order ?? 0);
        if (orderDiff !== 0) return orderDiff;

        const aCreatedAt = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bCreatedAt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bCreatedAt - aCreatedAt;
    });

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

                {sortedAwards.length > 0 ? (
                    <div className="grid grid-cols-1 gap-10">
                        {sortedAwards.map((award, index) => (
                            <AwardCard key={award._id} award={award} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full max-w-4xl mx-auto rounded-[2rem] border border-dashed border-oxford/10 bg-white/70 p-10 text-center text-gray-500 shadow-sm">
                        <h3 className="text-2xl font-black text-oxford mb-3">No award records found</h3>
                        <p>Add an award in the admin panel and it will appear here directly from the database.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
