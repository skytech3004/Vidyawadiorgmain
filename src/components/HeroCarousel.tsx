"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroCarouselProps {
    images: string[];
    interval?: number;
}

export default function HeroCarousel({ images, interval = 5000 }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images, interval]);

    if (!images || images.length === 0) {
        return (
            <div className="absolute inset-0 bg-oxford flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-oxford to-teal-blue/20" />
            </div>
        );
    }

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-oxford">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        className="w-full h-full object-cover opacity-70"
                    />
                    
                    {/* Cinematic Overlays to match Hero style */}
                    <div className="absolute inset-0 bg-teal-blue/20 mix-blend-multiply pointer-events-none" />
                    <div className="absolute inset-0 bg-oxford/40 backdrop-blur-[1px] pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-oxford via-oxford/60 to-transparent z-[1] pointer-events-none" />
                </motion.div>
            </AnimatePresence>

            {/* Scale Progress Bar for Auto-play */}
            {images.length > 1 && (
                <div className="absolute bottom-0 left-0 h-1 bg-sandstone/30 z-20 w-full overflow-hidden">
                    <motion.div
                        key={currentIndex}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: interval / 1000, ease: "linear" }}
                        className="h-full bg-sandstone shadow-[0_0_10px_rgba(226,199,146,0.8)]"
                    />
                </div>
            )}
        </div>
    );
}
