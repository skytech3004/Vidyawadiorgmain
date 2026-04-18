"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Microscope, Plus, Trash2, Edit3, ArrowLeft, Save, X, Loader2,
    Image as ImageIcon, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import ImageUploadField from "@/components/admin/ImageUploadField";

const INSTITUTION_META: Record<string, { name: string; label: string; schema: "college" | "marudhar" | "english" }> = {
    college: { name: "Leela Devi College", label: "Laboratories & Research", schema: "college" },
    marudhar: { name: "Marudhar Balika Vidyapeeth", label: "Modern Labs & Facilities", schema: "marudhar" },
    english: { name: "Leeladevi English Medium", label: "Modern Infrastructure", schema: "english" },
};

const ICON_OPTIONS = ["Microscope", "Globe", "Trophy", "School", "BookOpen", "CheckCircle2", "Star", "Activity", "Monitor", "Utensils", "Music"];
const GRADIENT_OPTIONS = [
    "from-sandstone to-sandstone-dark",
    "from-oxford to-oxford-dark",
    "from-sandstone to-oxford",
];

function getDefaultForm(schema: string) {
    if (schema === "college") {
        return { name: "", slug: "", image: "", icon: "Microscope", gradient: "from-sandstone to-sandstone-dark", description: "", fullDescription: "", keyFeatures: [""], activities: "", impact: "" };
    }
    if (schema === "marudhar") {
        return { name: "", icon: "Microscope", img: "" };
    }
    return { name: "", img: "" }; // english
}

export default function LabsManagerPage() {
    const { institution } = useParams() as { institution: string };
    const meta = INSTITUTION_META[institution];

    const [labs, setLabs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>(getDefaultForm(institution));
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        if (institution && meta) fetchLabs();
    }, [institution]);

    const fetchLabs = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/labs/${institution}`);
            const data = await res.json();
            if (data.success) setLabs(data.results);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (lab: any) => {
        setEditingId(lab._id);
        setFormData({ ...lab });
        setShowForm(true);
    };

    const handleNew = () => {
        setEditingId(null);
        setFormData(getDefaultForm(institution));
        setShowForm(true);
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: "", text: "" });
        try {
            const url = editingId
                ? `/api/admin/labs/${institution}/${editingId}`
                : `/api/admin/labs/${institution}`;
            const method = editingId ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                setMessage({ type: "success", text: editingId ? "Updated successfully!" : "Added successfully!" });
                setShowForm(false);
                setEditingId(null);
                await fetchLabs();
            } else {
                setMessage({ type: "error", text: data.error || "Save failed" });
            }
        } catch (e) {
            setMessage({ type: "error", text: "An error occurred" });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this entry?")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/admin/labs/${institution}/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setLabs(prev => prev.filter(l => l._id !== id));
                setMessage({ type: "success", text: "Deleted successfully!" });
            }
        } catch (e) {
            setMessage({ type: "error", text: "Delete failed" });
        } finally {
            setDeletingId(null);
        }
    };

    const updateFeature = (idx: number, val: string) => {
        const features = [...(formData.keyFeatures || [""])];
        features[idx] = val;
        setFormData((p: any) => ({ ...p, keyFeatures: features }));
    };

    const addFeature = () => setFormData((p: any) => ({ ...p, keyFeatures: [...(p.keyFeatures || []), ""] }));
    const removeFeature = (idx: number) => setFormData((p: any) => ({ ...p, keyFeatures: p.keyFeatures.filter((_: any, i: number) => i !== idx) }));

    if (!meta) return (
        <div className="p-8 text-center text-gray-500">
            <p className="font-bold">Invalid institution ID.</p>
            <Link href="/admin/institutions" className="text-sandstone underline mt-4 block">Back to Institutions</Link>
        </div>
    );

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href={`/admin/institutions/${institution}`}
                        className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-oxford hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-black text-oxford uppercase tracking-tight">{meta.label}</h1>
                        <p className="text-sm text-gray-500 font-medium">{meta.name}</p>
                    </div>
                </div>
                <button
                    onClick={handleNew}
                    className="flex items-center gap-2 px-6 py-3 bg-oxford text-white rounded-full font-bold text-sm hover:bg-sandstone hover:text-oxford transition-all shadow-lg"
                >
                    <Plus size={18} />
                    Add Entry
                </button>
            </div>

            {/* Message */}
            <AnimatePresence>
                {message.text && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-4 rounded-2xl text-sm font-bold flex items-center gap-3 ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
                    >
                        <CheckCircle2 size={16} />
                        {message.text}
                        <button onClick={() => setMessage({ type: "", text: "" })} className="ml-auto"><X size={14} /></button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add/Edit Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-oxford/50 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            <div className="p-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-[2rem]">
                                <h2 className="text-xl font-black text-oxford">{editingId ? "Edit Entry" : "New Entry"}</h2>
                                <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="p-8 space-y-6">
                                {/* Common fields */}
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Name *</label>
                                    <input
                                        className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-oxford font-medium focus:outline-none focus:border-sandstone"
                                        value={formData.name}
                                        onChange={e => setFormData((p: any) => ({ ...p, name: e.target.value }))}
                                        placeholder="e.g. Physics Laboratory"
                                    />
                                </div>

                                {/* Image Upload field (all schemas) */}
                                <ImageUploadField
                                    label={institution === "college" ? "Lab Image" : "Facility Image"}
                                    value={institution === "college" ? (formData.image || "") : (formData.img || "")}
                                    onChange={url => setFormData((p: any) => ({
                                        ...p,
                                        [institution === "college" ? "image" : "img"]: url
                                    }))}
                                    folder="labs"
                                    description="Landscape ratio recommended (e.g. 1200x800). Under 2MB. JPG, PNG or WEBP."
                                />

                                {/* Icon (college and marudhar) */}
                                {(institution === "college" || institution === "marudhar") && (
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Icon</label>
                                        <select
                                            className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-oxford font-medium focus:outline-none focus:border-sandstone"
                                            value={formData.icon}
                                            onChange={e => setFormData((p: any) => ({ ...p, icon: e.target.value }))}
                                        >
                                            {ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                                        </select>
                                    </div>
                                )}

                                {/* College specific fields */}
                                {institution === "college" && (
                                    <>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Slug</label>
                                            <input
                                                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-oxford font-medium focus:outline-none focus:border-sandstone"
                                                value={formData.slug}
                                                onChange={e => setFormData((p: any) => ({ ...p, slug: e.target.value }))}
                                                placeholder="e.g. physics"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Gradient</label>
                                            <select
                                                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-oxford font-medium focus:outline-none focus:border-sandstone"
                                                value={formData.gradient}
                                                onChange={e => setFormData((p: any) => ({ ...p, gradient: e.target.value }))}
                                            >
                                                {GRADIENT_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Short Description (card)</label>
                                            <textarea
                                                rows={2}
                                                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-oxford font-medium focus:outline-none focus:border-sandstone resize-none"
                                                value={formData.description}
                                                onChange={e => setFormData((p: any) => ({ ...p, description: e.target.value }))}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Full Description (modal)</label>
                                            <textarea
                                                rows={5}
                                                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-oxford font-medium focus:outline-none focus:border-sandstone resize-none"
                                                value={formData.fullDescription}
                                                onChange={e => setFormData((p: any) => ({ ...p, fullDescription: e.target.value }))}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Key Features</label>
                                            <div className="space-y-2">
                                                {(formData.keyFeatures || [""]).map((f: string, idx: number) => (
                                                    <div key={idx} className="flex gap-2">
                                                        <input
                                                            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-oxford focus:outline-none focus:border-sandstone"
                                                            value={f}
                                                            onChange={e => updateFeature(idx, e.target.value)}
                                                            placeholder={`Feature ${idx + 1}`}
                                                        />
                                                        <button onClick={() => removeFeature(idx)} className="text-red-400 hover:text-red-600">
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button onClick={addFeature} className="text-xs font-bold text-sandstone flex items-center gap-1 hover:text-oxford transition-colors">
                                                    <Plus size={14} /> Add Feature
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Activities</label>
                                            <textarea
                                                rows={2}
                                                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-oxford font-medium focus:outline-none focus:border-sandstone resize-none"
                                                value={formData.activities}
                                                onChange={e => setFormData((p: any) => ({ ...p, activities: e.target.value }))}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Learning Impact</label>
                                            <textarea
                                                rows={2}
                                                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-oxford font-medium focus:outline-none focus:border-sandstone resize-none"
                                                value={formData.impact}
                                                onChange={e => setFormData((p: any) => ({ ...p, impact: e.target.value }))}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="p-8 border-t border-gray-100 flex gap-4 sticky bottom-0 bg-white rounded-b-[2rem]">
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex-1 py-3 rounded-2xl bg-oxford text-white font-bold text-sm hover:bg-sandstone hover:text-oxford transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                    {saving ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Labs List */}
            <div className="bg-white rounded-3xl lg:rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-4 lg:p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Name</th>
                                {(institution === "college" || institution === "marudhar") && (
                                    <th className="p-4 lg:p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Icon</th>
                                )}
                                <th className="p-4 lg:p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Image</th>
                                <th className="p-4 lg:p-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="p-10 lg:p-20 text-center">
                                        <Loader2 className="animate-spin mx-auto text-sandstone" size={32} />
                                        <p className="text-sm text-gray-500 mt-4">Loading entries...</p>
                                    </td>
                                </tr>
                            ) : labs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-16 text-center">
                                        <Microscope className="mx-auto text-gray-200 mb-4" size={40} />
                                        <p className="text-gray-500 font-medium">No entries yet. Add one above!</p>
                                    </td>
                                </tr>
                            ) : labs.map((lab, i) => (
                                <motion.tr
                                    key={lab._id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="hover:bg-gray-50/50 transition-colors group"
                                >
                                    <td className="p-4 lg:p-6">
                                        <span className="font-bold text-sm text-oxford">{lab.name}</span>
                                        {institution === "college" && lab.description && (
                                            <p className="text-xs text-gray-400 mt-1 line-clamp-1">{lab.description}</p>
                                        )}
                                    </td>
                                    {(institution === "college" || institution === "marudhar") && (
                                        <td className="p-4 lg:p-6">
                                            <span className="px-2 py-1 bg-gray-100 text-[10px] font-black text-gray-400 rounded uppercase tracking-wider">{lab.icon}</span>
                                        </td>
                                    )}
                                    <td className="p-4 lg:p-6">
                                        {(institution === "college" ? lab.image : lab.img) ? (
                                            <img
                                                src={institution === "college" ? lab.image : lab.img}
                                                className="w-16 h-12 object-cover rounded-xl border border-gray-100"
                                                onError={e => (e.currentTarget.style.display = "none")}
                                            />
                                        ) : (
                                            <span className="text-gray-300 text-xs">No image</span>
                                        )}
                                    </td>
                                    <td className="p-4 lg:p-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(lab)}
                                                className="w-8 h-8 rounded-full bg-oxford/5 flex items-center justify-center text-oxford hover:bg-oxford hover:text-white transition-all"
                                                title="Edit"
                                            >
                                                <Edit3 size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(lab._id)}
                                                disabled={deletingId === lab._id}
                                                className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                                                title="Delete"
                                            >
                                                {deletingId === lab._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
