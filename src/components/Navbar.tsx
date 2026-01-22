"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

import { Menu, X, Phone, Mail, Facebook, Instagram, Youtube, ChevronDown } from "lucide-react";
import Image from "next/image";

const navLinks = [
    { name: "Home", href: "#home" },
    {
        name: "About Us",
        href: "#about",
        subLinks: [
            { name: "Vision & Mission", href: "#about" },
            { name: "Legacy Since 1956", href: "#heritage" },
            { name: "Management", href: "#staff" }
        ]
    },
    {
        name: "Institutions",
        href: "#institutions",
        subLinks: [
            { name: "College Education", href: "#institutions" },
            { name: "Senior Secondary Schools", href: "#institutions" },
            { name: "Skill Development", href: "#institutions" }
        ]
    },
    { name: "Academics", href: "#home" },
    { name: "Hostel", href: "#hostel" },
    { name: "Gallery", href: "#facilities" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDarkSection, setIsDarkSection] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const theme = entry.target.getAttribute("data-theme");
                        setIsDarkSection(theme === "dark");
                    }
                });
            },
            { rootMargin: "-100px 0px -80% 0px" }
        );

        document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <header className="fixed top-0 w-full z-[100] font-inter">
            {/* Top Bar */}
            <div className="bg-oxford text-white py-2 px-6 hidden md:block">
                <div className="max-w-[1400px] mx-auto flex justify-between items-center text-[13px] font-medium">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Phone size={14} className="text-sandstone" />
                            <span>Have any Question?</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={14} className="text-sandstone" />
                            <span>info@vidyawadi.org</span>
                        </div>
                    </div>

                    <div className="flex-1 px-1 overflow-hidden">
                        <div className="whitespace-nowrap">
                            <span className="inline-block px-4">Best Girls Boarding School In Rajasthan | Best Girls’ Boarding School in Rajasthan | Admissions Open from Prep to Postgraduation</span>
                            {/* <span className="inline-block px-4">Nurturing Leaders of Tomorrow | Focused Education & Indian Values | Apply Today</span> */}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-sandstone transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-sandstone transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="hover:text-sandstone transition-colors"><Youtube size={20} /></a>
                        {/* <div className="w-px h-3 bg-white/20 mx-2" > */}
                        {/* <span className="uppercase tracking-widest text-[10px] font-bold">Enrollment Open</span> */}
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav
                className={cn(
                    "w-full transition-all duration-300 border-b",
                    scrolled
                        ? "bg-white/95 backdrop-blur-md py-2 border-oxford/10 shadow-lg"
                        : (isDarkSection ? "bg-transparent py-4 border-white/10" : "bg-white py-4 border-oxford/10")
                )}
            >
                <div className="max-w-[1400px] mx-auto px-5 flex justify-between items-center">

                    {/* LOGO + BRAND (BADGE STYLE) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative flex items-center cursor-pointer" style={{ marginRight: "18px" }}

                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        {/* BADGE LOGO */}
                        <div className="absolute -top-6 -left-4 z-50">
                            <div className={cn(
                                "relative transition-all duration-300",
                                scrolled
                                    ? "h-20 w-14 md:h-30 md:w-16"   // big even when scrolled
                                    : "h-24 w-20 md:h-32 md:w-20"  // VERY BIG at top
                            )}>
                                <Image
                                    src="/111rrrdd.png"
                                    alt="Vidyawadi Logo"
                                    fill
                                    className="object-contain drop-shadow-lg"
                                    priority
                                />
                            </div>
                        </div>

                        {/* BRAND TEXT */}
                        <div className="pl-20 leading-tight">
                            <h1 className={cn(
                                "font-bold tracking-tight leading-none",
                                scrolled ? "text-lg text-oxford" : "text-xl text-white"
                            )}>
                                VIDYAWADI
                            </h1>
                            <p className={cn(
                                "text-[10px] font-bold uppercase tracking-[0.2em] mt-1",
                                scrolled ? "text-oxford/70" : "text-white/70"
                            )}>
                                Marudhar Mahila Shikshan Sangh
                            </p>
                        </div>
                    </motion.div>

                    {/* REST OF NAV (unchanged) */}

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative group"
                                onMouseEnter={() => setActiveDropdown(link.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <a
                                    href={link.href}
                                    className={cn(
                                        "px-4 py-2 text-[14px] font-bold tracking-wide uppercase transition-all flex items-center gap-1 border-b-2 border-transparent hover:text-sandstone hover:border-sandstone",
                                        scrolled || !isDarkSection ? "text-oxford/80" : "text-white/80"
                                    )}
                                >
                                    {link.name}
                                    {link.subLinks && <ChevronDown size={14} className={cn("transition-transform", activeDropdown === link.name && "rotate-180")} />}
                                </a>

                                {/* Dropdown Menu */}
                                {link.subLinks && (
                                    <AnimatePresence>
                                        {activeDropdown === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full left-0 w-64 pt-4"
                                            >
                                                <div className="bg-white rounded-xl shadow-2xl border border-oxford/5 overflow-hidden p-2">
                                                    {link.subLinks.map((sub) => (
                                                        <a
                                                            key={sub.name}
                                                            href={sub.href}
                                                            className="block px-4 py-3 text-sm font-semibold text-oxford hover:bg-oxford hover:text-white rounded-lg transition-all"
                                                        >
                                                            {sub.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <button className={cn(
                            "hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm tracking-wider uppercase transition-all shadow-md active:scale-95",
                            scrolled || !isDarkSection
                                ? "bg-oxford text-white hover:bg-oxford/90"
                                : "bg-sandstone text-oxford hover:bg-sandstone-light"
                        )}>
                            Enroll Now
                        </button>

                        <button
                            className={cn(
                                "lg:hidden p-2 rounded-lg transition-colors",
                                scrolled || !isDarkSection ? "text-oxford hover:bg-oxford/5" : "text-white hover:bg-white/10"
                            )}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="lg:hidden fixed inset-0 bg-oxford z-[110] p-6 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Vidyawadi</h2>
                            <button onClick={() => setIsOpen(false)} className="text-white p-2">
                                <X size={32} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6 overflow-y-auto">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={() => !link.subLinks && setIsOpen(false)}
                                        className="text-2xl font-bold text-white/90 hover:text-sandstone flex justify-between items-center"
                                    >
                                        {link.name}
                                        {/* Simplified mobile sublinks */}
                                    </a>
                                    {link.subLinks && (
                                        <div className="mt-4 pl-4 border-l border-white/20 flex flex-col gap-3">
                                            {link.subLinks.map(sub => (
                                                <a
                                                    key={sub.name}
                                                    href={sub.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="text-white/60 hover:text-white font-medium"
                                                >
                                                    {sub.name}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-12 border-t border-white/10">
                            <button className="w-full py-5 bg-sandstone text-oxford font-black text-xl rounded-2xl">
                                ENROLL NOW
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header >
    );
}
