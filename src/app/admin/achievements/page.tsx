"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Plus, Edit2, Trash2, X, AlertCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface Achievement {
    _id: string;
    title: string;
    description: string;
    category: string;
    institution: string;
    year: string;
    order: number;
}

export default function AchievementsPage() {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAppModalOpen, setAppModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [filterInstitution, setFilterInstitution] = useState<string>("all");

    const [formData, setFormData] = useState({
        _id: "",
        title: "",
        description: "",
        category: "Sports",
        institution: "lps",
        year: "2024-25",
        order: "0"
    });

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/achievements");
            const data = await res.json();
            if (data.success) {
                setAchievements(data.achievements);
            } else {
                toast.error("Failed to load achievements");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error loading achievements");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (achievement?: Achievement) => {
        if (achievement) {
            setFormData({
                _id: achievement._id,
                title: achievement.title,
                description: achievement.description,
                category: achievement.category,
                institution: achievement.institution,
                year: achievement.year,
                order: achievement.order.toString()
            });
        } else {
            setFormData({
                _id: "",
                title: "",
                description: "",
                category: "Sports",
                institution: "lps",
                year: "2024-25",
                order: "0"
            });
        }
        setAppModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const isEditing = !!formData._id;
            const url = isEditing
                ? `/api/admin/achievements/${formData._id}`
                : "/api/admin/achievements";
            const method = isEditing ? "PUT" : "POST";

            const payloadData = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                institution: formData.institution,
                year: formData.year,
                order: parseInt(formData.order) || 0
            };

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payloadData),
            });

            const data = await res.json();

            if (data.success) {
                toast.success(isEditing ? "Achievement updated!" : "Achievement created!");
                setAppModalOpen(false);
                fetchAchievements();
            } else {
                toast.error(data.error || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error saving achievement");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this achievement?")) return;

        try {
            const res = await fetch(`/api/admin/achievements/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Achievement deleted");
                fetchAchievements();
            } else {
                toast.error("Failed to delete");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting achievement");
        }
    };

    const filteredAchievements = achievements.filter(ach =>
        filterInstitution === "all" ? true : ach.institution === filterInstitution
    );

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <Toaster position="top-right" />

            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-black text-oxford mb-2">Achievements Manager</h1>
                    <p className="text-gray-500 font-medium">Manage sports and other achievements for institutions</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-sandstone hover:bg-oxford text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl"
                >
                    <Plus size={20} />
                    Add Achievement
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 mb-8">
                <select
                    value={filterInstitution}
                    onChange={(e) => setFilterInstitution(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-sandstone/20 transition-all font-medium text-gray-700"
                >
                    <option value="all">All Institutions</option>
                    <option value="lps">Leeladevi (LPS)</option>
                    <option value="marudhar-balika-vidyapeeth">Marudhar</option>
                    <option value="sushiladevi">Sushiladevi (SPS)</option>
                </select>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-oxford text-white">
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Title / Competition</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Description / Result</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Institution</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Category</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-gray-400">Loading achievements...</td>
                                </tr>
                            ) : filteredAchievements.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-gray-400 flex flex-col items-center justify-center">
                                        <Trophy size={48} className="text-gray-200 mb-4" />
                                        <p>No achievements found</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredAchievements.map((ach) => (
                                    <tr key={ach._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-6 font-bold text-oxford">
                                            {ach.title}
                                            <div className="text-xs text-gray-400 font-normal">Order: {ach.order} • Year: {ach.year}</div>
                                        </td>
                                        <td className="p-6 text-sm  text-gray-600">{ach.description}</td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 bg-sandstone/50 text-gray-600 rounded-full text-xs font-bold uppercase">
                                                {ach.institution}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 bg-sandstone/50 text-oxford rounded-full text-xs font-bold">
                                                {ach.category}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(ach)}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(ach._id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isAppModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-oxford/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                                <h3 className="text-2xl font-black text-oxford flex items-center gap-3">
                                    <Trophy className="text-sandstone" />
                                    {formData._id ? "Edit Achievement" : "Add Achievement"}
                                </h3>
                                <button
                                    onClick={() => setAppModalOpen(false)}
                                    className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 flex-1 overflow-y-auto space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Title / Competition *</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                            placeholder="e.g. District Badminton (U-19)"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Institution *</label>
                                        <select
                                            required
                                            value={formData.institution}
                                            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                        >
                                            <option value="lps">Leeladevi (LPS)</option>
                                            <option value="marudhar-balika-vidyapeeth">Marudhar</option>
                                            <option value="sushiladevi">Sushiladevi (SPS)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description / Result *</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium resize-none h-32"
                                        placeholder="e.g. 2nd position. One selected for state."
                                    />
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                        <input
                                            type="text"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                            placeholder="Sports"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Year</label>
                                        <input
                                            type="text"
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                            placeholder="2024-25"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Order</label>
                                        <input
                                            type="number"
                                            value={formData.order}
                                            onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100 flex justify-end gap-3 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setAppModalOpen(false)}
                                        className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-8 py-3 bg-sandstone hover:bg-oxford text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
                                    >
                                        {isSubmitting ? "Saving..." : "Save Achievement"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
