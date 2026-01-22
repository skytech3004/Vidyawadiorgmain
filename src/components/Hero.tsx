"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(titleRef.current, {
                opacity: 0,
                y: 100,
                duration: 1.2,
                ease: "power4.out",
            })
                .from(subtitleRef.current, {
                    opacity: 0,
                    y: 40,
                    duration: 1,
                    ease: "power3.out",
                }, "-=0.8")
                .from(buttonRef.current, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                }, "-=0.6");

            // Floating animation for scroll indicator
            gsap.to(".scroll-indicator", {
                y: 10,
                repeat: -1,
                yoyo: true,
                duration: 1.5,
                ease: "power1.inOut"
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollToContact = () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="home"
            ref={heroRef}
            data-theme="dark"
            className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden"
        >
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/IMG_9398-ezgif.com-video-to-webp-converter.webp"
                    alt="Vidyawadi School Background"
                    className="w-full h-full object-cover"
                />
                {/* Dark Overlay for readability */}
                <div className="absolute inset-0 bg-oxford/40 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 text-center text-white px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-12"
                >
                    <h2 className="text-sandstone text-2xl md:text-3xl font-black uppercase tracking-[0.4em] mb-4">
                        शिक्षा भी, संस्कार भी
                    </h2>
                    <div className="w-24 h-1 bg-sandstone mx-auto rounded-full" />
                </motion.div>

                <button
                    ref={buttonRef}
                    onClick={scrollToContact}
                    className="group relative px-6 md:px-10 py-3 md:py-5 bg-sandstone text-oxford font-bold rounded-full overflow-hidden transition-all hover:pr-14"
                >
                    <span className="relative z-10">Inquire Now</span>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ArrowDown size={20} />
                    </div>
                </button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-sandstone scroll-indicator flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
                <ArrowDown className="w-5 h-5" />
            </div>

            {/* Decorative Orbs */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sandstone/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-blue/20 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
}
