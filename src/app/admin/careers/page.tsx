"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, Briefcase, Search, CheckCircle2, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import CareerForm from "@/components/admin/CareerForm";

export default function AdminCareersPage() {
    const [careers, setCareers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCareer, setEditingCareer] = useState<any>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchCareers = async () => {
        try {
            const res = await fetch("/api/admin/careers");
            const data = await res.json();
            if (res.ok) {
                setCareers(data);
            }
        } catch (error) {
            toast.error("Failed to fetch careers");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCareers();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this job posting?")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/admin/careers/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            toast.success("Career deleted successfully");
            fetchCareers();
        } catch (error) {
            toast.error("Error deleting career");
        } finally {
            setDeletingId(null);
        }
    };

    const filteredCareers = careers.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sandstone/10 text-sandstone rounded-xl flex items-center justify-center">
                        <Briefcase size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-oxford">Careers Management</h1>
                        <p className="text-gray-500 font-medium">Manage job postings and opportunities</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setEditingCareer(null);
                        setIsFormOpen(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-oxford text-white rounded-xl hover:bg-oxford-light transition-all font-bold shadow-md shadow-oxford/20"
                >
                    <Plus size={20} />
                    Add Career
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-64 gap-3 text-sandstone">
                            <Loader2 size={32} className="animate-spin" />
                            <p className="text-sm font-bold text-gray-500">Loading careers...</p>
                        </div>
                    ) : filteredCareers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
                            <Briefcase size={48} className="text-gray-300" />
                            <p className="text-lg font-medium text-gray-500">No careers found</p>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="text-sandstone hover:underline text-sm font-bold"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="p-4 text-sm font-bold text-oxford">Title</th>
                                    <th className="p-4 text-sm font-bold text-oxford">Category</th>
                                    <th className="p-4 text-sm font-bold text-oxford">Status</th>
                                    <th className="p-4 text-sm font-bold text-oxford text-center">Order</th>
                                    <th className="p-4 text-sm font-bold text-oxford text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredCareers.map((career) => (
                                    <tr key={career._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-oxford">{career.title}</div>
                                            {career.subjects && (
                                                <div className="text-sm text-gray-500 truncate max-w-xs">{career.subjects}</div>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">
                                                {career.category}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {career.isActive ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-200">
                                                    <CheckCircle2 size={14} /> Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold border border-gray-200">
                                                    <XCircle size={14} /> Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-center font-medium text-gray-500">
                                            {career.order}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingCareer(career);
                                                        setIsFormOpen(true);
                                                    }}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(career._id)}
                                                    disabled={deletingId === career._id}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    {deletingId === career._id ? (
                                                        <Loader2 size={18} className="animate-spin" />
                                                    ) : (
                                                        <Trash2 size={18} />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isFormOpen && (
                    <CareerForm
                        career={editingCareer}
                        onClose={() => setIsFormOpen(false)}
                        onSuccess={() => {
                            setIsFormOpen(false);
                            fetchCareers();
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
