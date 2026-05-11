"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Send, CheckCircle2, Loader2, FileText, Smartphone, Mail, User, Briefcase } from "lucide-react";

interface CareerApplyPopupProps {
    jobTitle: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function CareerApplyPopup({ jobTitle, isOpen, onClose }: CareerApplyPopupProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setError("");

        const formData = new FormData(e.currentTarget);
        // jobTitle is already in the form as an input field
        if (file) {
            formData.append("resume", file);
        } else {
            setStatus("error");
            setError("Please upload your resume.");
            return;
        }

        try {
            const res = await fetch("/api/careers/apply", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                setStatus("success");
            } else {
                setStatus("error");
                setError(data.error || "Failed to submit application");
            }
        } catch (err) {
            setStatus("error");
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-oxford/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-sandstone/20 flex flex-col max-h-[90vh]"
                    >
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-oxford text-white shrink-0">
                            <div>
                                <h2 className="text-2xl font-black uppercase tracking-tight">Quick Apply</h2>
                                <p className="text-sandstone text-xs font-bold uppercase tracking-widest mt-1">Applying for: {jobTitle}</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                            {status === "success" ? (
                                <div className="text-center py-10 space-y-6">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h3 className="text-2xl font-black text-oxford uppercase">Application Submitted!</h3>
                                    <p className="text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">
                                        Thank you for your interest in joining Vidyawadi. Our HR team will review your profile and contact you if shortlisted.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="px-10 py-4 bg-oxford text-white font-black uppercase tracking-widest rounded-2xl hover:bg-sandstone hover:text-oxford transition-all"
                                    >
                                        Close Window
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {error && (
                                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2">
                                            <X size={16} /> {error}
                                        </div>
                                    )}

                                    <div className="space-y-6">
                                        {/* Name */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Full Name *</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    required
                                                    name="fullName"
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-sandstone transition-all outline-none font-medium text-oxford"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-6">
                                            {/* Mobile */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Mobile Number *</label>
                                                <div className="relative">
                                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        required
                                                        name="phone"
                                                        type="tel"
                                                        placeholder="+91 00000 00000"
                                                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-sandstone transition-all outline-none font-medium text-oxford"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Email Address *</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        required
                                                        name="email"
                                                        type="email"
                                                        placeholder="example@mail.com"
                                                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-sandstone transition-all outline-none font-medium text-oxford"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Experience */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Total Experience *</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    required
                                                    name="experience"
                                                    type="text"
                                                    placeholder="e.g. 5 Years in Teaching"
                                                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-sandstone transition-all outline-none font-medium text-oxford"
                                                />
                                            </div>
                                        </div>

                                        {/* Position (Pre-filled) */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Applying For</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-sandstone" size={18} />
                                                <input
                                                    name="jobTitle"
                                                    readOnly={jobTitle !== "General Application"}
                                                    defaultValue={jobTitle}
                                                    placeholder="Specify the position you're interested in"
                                                    className={`w-full pl-12 pr-6 py-4 border border-transparent rounded-2xl outline-none font-bold text-oxford transition-all ${
                                                        jobTitle === "General Application" 
                                                        ? "bg-gray-50 focus:bg-white focus:border-sandstone" 
                                                        : "bg-gray-100 cursor-not-allowed"
                                                    }`}
                                                />
                                            </div>
                                        </div>

                                        {/* Resume Upload */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-4">Resume / CV (PDF/Word) *</label>
                                            <div className={`relative border-2 border-dashed rounded-3xl p-8 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer ${file ? 'border-sandstone bg-sandstone/5' : 'border-gray-200 hover:border-sandstone hover:bg-gray-50'}`}>
                                                <input
                                                    type="file"
                                                    required
                                                    accept=".pdf,.doc,.docx"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                                />
                                                {file ? (
                                                    <>
                                                        <FileText size={40} className="text-sandstone" />
                                                        <p className="text-sm font-bold text-oxford">{file.name}</p>
                                                        <p className="text-[10px] text-gray-400">Click or drag to replace</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload size={40} className="text-gray-300" />
                                                        <p className="text-sm font-bold text-gray-500">Upload your Resume</p>
                                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">PDF, DOC, DOCX (Max 50MB)</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 pb-2">
                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="w-full py-5 bg-oxford text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-black transition-all shadow-xl shadow-oxford/20 flex items-center justify-center gap-4 disabled:opacity-70 group"
                                        >
                                            {status === "loading" ? (
                                                <Loader2 size={24} className="animate-spin text-sandstone" />
                                            ) : (
                                                <>
                                                    Submit Application
                                                    <Send size={20} className="text-sandstone group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
