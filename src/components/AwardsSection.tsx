"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImagePlus, X } from "lucide-react";

interface AwardRecord {
    _id: string;
    title: string;
    organization: string;
    year: string;
    images: string[];
    order?: number;
    createdAt?: string;
}

type LightboxState = {
    awardIndex: number;
    imageIndex: number;
} | null;

function AwardSlideCard({
    award,
    onOpenLightbox,
}: {
    award: AwardRecord;
    onOpenLightbox: (imageIndex: number) => void;
}) {
    const images = award.images ?? [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-[2.5rem] bg-oxford shadow-2xl transition-all duration-700 hover:shadow-sandstone/20"
        >
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-oxford via-oxford-dark to-oxford" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,196,131,0.12),transparent_45%)]" />
            </div>

            <div className="relative z-10 p-6 md:p-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-white/90 backdrop-blur-md">
                        {award.year}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-sandstone/20 bg-sandstone/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-sandstone backdrop-blur-md">
                        {images.length} {images.length === 1 ? "Image" : "Images"}
                    </span>
                </div>

                <div className="mt-8 max-w-4xl">
                    <div className="w-14 h-1 bg-sandstone rounded-full mb-5" />
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                        {award.title}
                    </h3>
                    <p className="mt-4 text-white/80 text-base md:text-lg font-semibold uppercase tracking-[0.22em]">
                        {award.organization}
                    </p>
                </div>

                {images.length > 0 ? (
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                            <button
                                key={`${award._id}-${index}`}
                                type="button"
                                onClick={() => onOpenLightbox(index)}
                                className="group/card relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg aspect-[4/3] text-left"
                                aria-label={`Open image ${index + 1} for ${award.title}`}
                            >
                                <Image
                                    src={image}
                                    alt={`${award.title} ${index + 1}`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-oxford-dark/80 via-transparent to-transparent opacity-90" />
                                <div className="absolute inset-x-0 bottom-0 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-white backdrop-blur-md">
                                            Image {index + 1}
                                        </span>
                                        <span className="inline-flex items-center rounded-full bg-sandstone/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-sandstone backdrop-blur-md">
                                            View
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="mt-8 rounded-[2rem] border border-dashed border-white/15 bg-white/5 p-10 text-center text-white/70">
                        <ImagePlus size={40} className="mx-auto mb-3 text-sandstone" />
                        <p className="text-sm font-bold uppercase tracking-widest">No award images uploaded yet</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function AwardsSection() {
    const [awards, setAwards] = useState<AwardRecord[]>([]);
    const [activeAwardIndex, setActiveAwardIndex] = useState(0);
    const [lightbox, setLightbox] = useState<LightboxState>(null);

    useEffect(() => {
        let isMounted = true;

        const loadAwards = async () => {
            try {
                const isLocalDev =
                    window.location.hostname === "localhost" ||
                    window.location.hostname === "127.0.0.1" ||
                    window.location.hostname === "::1";
                const url = isLocalDev ? "/api/awards" : "https://www.vidyawadi.org/api/awards";
                const res = await fetch(url, { cache: "no-store" });
                const data = await res.json();

                if (isMounted && data.success && Array.isArray(data.awards)) {
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

    useEffect(() => {
        if (sortedAwards.length < 2) return;

        const timer = setInterval(() => {
            setActiveAwardIndex((prev) => (prev + 1) % sortedAwards.length);
        }, 8000);

        return () => clearInterval(timer);
    }, [sortedAwards.length]);

    useEffect(() => {
        if (!lightbox) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setLightbox(null);
            }
            if (event.key === "ArrowRight") {
                setLightbox((prev) => {
                    if (!prev) return prev;
                    const images = sortedAwards[prev.awardIndex]?.images ?? [];
                    if (images.length === 0) return prev;
                    return {
                        ...prev,
                        imageIndex: (prev.imageIndex + 1) % images.length,
                    };
                });
            }
            if (event.key === "ArrowLeft") {
                setLightbox((prev) => {
                    if (!prev) return prev;
                    const images = sortedAwards[prev.awardIndex]?.images ?? [];
                    if (images.length === 0) return prev;
                    return {
                        ...prev,
                        imageIndex: (prev.imageIndex - 1 + images.length) % images.length,
                    };
                });
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [lightbox, sortedAwards]);

    const safeActiveAwardIndex = sortedAwards.length > 0 ? activeAwardIndex % sortedAwards.length : 0;
    const activeAward = sortedAwards[safeActiveAwardIndex] ?? null;

    const nextAward = () => {
        if (sortedAwards.length < 2) return;
        setActiveAwardIndex((prev) => (prev + 1) % sortedAwards.length);
    };

    const prevAward = () => {
        if (sortedAwards.length < 2) return;
        setActiveAwardIndex((prev) => (prev - 1 + sortedAwards.length) % sortedAwards.length);
    };

    const openLightbox = (awardIndex: number, imageIndex: number) => {
        setLightbox({ awardIndex, imageIndex });
    };

    const closeLightbox = () => {
        setLightbox(null);
    };

    const activeLightboxAward = lightbox ? sortedAwards[lightbox.awardIndex] : null;
    const activeLightboxImages = activeLightboxAward?.images ?? [];
    const activeLightboxImage = lightbox ? activeLightboxImages[lightbox.imageIndex] : null;

    const nextLightbox = () => {
        if (!lightbox || activeLightboxImages.length === 0) return;
        setLightbox((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                imageIndex: (prev.imageIndex + 1) % activeLightboxImages.length,
            };
        });
    };

    const prevLightbox = () => {
        if (!lightbox || activeLightboxImages.length === 0) return;
        setLightbox((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                imageIndex: (prev.imageIndex - 1 + activeLightboxImages.length) % activeLightboxImages.length,
            };
        });
    };

    return (
        <section className="py-24 px-6 bg-stone-50 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-20">
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

                {activeAward ? (
                    <div className="relative max-w-6xl mx-auto">
                        <AnimatePresence mode="wait">
                            <AwardSlideCard
                                key={activeAward._id}
                                award={activeAward}
                                onOpenLightbox={(imageIndex) => openLightbox(safeActiveAwardIndex, imageIndex)}
                            />
                        </AnimatePresence>

                        {sortedAwards.length > 1 && (
                            <>
                                <div className="absolute inset-y-1/2 left-4 z-30 -translate-y-1/2 hidden md:flex items-center">
                                    <button
                                        type="button"
                                        onClick={prevAward}
                                        className="w-12 h-12 rounded-full bg-navy/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-navy transition-all shadow-lg"
                                        aria-label="Previous award"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                </div>

                                <div className="absolute inset-y-1/2 right-4 z-30 -translate-y-1/2 hidden md:flex items-center">
                                    <button
                                        type="button"
                                        onClick={nextAward}
                                        className="w-12 h-12 rounded-full bg-navy/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-navy transition-all shadow-lg"
                                        aria-label="Next award"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
                                    {sortedAwards.map((award, idx) => (
                                        <button
                                            key={award._id}
                                            type="button"
                                            onClick={() => setActiveAwardIndex(idx)}
                                            className={`h-3 rounded-full transition-all duration-300 ${safeActiveAwardIndex === idx ? "w-10 bg-sandstone" : "w-3 bg-sandstone/30 hover:bg-sandstone/60"}`}
                                            aria-label={`Go to award ${idx + 1}`}
                                            title={award.title}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="w-full max-w-4xl mx-auto rounded-[2rem] border border-dashed border-oxford/10 bg-white/70 p-10 text-center text-gray-500 shadow-sm">
                        <h3 className="text-2xl font-black text-oxford mb-3">No award records found</h3>
                        <p>Fetch the awards API and the carousel will render the database awards here.</p>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {lightbox && activeLightboxAward && activeLightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[120] bg-oxford/95 backdrop-blur-md flex items-center justify-center p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${activeLightboxAward.title} gallery`}
                    >
                        <div className="absolute inset-0" onClick={closeLightbox} />
                        <div className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center">
                            <button
                                type="button"
                                onClick={closeLightbox}
                                className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors flex items-center justify-center"
                                aria-label="Close fullscreen view"
                            >
                                <X size={22} />
                            </button>

                            <div className="absolute inset-y-0 left-0 z-20 flex items-center">
                                <button
                                    type="button"
                                    onClick={prevLightbox}
                                    className="w-12 h-12 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors flex items-center justify-center"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                            </div>

                            <div className="absolute inset-y-0 right-0 z-20 flex items-center">
                                <button
                                    type="button"
                                    onClick={nextLightbox}
                                    className="w-12 h-12 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors flex items-center justify-center"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>

                            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 bg-black/20 shadow-2xl">
                                <Image
                                    src={activeLightboxImage}
                                    alt={`${activeLightboxAward.title} fullscreen ${lightbox.imageIndex + 1}`}
                                    fill
                                    sizes="100vw"
                                    className="object-contain bg-black/20"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
