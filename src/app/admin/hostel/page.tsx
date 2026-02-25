"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Save,
    RefreshCcw,
    Bed,
    CheckCircle2,
    AlertCircle,
    Utensils,
    ShieldCheck,
    Users,
    Plus,
    Trash2,
    Calendar,
    ChevronDown,
    ChevronUp,
    FileText,
    CreditCard,
    UserPlus,
    ImageIcon
} from "lucide-react";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export default function HostelManager() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [hostelData, setHostelData] = useState<any>({
        foodMenu: { weeklyMenu: {} },
        amenities: [],
        pillarsOfCare: [],
        chetnaPrabha: { items: [] },
        happinessCouncil: { items: [] }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/hostel");
            const data = await res.json();
            if (data.success && data.hostel) {
                setHostelData(data.hostel);
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
                body: JSON.stringify(hostelData),
            });
            const data = await res.json();
            if (data.success) {
                setMessage({ type: "success", text: "Hostel configuration updated successfully!" });
            } else {
                setMessage({ type: "error", text: data.error || "Save failed" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "An error occurred while saving" });
        } finally {
            setSaving(false);
        }
    };

    const updateNestedField = (section: string, field: string, value: any) => {
        setHostelData((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const addItem = (section: string) => {
        setHostelData((prev: any) => ({
            ...prev,
            [section]: [...(prev[section] || []), { id: Date.now().toString(), label: "", desc: "", image: "" }]
        }));
    };

    const removeItem = (section: string, index: number) => {
        setHostelData((prev: any) => ({
            ...prev,
            [section]: prev[section].filter((_: any, i: number) => i !== index)
        }));
    };

    const updateItemField = (section: string, index: number, field: string, value: string) => {
        const newItems = [...hostelData[section]];
        newItems[index] = { ...newItems[index], [field]: value };
        setHostelData((prev: any) => ({ ...prev, [section]: newItems }));
    };

    const updateMenuDay = (day: string, idx: number, value: string) => {
        const newDayMenu = [...(hostelData.foodMenu.weeklyMenu[day] || [])];
        newDayMenu[idx] = value;
        updateNestedField("foodMenu", "weeklyMenu", {
            ...hostelData.foodMenu.weeklyMenu,
            [day]: newDayMenu
        });
    };

    const addMenuItemView = (day: string) => {
        const newDayMenu = [...(hostelData.foodMenu.weeklyMenu[day] || []), ""];
        updateNestedField("foodMenu", "weeklyMenu", {
            ...hostelData.foodMenu.weeklyMenu,
            [day]: newDayMenu
        });
    };

    if (loading) return (
        <div className="flex items-center justify-center h-96">
            <RefreshCcw className="animate-spin text-sandstone" size={48} />
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto pb-20">
            {/* Header / Actions */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-black text-oxford uppercase tracking-tight">Hostel & Residential Management</h2>
                    <p className="text-gray-500">Curate the student home-away-from-home experience.</p>
                </div>
                <div className="flex gap-4 items-center">
                    {message.text && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${message.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                            {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                            {message.text}
                        </motion.div>
                    )}
                    <button onClick={handleSave} disabled={saving} className="bg-sandstone text-oxford px-8 py-3 rounded-2xl font-black uppercase tracking-widest shadow-lg flex items-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50">
                        {saving ? <RefreshCcw className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="space-y-12">
                {/* Food Menu Section */}
                <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-sandstone/10 rounded-2xl flex items-center justify-center text-sandstone">
                            <Utensils size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-oxford uppercase tracking-tight">Satvik Weekly Menu</h3>
                            <p className="text-sm text-gray-400">Manage the diet and lunar-based meals.</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
                        {DAYS.map((day) => (
                            <div key={day} className="bg-slate-50 p-6 rounded-[2rem] border border-gray-100">
                                <h4 className="font-black text-oxford uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                                    <Calendar size={12} className="text-sandstone" />
                                    {day}
                                </h4>
                                <div className="space-y-3">
                                    {(hostelData.foodMenu.weeklyMenu[day] || []).map((item: string, idx: number) => (
                                        <input
                                            key={idx}
                                            value={item}
                                            onChange={(e) => updateMenuDay(day, idx, e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-sandstone/20"
                                            placeholder="Meal item..."
                                        />
                                    ))}
                                    <button onClick={() => addMenuItemView(day)} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-sandstone hover:text-sandstone transition-all text-xs font-bold uppercase">
                                        + Add Item
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Amenities & Pillars of Care */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Amenities */}
                    <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <Bed size={24} />
                                </div>
                                <h3 className="text-xl font-black text-oxford uppercase tracking-tight">Hostel Amenities</h3>
                            </div>
                            <button onClick={() => addItem("amenities")} className="bg-oxford text-white p-2 rounded-xl hover:bg-sandstone hover:text-oxford transition-all">
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {hostelData.amenities.map((item: any, idx: number) => (
                                <div key={idx} className="p-6 bg-slate-50 rounded-2xl relative group">
                                    <button onClick={() => removeItem("amenities", idx)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="grid gap-4">
                                        <input
                                            value={item.label}
                                            onChange={(e) => updateItemField("amenities", idx, "label", e.target.value)}
                                            placeholder="Feature Name (e.g. Central AC)"
                                            className="bg-white border border-gray-100 px-4 py-2 rounded-lg font-bold text-oxford"
                                        />
                                        <textarea
                                            value={item.desc}
                                            onChange={(e) => updateItemField("amenities", idx, "desc", e.target.value)}
                                            placeholder="Description"
                                            className="bg-white border border-gray-100 px-4 py-2 rounded-lg text-sm text-gray-500 min-h-[80px]"
                                        />
                                        <input
                                            value={item.image}
                                            onChange={(e) => updateItemField("amenities", idx, "image", e.target.value)}
                                            placeholder="Image Path"
                                            className="bg-white border border-gray-100 px-4 py-2 rounded-lg text-xs font-mono"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Pillars of Care */}
                    <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-xl font-black text-oxford uppercase tracking-tight">Pillars of Care</h3>
                            </div>
                            <button onClick={() => addItem("pillarsOfCare")} className="bg-oxford text-white p-2 rounded-xl hover:bg-sandstone hover:text-oxford transition-all">
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {hostelData.pillarsOfCare.map((item: any, idx: number) => (
                                <div key={idx} className="p-6 bg-slate-50 rounded-2xl relative group">
                                    <button onClick={() => removeItem("pillarsOfCare", idx)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="grid gap-4">
                                        <input
                                            value={item.label}
                                            onChange={(e) => updateItemField("pillarsOfCare", idx, "label", e.target.value)}
                                            placeholder="Title (e.g. Sanrakshika)"
                                            className="bg-white border border-gray-100 px-4 py-2 rounded-lg font-bold text-oxford"
                                        />
                                        <textarea
                                            value={item.desc}
                                            onChange={(e) => updateItemField("pillarsOfCare", idx, "desc", e.target.value)}
                                            placeholder="Description / Role"
                                            className="bg-white border border-gray-100 px-4 py-2 rounded-lg text-sm text-gray-500 min-h-[80px]"
                                        />
                                        <input
                                            value={item.image}
                                            onChange={(e) => updateItemField("pillarsOfCare", idx, "image", e.target.value)}
                                            placeholder="Profile Photo Path"
                                            className="bg-white border border-gray-100 px-4 py-2 rounded-lg text-xs font-mono"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Additional Information Sections */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Rules */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="text-sandstone" size={24} />
                            <h3 className="text-lg font-black text-oxford uppercase tracking-tight">Hostel Rules</h3>
                        </div>
                        <textarea
                            rows={8}
                            value={hostelData.rules?.content || ""}
                            onChange={(e) => updateNestedField("rules", "content", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20 resize-none text-sm"
                            placeholder="Rules and regulations..."
                        />
                    </section>

                    {/* Fees */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <CreditCard className="text-sandstone" size={24} />
                            <h3 className="text-lg font-black text-oxford uppercase tracking-tight">Fee Structure</h3>
                        </div>
                        <textarea
                            rows={8}
                            value={hostelData.fees?.content || ""}
                            onChange={(e) => updateNestedField("fees", "content", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20 resize-none text-sm"
                            placeholder="Admission and boarding fees... (HTML tags supported)"
                        />
                    </section>

                    {/* Admission */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <UserPlus className="text-sandstone" size={24} />
                            <h3 className="text-lg font-black text-oxford uppercase tracking-tight">Admission Criteria</h3>
                        </div>
                        <textarea
                            rows={8}
                            value={hostelData.admission?.content || ""}
                            onChange={(e) => updateNestedField("admission", "content", e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20 resize-none text-sm"
                            placeholder="Documents required, interview process etc."
                        />
                    </section>
                </div>
            </div>
        </div>
    );
}
