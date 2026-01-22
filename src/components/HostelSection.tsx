"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Coffee, Heart, UserCheck, PhoneCall, Home } from "lucide-react";
import Image from "next/image";

const features = [
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "Uncompromising Security",
        desc: "24/7 warden supervision, CCTV surveillance, and specialized female security personnel ensure a safe heaven for your daughters."
    },
    {
        icon: <Coffee className="w-8 h-8" />,
        title: "Nutritious Mess",
        desc: "In-house hygienic kitchen providing four balanced, home-style meals daily, prepared with seasonal, fresh ingredients."
    },
    {
        icon: <Heart className="w-8 h-8" />,
        title: "Care & Support",
        desc: "An emotional support system where chaque student is treated with care, fostering a family-like atmosphere."
    },
    {
        icon: <UserCheck className="w-8 h-8" />,
        title: "Disciplined Routine",
        desc: "A structured daily routine balancing academics, sports, and value-based sanskars to build character."
    }
];

export default function HostelSection() {
    return (
        <section id="hostel" className="py-24 px-6 bg-oxford relative overflow-hidden" data-theme="dark">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl"
                        >
                            <Image
                                src="/hostel.jpg"
                                alt="Vidyawadi Hostel Life"
                                fill
                                className="object-cover"
                            />
                            {/* Overlay Card */}
                            <div className="absolute bottom-8 left-8 right-8 p-8 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-sandstone rounded-full flex items-center justify-center text-oxford">
                                        <Home size={24} />
                                    </div>
                                    <h4 className="text-xl font-bold text-white">Home Away From Home</h4>
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Trusted by parents across India for over 6 decades for girls' residential education and safety.
                                </p>
                            </div>
                        </motion.div>

                        {/* Decorative Badge */}
                        <motion.div
                            initial={{ rotate: -15, opacity: 0 }}
                            whileInView={{ rotate: 10, opacity: 1 }}
                            viewport={{ once: true }}
                            className="absolute -top-10 -right-10 w-40 h-40 bg-sandstone rounded-full flex flex-col items-center justify-center text-oxford text-center p-4 shadow-2xl border-4 border-oxford"
                        >
                            <span className="text-3xl font-black leading-none">100%</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Girls' Safety Record</span>
                        </motion.div>
                    </div>

                    {/* Content Side */}
                    <div className="space-y-12">
                        <div>
                            <span className="text-sandstone-light font-bold uppercase tracking-[0.4em] text-sm block mb-4">Hostel & Residential Life</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                                A Legacy of <span className="text-sandstone">Trust & Safety</span>
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed">
                                Vidyawadi provides exclusive hostel facilities for girls, designed to ensure safety, comfort, discipline, and emotional well-being for students coming from all corners of India.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-sandstone/30 transition-all group"
                                >
                                    <div className="text-sandstone mb-4 group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                                    <p className="text-white/50 text-xs leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                            <button className="w-full sm:w-auto px-10 py-5 bg-sandstone text-oxford font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all shadow-xl">
                                Explore Hostel Features
                            </button>
                            <button className="w-full sm:w-auto flex items-center justify-center gap-3 text-white font-bold hover:text-sandstone transition-colors group">
                                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-sandstone group-hover:text-oxford">
                                    <PhoneCall size={18} />
                                </div>
                                <span className="text-sm">Inquire about Security</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
