"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
    Trophy,
    Plus,
    Edit3,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import ImageUploadField from "@/components/admin/ImageUploadField";

const INSTITUTIONS = [
    { id: "marudhar", name: "Marudhar Balika Vidyapeeth", color: "from-sandstone to-sandstone-dark" },
    { id: "english", name: "Leeladevi English Medium", color: "from-oxford to-oxford-light" },
    { id: "primary", name: "Sushiladevi Primary School", color: "from-sandstone to-oxford-light" },
    { id: "college", name: "Leela Devi College", color: "from-oxford to-sandstone" },
];

export default function InstitutionManager() {
    const { id } = useParams();
    const instId = id as string;
    const institutionInfo = INSTITUTIONS.find(i => i.id === instId);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [formData, setFormData] = useState<any>({});
    const [results, setResults] = useState<any[]>([]);
    const [resultsLoading, setResultsLoading] = useState(false);

    useEffect(() => {
        if (instId) {
            fetchData();
            fetchResults();
        }
    }, [instId]);

    const fetchResults = async () => {
        setResultsLoading(true);
        try {
            const res = await fetch(`/api/admin/results?institution=${instId}`);
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
                setFormData(grouped[instId] || { id: instId });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Failed to load data" });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (section: string, field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [section]: {
                ...prev?.[section],
                [field]: value
            }
        }));
    };

    const handleSimpleChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: "", text: "" });
        try {
            const res = await fetch("/api/admin/institutions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, id: instId }),
            });
            const data = await res.json();
            if (data.success) {
                setMessage({ type: "success", text: "Settings updated successfully!" });
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

    return (
        <div className="space-y-8 pb-20">
            {/* Header with Back Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin/institutions" 
                        className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-oxford hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-oxford uppercase tracking-tight">
                            {institutionInfo?.name || "Institution Manager"}
                        </h1>
                        <p className="text-sm text-gray-500 font-medium">Manage details, faculty, and results.</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Toppers / Results Management - PRIMARY SECTION */}
                    <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-oxford flex items-center gap-3">
                                    <Trophy className="text-sandstone" size={24} />
                                    Toppers & Merit Lists
                                </h3>
                                <p className="text-sm text-gray-500 font-medium mt-1">Manage board toppers and historical result highlights.</p>
                            </div>
                            <Link
                                href={`/admin/results/new?institution=${instId}`}
                                className="flex items-center gap-2 bg-oxford text-white px-6 py-2.5 rounded-xl font-bold hover:bg-oxford/90 transition-all shadow-lg"
                            >
                                <Plus size={18} />
                                Add Topper
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resultsLoading ? (
                                <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400 gap-3 text-center">
                                    <RefreshCcw className="animate-spin" size={32} />
                                    <p className="font-bold">Loading results...</p>
                                </div>
                            ) : results.length > 0 ? (
                                results.map((result: any) => (
                                    <div key={result._id} className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 flex items-start gap-4 group hover:bg-white hover:shadow-md transition-all">
                                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm bg-gray-100">
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
                                        </div>
                                        <Link
                                            href={`/admin/results/${result._id}`}
                                            className="p-2 text-gray-300 hover:text-oxford transition-colors group-hover:text-oxford"
                                        >
                                            <Edit3 size={16} />
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl gap-4">
                                    <Trophy size={48} className="opacity-20" />
                                    <div className="text-center">
                                        <p className="font-bold">No results found</p>
                                        <p className="text-xs mt-1">Start by adding your first merit list or topper.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {results.length > 0 && (
                            <div className="pt-4 flex justify-center">
                                <Link
                                    href={`/admin/results?institution=${instId}`}
                                    className="text-sm font-bold text-sandstone hover:underline flex items-center gap-2"
                                >
                                    View Detailed List
                                    <Globe size={14} />
                                </Link>
                            </div>
                        )}
                    </section>

                    {/* Identity & Basic Details */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <ImageIcon className="text-sandstone" size={24} />
                            <h3 className="text-xl font-black text-oxford uppercase tracking-tight">Identity & Hero</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Display Name</label>
                                <input
                                    type="text"
                                    value={formData.name || ""}
                                    onChange={(e) => handleSimpleChange("name", e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tagline</label>
                                <input
                                    type="text"
                                    value={formData.tagline || ""}
                                    onChange={(e) => handleSimpleChange("tagline", e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <ImageUploadField
                                    label="Institution Logo"
                                    value={formData.logo || ""}
                                    onChange={(url) => handleSimpleChange("logo", url)}
                                    folder="identities"
                                    description="Official circular logo for the institution."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Affiliation</label>
                                <input
                                    type="text"
                                    value={formData.affiliation || ""}
                                    onChange={(e) => handleSimpleChange("affiliation", e.target.value)}
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
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Principal Name</label>
                                    <input
                                        type="text"
                                        value={formData.principalMessage?.principalName || ""}
                                        onChange={(e) => handleInputChange("principalMessage", "principalName", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Quote</label>
                                    <input
                                        type="text"
                                        value={formData.principalMessage?.quote || ""}
                                        onChange={(e) => handleInputChange("principalMessage", "quote", e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Message Body</label>
                                <textarea
                                    rows={6}
                                    value={formData.principalMessage?.message || ""}
                                    onChange={(e) => handleInputChange("principalMessage", "message", e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20 resize-none"
                                />
                            </div>
                            <ImageUploadField
                                label="Principal's Photo"
                                value={formData.principalMessage?.principalPhoto || ""}
                                onChange={(url) => handleInputChange("principalMessage", "principalPhoto", url)}
                                folder="principals"
                                description="Portrait photo."
                            />
                        </div>
                    </section>
                </div>

                {/* Sidebar Area */}
                <div className="space-y-8">
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <Phone className="text-sandstone" size={24} />
                            <h3 className="text-xl font-black text-oxford uppercase tracking-tight">Contact Details</h3>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Address"
                                value={formData.contact?.address || ""}
                                onChange={(e) => handleInputChange("contact", "address", e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                value={formData.contact?.phone || ""}
                                onChange={(e) => handleInputChange("contact", "phone", e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                value={formData.contact?.email || ""}
                                onChange={(e) => handleInputChange("contact", "email", e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                            />
                        </div>
                    </section>

                    <div className="bg-sandstone/5 p-8 rounded-[2.5rem] border border-sandstone/10 sticky top-8">
                        <h4 className="font-bold text-oxford mb-2">Institutional Sync</h4>
                        <p className="text-xs text-gray-500 font-medium mb-6">Updates here reflect instantly on the public institutional page.</p>

                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full bg-sandstone text-oxford py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {saving ? <RefreshCcw className="animate-spin" size={20} /> : <Save size={20} />}
                            Save All Changes
                        </button>

                        <AnimatePresence>
                            {message.text && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={`mt-4 p-4 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2 ${message.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
                                >
                                    {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                    {message.text}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
