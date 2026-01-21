"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { submitInquiry } from "@/app/actions";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(formData: FormData) {
        setStatus("loading");
        try {
            const result = await submitInquiry(formData);
            if (result.success) {
                setStatus("success");
            } else {
                setStatus("error");
                setErrorMessage(result.error || "Failed to submit inquiry");
            }
        } catch (err) {
            setStatus("error");
            setErrorMessage("Something went wrong. Please try again.");
        }
    }

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-12 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-xl"
            >
                <CheckCircle2 className="w-16 h-16 text-sandstone mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">Thank You!</h3>
                <p className="text-white/80 max-w-sm mx-auto">
                    Your inquiry has been received. Our admissions team will get back to you within 24-48 hours.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-sandstone font-bold hover:underline"
                >
                    Send another inquiry
                </button>
            </motion.div>
        );
    }

    return (
        <section id="contact" data-theme="dark" className="py-32 px-6 bg-oxford relative overflow-hidden scroll-mt-24">
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-sandstone mb-4">Get in Touch</h2>
                    <p className="text-white/70 text-lg">Schedule a campus visit or inquire about admissions</p>
                </motion.div>

                <form action={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-sandstone uppercase tracking-widest pl-1">Full Name</label>
                            <input
                                name="fullName"
                                type="text"
                                required
                                placeholder="Enter parent or guardian name"
                                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-sandstone transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-sandstone uppercase tracking-widest pl-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="example@email.com"
                                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-sandstone transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-sandstone uppercase tracking-widest pl-1">Phone Number</label>
                            <input
                                name="phone"
                                type="tel"
                                required
                                placeholder="+91 00000 00000"
                                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-sandstone transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-sandstone uppercase tracking-widest pl-1">Interested Grade</label>
                            <select
                                name="grade"
                                required
                                className="w-full px-6 py-4 rounded-2xl bg-oxford border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-sandstone transition-all appearance-none"
                            >
                                <option value="">Select Grade</option>
                                <option value="Nursery">Nursery</option>
                                <option value="Class 1-5">Class 1-5</option>
                                <option value="Class 6-8">Class 6-8</option>
                                <option value="Class 9-10">Class 9-10</option>
                                <option value="Class 11-12">Class 11-12</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-sandstone uppercase tracking-widest pl-1">Message / Inquiry</label>
                        <textarea
                            name="message"
                            required
                            rows={4}
                            placeholder="Tell us about your requirements..."
                            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-sandstone transition-all resize-none"
                        />
                    </div>

                    {status === "error" && (
                        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                            <AlertCircle size={20} />
                            <p className="text-sm font-medium">{errorMessage}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full py-5 bg-sandstone text-oxford font-bold rounded-2xl hover:bg-sandstone-light transition-all flex items-center justify-center gap-2 disabled:opacity-70 group"
                    >
                        {status === "loading" ? "Submitting..." : (
                            <>
                                Submit Inquiry
                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sandstone/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
