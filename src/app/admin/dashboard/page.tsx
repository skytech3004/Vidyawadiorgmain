"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Image as ImageIcon,
    Users,
    Trophy,
    MessageSquare,
    ArrowUpRight,
    Plus,
    RefreshCcw,
    Activity,
    GraduationCap,
    TrendingUp,
    Calendar,
    Clock,
    Zap,
    ExternalLink,
    ChevronRight,
    FilePlus,
    UserPlus,
    Camera,
    Settings,
    Shield
} from "lucide-react";

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>({ stats: [], recentActivity: [] });

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/dashboard");
            const result = await res.json();
            if (result.success) {
                const iconMap: any = {
                    "New Admissions": GraduationCap,
                    "New Inquiries": MessageSquare,
                    "Blog Posts": FileText,
                    "Gallery Images": ImageIcon,
                    "Staff Members": Users,
                    "Board Toppers": Trophy,
                };
                
                const colorMap: any = {
                    "New Admissions": { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                    "New Inquiries": { color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
                    "Blog Posts": { color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
                    "Gallery Images": { color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
                    "Staff Members": { color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
                    "Board Toppers": { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                };

                const mappedStats = result.stats.map((s: any) => ({
                    ...s,
                    icon: iconMap[s.name] || Activity,
                    theme: colorMap[s.name] || { color: "text-gray-400", bg: "bg-gray-500/10", border: "border-gray-500/20" }
                }));

                setData({ ...result, stats: mappedStats });
            }
        } catch (error) {
            console.error("Failed to fetch dashboard stats", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading && !data.stats.length) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <RefreshCcw className="animate-spin text-sandstone" size={48} />
                <p className="text-oxford/40 font-black uppercase tracking-widest text-xs">Initializing Command Center...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header / Brand Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">System Live</span>
                    </div>
                    <h1 className="text-4xl font-black text-oxford uppercase tracking-tighter">
                        Command <span className="text-sandstone">Center</span>
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium">Welcome back, administrator. Here's your school's live pulse.</p>
                </div>
                
                <div className="flex gap-3">
                    <button 
                        onClick={fetchDashboardData}
                        className="p-4 bg-white border border-gray-100 rounded-2xl text-oxford hover:bg-gray-50 transition-all shadow-sm group"
                    >
                        <RefreshCcw className={`group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} size={20} />
                    </button>
                    <div className="bg-oxford p-4 rounded-2xl flex items-center gap-4 shadow-xl border border-white/5">
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Current Session</p>
                            <p className="text-xs font-bold text-sandstone">{new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' })}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <Calendar className="text-white" size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 lg:gap-8">
                {/* Left Column: Stats & Mosaic */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    
                    {/* Stats Mosaic */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {data.stats.map((stat: any, i: number) => (
                            <motion.div
                                key={stat.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-oxford/5 to-transparent rounded-[2rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="bg-white p-6 rounded-[2.2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`${stat.theme.bg} ${stat.theme.color} p-4 rounded-2xl border ${stat.theme.border}`}>
                                            <stat.icon size={24} />
                                        </div>
                                        {stat.total && (
                                            <div className="text-right">
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Cumulative</span>
                                                <span className="text-xs font-bold text-oxford">{stat.total}</span>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-3xl font-black text-oxford tracking-tighter">{stat.value}</h3>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{stat.name}</p>
                                    
                                    {/* Mini Trend - Aesthetic decoration */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sandstone/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Access Grid - Dark/Glass Theme */}
                    <div className="bg-oxford rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden border border-white/5">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-sandstone/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                        
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-xl">
                                    <Zap size={20} className="text-sandstone" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight">Express Actions</h3>
                            </div>
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-3 py-1 bg-white/5 rounded-full border border-white/5">One-click management</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                            {[
                                { name: "Admissions", desc: "View Requests", icon: UserPlus, href: "/admin/admissions", color: "text-emerald-400" },
                                { name: "Blog Post", desc: "Write Story", icon: FilePlus, href: "/admin/blog", color: "text-sky-400" },
                                { name: "Topper", desc: "Update Result", icon: Trophy, href: "/admin/results", color: "text-amber-400" },
                                { name: "Media", desc: "Upload Photos", icon: Camera, href: "/admin/gallery", color: "text-pink-400" },
                            ].map((item, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => window.location.href = item.href}
                                    className="group p-5 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/10 hover:border-white/10 transition-all text-left"
                                >
                                    <div className={`mb-4 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                                        <item.icon size={24} />
                                    </div>
                                    <h4 className="font-bold text-sm tracking-tight">{item.name}</h4>
                                    <p className="text-[9px] text-white/40 uppercase tracking-widest mt-1">{item.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Live Stream */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 h-full flex flex-col relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="bg-sandstone/10 p-2 rounded-xl">
                                    <Activity size={20} className="text-oxford" />
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-oxford">Live Activity</h3>
                            </div>
                            <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-sandstone transition-colors flex items-center gap-1 group">
                                View Full
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="flex-1 space-y-6 relative">
                            {/* Connector Line */}
                            <div className="absolute left-[1.375rem] top-2 bottom-2 w-px bg-gradient-to-b from-gray-100 via-gray-100 to-transparent" />

                            {data.recentActivity.length > 0 ? data.recentActivity.map((activity: any, i: number) => (
                                <div key={i} className="flex gap-4 relative group">
                                    <div className="relative z-10 w-11 h-11 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shrink-0 group-hover:border-sandstone transition-colors shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-sandstone/10 font-black text-xs text-oxford">
                                            {activity.username[0].toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-sandstone">{activity.username}</span>
                                            <span className="text-[9px] font-medium text-gray-400 uppercase whitespace-nowrap flex items-center gap-1">
                                                <Clock size={10} />
                                                {new Date(activity.time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <h4 className="text-xs font-bold text-oxford leading-tight group-hover:text-sandstone transition-colors">{activity.action.replace('_', ' ')}</h4>
                                        <p className="text-[10px] text-gray-400 mt-1 line-clamp-1 italic">{activity.details}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="flex flex-col items-center justify-center h-64 text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
                                        <Shield className="text-gray-200" size={32} />
                                    </div>
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Awaiting system events...</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-50">
                            <button className="w-full py-4 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:bg-oxford hover:text-white transition-all flex items-center justify-center gap-2">
                                <Settings size={14} />
                                Manage Notifications
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Secondary Content Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* School Status Card */}
                <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-8 group">
                    <div className="w-24 h-24 rounded-3xl bg-oxford flex items-center justify-center shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-sandstone/20 to-transparent" />
                        <TrendingUp size={40} className="text-white relative z-10 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Website Status</span>
                        <h3 className="text-2xl font-black text-oxford tracking-tight mt-1">Optimization <span className="text-sandstone">Active</span></h3>
                        <p className="text-sm text-gray-500 mt-2 max-w-sm">All SEO parameters and image transformations are running at peak efficiency for global visitors.</p>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-8 group">
                    <div className="w-24 h-24 rounded-3xl bg-sandstone flex items-center justify-center shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                        <School size={40} className="text-oxford relative z-10 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-oxford">Institution Sync</span>
                        <h3 className="text-2xl font-black text-oxford tracking-tight mt-1">Cross-Link <span className="text-white drop-shadow-sm">Enabled</span></h3>
                        <p className="text-sm text-gray-500 mt-2 max-w-sm">Data sharing between Leela Devi, Marudhar, and SPS institutions is currently synchronized.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function School({ size, className }: { size: number, className: string }) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
    );
}
