"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Plus, Edit2, Trash2, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import ImageUploadField from "@/components/admin/ImageUploadField";

interface FacilityItem {
    _id: string;
    title: string;
    description: string;
    image: string;
    icon: string;
    theme: string;
    features: string[];
    order: number;
    createdAt: string;
}

const ICON_OPTIONS = ["NC", "NT", "SL", "DL", "SC", "AC", "SD", "HL", "NS"];
const THEME_OPTIONS = ["bg-oxford", "bg-sandstone", "bg-teal-blue", "bg-oxford-dark", "bg-sandstone-dark"];

export default function FacilitiesAdminPage() {
    const [items, setItems] = useState<FacilityItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        _id: "",
        title: "",
        description: "",
        image: "",
        icon: "NC",
        theme: "bg-oxford",
        featuresText: "",
        order: "0",
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/facilities");
            const data = await res.json();
            if (data.success) {
                setItems(data.facilities);
            } else {
                toast.error("Failed to load facilities");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error loading facilities");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (item?: FacilityItem) => {
        if (item) {
            setFormData({
                _id: item._id,
                title: item.title,
                description: item.description,
                image: item.image,
                icon: item.icon || "NC",
                theme: item.theme || "bg-oxford",
                featuresText: (item.features || []).join(", "),
                order: String(item.order ?? 0),
            });
        } else {
            setFormData({
                _id: "",
                title: "",
                description: "",
                image: "",
                icon: "NC",
                theme: "bg-oxford",
                featuresText: "",
                order: "0",
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const isEditing = !!formData._id;
            const url = isEditing ? `/api/admin/facilities/${formData._id}` : "/api/admin/facilities";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    image: formData.image,
                    icon: formData.icon,
                    theme: formData.theme,
                    features: formData.featuresText
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    order: parseInt(formData.order, 10) || 0,
                }),
            });

            const data = await res.json();
            if (data.success) {
                toast.success(isEditing ? "Facility updated!" : "Facility created!");
                setIsModalOpen(false);
                fetchItems();
            } else {
                toast.error(data.error || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error saving facility");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this facility?")) return;

        try {
            const res = await fetch(`/api/admin/facilities/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                toast.success("Facility deleted");
                fetchItems();
            } else {
                toast.error(data.error || "Failed to delete");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting facility");
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
            <Toaster position="top-right" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-oxford mb-2">Facilities Manager</h1>
                    <p className="text-gray-500 font-medium">Manage homepage facilities shown in the main infrastructure section</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-sandstone hover:bg-oxford text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
                >
                    <Plus size={20} />
                    Add Facility
                </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-oxford text-white">
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Image</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Title</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Theme</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Order</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-gray-400">Loading facilities...</td>
                                </tr>
                            ) : items.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-gray-400 flex flex-col items-center justify-center">
                                        <Building2 size={48} className="text-gray-200 mb-4" />
                                        <p>No facilities found</p>
                                    </td>
                                </tr>
                            ) : (
                                items.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-6">
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 relative">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    unoptimized
                                                    className="object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="font-bold text-oxford">{item.title}</div>
                                            <div className="text-xs text-gray-400 mt-1 line-clamp-2 max-w-xl">{item.description}</div>
                                            <div className="text-[10px] text-sandstone font-black uppercase tracking-widest mt-2">
                                                {item.features?.join(" • ")}
                                            </div>
                                        </td>
                                        <td className="p-6 text-sm text-gray-600">{item.theme}</td>
                                        <td className="p-6 text-sm font-bold text-gray-500">{item.order}</td>
                                        <td className="p-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(item)}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
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

            <AnimatePresence>
                {isModalOpen && (
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
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                                <h3 className="text-2xl font-black text-oxford flex items-center gap-3">
                                    <Building2 className="text-sandstone" />
                                    {formData._id ? "Edit Facility" : "Add Facility"}
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 flex-1 overflow-y-auto space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                            placeholder="NCC Training Camp"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <ImageUploadField
                                            label="Facility Image *"
                                            value={formData.image}
                                            onChange={(url) => setFormData({ ...formData, image: url })}
                                            folder="facilities"
                                            description="Use a square or wide image. JPG, PNG, or WEBP under 2MB."
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                                        <textarea
                                            required
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium resize-none h-32"
                                            placeholder="Describe this facility..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Icon Label</label>
                                        <select
                                            value={formData.icon}
                                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                        >
                                            {ICON_OPTIONS.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Theme</label>
                                        <select
                                            value={formData.theme}
                                            onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                        >
                                            {THEME_OPTIONS.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Features</label>
                                        <input
                                            type="text"
                                            value={formData.featuresText}
                                            onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                            placeholder="Rifle Shooting, Leadership, Field Training"
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
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-8 py-3 bg-sandstone hover:bg-oxford text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
                                    >
                                        {isSubmitting ? "Saving..." : "Save Facility"}
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
