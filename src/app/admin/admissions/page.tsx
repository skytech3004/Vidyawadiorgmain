"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Trash2,
    Loader2,
    MessageSquare,
    Mail,
    Phone,
    GraduationCap,
    Calendar,
    Eye,
    CheckCircle2,
    Clock,
    MapPin,
    AlertCircle,
    FileText
} from "lucide-react";

export default function AdmissionsManagerPage() {
    const [admissions, setAdmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedAdmission, setSelectedAdmission] = useState<any>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fetchAdmissions = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/admissions");
            const data = await res.json();
            if (data.success) {
                setAdmissions(data.admissions);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmissions();
    }, []);

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/admin/admissions/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (data.success) {
                setAdmissions(admissions.map(adm => adm._id === id ? { ...adm, status } : adm));
                if (selectedAdmission?._id === id) setSelectedAdmission({ ...selectedAdmission, status });
            }
        } catch (error) {
            alert("Failed to update status.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this admission application?")) return;

        try {
            const res = await fetch(`/api/admin/admissions/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setAdmissions(admissions.filter(adm => adm._id !== id));
                if (selectedAdmission?._id === id) setSelectedAdmission(null);
            }
        } catch (error) {
            alert("Failed to delete admission.");
        }
    };

    const filteredAdmissions = admissions.filter(adm => {
        const matchesSearch = 
            adm.fullName?.toLowerCase().includes(search.toLowerCase()) ||
            adm.email?.toLowerCase().includes(search.toLowerCase()) ||
            adm.phone?.includes(search);
        
        const matchesFilter = filter === "all" || adm.status === filter;
        
        return matchesSearch && matchesFilter;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'new': return 'bg-red-50 text-red-500';
            case 'under_review': return 'bg-blue-50 text-blue-500';
            case 'approved': return 'bg-green-50 text-green-500';
            case 'rejected': return 'bg-gray-100 text-gray-500';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'new': return <Clock size={14} />;
            case 'under_review': return <Eye size={14} />;
            case 'approved': return <CheckCircle2 size={14} />;
            case 'rejected': return <AlertCircle size={14} />;
            default: return <Clock size={14} />;
        }
    };

    const stats = {
        total: admissions.length,
        new: admissions.filter(a => a.status === 'new').length,
        approved: admissions.filter(a => a.status === 'approved').length,
        rejected: admissions.filter(a => a.status === 'rejected').length,
    };

    return (
        <div className="space-y-6">
            {/* Header section with Stats & Search */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-oxford uppercase tracking-tighter">Admission Applications</h1>
                    <p className="text-gray-500 mt-1">Manage and track student admission requests</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {[
                        { id: 'all', label: 'All', icon: <FileText size={14}/>, count: stats.total },
                        { id: 'new', label: 'New', icon: <Clock size={14}/>, count: stats.new, color: 'text-blue-600 bg-blue-50' },
                        { id: 'approved', label: 'Approved', icon: <CheckCircle2 size={14}/>, count: stats.approved, color: 'text-green-600 bg-green-50' },
                        { id: 'rejected', label: 'Rejected', icon: <AlertCircle size={14}/>, count: stats.rejected, color: 'text-red-600 bg-red-50' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                filter === tab.id 
                                ? 'bg-oxford text-white shadow-lg' 
                                : 'bg-white border border-gray-100 text-gray-500 hover:border-sandstone'
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                            {tab.count > 0 && (
                                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] ${
                                    filter === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                                }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-sandstone transition-all text-sm"
                    />
                </div>
                <button 
                    onClick={fetchAdmissions}
                    className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-sandstone hover:text-oxford transition-all"
                >
                    <Loader2 className={loading ? "animate-spin" : ""} size={20} />
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50">
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Applicant</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Program</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <Loader2 className="animate-spin mx-auto text-sandstone" size={32} />
                                        <p className="text-sm text-gray-400 mt-4">Loading applications...</p>
                                    </td>
                                </tr>
                            ) : filteredAdmissions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Search className="text-gray-200" size={32} />
                                        </div>
                                        <p className="text-gray-500 font-bold">No applications found</p>
                                        <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or search term</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredAdmissions.map((adm) => (
                                    <motion.tr 
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={adm._id} 
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-bold text-oxford flex items-center gap-2">
                                                    {adm.fullName}
                                                    {adm.status === 'new' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"/>}
                                                </div>
                                                <div className="text-xs text-gray-400 flex items-center gap-3 mt-1">
                                                    <span className="flex items-center gap-1"><Mail size={10}/> {adm.email}</span>
                                                    <span className="flex items-center gap-1"><Phone size={10}/> {adm.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded inline-block">
                                                {adm.grade} - {adm.board}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs text-gray-500 flex items-center gap-1.5">
                                                <Calendar size={12} className="text-gray-400" />
                                                {new Date(adm.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(adm.status)}`}>
                                                {getStatusIcon(adm.status)}
                                                {adm.status.replace('_', ' ')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => {
                                                        setSelectedAdmission(adm);
                                                        setIsSidebarOpen(true);
                                                    }}
                                                    className="p-2 text-gray-400 hover:text-oxford hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 rounded-xl transition-all"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(adm._id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                    title="Delete"
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

            {/* Sidebar Overlay/Drawer */}
            <AnimatePresence>
                {isSidebarOpen && selectedAdmission && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-oxford/20 backdrop-blur-sm z-[60]"
                        />
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-[70] overflow-hidden flex flex-col"
                        >
                            <div className="p-8 border-b border-gray-50 flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-sandstone block mb-1">Application Details</span>
                                    <h2 className="text-2xl font-black text-oxford uppercase tracking-tight">{selectedAdmission.fullName}</h2>
                                    <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-bold ${getStatusStyle(selectedAdmission.status)}`}>
                                        {getStatusIcon(selectedAdmission.status)}
                                        <span className="uppercase tracking-widest">{selectedAdmission.status.replace('_', ' ')}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="p-2 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <Eye size={20} className="rotate-180" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                                {/* Important Fields */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</span>
                                        <p className="text-sm font-bold text-oxford flex items-center gap-2"><Mail size={14} className="text-sandstone"/> {selectedAdmission.email}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone Number</span>
                                        <p className="text-sm font-bold text-oxford flex items-center gap-2"><Phone size={14} className="text-sandstone"/> {selectedAdmission.phone}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Class & Board</span>
                                        <p className="text-sm font-bold text-oxford flex items-center gap-2"><GraduationCap size={14} className="text-sandstone"/> Grade {selectedAdmission.grade} ({selectedAdmission.board})</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Location</span>
                                        <p className="text-sm font-bold text-oxford flex items-center gap-2"><MapPin size={14} className="text-sandstone"/> {selectedAdmission.city}, {selectedAdmission.state}</p>
                                    </div>
                                </div>

                                <div className="p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-4">Applicant Message</span>
                                    <div className="relative">
                                        <MessageSquare className="absolute -top-6 -left-6 text-sandstone/10" size={64} />
                                        <p className="text-sm text-oxford leading-relaxed whitespace-pre-wrap relative z-10 font-medium">
                                            {selectedAdmission.message || <span className="text-gray-400 italic">No additional message provided.</span>}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-50">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-4">Change Status</span>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { id: 'under_review', label: 'Review', color: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white' },
                                            { id: 'approved', label: 'Approve', color: 'bg-green-50 text-green-600 border-green-100 hover:bg-green-600 hover:text-white' },
                                            { id: 'rejected', label: 'Reject', color: 'bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white' },
                                        ].map((btn) => (
                                            <button
                                                key={btn.id}
                                                disabled={selectedAdmission.status === btn.id}
                                                onClick={() => handleStatusUpdate(selectedAdmission._id, btn.id)}
                                                className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${btn.color}`}
                                            >
                                                {btn.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-gray-50/50 border-t border-gray-100">
                                <button 
                                    onClick={() => handleDelete(selectedAdmission._id)}
                                    className="w-full py-4 bg-white border border-red-100 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={16} />
                                    Permanently Delete
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
