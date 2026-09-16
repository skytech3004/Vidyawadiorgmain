"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Edit2,
    Trash2,
    Save,
    X,
    Loader2,
    User,
    CheckCircle2,
    AlertCircle,
    Landmark,
    Upload,
    ArrowUpDown,
    Type
} from "lucide-react";

interface TrustMemberItem {
    _id: string;
    name: string;
    title: string;
    image: string;
    order: number;
}

export default function AdminTrustPage() {
    const [members, setMembers] = useState<TrustMemberItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [banner, setBanner] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const [form, setForm] = useState({
        name: "",
        title: "",
        image: "",
        order: 0,
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await fetch("/api/admin/trust");
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                setMembers(json.data);
            }
        } catch (err) {
            showBanner("error", "Failed to fetch trust members.");
        } finally {
            setLoading(false);
        }
    };

    const showBanner = (type: "success" | "error", text: string) => {
        setBanner({ type, text });
        setTimeout(() => setBanner(null), 4000);
    };

    const handleOpenAddModal = () => {
        setEditingId(null);
        setForm({ name: "", title: "", image: "", order: members.length + 1 });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (member: TrustMemberItem) => {
        setEditingId(member._id);
        setForm({
            name: member.name,
            title: member.title,
            image: member.image,
            order: member.order || 0,
        });
        setIsModalOpen(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            showBanner("error", "Image must be under 2MB.");
            return;
        }

        setUploading(true);
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("folder", "trust-members");

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: uploadData,
            });
            const data = await res.json();

            if (data.success) {
                setForm((prev) => ({ ...prev, image: data.url }));
                showBanner("success", "Image uploaded successfully.");
            } else {
                showBanner("error", data.error || "Upload failed");
            }
        } catch (err) {
            showBanner("error", "Network error uploading image");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || !form.title.trim()) {
            showBanner("error", "Please fill in both Name and Heading/Title.");
            return;
        }

        setSaving(true);
        try {
            const url = editingId ? `/api/admin/trust/${editingId}` : "/api/admin/trust";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const json = await res.json();

            if (json.success) {
                showBanner("success", editingId ? "Trust member updated successfully!" : "Trust member added successfully!");
                setIsModalOpen(false);
                fetchMembers();
            } else {
                showBanner("error", json.error || "Failed to save member");
            }
        } catch (err) {
            showBanner("error", "An error occurred while saving.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete ${name}?`)) return;

        try {
            const res = await fetch(`/api/admin/trust/${id}`, { method: "DELETE" });
            const json = await res.json();

            if (json.success) {
                showBanner("success", "Trust member deleted successfully.");
                fetchMembers();
            } else {
                showBanner("error", json.error || "Failed to delete");
            }
        } catch (err) {
            showBanner("error", "Network error deleting member.");
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
            {/* Header Sticky Bar */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-oxford tracking-tight flex items-center gap-3">
                            <Landmark className="text-sandstone" size={28} />
                            Trust Management
                        </h1>
                        <p className="text-gray-500 mt-1 font-medium">
                            Manage people, leaders, and trustees displayed in the first section of /about/trust.
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleOpenAddModal}
                        className="inline-flex shrink-0 items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-sandstone text-oxford font-black uppercase tracking-widest text-xs shadow-lg hover:bg-sandstone-dark transition-all"
                    >
                        <Plus size={18} />
                        Add Trust Member
                    </motion.button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-10">
                {/* Banner Notification */}
                <AnimatePresence>
                    {banner && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`mb-8 rounded-2xl border px-6 py-4 flex items-center gap-3 text-sm font-bold shadow-sm ${
                                banner.type === "success"
                                    ? "bg-green-50 border-green-200 text-green-700"
                                    : "bg-red-50 border-red-200 text-red-700"
                            }`}
                        >
                            {banner.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                            {banner.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Members Cards Grid */}
                {members.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-16 text-center border border-gray-100 shadow-sm">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-gray-400 mb-4">
                            <User size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-oxford mb-2">No Trust Members Added Yet</h3>
                        <p className="text-gray-500 font-medium max-w-md mx-auto mb-6">
                            Add members using the button above. They will appear as cards in the first section of the /about/trust page.
                        </p>
                        <button
                            onClick={handleOpenAddModal}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-oxford text-white font-bold hover:bg-oxford/90 transition-all text-sm"
                        >
                            <Plus size={18} />
                            Add First Member
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {members.map((member) => (
                            <div
                                key={member._id}
                                className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Member Image */}
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-6 border border-gray-100">
                                        {member.image ? (
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-slate-100">
                                                <User size={48} className="opacity-40 mb-2" />
                                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">No Image</span>
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 bg-oxford/80 backdrop-blur-md text-sandstone text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">
                                            Order: {member.order}
                                        </div>
                                    </div>

                                    {/* Title / Designation Tag */}
                                    <span className="inline-block px-3.5 py-1 rounded-full bg-sandstone/15 text-oxford text-xs font-black uppercase tracking-wider mb-2">
                                        {member.title}
                                    </span>

                                    {/* Name */}
                                    <h3 className="text-2xl font-black text-oxford mb-2">
                                        {member.name}
                                    </h3>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-6 mt-4 border-t border-gray-100 flex items-center gap-3 justify-end">
                                    <button
                                        onClick={() => handleOpenEditModal(member)}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 text-oxford font-bold text-xs hover:bg-sandstone hover:text-oxford transition-all"
                                    >
                                        <Edit2 size={14} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member._id, member.name)}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 font-bold text-xs hover:bg-red-600 hover:text-white transition-all"
                                    >
                                        <Trash2 size={14} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add / Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-oxford/50 backdrop-blur-md overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2.5rem] max-w-xl w-full p-8 shadow-2xl border border-gray-100 relative my-8"
                        >
                            <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
                                <div>
                                    <h2 className="text-2xl font-black text-oxford">
                                        {editingId ? "Edit Trust Member" : "Add New Trust Member"}
                                    </h2>
                                    <p className="text-xs text-gray-500 font-medium">
                                        Fill in details to display on `/about/trust` card section.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                                        <User size={15} className="text-sandstone" />
                                        Person Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="E.g. Shri Ramesh Kumar Jain"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all font-bold text-oxford"
                                    />
                                </div>

                                {/* Title / Heading Field */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                                        <Type size={15} className="text-sandstone" />
                                        Heading / Role Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        placeholder="E.g. President / Managing Trustee / Trustee"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all font-bold text-oxford"
                                    />
                                </div>

                                {/* Profile Image Upload */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                                        <Upload size={15} className="text-sandstone" />
                                        Profile Image
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border border-gray-200 shrink-0 relative flex items-center justify-center">
                                            {form.image ? (
                                                <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={32} className="text-gray-400 opacity-50" />
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-3 w-full">
                                            <input
                                                type="text"
                                                value={form.image}
                                                onChange={(e) => setForm({ ...form, image: e.target.value })}
                                                placeholder="Paste image URL..."
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-sandstone outline-none"
                                            />
                                            <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-oxford text-white rounded-xl text-xs font-bold hover:bg-oxford/90 transition-all w-full sm:w-auto">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageUpload}
                                                    disabled={uploading}
                                                />
                                                {uploading ? (
                                                    <Loader2 size={16} className="animate-spin" />
                                                ) : (
                                                    <Upload size={16} />
                                                )}
                                                <span>{uploading ? "Uploading..." : "Upload Profile Photo"}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Priority */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                                        <ArrowUpDown size={15} className="text-sandstone" />
                                        Display Order Priority
                                    </label>
                                    <input
                                        type="number"
                                        value={form.order}
                                        onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                                        placeholder="1"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone outline-none font-bold text-oxford"
                                    />
                                    <p className="text-[11px] text-gray-400 font-medium">Lower numbers appear first on the page (1, 2, 3...)</p>
                                </div>

                                {/* Modal Actions */}
                                <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-all text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-8 py-3 rounded-xl bg-sandstone text-oxford font-black uppercase tracking-wider text-xs hover:bg-sandstone-dark shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                        <span>{saving ? "Saving..." : "Save Member"}</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
