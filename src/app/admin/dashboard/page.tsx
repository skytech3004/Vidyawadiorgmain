"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    FileText,
    Image as ImageIcon,
    Users,
    Trophy,
    MessageSquare,
    ArrowUpRight,
    Plus,
    RefreshCcw
} from "lucide-react";

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>({ stats: [], recentActivity: [] });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const res = await fetch("/api/admin/dashboard");
            const result = await res.json();
            if (result.success) {
                // Map icons back to stats
                const iconMap: any = {
                    "Total Blog Posts": FileText,
                    "Gallery Images": ImageIcon,
                    "Active Staff": Users,
                    "New Inquiries": MessageSquare,
                };
                const colorMap: any = {
                    "Total Blog Posts": { color: "text-blue-600", bg: "bg-blue-50" },
                    "Gallery Images": { color: "text-purple-600", bg: "bg-purple-50" },
                    "Active Staff": { color: "text-green-600", bg: "bg-green-50" },
                    "New Inquiries": { color: "text-orange-600", bg: "bg-orange-50" },
                };

                const mappedStats = result.stats.map((s: any) => ({
                    ...s,
                    icon: iconMap[s.name] || FileText,
                    ...(colorMap[s.name] || { color: "text-gray-600", bg: "bg-gray-50" })
                }));

                setData({ ...result, stats: mappedStats });
            }
        } catch (error) {
            console.error("Failed to fetch dashboard stats", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <RefreshCcw className="animate-spin text-sandstone" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.stats.map((stat: any, i: number) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                                <stat.icon size={24} />
                            </div>
                            <button className="text-gray-400 hover:text-oxford transition-colors">
                                <ArrowUpRight size={20} />
                            </button>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{stat.name}</p>
                            <h3 className="text-3xl font-black text-oxford mt-1">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-oxford uppercase tracking-tight">Recent Activity</h3>
                        <button className="flex items-center gap-2 text-sm font-bold text-sandstone hover:text-oxford transition-colors">
                            <Plus size={18} />
                            Add News
                        </button>
                    </div>

                    <div className="space-y-6">
                        {data.recentActivity.length > 0 ? data.recentActivity.map((activity: any, i: number) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                                    <div className="w-full h-full bg-sandstone/10 flex items-center justify-center text-sandstone font-black text-xl">
                                        {activity.title[0]}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-sandstone">{activity.category || "News"}</span>
                                        <span className="text-[10px] text-gray-400">• {activity.time}</span>
                                    </div>
                                    <h4 className="font-bold text-oxford line-clamp-1">{activity.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1">Updated by {activity.author || "Admin"}</p>
                                </div>
                                <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200 shadow-sm">
                                    <ArrowUpRight size={16} className="text-gray-400" />
                                </button>
                            </div>
                        )) : (
                            <div className="text-center py-10 text-gray-400 font-medium">
                                No recent activity found.
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-oxford rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sandstone/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <h3 className="text-xl font-black mb-8 uppercase tracking-tight relative z-10">Quick Actions</h3>
                    <div className="grid gap-4 relative z-10">
                        {[
                            { name: "Update Results", icon: Trophy, desc: "Add board exam toppers", href: "/admin/results/new" },
                            { name: "Manage Staff", icon: Users, desc: "Edit faculty profiles", href: "/admin/staff/new" },
                            { name: "Upload Photos", icon: ImageIcon, desc: "Add to event gallery", href: "/admin/gallery/new" },
                        ].map((action, i) => (
                            <button
                                key={i}
                                onClick={() => window.location.href = action.href}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left w-full"
                            >
                                <div className="w-10 h-10 bg-sandstone rounded-xl flex items-center justify-center text-oxford">
                                    <action.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">{action.name}</h4>
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">{action.desc}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
