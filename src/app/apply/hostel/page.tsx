"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle2, User, Users, Calendar, Home, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HostelApplyPage() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/hostel-apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                alert("Failed to submit application. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
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
                        Hostel Admissions 2026-27
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-black text-white leading-tight uppercase mb-6"
                    >
                        Hostel <span className="text-sandstone">Application</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light"
                    >
                        Apply for a secure, nurturing, and value-based residential experience at Vidyawadi.
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
                                    Your hostel application has been submitted successfully. Our warden will review it and contact you soon.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="px-10 py-4 bg-oxford text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-sandstone hover:text-oxford transition-all"
                                >
                                    Submit Another Application
                                </button>
                            </div>
                        ) : (
                            <div className="p-10 md:p-16">
                                <h2 className="text-3xl font-black text-oxford mb-10 uppercase tracking-tight flex items-center gap-4">
                                    <div className="w-2 h-10 bg-sandstone rounded-full" />
                                    Hostel Form
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Student Information */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 text-sandstone">
                                            <User size={18} />
                                            <span className="font-black uppercase tracking-widest text-xs">Student Information</span>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Full Name</label>
                                                <input required name="studentName" type="text" placeholder="Student's name" className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Date of Birth</label>
                                                <input required name="dob" type="date" className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium" />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Class for Admission</label>
                                                <input required name="className" type="text" placeholder="e.g. Class 9, B.Ed" className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Email Address</label>
                                                <input required name="email" type="email" placeholder="Your email address" className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Guardian Information */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 text-sandstone">
                                            <Users size={18} />
                                            <span className="font-black uppercase tracking-widest text-xs">Guardian Details</span>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Father&apos;s Name</label>
                                                <input required name="fatherName" type="text" placeholder="Father's full name" className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Mother&apos;s Name</label>
                                                <input required name="motherName" type="text" placeholder="Mother's full name" className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium" />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Parent&apos;s Phone Number</label>
                                                <input required name="parentPhone" type="tel" placeholder="Primary contact number" className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Emergency Contact</label>
                                                <input required name="emergencyContact" type="tel" placeholder="Alternative contact number" className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address & Message */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 text-sandstone">
                                            <Home size={18} />
                                            <span className="font-black uppercase tracking-widest text-xs">Address & Additional Info</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Permanent Address</label>
                                            <textarea required name="address" rows={3} placeholder="Full postal address" className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium resize-none"></textarea>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Message / Health Requirements (Optional)</label>
                                            <textarea name="message" rows={3} placeholder="Provide any special health or dietary requirements" className="w-full px-8 py-5 bg-stone-50 border border-oxford rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium resize-none"></textarea>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            disabled={isSubmitting}
                                            type="submit"
                                            className="w-full py-6 bg-oxford text-white font-black uppercase tracking-[0.3em] text-sm rounded-2xl hover:bg-black transition-all shadow-xl shadow-oxford/20 flex items-center justify-center gap-4 disabled:opacity-50"
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit Application"}
                                            <Send size={18} className="text-sandstone" />
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
