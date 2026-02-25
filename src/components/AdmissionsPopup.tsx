"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, ArrowRight, Sparkles } from "lucide-react";

export default function AdmissionsPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after a small delay
        const timer = setTimeout(() => {
            const hasSeenPopup = sessionStorage.getItem("hasSeenAdmissionsPopup");
            if (!hasSeenPopup) {
                setIsOpen(true);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("hasSeenAdmissionsPopup", "true");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-oxford/60 backdrop-blur-sm"
                    />

                    {/* Popup Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-sandstone/20"
                    >
                        {/* Decorative Pattern Background */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-sandstone" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-oxford" />
                        </div>

                        {/* Top Bar / Header Image Area */}
                        <div className="bg-oxford relative h-40 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-oxford to-teal-blue opacity-90" />
                            <div className="relative z-10 text-center px-6">
                                <motion.div
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 bg-sandstone/20 text-sandstone px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-md border border-sandstone/30"
                                >
                                    <Sparkles size={14} />
                                    Admissions Now Open
                                </motion.div>
                                <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
                                    Academic Year <br />
                                    <span className="text-sandstone">2025 - 2026</span>
                                </h2>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20 backdrop-blur-md group"
                            >
                                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-8 sm:p-10 text-center space-y-6 relative">
                            <div className="inline-flex p-4 rounded-3xl bg-sandstone/10 text-sandstone">
                                <GraduationCap size={40} />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-oxford">Secure Your Daughter&apos;s Future</h3>
                                <p className="text-gray-500 leading-relaxed font-medium">
                                    Join Vidyawadi for excellence in academics, sports, and holistic development. Experience our state-of-the-art campus and premium hostels.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider text-oxford/70">
                                <div className="px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-sandstone" />
                                    Std. I to XII
                                </div>
                                <div className="px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-sandstone" />
                                    Boarding Facility
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                <a
                                    href="/contact"
                                    onClick={handleClose}
                                    className="flex-1 bg-oxford text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-oxford/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
                                >
                                    Apply Now
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                                <button
                                    onClick={handleClose}
                                    className="flex-1 bg-white border-2 border-oxford/10 text-oxford/60 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    Maybe Later
                                </button>
                            </div>

                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                Limited Seats Available • Call +91 94140 XXXXX
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
