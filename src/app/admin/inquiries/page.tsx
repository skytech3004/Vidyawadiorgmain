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
    Clock
} from "lucide-react";

export default function InquiryManagerPage() {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/inquiries");
            const data = await res.json();
            if (data.success) {
                setInquiries(data.inquiries);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/admin/inquiries/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (data.success) {
                setInquiries(inquiries.map(iq => iq._id === id ? { ...iq, status } : iq));
                if (selectedInquiry?._id === id) setSelectedInquiry({ ...selectedInquiry, status });
            }
        } catch (error) {
            alert("Failed to update status.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this inquiry?")) return;

        try {
            const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setInquiries(inquiries.filter(iq => iq._id !== id));
                if (selectedInquiry?._id === id) setSelectedInquiry(null);
            }
        } catch (error) {
            alert("Failed to delete inquiry.");
        }
    };

    const filteredInquiries = inquiries.filter(iq =>
        iq.fullName.toLowerCase().includes(search.toLowerCase()) ||
        iq.email.toLowerCase().includes(search.toLowerCase()) ||
        iq.phone.includes(search)
    );

    return (
        <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-180px)]">
            {/* List Panel */}
            <div className="lg:col-span-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                <div className="p-6 border-b border-gray-50 bg-gray-50/30">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors shadow-sm text-sm"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                    {loading ? (
                        <div className="p-10 text-center">
                            <Loader2 className="animate-spin mx-auto text-sandstone" size={24} />
                        </div>
                    ) : filteredInquiries.length === 0 ? (
                        <div className="p-10 text-center text-gray-400 text-sm">No inquiries found.</div>
                    ) : (
                        filteredInquiries.map((iq) => (
                            <button
                                key={iq._id}
                                onClick={() => setSelectedInquiry(iq)}
                                className={`w-full text-left p-4 rounded-2xl border transition-all ${selectedInquiry?._id === iq._id
                                        ? "bg-oxford text-white border-oxford shadow-lg"
                                        : "bg-white border-gray-100 hover:border-sandstone hover:shadow-md"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${selectedInquiry?._id === iq._id ? "text-sandstone" : "text-gray-400"
                                        }`}>
                                        {iq.grade}
                                    </span>
                                    {iq.status === "new" && (
                                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                    )}
                                </div>
                                <h4 className="font-bold text-sm line-clamp-1">{iq.fullName}</h4>
                                <p className={`text-[10px] mt-1 ${selectedInquiry?._id === iq._id ? "text-white/60" : "text-gray-400"}`}>
                                    {new Date(iq.createdAt).toLocaleDateString()} at {new Date(iq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Details Panel */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                {selectedInquiry ? (
                    <div className="flex flex-col h-full">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-black text-oxford uppercase tracking-tight">{selectedInquiry.fullName}</h3>
                                <div className="flex flex-wrap items-center gap-4 mt-2">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <Mail size={14} className="text-sandstone" />
                                        {selectedInquiry.email}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <Phone size={14} className="text-sandstone" />
                                        {selectedInquiry.phone}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <GraduationCap size={14} className="text-sandstone" />
                                        Grade {selectedInquiry.grade}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleDelete(selectedInquiry._id)}
                                    className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
                            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 relative">
                                <MessageSquare className="absolute -top-3 -left-3 text-sandstone/20" size={48} />
                                <p className="text-oxford leading-relaxed whitespace-pre-wrap relative z-10 font-medium">
                                    {selectedInquiry.message}
                                </p>
                            </div>
                        </div>

                        <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Status:</span>
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold ${selectedInquiry.status === 'new' ? 'bg-red-50 text-red-500' :
                                        selectedInquiry.status === 'read' ? 'bg-blue-50 text-blue-500' :
                                            'bg-green-50 text-green-500'
                                    }`}>
                                    {selectedInquiry.status === 'new' ? <Clock size={14} /> :
                                        selectedInquiry.status === 'read' ? <Eye size={14} /> :
                                            <CheckCircle2 size={14} />}
                                    <span className="uppercase tracking-widest">{selectedInquiry.status}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {selectedInquiry.status !== 'read' && (
                                    <button
                                        onClick={() => handleStatusUpdate(selectedInquiry._id, 'read')}
                                        className="px-6 py-3 bg-white border border-gray-100 text-oxford rounded-xl text-xs font-bold uppercase tracking-widest hover:border-sandstone transition-all shadow-sm"
                                    >
                                        Mark as Read
                                    </button>
                                )}
                                {selectedInquiry.status !== 'replied' && (
                                    <button
                                        onClick={() => handleStatusUpdate(selectedInquiry._id, 'replied')}
                                        className="px-6 py-3 bg-sandstone text-oxford rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-oxford hover:text-white transition-all shadow-lg"
                                    >
                                        Mark as Replied
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-6">
                            <Mail className="text-gray-200" size={48} />
                        </div>
                        <h3 className="text-xl font-bold text-oxford">Select an inquiry</h3>
                        <p className="text-gray-500 mt-2 max-w-xs">Choose a message from the list to view its details and manage status.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
