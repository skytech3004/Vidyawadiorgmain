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
import ExcelExport from "@/components/admin/ExcelExport";

type Tab = "contact" | "admission";

export default function UnifiedInquiryPage() {
    const [tab, setTab] = useState<Tab>("contact");
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [admissions, setAdmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [inqRes, admRes] = await Promise.all([
                fetch("/api/admin/inquiries"),
                fetch("/api/admin/admissions")
            ]);
            
            const inqData = await inqRes.json();
            const admData = await admRes.json();

            if (inqData.success) setInquiries(inqData.inquiries);
            if (admData.success) setAdmissions(admData.admissions);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusUpdate = async (id: string, status: string) => {
        const endpoint = tab === "contact" ? "inquiries" : "admissions";
        try {
            const res = await fetch(`/api/admin/${endpoint}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (data.success) {
                if (tab === "contact") {
                    setInquiries(inquiries.map(iq => iq._id === id ? { ...iq, status } : iq));
                } else {
                    setAdmissions(admissions.map(adm => adm._id === id ? { ...adm, status } : adm));
                }
                if (selectedItem?._id === id) setSelectedItem({ ...selectedItem, status });
            }
        } catch (error) {
            alert("Failed to update status.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(`Are you sure you want to delete this ${tab === 'contact' ? 'inquiry' : 'admission'}?`)) return;
        const endpoint = tab === "contact" ? "inquiries" : "admissions";
        try {
            const res = await fetch(`/api/admin/${endpoint}/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                if (tab === "contact") {
                    setInquiries(inquiries.filter(iq => iq._id !== id));
                } else {
                    setAdmissions(admissions.filter(adm => adm._id !== id));
                }
                if (selectedItem?._id === id) setSelectedItem(null);
            }
        } catch (error) {
            alert("Failed to delete.");
        }
    };

    const currentData = tab === "contact" ? inquiries : admissions;

    const filteredData = currentData.filter(item => {
        const name = tab === "contact" ? item.name : item.fullName;
        const matchesSearch = 
            name?.toLowerCase().includes(search.toLowerCase()) ||
            item.email?.toLowerCase().includes(search.toLowerCase()) ||
            item.phone?.includes(search) ||
            (tab === "contact" && item.subject?.toLowerCase().includes(search.toLowerCase()));
        
        const matchesFilter = filter === "all" || item.status === filter;
        return matchesSearch && matchesFilter;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'new': return 'bg-red-50 text-red-500';
            case 'read':
            case 'under_review': return 'bg-blue-50 text-blue-500';
            case 'resolved':
            case 'approved': return 'bg-green-50 text-green-500';
            case 'rejected': return 'bg-gray-100 text-gray-500';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'new': return <Clock size={14} />;
            case 'read':
            case 'under_review': return <Eye size={14} />;
            case 'resolved':
            case 'approved': return <CheckCircle2 size={14} />;
            case 'rejected': return <AlertCircle size={14} />;
            default: return <Clock size={14} />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-oxford uppercase tracking-tighter">
                        {tab === 'contact' ? 'Contact Inquiries' : 'Admission Applications'}
                    </h1>
                    <p className="text-gray-500 mt-1">
                        {tab === 'contact' ? 'Review messages from website visitors' : 'Manage student admission requests'}
                    </p>
                </div>
                
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex bg-gray-100 p-1 rounded-2xl border border-gray-200">
                        <button
                            onClick={() => { setTab("contact"); setFilter("all"); setSearch(""); }}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === "contact" ? "bg-white text-oxford shadow-sm" : "text-gray-400 hover:text-oxford"}`}
                        >
                            Contact
                        </button>
                        <button
                            onClick={() => { setTab("admission"); setFilter("all"); setSearch(""); }}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === "admission" ? "bg-white text-oxford shadow-sm" : "text-gray-400 hover:text-oxford"}`}
                        >
                            Admissions
                        </button>
                    </div>

                    <ExcelExport 
                        data={filteredData} 
                        fileName={tab === 'contact' ? 'Contact_Inquiries' : 'Admission_Applications'} 
                        sheetName={tab === 'contact' ? 'Messages' : 'Applications'}
                    />
                </div>
            </div>

            {/* Quick Stats Tabs */}
            <div className="flex flex-wrap gap-2">
                {[
                    { id: 'all', label: 'All', icon: <FileText size={14}/> },
                    { id: 'new', label: 'New', icon: <Clock size={14}/> },
                    ...(tab === 'contact' 
                        ? [
                            { id: 'read', label: 'Read', icon: <Eye size={14}/> },
                            { id: 'resolved', label: 'Resolved', icon: <CheckCircle2 size={14}/> }
                          ]
                        : [
                            { id: 'under_review', label: 'Review', icon: <Eye size={14}/> },
                            { id: 'approved', label: 'Approved', icon: <CheckCircle2 size={14}/> },
                            { id: 'rejected', label: 'Rejected', icon: <AlertCircle size={14}/> }
                          ]
                    )
                ].map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setFilter(t.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            filter === t.id 
                            ? 'bg-oxford text-white shadow-lg' 
                            : 'bg-white border border-gray-100 text-gray-500 hover:border-sandstone'
                        }`}
                    >
                        {t.icon}
                        {t.label}
                        {currentData.filter(d => t.id === 'all' || d.status === t.id).length > 0 && (
                            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] ${
                                filter === t.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                            }`}>
                                {currentData.filter(d => t.id === 'all' || d.status === t.id).length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Search Toolbar */}
            <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-sandstone transition-all text-sm"
                    />
                </div>
                <button 
                    onClick={fetchData}
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
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Contact</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{tab === 'contact' ? 'Subject' : 'Program'}</th>
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
                                    </td>
                                </tr>
                            ) : filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <p className="text-gray-500 font-bold">No records found</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((item) => (
                                    <motion.tr 
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={item._id} 
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-bold text-oxford flex items-center gap-2">
                                                    {tab === 'contact' ? item.name : item.fullName}
                                                    {item.status === 'new' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"/>}
                                                </div>
                                                <div className="text-xs text-gray-400 flex items-center gap-3 mt-1">
                                                    <span className="flex items-center gap-1"><Mail size={10}/> {item.email}</span>
                                                    <span className="flex items-center gap-1"><Phone size={10}/> {item.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs font-bold text-gray-600 truncate max-w-[200px]">
                                                {tab === 'contact' ? item.subject : `${item.grade} - ${item.board}`}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(item.status)}`}>
                                                {getStatusIcon(item.status)}
                                                {item.status.replace('_', ' ')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => { setSelectedItem(item); setIsSidebarOpen(true); }}
                                                    className="p-2 text-gray-400 hover:text-oxford hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 rounded-xl transition-all"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(item._id)}
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
                {isSidebarOpen && selectedItem && (
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
                                    <span className="text-[10px] font-black uppercase tracking-widest text-sandstone block mb-1">{tab === 'contact' ? 'Inquiry Detail' : 'Application Detail'}</span>
                                    <h2 className="text-2xl font-black text-oxford uppercase tracking-tight">{tab === 'contact' ? selectedItem.name : selectedItem.fullName}</h2>
                                    <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-bold ${getStatusStyle(selectedItem.status)}`}>
                                        {getStatusIcon(selectedItem.status)}
                                        <span className="uppercase tracking-widest">{selectedItem.status.replace('_', ' ')}</span>
                                    </div>
                                </div>
                                <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-gray-50 text-gray-400 rounded-xl">
                                    <Eye size={20} className="rotate-180" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</span>
                                        <p className="text-sm font-bold text-oxford flex items-center gap-2"><Mail size={14} className="text-sandstone"/> {selectedItem.email}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone Number</span>
                                        <p className="text-sm font-bold text-oxford flex items-center gap-2"><Phone size={14} className="text-sandstone"/> {selectedItem.phone}</p>
                                    </div>
                                    {tab === 'admission' && (
                                        <>
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Class & Board</span>
                                                <p className="text-sm font-bold text-oxford"><GraduationCap size={14} className="text-sandstone inline mr-2"/> Grade {selectedItem.grade} ({selectedItem.board})</p>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Location</span>
                                                <p className="text-sm font-bold text-oxford"><MapPin size={14} className="text-sandstone inline mr-2"/> {selectedItem.city}, {selectedItem.state}</p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-4">Message Content</span>
                                    <p className="text-sm text-oxford leading-relaxed whitespace-pre-wrap font-medium">
                                        {selectedItem.message || "No message provided."}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-gray-50">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-4">Manage Status</span>
                                    <div className="grid grid-cols-2 gap-3">
                                        {(tab === 'contact' 
                                            ? [
                                                { id: 'read', label: 'Mark Read', color: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white' },
                                                { id: 'resolved', label: 'Resolve', color: 'bg-green-50 text-green-600 border-green-100 hover:bg-green-600 hover:text-white' },
                                              ]
                                            : [
                                                { id: 'under_review', label: 'Review', color: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white' },
                                                { id: 'approved', label: 'Approve', color: 'bg-green-50 text-green-600 border-green-100 hover:bg-green-600 hover:text-white' },
                                                { id: 'rejected', label: 'Reject', color: 'bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white' },
                                              ]
                                        ).map((btn) => (
                                            <button
                                                key={btn.id}
                                                disabled={selectedItem.status === btn.id}
                                                onClick={() => handleStatusUpdate(selectedItem._id, btn.id)}
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
                                    onClick={() => handleDelete(selectedItem._id)}
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
