"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Save, User, Type, Edit3, Star } from "lucide-react";
import FileUploadField from "@/components/admin/FileUploadField";
import TiptapEditor from "@/components/admin/TiptapEditor";

export default function AdminInspirationPage() {
    const [data, setData] = useState({
        title: "",
        name: "",
        description: "",
        image: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [banner, setBanner] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch("/api/admin/inspiration");
            const json = await res.json();
            if (json.success && json.data) {
                setData({
                    title: json.data.title || "",
                    name: json.data.name || "",
                    description: json.data.description || "",
                    image: json.data.image || ""
                });
            }
        } catch (error) {
            setBanner({ type: "error", text: "Failed to load data" });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setBanner(null);
        try {
            const res = await fetch("/api/admin/inspiration", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            if (json.success) {
                setBanner({ type: "success", text: "Inspiration section updated successfully." });
            } else {
                setBanner({ type: "error", text: json.error || "Unable to save" });
            }
        } catch (error) {
            setBanner({ type: "error", text: "An error occurred while saving" });
        } finally {
            setSaving(false);
            setTimeout(() => setBanner(null), 5000);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-sandstone" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-oxford tracking-tight">Our Inspiration</h1>
                        <p className="text-gray-500 mt-1 font-medium">Manage the inspiration section shown on the Trust page.</p>
                    </div>
                    
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        disabled={saving}
                        className="inline-flex shrink-0 items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-sandstone text-oxford font-black uppercase tracking-widest text-xs shadow-lg hover:bg-sandstone-dark transition-all disabled:opacity-70"
                    >
                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {saving ? "Saving..." : "Save Changes"}
                    </motion.button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-10">
                <AnimatePresence>
                    {banner && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`mb-8 rounded-2xl border px-6 py-4 flex items-center gap-3 text-sm font-bold shadow-sm ${
                                banner.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"
                            }`}
                        >
                            {banner.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                            {banner.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-8">
                    {/* Header Info */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-gray-100 flex items-center justify-center text-sandstone">
                            <Star size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-oxford">Trust Inspiration</h2>
                            <p className="text-gray-500 font-medium">The visionary who inspired the institution.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                    <Type size={16} className="text-sandstone" /> Section Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                    placeholder="E.g. Our Inspiration"
                                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-gray-200 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all font-bold text-oxford text-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                    <User size={16} className="text-sandstone" /> Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    placeholder="E.g. Smt. Subhadraji Jain"
                                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-gray-200 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all font-bold text-oxford text-lg"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                <Edit3 size={16} className="text-sandstone" /> Description
                            </label>
                            <TiptapEditor
                                value={data.description}
                                onChange={(val) => setData({ ...data, description: val })}
                            />
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <h3 className="font-bold text-oxford mb-6 flex items-center gap-2">
                                <User size={18} className="text-sandstone" /> Photo
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div className="aspect-square max-w-xs rounded-[1.5rem] overflow-hidden bg-slate-50 border-2 border-dashed border-gray-200 relative group">
                                    {data.image ? (
                                        <img 
                                            src={data.image} 
                                            alt="Inspiration" 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                                            <User size={48} className="mb-4 opacity-50" />
                                            <p className="font-bold text-sm text-gray-500 mb-1">No Photo</p>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <FileUploadField
                                        label="Upload Photo"
                                        value={data.image}
                                        onChange={(url) => setData({ ...data, image: url })}
                                        folder="trust"
                                        accept="image/*"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
