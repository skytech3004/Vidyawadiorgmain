"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Trash2,
    Loader2,
    Trophy,
    Edit2,
    School,
    GraduationCap,
    Calendar,
    User as UserIcon
} from "lucide-react";
import Link from "next/link";

const classes = ["All", "X", "XII"];
const institutions = ["All", "LPS", "Marudhar"];

export default function ResultManagerPage() {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedClass, setSelectedClass] = useState("All");
    const [selectedInst, setSelectedInst] = useState("All");

    const fetchResults = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/results");
            const data = await res.json();
            if (data.success) {
                setResults(data.results);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this result?")) return;

        try {
            const res = await fetch(`/api/admin/results/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setResults(results.filter(item => item._id !== id));
            }
        } catch (error) {
            alert("Failed to delete result.");
        }
    };

    const filteredResults = results.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesClass = selectedClass === "All" || item.class === selectedClass;
        const matchesInst = selectedInst === "All" || item.institution === selectedInst;
        return matchesSearch && matchesClass && matchesInst;
    });

    return (
        <div className="space-y-8">
            {/* Header Actions */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search student..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors shadow-sm"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full no-scrollbar">
                        <div className="flex bg-gray-100 p-1 rounded-xl">
                            {classes.map(cl => (
                                <button
                                    key={cl}
                                    onClick={() => setSelectedClass(cl)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${selectedClass === cl
                                            ? "bg-white text-oxford shadow-sm"
                                            : "text-gray-400 hover:text-oxford"
                                        }`}
                                >
                                    {cl === "All" ? "All Classes" : `Class ${cl}`}
                                </button>
                            ))}
                        </div>

                        <div className="flex bg-gray-100 p-1 rounded-xl">
                            {institutions.map(inst => (
                                <button
                                    key={inst}
                                    onClick={() => setSelectedInst(inst)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${selectedInst === inst
                                            ? "bg-white text-oxford shadow-sm"
                                            : "text-gray-400 hover:text-oxford"
                                        }`}
                                >
                                    {inst}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <Link
                    href="/admin/results/new"
                    className="flex items-center gap-2 px-6 py-3 bg-oxford text-white rounded-2xl font-bold uppercase tracking-wider shadow-lg hover:bg-sandstone transition-colors group whitespace-nowrap"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    Add Result
                </Link>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Student</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Class & Year</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Percentage</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Institution</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <Loader2 className="animate-spin mx-auto text-sandstone" size={32} />
                                        <p className="text-sm text-gray-500 mt-4">Loading board toppers...</p>
                                    </td>
                                </tr>
                            ) : filteredResults.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Trophy className="text-gray-300" size={32} />
                                        </div>
                                        <p className="text-gray-500 font-medium">No results found.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredResults.map((item, i) => (
                                    <motion.tr
                                        key={item._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.03 }}
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-sandstone/10 flex items-center justify-center overflow-hidden flex-shrink-0 border border-sandstone/20">
                                                    {item.image ? (
                                                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <UserIcon className="text-sandstone" size={18} />
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-oxford block">{item.name}</span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.stream || "-"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-xs font-bold text-oxford">
                                                    <GraduationCap size={14} className="text-gray-400" />
                                                    Class {item.class}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-medium text-gray-400">
                                                    <Calendar size={12} />
                                                    Session {item.year}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 bg-sandstone text-oxford text-xs font-black rounded-lg shadow-sm">
                                                {item.percentage}%
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <School size={14} className="text-gray-400" />
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{item.institution}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/results/${item._id}`}
                                                    className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-100 shadow-sm text-oxford"
                                                >
                                                    <Edit2 size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 shadow-sm text-red-500"
                                                >
                                                    <Trash2 size={16} />
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
        </div>
    );
}
