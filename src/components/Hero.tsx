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
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-oxford"
        >
            {/* Cinematic Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover opacity-80"
                >
                    <source src="/ritu_vaishnav_created.mp4" type="video/mp4" />
                </video>

                {/* Cool Blue Cinematic Grade */}
                <div className="absolute inset-0 bg-teal-blue/20 mix-blend-multiply pointer-events-none" />

                {/* Dark Contrast Overlay */}
                <div className="absolute inset-0 bg-oxford/40 backdrop-blur-[1px] pointer-events-none" />

                {/* Navy Blue Primary Bottom Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-oxford via-oxford/60 to-transparent z-[1] pointer-events-none" />
            </div>

            <div className="relative z-20 text-center text-white px-6 w-full max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <div className="relative mb-16">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-white text-lg md:text-2xl font-black tracking-[0.6em] uppercase block text-shadow-glow"
                        >
                            {"Welcome to Vidyawadi".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.5 + i * 0.05,
                                        ease: "easeOut"
                                    }}
                                    className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-sandstone-light to-white bg-[length:200%_auto] animate-shimmer"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </motion.span>
                    </div>


                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
                        className="text-4xl md:text-7xl font-black text-white mb-12 font-['Noto_Sans_Devanagari'] relative"
                    >
                        <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-sandstone-light to-white bg-[length:200%_auto] animate-shimmer drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            शिक्षा भी, संस्कार भी
                        </span>
                        {/* Subtle Glow Behind Hindi Text */}
                        <div className="absolute inset-0 blur-2xl bg-sandstone/10 -z-0 rounded-full scale-150 opacity-50" />
                    </motion.h2>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <button
                            ref={buttonRef}
                            onClick={scrollToContact}
                            className="group relative px-10 py-5 bg-sandstone text-oxford font-black text-sm uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all hover:pr-14 shadow-[0_0_30px_rgba(226,199,146,0.3)] hover:bg-white"
                        >
                            <span className="relative z-10">Inquire Now</span>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <ArrowDown size={18} />
                            </div>
                        </button>

                        {/* <button
                            className="px-10 py-5 border-2 border-white/30 text-white font-black text-sm uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-oxford transition-all"
                        >
                            Explore Campus
                        </button> */}
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-sandstone scroll-indicator flex flex-col items-center gap-3 z-20">
                <span className="text-[10px] uppercase tracking-[0.4em] font-black">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-sandstone to-transparent" />
            </div>

            {/* Subtle Sporty Decorative Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none skew-x-[-15deg] translate-x-1/2" />
        </section>
    );
}
