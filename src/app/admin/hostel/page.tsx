"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Save, RefreshCcw, CheckCircle2, AlertCircle, Plus, Trash2,
    FileText, Image as ImageIcon, MapPin, Dumbbell, ShieldCheck,
    CreditCard, Scale, Trophy, Landmark, Users
} from "lucide-react";
import FileUploadField from "@/components/admin/FileUploadField";
import TiptapEditor from "@/components/admin/TiptapEditor";

export default function HostelManager() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    
    const defaultHostelData = {
        prospectus: "",
        about: { title: "", description: "", stats: [], features: [] },
        gallery: [],
        facilities: [],
        fees: { table: [], shortDuration: { nonAc: "", ac: "" }, cancellation: { penalty: "", schoolDate: "", collegeDate: "" } },
        rules: [],
        scholarships: [],
        banking: { accountName: "", bankAndBranch: "", accountNumber: "", ifscCode: "" }
    };
    
    const [data, setData] = useState<any>(defaultHostelData);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/hostel");
            const resData = await res.json();
            if (resData.success && resData.hostel) {
                // Merge with default to ensure all nested objects exist
                setData({
                    ...defaultHostelData,
                    ...resData.hostel,
                    about: { ...defaultHostelData.about, ...(resData.hostel.about || {}) },
                    fees: { 
                        ...defaultHostelData.fees, 
                        ...(resData.hostel.fees || {}),
                        shortDuration: { ...defaultHostelData.fees.shortDuration, ...(resData.hostel.fees?.shortDuration || {}) },
                        cancellation: { ...defaultHostelData.fees.cancellation, ...(resData.hostel.fees?.cancellation || {}) }
                    },
                    banking: { ...defaultHostelData.banking, ...(resData.hostel.banking || {}) }
                });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Failed to load data" });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: "", text: "" });
        try {
            const res = await fetch("/api/admin/hostel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const resData = await res.json();
            if (resData.success) {
                setMessage({ type: "success", text: "Hostel content updated successfully!" });
            } else {
                setMessage({ type: "error", text: resData.error || "Save failed" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "An error occurred while saving" });
        } finally {
            setSaving(false);
            setTimeout(() => setMessage({ type: "", text: "" }), 5000);
        }
    };

    // Array manipulation helpers
    const addItem = (path: string[], newItem: any) => {
        setData((prev: any) => {
            const next = { ...prev };
            let current = next;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            const arr = current[path[path.length - 1]] || [];
            current[path[path.length - 1]] = [...arr, newItem];
            return next;
        });
    };

    const removeItem = (path: string[], index: number) => {
        setData((prev: any) => {
            const next = { ...prev };
            let current = next;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            const arr = current[path[path.length - 1]];
            current[path[path.length - 1]] = arr.filter((_: any, i: number) => i !== index);
            return next;
        });
    };

    const updateArrayItem = (path: string[], index: number, field: string, value: any) => {
        setData((prev: any) => {
            const next = { ...prev };
            let current = next;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            const arr = [...current[path[path.length - 1]]];
            arr[index] = { ...arr[index], [field]: value };
            current[path[path.length - 1]] = arr;
            return next;
        });
    };

    const updateField = (path: string[], value: any) => {
        setData((prev: any) => {
            const next = { ...prev };
            let current = next;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            current[path[path.length - 1]] = value;
            return next;
        });
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <RefreshCcw className="animate-spin text-sandstone" size={48} />
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto pb-24 px-6 pt-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-black text-oxford uppercase tracking-tight">Hostel Website Manager</h1>
                    <p className="text-gray-500 mt-2 font-medium">Manage the content that appears on the public /hostel page.</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <AnimatePresence>
                        {message.text && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${message.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                                {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                {message.text}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button onClick={handleSave} disabled={saving} className="bg-sandstone text-oxford px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg flex items-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50 whitespace-nowrap">
                        {saving ? <RefreshCcw className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="space-y-12">
                {/* PROSPECTUS */}
                <section className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-8 border-b border-gray-50 pb-6">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                            <FileText size={24} />
                        </div>
                        <h2 className="text-2xl font-black text-oxford">Prospectus PDF</h2>
                    </div>
                    <FileUploadField 
                        label="Upload Prospectus"
                        value={data.prospectus}
                        onChange={(url) => updateField(["prospectus"], url)}
                        folder="hostel/prospectus"
                        description="Upload the official hostel PDF for download."
                    />
                </section>

                {/* ABOUT SECTION */}
                <section className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-8 border-b border-gray-50 pb-6">
                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                            <MapPin size={24} />
                        </div>
                        <h2 className="text-2xl font-black text-oxford">About Hostel</h2>
                    </div>
                    
                    <div className="space-y-6 mb-10">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                            <input 
                                value={data.about?.title || ""}
                                onChange={(e) => updateField(["about", "title"], e.target.value)}
                                className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-sandstone/20 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                            <TiptapEditor 
                                value={data.about?.description || ""}
                                onChange={(val) => updateField(["about", "description"], val)}
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 border-t border-gray-100 pt-10">
                        {/* Stats */}
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-oxford">Key Stats</h3>
                                <button onClick={() => addItem(["about", "stats"], { value: "", label: "" })} className="text-sandstone font-bold text-sm bg-sandstone/10 px-3 py-1 rounded-lg">+ Add Stat</button>
                            </div>
                            <div className="space-y-4">
                                {(data.about?.stats || []).map((stat: any, idx: number) => (
                                    <div key={idx} className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl">
                                        <input 
                                            placeholder="Value (e.g. 800+)"
                                            value={stat.value}
                                            onChange={(e) => updateArrayItem(["about", "stats"], idx, "value", e.target.value)}
                                            className="w-1/3 bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm"
                                        />
                                        <input 
                                            placeholder="Label (e.g. Capacity)"
                                            value={stat.label}
                                            onChange={(e) => updateArrayItem(["about", "stats"], idx, "label", e.target.value)}
                                            className="flex-1 bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm"
                                        />
                                        <button onClick={() => removeItem(["about", "stats"], idx)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-oxford">Highlight Features</h3>
                                <button onClick={() => addItem(["about", "features"], { icon: "MapPin", text: "" })} className="text-sandstone font-bold text-sm bg-sandstone/10 px-3 py-1 rounded-lg">+ Add Feature</button>
                            </div>
                            <div className="space-y-4">
                                {(data.about?.features || []).map((feat: any, idx: number) => (
                                    <div key={idx} className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl">
                                        <select 
                                            value={feat.icon || "MapPin"}
                                            onChange={(e) => updateArrayItem(["about", "features"], idx, "icon", e.target.value)}
                                            className="w-1/3 bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm"
                                        >
                                            <option value="MapPin">MapPin</option>
                                            <option value="Dumbbell">Dumbbell</option>
                                            <option value="Users">Users</option>
                                            <option value="Star">Star</option>
                                            <option value="ShieldCheck">ShieldCheck</option>
                                        </select>
                                        <input 
                                            placeholder="Text (e.g. 65-Acre Safe Campus)"
                                            value={feat.text}
                                            onChange={(e) => updateArrayItem(["about", "features"], idx, "text", e.target.value)}
                                            className="flex-1 bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm"
                                        />
                                        <button onClick={() => removeItem(["about", "features"], idx)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* GALLERY */}
                <section className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600">
                                <ImageIcon size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-oxford">Photo Gallery</h2>
                        </div>
                        <button onClick={() => addItem(["gallery"], { src: "", title: "" })} className="bg-oxford text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-sandstone transition-colors">
                            <Plus size={16} /> Add Image
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(data.gallery || []).map((img: any, idx: number) => (
                            <div key={idx} className="bg-slate-50 p-4 rounded-3xl border border-gray-200 relative group">
                                <button onClick={() => removeItem(["gallery"], idx)} className="absolute top-6 right-6 bg-white p-2 rounded-full text-red-500 shadow-md hover:bg-red-50 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 size={16} />
                                </button>
                                <div className="mb-4">
                                    <FileUploadField 
                                        label="Image"
                                        value={img.src}
                                        onChange={(url) => updateArrayItem(["gallery"], idx, "src", url)}
                                        folder="hostel/gallery"
                                    />
                                </div>
                                <input 
                                    placeholder="Image Title"
                                    value={img.title}
                                    onChange={(e) => updateArrayItem(["gallery"], idx, "title", e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-sm font-bold text-center"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* FACILITIES */}
                <section className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                                <Dumbbell size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-oxford">Facilities & Amenities</h2>
                        </div>
                        <button onClick={() => addItem(["facilities"], { image: "", title: "", desc: "" })} className="bg-oxford text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-sandstone transition-colors">
                            <Plus size={16} /> Add Facility
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(data.facilities || []).map((fac: any, idx: number) => (
                            <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-gray-200 relative">
                                <button onClick={() => removeItem(["facilities"], idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-600">
                                    <Trash2 size={18} />
                                </button>
                                <div className="space-y-4 pt-4">
                                    <input 
                                        placeholder="Title (e.g. Safety & CCTV)"
                                        value={fac.title}
                                        onChange={(e) => updateArrayItem(["facilities"], idx, "title", e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 font-bold"
                                    />
                                    <textarea 
                                        placeholder="Short Description"
                                        value={fac.desc}
                                        onChange={(e) => updateArrayItem(["facilities"], idx, "desc", e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-sm resize-none"
                                        rows={3}
                                    />
                                    <div className="text-xs">
                                        <FileUploadField 
                                            label="Facility Photo"
                                            value={fac.image}
                                            onChange={(url) => updateArrayItem(["facilities"], idx, "image", url)}
                                            folder="hostel/facilities"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FEES & TARIFFS */}
                <section className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-8 border-b border-gray-50 pb-6">
                        <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                            <CreditCard size={24} />
                        </div>
                        <h2 className="text-2xl font-black text-oxford">Fees & Short Duration Stay</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Fee Table */}
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-oxford">Annual Fee Table</h3>
                                <button onClick={() => addItem(["fees", "table"], { className: "", nonAc: "", ac: "" })} className="text-sandstone font-bold text-sm bg-sandstone/10 px-3 py-1 rounded-lg">+ Add Row</button>
                            </div>
                            <div className="space-y-3">
                                {(data.fees?.table || []).map((row: any, idx: number) => (
                                    <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl">
                                        <input 
                                            placeholder="Class Level"
                                            value={row.className}
                                            onChange={(e) => updateArrayItem(["fees", "table"], idx, "className", e.target.value)}
                                            className="flex-1 bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm font-bold"
                                        />
                                        <input 
                                            placeholder="Non-AC (e.g. ₹87,500)"
                                            value={row.nonAc}
                                            onChange={(e) => updateArrayItem(["fees", "table"], idx, "nonAc", e.target.value)}
                                            className="w-1/4 bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm"
                                        />
                                        <input 
                                            placeholder="AC (e.g. ₹1,20,500)"
                                            value={row.ac}
                                            onChange={(e) => updateArrayItem(["fees", "table"], idx, "ac", e.target.value)}
                                            className="w-1/4 bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-sandstone font-bold"
                                        />
                                        <button onClick={() => removeItem(["fees", "table"], idx)} className="text-red-400 hover:text-red-600 px-2"><Trash2 size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Short Duration & Cancellation */}
                        <div className="space-y-8">
                            <div className="bg-slate-50 p-6 rounded-3xl border border-gray-100">
                                <h3 className="text-lg font-bold text-oxford mb-4">Short Duration Stay (Per Month)</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Non-AC</label>
                                        <input 
                                            value={data.fees?.shortDuration?.nonAc || ""}
                                            onChange={(e) => updateField(["fees", "shortDuration", "nonAc"], e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2 px-4"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">AC</label>
                                        <input 
                                            value={data.fees?.shortDuration?.ac || ""}
                                            onChange={(e) => updateField(["fees", "shortDuration", "ac"], e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2 px-4"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-slate-50 p-6 rounded-3xl border border-gray-100">
                                <h3 className="text-lg font-bold text-oxford mb-4">Cancellation Policy</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Deduction Penalty</label>
                                        <input 
                                            value={data.fees?.cancellation?.penalty || ""}
                                            onChange={(e) => updateField(["fees", "cancellation", "penalty"], e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2 px-4"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">School Last Date</label>
                                            <input 
                                                value={data.fees?.cancellation?.schoolDate || ""}
                                                onChange={(e) => updateField(["fees", "cancellation", "schoolDate"], e.target.value)}
                                                className="w-full bg-white border border-gray-200 rounded-xl py-2 px-4"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">College Last Date</label>
                                            <input 
                                                value={data.fees?.cancellation?.collegeDate || ""}
                                                onChange={(e) => updateField(["fees", "cancellation", "collegeDate"], e.target.value)}
                                                className="w-full bg-white border border-gray-200 rounded-xl py-2 px-4"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* RULES & POLICIES */}
                <section className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                                <Scale size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-oxford">Rules & Policies</h2>
                        </div>
                        <button onClick={() => addItem(["rules"], { id: Date.now().toString(), title: "", content: "", icon: "History" })} className="bg-oxford text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-sandstone transition-colors">
                            <Plus size={16} /> Add Rule
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {(data.rules || []).map((rule: any, idx: number) => (
                            <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-gray-200 relative">
                                <button onClick={() => removeItem(["rules"], idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-600">
                                    <Trash2 size={18} />
                                </button>
                                <div className="space-y-4 pt-2">
                                    <div className="flex gap-4">
                                        <select 
                                            value={rule.icon || "History"}
                                            onChange={(e) => updateArrayItem(["rules"], idx, "icon", e.target.value)}
                                            className="w-1/3 bg-white border border-gray-200 rounded-xl py-2 px-3 text-sm font-bold"
                                        >
                                            <option value="History">History</option>
                                            <option value="FileCheck">FileCheck</option>
                                            <option value="Scale">Scale</option>
                                            <option value="Umbrella">Umbrella</option>
                                            <option value="ShieldCheck">ShieldCheck</option>
                                        </select>
                                        <input 
                                            placeholder="Rule Title"
                                            value={rule.title}
                                            onChange={(e) => updateArrayItem(["rules"], idx, "title", e.target.value)}
                                            className="flex-1 bg-white border border-gray-200 rounded-xl py-2 px-3 font-bold text-oxford"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <TiptapEditor 
                                            value={rule.content || ""}
                                            onChange={(val) => updateArrayItem(["rules"], idx, "content", val)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SCHOLARSHIPS & BANKING */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Scholarships */}
                    <section className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600">
                                    <Trophy size={24} />
                                </div>
                                <h2 className="text-xl font-black text-oxford">Scholarships</h2>
                            </div>
                            <button onClick={() => addItem(["scholarships"], { title: "", desc: "" })} className="bg-sandstone/10 text-sandstone px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-sandstone/20">
                                <Plus size={14} /> Add
                            </button>
                        </div>
                        <div className="space-y-4">
                            {(data.scholarships || []).map((schol: any, idx: number) => (
                                <div key={idx} className="flex gap-4 bg-slate-50 p-4 rounded-2xl border border-gray-100">
                                    <div className="flex-1 space-y-2">
                                        <input 
                                            placeholder="Scholarship Title"
                                            value={schol.title}
                                            onChange={(e) => updateArrayItem(["scholarships"], idx, "title", e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 font-bold text-sm"
                                        />
                                        <input 
                                            placeholder="Description (e.g. 10% discount...)"
                                            value={schol.desc}
                                            onChange={(e) => updateArrayItem(["scholarships"], idx, "desc", e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-600"
                                        />
                                    </div>
                                    <button onClick={() => removeItem(["scholarships"], idx)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Banking */}
                    <section className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-8 border-b border-gray-50 pb-6">
                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                <Landmark size={24} />
                            </div>
                            <h2 className="text-xl font-black text-oxford">Banking Details</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Account Name</label>
                                <input 
                                    value={data.banking?.accountName || ""}
                                    onChange={(e) => updateField(["banking", "accountName"], e.target.value)}
                                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 font-bold text-oxford"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Bank & Branch</label>
                                <input 
                                    value={data.banking?.bankAndBranch || ""}
                                    onChange={(e) => updateField(["banking", "bankAndBranch"], e.target.value)}
                                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 font-bold text-oxford"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">A/C Number</label>
                                <input 
                                    value={data.banking?.accountNumber || ""}
                                    onChange={(e) => updateField(["banking", "accountNumber"], e.target.value)}
                                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 font-black text-sandstone"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">IFSC Code</label>
                                <input 
                                    value={data.banking?.ifscCode || ""}
                                    onChange={(e) => updateField(["banking", "ifscCode"], e.target.value)}
                                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 font-black text-oxford tracking-widest"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
