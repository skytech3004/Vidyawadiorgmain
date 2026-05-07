"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Trash2,
    Loader2,
    FileText,
    Mail,
    Phone,
    Briefcase,
    Calendar,
    Eye,
    CheckCircle2,
    Clock,
    Download
} from "lucide-react";
import ExcelExport from "@/components/admin/ExcelExport";

export default function CareerApplicationsPage() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedApp, setSelectedApp] = useState<any>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/career-applications");
            const data = await res.json();
            if (data.success) {
                setApplications(data.applications);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/admin/career-applications/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (data.success) {
                setApplications(applications.map(app => app._id === id ? { ...app, status } : app));
                if (selectedApp?._id === id) setSelectedApp({ ...selectedApp, status });
            }
        } catch (error) {
            alert("Failed to update status.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this application?")) return;
        try {
            const res = await fetch(`/api/admin/career-applications/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setApplications(applications.filter(app => app._id !== id));
                if (selectedApp?._id === id) setSelectedApp(null);
            }
        } catch (error) {
            alert("Failed to delete application.");
        }
    };

    const filteredApps = applications.filter(app => {
        const matchesSearch = 
            app.fullName?.toLowerCase().includes(search.toLowerCase()) ||
            app.email?.toLowerCase().includes(search.toLowerCase()) ||
            app.phone?.includes(search) ||
            app.jobTitle?.toLowerCase().includes(search.toLowerCase());
        
        const matchesFilter = filter === "all" || app.status === filter;
        return matchesSearch && matchesFilter;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'new': return 'bg-red-50 text-red-500';
            case 'reviewed': return 'bg-blue-50 text-blue-500';
            case 'shortlisted': return 'bg-green-50 text-green-500';
            case 'rejected': return 'bg-gray-100 text-gray-500';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-oxford uppercase tracking-tighter">Career Applications</h1>
                    <p className="text-gray-500 mt-1">Review and manage job applications from the careers portal</p>
                </div>
                
                <ExcelExport data={filteredApps} fileName="Career_Applications" sheetName="Applications" />
            </div>

            <div className="flex flex-wrap gap-2">
                {[
                    { id: 'all', label: 'All', icon: <FileText size={14}/> },
                    { id: 'new', label: 'New', icon: <Clock size={14}/> },
                    { id: 'reviewed', label: 'Reviewed', icon: <Eye size={14}/> },
                    { id: 'shortlisted', label: 'Shortlisted', icon: <CheckCircle2 size={14}/> },
                ].map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setFilter(t.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            filter === t.id ? 'bg-oxford text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-500'
                        }`}
                    >
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>

            <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email or job title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-sandstone transition-all text-sm"
                    />
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50">
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Applicant</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Position</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Exp</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan={5} className="py-10 text-center"><Loader2 className="animate-spin mx-auto text-sandstone" /></td></tr>
                            ) : filteredApps.map((app) => (
                                <tr key={app._id} className="hover:bg-gray-50/50 transition-colors group text-sm">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-oxford">{app.fullName}</div>
                                        <div className="text-[10px] text-gray-400">{app.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-600 truncate max-w-[150px] uppercase tracking-wider text-[10px]">{app.jobTitle}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{app.experience}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${getStatusStyle(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => { setSelectedApp(app); setIsSidebarOpen(true); }} className="p-2 text-gray-400 hover:text-oxford"><Eye size={18} /></button>
                                            <a href={app.resume} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-sandstone" title="View Resume"><Download size={18} /></a>
                                            <button onClick={() => handleDelete(app._id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {isSidebarOpen && selectedApp && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-oxford/20 backdrop-blur-sm z-[60]" />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-[70] p-8 flex flex-col">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-sandstone block mb-1">Career Application</span>
                                    <h2 className="text-2xl font-black text-oxford uppercase tracking-tight">{selectedApp.fullName}</h2>
                                    <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-bold ${getStatusStyle(selectedApp.status)}`}>
                                        <span className="uppercase tracking-widest">{selectedApp.status}</span>
                                    </div>
                                </div>
                                <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-gray-50 text-gray-400 rounded-xl"><Eye size={20} className="rotate-180" /></button>
                            </div>

                            <div className="space-y-8 overflow-y-auto pr-4 no-scrollbar">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email</span>
                                        <p className="text-sm font-bold text-oxford">{selectedApp.email}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone</span>
                                        <p className="text-sm font-bold text-oxford">{selectedApp.phone}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Position</span>
                                        <p className="text-sm font-bold text-oxford">{selectedApp.jobTitle}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Experience</span>
                                        <p className="text-sm font-bold text-oxford">{selectedApp.experience}</p>
                                    </div>
                                </div>

                                <a href={selectedApp.resume} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-sandstone/5 border border-sandstone/20 rounded-3xl hover:bg-sandstone/10 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-sandstone/20 rounded-xl flex items-center justify-center text-sandstone"><Download size={24} /></div>
                                        <div><p className="text-sm font-black text-oxford uppercase">Resume / CV</p><p className="text-[10px] text-gray-500">Click to view or download</p></div>
                                    </div>
                                    <FileText className="text-sandstone opacity-0 group-hover:opacity-100 transition-all" size={24} />
                                </a>

                                <div className="pt-4 border-t border-gray-50">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-4">Update Status</span>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['reviewed', 'shortlisted', 'rejected'].map(s => (
                                            <button key={s} onClick={() => handleStatusUpdate(selectedApp._id, s)} disabled={selectedApp.status === s} className={`py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all ${selectedApp.status === s ? 'opacity-30' : 'bg-gray-50 hover:bg-oxford hover:text-white'}`}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
