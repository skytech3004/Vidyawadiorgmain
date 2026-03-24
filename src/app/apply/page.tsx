"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ApplyNowPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        pincode: "",
        board: "",
        grade: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.success) {
                setSubmitted(true);
            } else {
                setError(data.error || "Failed to submit application");
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
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
                        Admissions 2026-27
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-black text-white leading-tight uppercase mb-6"
                    >
                        Apply <span className="text-sandstone">Now</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light"
                    >
                        Join a legacy of excellence and value-based education. Start your daughter's journey with Vidyawadi today.
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
                                <h2 className="text-3xl font-black text-oxford mb-4 uppercase">Application Received!</h2>
                                <p className="text-gray-500 text-lg mb-8">
                                    Thank you for applying. Our admissions team will contact you shortly via email or phone.
                                </p>
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setFormData({
                                            fullName: "", email: "", phone: "", city: "", state: "", pincode: "", board: "", grade: "", message: ""
                                        });
                                    }}
                                    className="px-10 py-4 bg-oxford text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-sandstone hover:text-oxford transition-all"
                                >
                                    Submit Another Application
                                </button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-1">
                                <div className="p-10 md:p-16">
                                    <h2 className="text-3xl font-black text-oxford mb-10 uppercase tracking-tight flex items-center gap-4">
                                        <div className="w-2 h-10 bg-sandstone rounded-full" />
                                        Application Form
                                    </h2>

                                    {error && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-medium">
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            {/* Full Name */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Full Name</label>
                                                <input
                                                    required
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    type="text"
                                                    placeholder="Enter student's full name"
                                                    className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                                />
                                            </div>

                                            {/* Email Address */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Email Address</label>
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
                                            {/* Phone Number */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Phone Number</label>
                                                <input
                                                    required
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    type="tel"
                                                    placeholder="Enter 10-digit mobile number"
                                                    className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                                />
                                            </div>

                                            {/* City */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">City</label>
                                                <input
                                                    required
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    type="text"
                                                    placeholder="Enter your city"
                                                    className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            {/* State */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">State</label>
                                                <input
                                                    required
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                    type="text"
                                                    placeholder="Enter your state"
                                                    className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                                />
                                            </div>

                                            {/* Pincode */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Pincode</label>
                                                <input
                                                    required
                                                    name="pincode"
                                                    value={formData.pincode}
                                                    onChange={handleChange}
                                                    type="text"
                                                    placeholder="Enter pincode"
                                                    className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            {/* Select Board */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Select Board</label>
                                                <select
                                                    required
                                                    name="board"
                                                    value={formData.board}
                                                    onChange={handleChange}
                                                    className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium appearance-none h-[66px]"
                                                >
                                                    <option value="">Choose Board</option>
                                                    <option value="RBSE">RBSE (Rajasthan Board)</option>
                                                    <option value="CBSE">CBSE (Central Board)</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            {/* Interested Grade */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Interested Grade/Class</label>
                                                <select
                                                    required
                                                    name="grade"
                                                    value={formData.grade}
                                                    onChange={handleChange}
                                                    className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium appearance-none h-[66px]"
                                                >
                                                    <option value="">Choose Class</option>
                                                    <option value="Pre-Primary">Pre-Primary</option>
                                                    <option value="Primary (1-5)">Primary (1-5)</option>
                                                    <option value="Middle (6-8)">Middle (6-8)</option>
                                                    <option value="Secondary (9-10)">Secondary (9-10)</option>
                                                    <option value="Sr. Secondary (11-12)">Sr. Secondary (11-12)</option>
                                                    <option value="College">College (Higher Education)</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Message / Inquiry */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Message / Inquiry (Optional)</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={4}
                                                placeholder="Ask us anything about admissions, hostels, or facilities..."
                                                className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium resize-none"
                                            ></textarea>
                                        </div>

                                        <div className="pt-6">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full py-6 bg-oxford text-white font-black uppercase tracking-[0.3em] text-sm rounded-2xl hover:bg-black transition-all shadow-xl shadow-oxford/20 flex items-center justify-center gap-4 disabled:opacity-70"
                                            >
                                                {loading ? "Submitting..." : (
                                                    <>
                                                        Submit Application
                                                        <Send size={18} className="text-sandstone" />
                                                    </>
                                                )}
                                            </button>
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
