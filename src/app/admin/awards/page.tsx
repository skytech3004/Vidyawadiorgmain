"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Plus, Edit2, Trash2, X, ImagePlus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import BulkImageUpload from "@/components/admin/BulkImageUpload";

interface AwardItem {
    _id: string;
    title: string;
    organization: string;
    year: string;
    images: string[];
    order: number;
    createdAt: string;
}

export default function AwardsAdminPage() {
    const [items, setItems] = useState<AwardItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        _id: "",
        title: "",
        organization: "",
        year: "",
        images: [] as string[],
        order: "0",
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/awards");
            const data = await res.json();
            if (data.success) {
                setItems(data.awards);
            } else {
                toast.error("Failed to load awards");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error loading awards");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (item?: AwardItem) => {
        if (item) {
            setFormData({
                _id: item._id,
                title: item.title,
                organization: item.organization,
                year: item.year,
                images: item.images || [],
                order: String(item.order ?? 0),
            });
        } else {
            setFormData({
                _id: "",
                title: "",
                organization: "",
                year: "",
                images: [],
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
            const url = isEditing ? `/api/admin/awards/${formData._id}` : "/api/admin/awards";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: formData.title,
                    organization: formData.organization,
                    year: formData.year,
                    images: formData.images,
                    order: parseInt(formData.order, 10) || 0,
                }),
            });

            const data = await res.json();
            if (data.success) {
                toast.success(isEditing ? "Award updated!" : "Award created!");
                setIsModalOpen(false);
                fetchItems();
            } else {
                toast.error(data.error || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error saving award");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this award?")) return;

        try {
            const res = await fetch(`/api/admin/awards/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                toast.success("Award deleted");
                fetchItems();
            } else {
                toast.error(data.error || "Failed to delete");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting award");
        }
    };

    const appendImages = (urls: string[]) => {
        setFormData((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    };

    const removeImage = (index: number) => {
        setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    return (
        <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
            <Toaster position="top-right" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-oxford mb-2">Awards Manager</h1>
                    <p className="text-gray-500 font-medium">Manage the homepage award spotlight and its image carousel</p>
                    <p className="mt-2 text-xs text-gray-400 font-medium">
                        Tip: lower `Order` values appear first on the homepage. If two items share the same order, the newest entry wins.
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-sandstone hover:bg-oxford text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
                >
                    <Plus size={20} />
                    Add Award
                </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-oxford text-white">
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Preview</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Title</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Organization</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Order</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-gray-400">Loading awards...</td>
                                </tr>
                            ) : items.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-gray-400 flex flex-col items-center justify-center">
                                        <Trophy size={48} className="text-gray-200 mb-4" />
                                        <p>No awards found</p>
                                    </td>
                                </tr>
                            ) : (
                                items.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-6">
                                            <div className="w-24 h-16 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 relative">
                                                {item.images?.[0] ? (
                                                    <Image
                                                        src={item.images[0]}
                                                        alt={item.title}
                                                        fill
                                                        unoptimized
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <ImagePlus size={20} />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6 font-bold text-oxford">{item.title}</td>
                                        <td className="p-6 text-sm text-gray-600">
                                            <div>{item.organization}</div>
                                            <div className="text-xs text-gray-400 mt-1">{item.year}</div>
                                        </td>
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
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                                <h3 className="text-2xl font-black text-oxford flex items-center gap-3">
                                    <Trophy className="text-sandstone" />
                                    {formData._id ? "Edit Award" : "Add Award"}
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
                                            placeholder="Awarded by Marwad Ratna"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Organization *</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.organization}
                                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                            placeholder="Excellence in Education"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Year *</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                            placeholder="2025"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Award Images *</label>
                                        <BulkImageUpload
                                            folder="awards"
                                            maxFiles={10}
                                            onUploadComplete={appendImages}
                                        />
                                        {formData.images.length > 0 && (
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                                                {formData.images.map((image, index) => (
                                                    <div key={`${image}-${index}`} className="relative rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 aspect-video group">
                                                        <Image src={image} alt={`Award ${index + 1}`} fill unoptimized className="object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
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
                                        {isSubmitting ? "Saving..." : "Save Award"}
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
