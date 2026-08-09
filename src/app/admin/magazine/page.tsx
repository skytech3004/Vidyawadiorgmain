"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    Plus,
    Edit2,
    Trash2,
    X,
    Calendar,
    ExternalLink,
    Eye,
    EyeOff,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import ImageUploadField from "@/components/admin/ImageUploadField";
import FileUploadField from "@/components/admin/FileUploadField";

interface MagazineIssue {
    _id: string;
    title: string;
    description: string;
    coverImage: string;
    pdfUrl: string;
    issueDate: string;
    volume: string;
    published: boolean;
}

export default function MagazineAdminPage() {
    const [magazines, setMagazines] = useState<MagazineIssue[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        _id: "",
        title: "",
        description: "",
        coverImage: "",
        pdfUrl: "",
        issueDate: new Date().toISOString().split("T")[0],
        volume: "",
        published: true,
    });

    useEffect(() => {
        fetchMagazines();
    }, []);

    const fetchMagazines = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/magazine");
            const data = await res.json();
            if (data.success) {
                setMagazines(data.magazines);
            } else {
                toast.error("Failed to load magazines");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error loading magazines");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (issue?: MagazineIssue) => {
        if (issue) {
            setFormData({
                _id: issue._id,
                title: issue.title,
                description: issue.description || "",
                coverImage: issue.coverImage || "",
                pdfUrl: issue.pdfUrl,
                issueDate: issue.issueDate.split("T")[0],
                volume: issue.volume || "",
                published: issue.published,
            });
        } else {
            setFormData({
                _id: "",
                title: "",
                description: "",
                coverImage: "",
                pdfUrl: "",
                issueDate: new Date().toISOString().split("T")[0],
                volume: "",
                published: true,
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.pdfUrl) {
            toast.error("Please upload a PDF");
            return;
        }

        setIsSubmitting(true);
        try {
            const isEditing = !!formData._id;
            const url = isEditing
                ? `/api/admin/magazine/${formData._id}`
                : "/api/admin/magazine";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success) {
                toast.success(isEditing ? "Updated successfully!" : "Created successfully!");
                setIsModalOpen(false);
                fetchMagazines();
            } else {
                toast.error(data.error || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error saving magazine");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this magazine issue?")) return;

        try {
            const res = await fetch(`/api/admin/magazine/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                toast.success("Deleted successfully");
                fetchMagazines();
            } else {
                toast.error("Failed to delete");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting magazine");
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
            <Toaster position="top-right" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-oxford mb-2">Magazine</h1>
                    <p className="text-gray-500 font-medium">
                        Upload and manage school magazine issues
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-sandstone hover:bg-oxford text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
                >
                    <Plus size={20} />
                    Add Issue
                </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-oxford text-white">
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">
                                    Cover
                                </th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">
                                    Issue
                                </th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">
                                    Date
                                </th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">
                                    Status
                                </th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px] text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-gray-400">
                                        Loading magazines...
                                    </td>
                                </tr>
                            ) : magazines.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-gray-400">
                                        <div className="flex flex-col items-center justify-center">
                                            <BookOpen size={48} className="text-gray-200 mb-4" />
                                            <p>No magazine issues yet</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                magazines.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-6">
                                            <div className="w-14 h-20 rounded-lg bg-gray-100 overflow-hidden border border-gray-100">
                                                {item.coverImage ? (
                                                    <img
                                                        src={item.coverImage}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <BookOpen
                                                            size={18}
                                                            className="text-gray-300"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="font-bold text-oxford">{item.title}</div>
                                            {item.volume && (
                                                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-bold">
                                                    {item.volume}
                                                </div>
                                            )}
                                            {item.pdfUrl && (
                                                <a
                                                    href={item.pdfUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[10px] text-sandstone hover:underline flex items-center gap-1 mt-1 font-bold uppercase tracking-widest"
                                                >
                                                    View PDF <ExternalLink size={10} />
                                                </a>
                                            )}
                                        </td>
                                        <td className="p-6">
                                            <div className="text-sm text-gray-600 flex items-center gap-1.5">
                                                <Calendar size={14} className="text-sandstone" />
                                                {new Date(item.issueDate).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                                    item.published
                                                        ? "bg-teal-50 text-teal-700"
                                                        : "bg-gray-100 text-gray-500"
                                                }`}
                                            >
                                                {item.published ? (
                                                    <Eye size={12} />
                                                ) : (
                                                    <EyeOff size={12} />
                                                )}
                                                {item.published ? "Published" : "Draft"}
                                            </span>
                                        </td>
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
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                                <h3 className="text-2xl font-black text-oxford flex items-center gap-3">
                                    <BookOpen className="text-sandstone" />
                                    {formData._id ? "Edit Issue" : "Add Issue"}
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="p-8 flex-1 overflow-y-auto space-y-6"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Title *
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({ ...formData, title: e.target.value })
                                            }
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                            placeholder="e.g. Vidyawadi Annual Magazine 2026"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Volume / Issue
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.volume}
                                            onChange={(e) =>
                                                setFormData({ ...formData, volume: e.target.value })
                                            }
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                            placeholder="e.g. Vol. XII"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Issue Date *
                                        </label>
                                        <input
                                            required
                                            type="date"
                                            value={formData.issueDate}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    issueDate: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium resize-none h-24"
                                            placeholder="Short summary of this issue..."
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <ImageUploadField
                                            label="Cover Image"
                                            value={formData.coverImage}
                                            onChange={(url) =>
                                                setFormData({ ...formData, coverImage: url })
                                            }
                                            folder="magazine"
                                            description="Portrait cover recommended, under 2MB."
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <FileUploadField
                                            label="Magazine PDF *"
                                            value={formData.pdfUrl}
                                            onChange={(url) =>
                                                setFormData({ ...formData, pdfUrl: url })
                                            }
                                            folder="magazine"
                                            accept=".pdf"
                                            description="PDF only, under 50MB."
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.published}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        published: e.target.checked,
                                                    })
                                                }
                                                className="w-5 h-5 rounded border-gray-300 text-sandstone focus:ring-sandstone"
                                            />
                                            <span className="text-sm font-bold text-gray-700">
                                                Publish on website
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
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
                                        className="px-8 py-3 bg-sandstone hover:bg-oxford text-white rounded-xl font-bold transition-all shadow-md"
                                    >
                                        {isSubmitting ? "Saving..." : "Save Issue"}
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
