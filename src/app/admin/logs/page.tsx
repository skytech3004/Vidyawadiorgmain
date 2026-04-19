"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Activity, 
    Search, 
    Calendar, 
    User as UserIcon, 
    Shield, 
    Globe, 
    Monitor,
    ChevronLeft,
    ChevronRight,
    Loader2,
    RefreshCw,
    Clock,
    FileText,
    Settings as SettingsIcon,
    LogIn,
    LogOut,
    Upload as UploadIcon,
    AlertCircle
} from "lucide-react";

interface ActivityLog {
    _id: string;
    username: string;
    action: string;
    details: string;
    ip: string;
    userAgent: string;
    createdAt: string;
}

export default function LogsPage() {
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [actionFilter, setActionFilter] = useState("all");

    const fetchLogs = async (p = page) => {
        setLoading(true);
        try {
            let url = `/api/admin/logs?page=${p}&limit=50`;
            if (search) url += `&username=${search}`;
            if (actionFilter !== "all") url += `&action=${actionFilter}`;
            
            const res = await fetch(url);
            const data = await res.json();
            
            if (data.success) {
                setLogs(data.logs);
                setTotalPages(data.pagination.pages);
                setPage(data.pagination.page);
            }
        } catch (error) {
            console.error("Fetch logs error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs(1);
    }, [search, actionFilter]);

    const getActionIcon = (action: string) => {
        switch (action) {
            case 'LOGIN': return <LogIn size={16} className="text-green-500" />;
            case 'LOGOUT': return <LogOut size={16} className="text-gray-500" />;
            case 'UPLOAD': return <UploadIcon size={16} className="text-blue-500" />;
            case 'SETTINGS_UPDATE': return <SettingsIcon size={16} className="text-amber-500" />;
            case 'CONTENT_DELETE': return <AlertCircle size={16} className="text-red-500" />;
            default: return <Activity size={16} className="text-sandstone" />;
        }
    };

    const getActionStyle = (action: string) => {
        switch (action) {
            case 'LOGIN': return 'bg-green-50 text-green-600 border-green-100';
            case 'LOGOUT': return 'bg-gray-50 text-gray-600 border-gray-100';
            case 'UPLOAD': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'SETTINGS_UPDATE': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'CONTENT_DELETE': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-sandstone/10 text-oxford border-sandstone/20';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-oxford uppercase tracking-tighter flex items-center gap-3">
                        <Activity className="text-sandstone" size={32} />
                        Activity logs
                    </h1>
                    <p className="text-gray-500 mt-1">Track administrative actions and system security events</p>
                </div>
                
                <button 
                    onClick={() => fetchLogs(1)}
                    className="p-3 bg-white border border-gray-100 rounded-2xl text-oxford hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
                    disabled={loading}
                >
                    <RefreshCw className={loading ? "animate-spin" : ""} size={16} />
                    Refresh
                </button>
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by username..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-all text-sm font-medium shadow-sm"
                    />
                </div>

                <div className="relative">
                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select 
                        value={actionFilter}
                        onChange={(e) => setActionFilter(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-all text-sm font-medium shadow-sm appearance-none"
                    >
                        <option value="all">All Actions</option>
                        <option value="LOGIN">Logins</option>
                        <option value="LOGOUT">Logouts</option>
                        <option value="UPLOAD">Uploads</option>
                        <option value="SETTINGS_UPDATE">Settings Changes</option>
                    </select>
                </div>
                
                <div className="flex items-center gap-2 justify-end">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Page {page} of {totalPages}</span>
                    <div className="flex gap-1">
                        <button 
                            onClick={() => fetchLogs(page - 1)}
                            disabled={page === 1 || loading}
                            className="p-3 bg-white border border-gray-100 rounded-xl disabled:opacity-30 hover:bg-gray-50"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button 
                            onClick={() => fetchLogs(page + 1)}
                            disabled={page === totalPages || loading}
                            className="p-3 bg-white border border-gray-100 rounded-xl disabled:opacity-30 hover:bg-gray-50"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50">
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Admin</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Action</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Details</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">IP Address</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading && logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <Loader2 className="animate-spin mx-auto text-sandstone" size={32} />
                                        <p className="text-sm text-gray-400 mt-4 font-bold uppercase tracking-widest">Loading activity history...</p>
                                    </td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                            <FileText className="text-gray-200" size={32} />
                                        </div>
                                        <p className="text-oxford font-black uppercase tracking-widest text-sm">No activity found</p>
                                        <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or checking back later</p>
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <motion.tr 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={log._id} 
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-sandstone/10 border border-sandstone/20 flex items-center justify-center text-oxford font-black text-xs">
                                                    {log.username[0].toUpperCase()}
                                                </div>
                                                <span className="font-bold text-oxford text-sm uppercase tracking-tight">{log.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${getActionStyle(log.action)}`}>
                                                {getActionIcon(log.action)}
                                                {log.action.replace('_', ' ')}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-xs text-gray-600 font-medium max-w-xs">{log.details}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono bg-gray-50 px-3 py-1.5 rounded-xl w-fit border border-gray-100">
                                                <Globe size={12} className="text-gray-300" />
                                                {log.ip}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-oxford flex items-center gap-1.5">
                                                    <Clock size={12} className="text-sandstone" />
                                                    {new Date(log.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-medium ml-4">
                                                    {new Date(log.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Info */}
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-8">
                <div>Activity records are maintained for security auditing</div>
                <div>{logs.length} entries on this page</div>
            </div>
        </div>
    );
}
