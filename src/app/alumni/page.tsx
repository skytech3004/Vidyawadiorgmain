"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, GraduationCap, Building2, MapPin, User, Mail, Phone, Calendar, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AlumniPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        passingYear: "",
        course: "",
        currentOrganization: "",
        currentDesignation: "",
        city: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/alumni", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.success) {
                setSubmitted(true);
            } else {
                setError(data.error || "Failed to submit registration");
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-stone-50">
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
                        Join Our Network
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-black text-white leading-tight uppercase mb-6"
                    >
                        Alumni <span className="text-sandstone">Registration</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light"
                    >
                        Stay connected with Vidyawadi. Register as an alumnus and be part of our growing global community of leaders.
                    </motion.p>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-20 px-6 -mt-10 relative z-20">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-oxford/5"
                    >
                        {submitted ? (
                            <div className="p-16 text-center">
                                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h2 className="text-3xl font-black text-oxford mb-4 uppercase">Registration Received!</h2>
                                <p className="text-gray-500 text-lg mb-8">
                                    Thank you for registering as an alumnus. We will keep you updated on events and opportunities.
                                </p>
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setFormData({
                                            fullName: "", email: "", phone: "", passingYear: "", course: "",
                                            currentOrganization: "", currentDesignation: "", city: "", message: ""
                                        });
                                    }}
                                    className="px-10 py-4 bg-oxford text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-sandstone hover:text-oxford transition-all"
                                >
                                    Submit Another Registration
                                </button>
                            </div>
                        ) : (
                            <div className="p-10 md:p-16">
                                <h2 className="text-3xl font-black text-oxford mb-10 uppercase tracking-tight flex items-center gap-4">
                                    <div className="w-2 h-10 bg-sandstone rounded-full" />
                                    Alumni Registration Form
                                </h2>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-medium">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4 flex items-center gap-2">
                                                <User size={14} className="text-sandstone" /> Full Name
                                            </label>
                                            <input
                                                required
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="Enter your full name"
                                                className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4 flex items-center gap-2">
                                                <Mail size={14} className="text-sandstone" /> Email Address
                                            </label>
                                            <input
                                                required
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                type="email"
                                                placeholder="Enter your email"
                                                className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4 flex items-center gap-2">
                                                <Phone size={14} className="text-sandstone" /> Phone Number
                                            </label>
                                            <input
                                                required
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                type="tel"
                                                placeholder="Enter your phone number"
                                                className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4 flex items-center gap-2">
                                                <Calendar size={14} className="text-sandstone" /> Passing / Graduation Year
                                            </label>
                                            <input
                                                required
                                                name="passingYear"
                                                value={formData.passingYear}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="E.g. 2020"
                                                className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4 flex items-center gap-2">
                                                <GraduationCap size={14} className="text-sandstone" /> Course / Program
                                            </label>
                                            <input
                                                required
                                                name="course"
                                                value={formData.course}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="E.g. B.Sc., B.Com., B.A."
                                                className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4 flex items-center gap-2">
                                                <Building2 size={14} className="text-sandstone" /> Current Organization / Company
                                            </label>
                                            <input
                                                name="currentOrganization"
                                                value={formData.currentOrganization}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="Enter your current organization"
                                                className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4 flex items-center gap-2">
                                                <Briefcase size={14} className="text-sandstone" /> Current Designation
                                            </label>
                                            <input
                                                name="currentDesignation"
                                                value={formData.currentDesignation}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="Enter your current designation"
                                                className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4 flex items-center gap-2">
                                                <MapPin size={14} className="text-sandstone" /> City
                                            </label>
                                            <input
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="Enter your city"
                                                className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4 flex items-center gap-2">
                                            <MessageSquare size={14} className="text-sandstone" /> Message / Additional Information
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Share your experience or any message..."
                                            className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium resize-none"
                                        />
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-6 bg-oxford text-white font-black uppercase tracking-[0.3em] text-sm rounded-2xl hover:bg-black transition-all shadow-xl shadow-oxford/20 flex items-center justify-center gap-4 disabled:opacity-70"
                                        >
                                            {loading ? "Submitting..." : (
                                                <>
                                                    Submit Registration
                                                    <Send size={18} className="text-sandstone" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function Briefcase({ size, className }: { size: number, className: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    );
}
