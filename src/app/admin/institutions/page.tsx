"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Save,
    RefreshCcw,
    School,
    CheckCircle2,
    AlertCircle,
    Info,
    MessageSquare,
    Shield,
    Image as ImageIcon,
    Phone,
    MapPin,
    Mail,
    Globe,
    Facebook,
    Instagram,
    Youtube,
    Twitter,
    Trophy,
    Trash2,
    Plus,
    Edit3
} from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import Link from "next/link";

const INSTITUTIONS = [
    { id: "marudhar", name: "Marudhar Balika Vidyapeeth" },
    { id: "lps", name: "Leeladevi English Medium" },
    { id: "sushiladevi", name: "Sushiladevi Primary School" },
    { id: "college", name: "Leela Devi College" },
];

export default function InstitutionsManager() {
    const [activeTab, setActiveTab] = useState("marudhar");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [formData, setFormData] = useState<any>({});
    const [results, setResults] = useState<any[]>([]);
    const [resultsLoading, setResultsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (activeTab) {
            fetchResults();
        }
    }, [activeTab]);

    const fetchResults = async () => {
        setResultsLoading(true);
        try {
            const res = await fetch(`/api/admin/results?institution=${activeTab}`);
            const data = await res.json();
            if (data.success) {
                setResults(data.results);
            }
        } catch (error) {
            console.error("Failed to fetch results", error);
        } finally {
            setResultsLoading(false);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/institutions");
            const data = await res.json();
            if (data.success) {
                const grouped = data.institutions.reduce((acc: any, inst: any) => {
                    acc[inst.id] = inst;
                    return acc;
                }, {});
                setFormData(grouped);
            }
        } catch (error) {
            setMessage({ type: "error", text: "Failed to load data" });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (instId: string, section: string, field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [instId]: {
                ...prev[instId],
                [section]: {
                    ...prev[instId]?.[section],
                    [field]: value
                }
            }
        }));
    };

    const handleSimpleChange = (instId: string, field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [instId]: {
                ...prev[instId],
                [field]: value
            }
        }));
    };

    const handleSave = async (instId: string) => {
        setSaving(true);
        setMessage({ type: "", text: "" });
        try {
            const res = await fetch("/api/admin/institutions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData[instId], id: instId }),
            });
            const data = await res.json();
            if (data.success) {
                setMessage({ type: "success", text: `${INSTITUTIONS.find(i => i.id === instId)?.name} updated successfully!` });
            } else {
                setMessage({ type: "error", text: data.error || "Save failed" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "An error occurred while saving" });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <RefreshCcw className="animate-spin text-sandstone" size={48} />
            </div>
        );
    }

    const currentData = formData[activeTab] || { id: activeTab };

    return (
        <div className="space-y-8">
            {/* Institution Tabs */}
            <div className="flex flex-wrap gap-4 mb-8">
                {INSTITUTIONS.map((inst) => (
                    <button
                        key={inst.id}
                        onClick={() => setActiveTab(inst.id)}
                        className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === inst.id
                            ? "bg-sandstone text-oxford shadow-lg scale-105"
                            : "bg-white text-gray-400 hover:text-oxford border border-gray-100"}`}
                    >
                        <School size={18} />
                        {inst.name}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid lg:grid-cols-3 gap-8"
                >
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero & Logo */}
                        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <ImageIcon className="text-sandstone" size={24} />
                                <h3 className="text-xl font-black text-oxford uppercase tracking-tight">Identity & Hero</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Institution Name</label>
                                    <input
                                        type="text"
                                        value={currentData.name || ""}
                                        onChange={(e) => handleSimpleChange(activeTab, "name", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tagline / Subtitle</label>
                                    <input
                                        type="text"
                                        value={currentData.tagline || ""}
                                        onChange={(e) => handleSimpleChange(activeTab, "tagline", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <ImageUploadField
                                        label="Logo Path (Circular Image)"
                                        value={currentData.logo || ""}
                                        onChange={(url) => handleSimpleChange(activeTab, "logo", url)}
                                        folder="identities"
                                        description="Official circular logo for the institution. PNG or WEBP with transparency recommended."
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Affiliation (RBSE/CBSE/JNVU)</label>
                                    <input
                                        type="text"
                                        value={currentData.affiliation || ""}
                                        onChange={(e) => handleSimpleChange(activeTab, "affiliation", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Principal's Message */}
                        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <MessageSquare className="text-sandstone" size={24} />
                                <h3 className="text-xl font-black text-oxford uppercase tracking-tight">Principal's Message</h3>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Principal Name</label>
                                    <input
                                        type="text"
                                        value={currentData.principalMessage?.principalName || ""}
                                        onChange={(e) => handleInputChange(activeTab, "principalMessage", "principalName", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Key Quote (Nelson Mandela etc.)</label>
                                    <input
                                        type="text"
                                        value={currentData.principalMessage?.quote || ""}
                                        onChange={(e) => handleInputChange(activeTab, "principalMessage", "quote", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Message Body</label>
                                    <textarea
                                        rows={6}
                                        value={currentData.principalMessage?.message || ""}
                                        onChange={(e) => handleInputChange(activeTab, "principalMessage", "message", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20 resize-none"
                                    />
                                </div>
                                <div>
                                    <ImageUploadField
                                        label="Principal's Photo"
                                        value={currentData.principalMessage?.principalPhoto || ""}
                                        onChange={(url) => handleInputChange(activeTab, "principalMessage", "principalPhoto", url)}
                                        folder="principals"
                                        description="Professional portrait of the institution principal. Square aspect ratio (1:1)."
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Vision & Mission */}
                        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <Info className="text-sandstone" size={24} />
                                <h3 className="text-xl font-black text-oxford uppercase tracking-tight">Vision & Mission</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Institutional Vision</label>
                                    <textarea
                                        rows={5}
                                        value={currentData.vision?.content || ""}
                                        onChange={(e) => handleInputChange(activeTab, "vision", "content", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20 resize-none"
                                        placeholder="Our vision for the future..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Institutional Mission</label>
                                    <textarea
                                        rows={5}
                                        value={currentData.mission?.content || ""}
                                        onChange={(e) => handleInputChange(activeTab, "mission", "content", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20 resize-none"
                                        placeholder="Our core mission..."
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Rules & Uniforms */}
                        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="text-sandstone" size={24} />
                                <h3 className="text-xl font-black text-oxford uppercase tracking-tight">Rules & Regulations</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">School Uniform Info</label>
                                    <textarea
                                        rows={5}
                                        value={currentData.uniform?.content || ""}
                                        onChange={(e) => handleInputChange(activeTab, "uniform", "content", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20 resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">General Instructions</label>
                                    <textarea
                                        rows={5}
                                        value={currentData.rules?.content || ""}
                                        onChange={(e) => handleInputChange(activeTab, "rules", "content", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20 resize-none"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Area (Contact & Info) */}
                    <div className="space-y-8">
                        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <Phone className="text-sandstone" size={24} />
                                <h3 className="text-xl font-black text-oxford uppercase tracking-tight">Connect Channels</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        value={currentData.contact?.address || ""}
                                        onChange={(e) => handleInputChange(activeTab, "contact", "address", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                    />
                                </div>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        value={currentData.contact?.phone || ""}
                                        onChange={(e) => handleInputChange(activeTab, "contact", "phone", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                    />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        value={currentData.contact?.email || ""}
                                        onChange={(e) => handleInputChange(activeTab, "contact", "email", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                    />
                                </div>

                                <div className="pt-4 border-t border-gray-100 space-y-4">
                                    <div className="relative">
                                        <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Facebook URL"
                                            value={currentData.socialLinks?.facebook || ""}
                                            onChange={(e) => handleInputChange(activeTab, "socialLinks", "facebook", e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-600" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Instagram URL"
                                            value={currentData.socialLinks?.instagram || ""}
                                            onChange={(e) => handleInputChange(activeTab, "socialLinks", "instagram", e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" size={18} />
                                        <input
                                            type="text"
                                            placeholder="YouTube URL"
                                            value={currentData.socialLinks?.youtube || ""}
                                            onChange={(e) => handleInputChange(activeTab, "socialLinks", "youtube", e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Results Management Section */}


                        <div className="bg-sandstone/5 p-8 rounded-[2.5rem] border border-sandstone/10">
                            <h4 className="font-bold text-oxford mb-2 flex items-center gap-2">
                                <AlertCircle size={16} className="text-sandstone" />
                                Publishing Note
                            </h4>
                            <p className="text-xs text-gray-500 leading-relaxed font-light">
                                Changes made here will reflect on the public page for <strong>{INSTITUTIONS.find(i => i.id === activeTab)?.name}</strong> immediately after saving. Ensure all images paths are correct and existing in the system.
                            </p>

                            <button
                                onClick={() => handleSave(activeTab)}
                                disabled={saving}
                                className="w-full mt-6 bg-sandstone text-oxford py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {saving ? <RefreshCcw className="animate-spin" size={20} /> : <Save size={20} />}
                                Save Changes
                            </button>

                            {message.text && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`mt-4 p-4 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2 ${message.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
                                >
                                    {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                    {message.text}
                                </motion.div>
                            )}
                        </div>

                    </div>
                </motion.div>
            </AnimatePresence>
            <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6 lg:col-span-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-oxford flex items-center gap-3">
                            <Trophy className="text-sandstone" />
                            Results & Highlights
                        </h3>
                        <p className="text-sm text-gray-500 font-medium mt-1">Manage merit lists, board toppers, and achievements.</p>
                    </div>
                    <Link
                        href={`/admin/results/new?institution=${activeTab}`}
                        className="flex items-center gap-2 bg-oxford text-white px-6 py-2.5 rounded-xl font-bold hover:bg-oxford/90 transition-all shadow-lg shadow-oxford/20"
                    >
                        <Plus size={18} />
                        Add Result
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {resultsLoading ? (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400 gap-3 text-center">
                            <RefreshCcw className="animate-spin" size={32} />
                            <p className="font-bold">Loading results...</p>
                        </div>
                    ) : results.length > 0 ? (
                        results.map((result: any) => (
                            <div key={result._id} className="p-4 rounded-2xl bg-gray-50/50 border border-oxford flex items-start gap-4 group hover:bg-white hover:shadow-md transition-all">
                                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                                    <img
                                        src={result.image || "/images/placeholder-student.jpg"}
                                        alt={result.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => (e.currentTarget.src = "https://placehold.co/100x100?text=Student")}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-oxford truncate">{result.name}</h4>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs font-black text-sandstone">{result.percentage}%</span>
                                        <span className="text-[10px] text-gray-400 font-bold px-2 py-0.5 bg-gray-100 rounded-full">{result.class} - {result.year}</span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-1 font-medium italic">{result.resultType || "Board"}</p>
                                </div>
                                <Link
                                    href={`/admin/results/${result._id}`}
                                    className="p-2 text-gray-300 hover:text-oxford transition-colors opacity-0 text-oxford group-hover:opacity-100"
                                >
                                    <Edit3 size={16} />
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl gap-4">
                            <Trophy size={48} className="opacity-20" />
                            <div className="text-center">
                                <p className="font-bold">No results found for this institution</p>
                                <p className="text-xs mt-1">Start by adding your first merit list or topper.</p>
                            </div>
                        </div>
                    )}
                </div>

                {results.length > 0 && (
                    <div className="pt-4 flex justify-center">
                        <Link
                            href={`/admin/results?institution=${activeTab}`}
                            className="text-sm font-bold text-sandstone hover:underline flex items-center gap-2"
                        >
                            View All Full-Screen
                            <Globe size={14} />
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}
