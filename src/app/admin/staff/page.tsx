"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    Trash2,
    Loader2,
    Users,
    Edit2,
    MoreVertical,
    School,
    User as UserIcon
} from "lucide-react";
import Link from "next/link";

const institutions = ["All", "LPS", "Marudhar", "College", "Hostel"];

export default function FacultyManagerPage() {
    const [faculty, setFaculty] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedInstitution, setSelectedInstitution] = useState("All");

    const fetchFaculty = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/staff");
            const data = await res.json();
            if (data.success) {
                setFaculty(data.faculty);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaculty();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this faculty member?")) return;

        try {
            const res = await fetch(`/api/admin/staff/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setFaculty(faculty.filter(member => member._id !== id));
            }
        } catch (error) {
            alert("Failed to delete member.");
        }
    };

    const filteredFaculty = faculty.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(search.toLowerCase()) ||
            member.designation.toLowerCase().includes(search.toLowerCase());
        const matchesInstitution = selectedInstitution === "All" || member.institution === selectedInstitution;
        return matchesSearch && matchesInstitution;
    });

    return (
        <div className="space-y-8">
            {/* Header Actions */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or designation..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors shadow-sm"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full no-scrollbar">
                        {institutions.map(inst => (
                            <button
                                key={inst}
                                onClick={() => setSelectedInstitution(inst)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${selectedInstitution === inst
                                        ? "bg-sandstone text-oxford shadow-md"
                                        : "bg-white text-gray-400 hover:text-oxford border border-gray-100"
                                    }`}
                            >
                                {inst === "All" ? "All Faculty" : inst}
                            </button>
                        ))}
                    </div>
                </div>

                <Link
                    href="/admin/staff/new"
                    className="flex items-center gap-2 px-6 py-3 bg-oxford text-white rounded-2xl font-bold uppercase tracking-wider shadow-lg hover:bg-sandstone transition-colors group whitespace-nowrap"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    Add Faculty
                </Link>
            </div>

            {/* Staff Table / List */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Member</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Designation</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Institution</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Order</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <Loader2 className="animate-spin mx-auto text-sandstone" size={32} />
                                        <p className="text-sm text-gray-500 mt-4">Loading school navigators...</p>
                                    </td>
                                </tr>
                            ) : filteredFaculty.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Users className="text-gray-300" size={32} />
                                        </div>
                                        <p className="text-gray-500 font-medium">No faculty members found.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredFaculty.map((member, i) => (
                                    <motion.tr
                                        key={member._id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.03 }}
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-oxford/5 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-100">
                                                    {member.image ? (
                                                        <img src={member.image} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <UserIcon className="text-oxford/20" size={18} />
                                                    )}
                                                </div>
                                                <span className="font-bold text-oxford">{member.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-xs text-gray-600 font-medium">{member.designation}</span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <School size={14} className="text-sandstone" />
                                                <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-black text-gray-400 rounded uppercase tracking-wider">
                                                    {member.institution}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-xs font-bold text-gray-400">{member.order}</span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/staff/${member._id}`}
                                                    className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-100 shadow-sm text-oxford"
                                                >
                                                    <Edit2 size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(member._id)}
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
