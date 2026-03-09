"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Globe, CreditCard, ShieldCheck, CheckCircle2, DollarSign, Wallet, ArrowRight, User, Mail, Phone, FileText, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DonatePage() {
    const [amount, setAmount] = useState<string>("2100");
    const [frequency, setFrequency] = useState<"once" | "monthly">("once");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const presets = ["1100", "2100", "5100", "11000"];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Mock submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-stone-50 font-devanagari">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 bg-oxford overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
                </div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sandstone font-bold uppercase tracking-[0.4em] text-sm block mb-4"
                    >
                        Impact A Life
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-black text-white leading-tight uppercase mb-6"
                    >
                        Every Girl <span className="text-sandstone">Deserves</span> Excellence
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light"
                    >
                        Your contribution helps us provide high-quality education, modern facilities, and a secure environment for girls from all walks of life.
                    </motion.p>
                </div>
            </section>

            {/* Donation Form Section */}
            <section className="py-20 px-6 -mt-10 relative z-20">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-oxford/5"
                    >
                        {isSubmitted ? (
                            <div className="p-16 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
                                >
                                    <CheckCircle2 size={48} />
                                </motion.div>
                                <h2 className="text-3xl font-black text-oxford mb-4 uppercase">Thank You for Your Generosity!</h2>
                                <p className="text-gray-500 text-lg mb-8">
                                    Your donation has been received. A receipt and confirmation email will be sent to you shortly. Together, we are building a brighter future.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="px-10 py-4 bg-oxford text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-sandstone hover:text-oxford transition-all"
                                >
                                    Make Another Donation
                                </button>
                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-5">
                                {/* Left Side: Info & Impact */}
                                <div className="lg:col-span-2 bg-oxford p-10 md:p-16 text-white flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-3xl font-black mb-8 uppercase tracking-tight">Your Impact</h2>
                                        <div className="space-y-8">
                                            {[
                                                { icon: <Heart className="text-sandstone" />, title: "Support Education", desc: "Help cover tuition fees for underprivileged students." },
                                                { icon: <CreditCard className="text-sandstone" />, title: "Better Facilities", desc: "Contribute to modern laboratories and sports infrastructure." },
                                                { icon: <ShieldCheck className="text-sandstone" />, title: "Secure Living", desc: "Support hostel maintenance and student safety measures." }
                                            ].map((item, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <div className="mt-1">{item.icon}</div>
                                                    <div>
                                                        <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                                                        <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                                        <p className="text-xs text-white/40 leading-relaxed italic">
                                            "Education is the most powerful weapon which you can use to change the world." — Vidyawadi Vision
                                        </p>
                                    </div>
                                </div>

                                {/* Right Side: Form */}
                                <div className="lg:col-span-3 p-10 md:p-16">
                                    <form onSubmit={handleSubmit} className="space-y-10">
                                        {/* Frequency Toggle */}
                                        <div className="flex bg-stone-100 p-1 rounded-2xl w-fit">
                                            <button
                                                type="button"
                                                onClick={() => setFrequency("once")}
                                                className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${frequency === "once" ? "bg-white text-oxford shadow-sm" : "text-gray-400 hover:text-oxford"}`}
                                            >
                                                Donate Once
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFrequency("monthly")}
                                                className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${frequency === "monthly" ? "bg-white text-oxford shadow-sm" : "text-gray-400 hover:text-oxford"}`}
                                            >
                                                Donate Monthly
                                            </button>
                                        </div>

                                        {/* Amount Selection */}
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Choose Amount (INR)</label>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                {presets.map((p) => (
                                                    <button
                                                        key={p}
                                                        type="button"
                                                        onClick={() => setAmount(p)}
                                                        className={`py-4 rounded-2xl font-black transition-all border-2 ${amount === p ? "bg-oxford text-white border-oxford" : "bg-stone-50 text-oxford border-transparent hover:border-sandstone/30"}`}
                                                    >
                                                        ₹{p}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="relative group">
                                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-oxford/40 font-bold">₹</div>
                                                <input
                                                    type="number"
                                                    value={presets.includes(amount) ? "" : amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    placeholder="Enter custom amount"
                                                    className="w-full pl-12 pr-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-black"
                                                />
                                            </div>
                                        </div>

                                        {/* Donor Information */}
                                        <div className="space-y-8">
                                            <h3 className="text-xl font-black text-oxford uppercase tracking-tight flex items-center gap-3">
                                                <div className="w-1.5 h-6 bg-sandstone rounded-full" />
                                                Donor Details
                                            </h3>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4 flex items-center gap-2"><User size={12} /> Full Name</label>
                                                    <input required type="text" placeholder="Your name" className="w-full px-8 py-5 bg-stone-50 border border-black/5 rounded-2xl focus:bg-white focus:border-sandstone transition-all outline-none text-oxford font-medium" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4 flex items-center gap-2"><Mail size={12} /> Email Address</label>
                                                    <input required type="email" placeholder="Your email" className="w-full px-8 py-5 bg-stone-50 border border-black/5 rounded-2xl focus:bg-white focus:border-sandstone transition-all outline-none text-oxford font-medium" />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4 flex items-center gap-2"><Phone size={12} /> Mobile Number</label>
                                                    <input required type="tel" placeholder="10-digit number" className="w-full px-8 py-5 bg-stone-50 border border-black/5 rounded-2xl focus:bg-white focus:border-sandstone transition-all outline-none text-oxford font-medium" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4 flex items-center gap-2"><Globe size={12} /> Citizenship</label>
                                                    <select className="w-full px-8 py-5 bg-stone-50 border border-black/5 rounded-2xl focus:bg-white focus:border-sandstone outline-none text-oxford font-medium appearance-none h-[66px]">
                                                        <option>Indian Citizen</option>
                                                        <option>NRI (Non-Resident Indian)</option>
                                                        <option>Foreign National</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4 flex items-center gap-2"><FileText size={12} /> PAN Number (For Tax Benefits)</label>
                                                <input type="text" placeholder="Enter your 10-digit PAN" className="w-full px-8 py-5 bg-stone-50 border border-black/5 rounded-2xl focus:bg-white focus:border-sandstone transition-all outline-none text-oxford font-medium" />
                                                <p className="text-[10px] text-gray-400 ml-4 font-medium italic">Donations to MMSS Vidyawadi are eligible for tax exemption under section 80G.</p>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4 flex items-center gap-2"><MapPin size={12} /> Permanent Address</label>
                                                <textarea rows={3} placeholder="Full postal address" className="w-full px-8 py-5 bg-stone-50 border border-black/5 rounded-2xl focus:bg-white focus:border-sandstone transition-all outline-none text-oxford font-medium resize-none"></textarea>
                                            </div>
                                        </div>

                                        <button
                                            disabled={isSubmitting}
                                            type="submit"
                                            className="w-full py-6 bg-oxford text-white font-black uppercase tracking-[0.3em] text-sm rounded-2xl hover:bg-black transition-all shadow-xl shadow-oxford/20 flex items-center justify-center gap-4 disabled:opacity-50"
                                        >
                                            {isSubmitting ? "Processing..." : `Donate ₹${amount || "0"} Now`}
                                            <ArrowRight size={18} className="text-sandstone" />
                                        </button>

                                        <div className="flex items-center justify-center gap-6 opacity-30">
                                            <ShieldCheck size={20} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-oxford">Secure 256-bit SSL Transaction</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
