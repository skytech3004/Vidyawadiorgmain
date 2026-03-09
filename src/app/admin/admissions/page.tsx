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
    const [selectedAdmission, setSelectedAdmission] = useState<any>(null);

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

    const filteredAdmissions = admissions.filter(adm =>
        adm.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        adm.email?.toLowerCase().includes(search.toLowerCase()) ||
        adm.phone?.includes(search)
    );

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

    return (
        <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-180px)]">
            {/* List Panel */}
            <div className="lg:col-span-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                <div className="p-6 border-b border-gray-50 bg-gray-50/30">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search applications..."
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
                    ) : filteredAdmissions.length === 0 ? (
                        <div className="p-10 text-center text-gray-400 text-sm">No applications found.</div>
                    ) : (
                        filteredAdmissions.map((adm) => (
                            <button
                                key={adm._id}
                                onClick={() => setSelectedAdmission(adm)}
                                className={`w-full text-left p-4 rounded-2xl border transition-all ${selectedAdmission?._id === adm._id
                                    ? "bg-oxford text-white border-oxford shadow-lg"
                                    : "bg-white border-gray-100 hover:border-sandstone hover:shadow-md"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${selectedAdmission?._id === adm._id ? "text-sandstone" : "text-gray-400"
                                        }`}>
                                        {adm.grade} - {adm.board}
                                    </span>
                                    {adm.status === "new" && (
                                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                    )}
                                </div>
                                <h4 className="font-bold text-sm line-clamp-1">{adm.fullName}</h4>
                                <p className={`text-[10px] mt-1 ${selectedAdmission?._id === adm._id ? "text-white/60" : "text-gray-400"}`}>
                                    {new Date(adm.createdAt).toLocaleDateString()}
                                </p>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Details Panel */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                {selectedAdmission ? (
                    <div className="flex flex-col h-full">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-start">
                            <div className="space-y-4">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-sandstone block mb-1">Applicant Name</span>
                                    <h3 className="text-3xl font-black text-oxford uppercase tracking-tight">{selectedAdmission.fullName}</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Mail size={16} className="text-sandstone" />
                                        {selectedAdmission.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone size={16} className="text-sandstone" />
                                        {selectedAdmission.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <GraduationCap size={16} className="text-sandstone" />
                                        Grade: {selectedAdmission.grade} ({selectedAdmission.board})
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin size={16} className="text-sandstone" />
                                        {selectedAdmission.city}, {selectedAdmission.state} ({selectedAdmission.pincode})
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleDelete(selectedAdmission._id)}
                                    className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                    title="Delete Application"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Additional Message</h4>
                            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 relative min-h-[150px]">
                                <MessageSquare className="absolute -top-3 -left-3 text-sandstone/20" size={48} />
                                <p className="text-oxford leading-relaxed whitespace-pre-wrap relative z-10 font-medium">
                                    {selectedAdmission.message || <span className="text-gray-400 italic">No additional message provided.</span>}
                                </p>
                            </div>
                        </div>

                        <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Status:</span>
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold ${getStatusStyle(selectedAdmission.status)}`}>
                                    {getStatusIcon(selectedAdmission.status)}
                                    <span className="uppercase tracking-widest">{selectedAdmission.status.replace('_', ' ')}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {selectedAdmission.status !== 'under_review' && (
                                    <button
                                        onClick={() => handleStatusUpdate(selectedAdmission._id, 'under_review')}
                                        className="px-4 py-2 bg-white border border-gray-200 text-oxford rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-sandstone transition-all shadow-sm"
                                    >
                                        Mark Reviewing
                                    </button>
                                )}
                                {selectedAdmission.status !== 'approved' && (
                                    <button
                                        onClick={() => handleStatusUpdate(selectedAdmission._id, 'approved')}
                                        className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                    >
                                        Approve
                                    </button>
                                )}
                                {selectedAdmission.status !== 'rejected' && (
                                    <button
                                        onClick={() => handleStatusUpdate(selectedAdmission._id, 'rejected')}
                                        className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                    >
                                        Reject
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-6">
                            <FileText className="text-gray-200" size={48} />
                        </div>
                        <h3 className="text-xl font-bold text-oxford">Select an application</h3>
                        <p className="text-gray-500 mt-2 max-w-xs">Choose an admission application from the list to view its details and update its status.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
