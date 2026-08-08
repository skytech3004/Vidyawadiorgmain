"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Trash2,
    Loader2,
    Mail,
    Phone,
    GraduationCap,
    Calendar,
    Eye,
    CheckCircle2,
    AlertCircle,
    Building2,
    MapPin,
    User
} from "lucide-react";

export default function AdminAlumniPage() {
    const [alumni, setAlumni] = useState<Array<{ _id: string; fullName: string; email: string; phone: string; passingYear: string; course: string; currentOrganization?: string; currentDesignation?: string; city?: string; message?: string; createdAt: string }>>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedAlumnus, setSelectedAlumnus] = useState<{ _id: string; fullName: string; email: string; phone: string; passingYear: string; course: string; currentOrganization?: string; currentDesignation?: string; city?: string; message?: string; createdAt: string } | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [banner, setBanner] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const fetchAlumni = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/alumni");
            const data = await res.json();
            if (data.success) {
                setAlumni(data.alumni);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlumni();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this alumni record?")) return;

        try {
            const res = await fetch(`/api/admin/alumni/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setAlumni(alumni.filter(a => a._id !== id));
                if (selectedAlumnus?._id === id) setSelectedAlumnus(null);
                setBanner({ type: "success", text: "Alumni record deleted successfully." });
                setTimeout(() => setBanner(null), 3000);
            } else {
                setBanner({ type: "error", text: data.error || "Failed to delete record" });
            }
        } catch {
            setBanner({ type: "error", text: "An error occurred while deleting" });
        }
    };

    const filteredAlumni = alumni.filter(a => {
        const matchesSearch =
            a.fullName?.toLowerCase().includes(search.toLowerCase()) ||
            a.email?.toLowerCase().includes(search.toLowerCase()) ||
            a.phone?.includes(search) ||
            a.course?.toLowerCase().includes(search.toLowerCase()) ||
            a.currentOrganization?.toLowerCase().includes(search.toLowerCase());

        return matchesSearch;
    });

    return (
        <div className="space-y-6">
            <AnimatePresence>
                {banner && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-8 rounded-2xl border px-4 py-3 flex items-center gap-3 text-sm font-bold ${banner.type === "success"
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-red-50 border-red-200 text-red-700"
                            }`}
                    >
                        {banner.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        {banner.text}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-oxford uppercase tracking-tighter">Alumni Management</h1>
                    <p className="text-gray-500 mt-1">View and manage alumni registrations</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                        Total: {alumni.length}
                    </span>
                </div>
            </div>

            {/* Search Toolbar */}
            <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, course, or organization..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-sandstone transition-all text-sm"
                    />
                </div>
                <button
                    onClick={fetchAlumni}
                    className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-sandstone hover:text-oxford transition-all"
                >
                    <Loader2 className={loading ? "animate-spin" : ""} size={20} />
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50">
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Alumnus</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Course</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Passing Year</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Organization</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date</th>
                                <th className="px-6 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center">
                                        <Loader2 className="animate-spin mx-auto text-sandstone" size={32} />
                                    </td>
                                </tr>
                            ) : filteredAlumni.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center">
                                        <p className="text-gray-500 font-bold">No alumni records found</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredAlumni.map((a) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={a._id}
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-bold text-oxford flex items-center gap-2">
                                                    {a.fullName}
                                                </div>
                                                <div className="text-xs text-gray-400 flex items-center gap-3 mt-1">
                                                    <span className="flex items-center gap-1"><Mail size={10} /> {a.email}</span>
                                                    <span className="flex items-center gap-1"><Phone size={10} /> {a.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs font-bold text-gray-600 truncate max-w-[180px]">
                                                {a.course}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500">
                                            {a.passingYear}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs font-bold text-gray-600 truncate max-w-[180px]">
                                                {a.currentOrganization || "-"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500">
                                            {new Date(a.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedAlumnus(a);
                                                        setIsSidebarOpen(true);
                                                    }}
                                                    className="p-2 text-gray-400 hover:text-oxford hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 rounded-xl transition-all"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(a._id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && selectedAlumnus && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-oxford/20 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-[70] overflow-hidden flex flex-col"
                        >
                            <div className="p-8 border-b border-gray-50 flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-sandstone block mb-1">Alumni Details</span>
                                    <h2 className="text-2xl font-black text-oxford uppercase tracking-tight">{selectedAlumnus.fullName}</h2>
                                </div>
                                <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-gray-50 text-gray-400 rounded-xl">
                                    <Eye size={20} className="rotate-180" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</span>
                                        <p className="text-sm font-bold text-oxford flex items-center gap-2"><Mail size={14} className="text-sandstone" /> {selectedAlumnus.email}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone Number</span>
                                        <p className="text-sm font-bold text-oxford flex items-center gap-2"><Phone size={14} className="text-sandstone" /> {selectedAlumnus.phone}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Passing Year</span>
                                        <p className="text-sm font-bold text-oxford flex items-center gap-2"><Calendar size={14} className="text-sandstone" /> {selectedAlumnus.passingYear}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Course / Program</span>
                                        <p className="text-sm font-bold text-oxford flex items-center gap-2"><GraduationCap size={14} className="text-sandstone" /> {selectedAlumnus.course}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Organization</span>
                                        <p className="text-sm font-bold text-oxford flex items-center gap-2"><Building2 size={14} className="text-sandstone" /> {selectedAlumnus.currentOrganization || "-"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Designation</span>
                                        <p className="text-sm font-bold text-oxford flex items-center gap-2"><User size={14} className="text-sandstone" /> {selectedAlumnus.currentDesignation || "-"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">City</span>
                                        <p className="text-sm font-bold text-oxford flex items-center gap-2"><MapPin size={14} className="text-sandstone" /> {selectedAlumnus.city || "-"}</p>
                                    </div>
                                </div>

                                {selectedAlumnus.message && (
                                    <div className="p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-4">Message / Additional Information</span>
                                        <p className="text-sm text-oxford leading-relaxed whitespace-pre-wrap font-medium">
                                            {selectedAlumnus.message}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="p-8 bg-gray-50/50 border-t border-gray-100">
                                <button
                                    onClick={() => handleDelete(selectedAlumnus._id)}
                                    className="w-full py-4 bg-white border border-red-100 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={16} />
                                    Delete Record
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
