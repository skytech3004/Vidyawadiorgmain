"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    FileText,
    Image as ImageIcon,
    Users,
    Trophy,
    MessageSquare,
    ArrowUpRight,
    Plus
} from "lucide-react";

const stats = [
    { name: "Total Blog Posts", value: "24", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Gallery Images", value: "156", icon: ImageIcon, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Active Staff", value: "48", icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { name: "New Inquiries", value: "12", icon: MessageSquare, color: "text-orange-600", bg: "bg-orange-50" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
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
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                                    <div className="w-full h-full bg-sandstone/10" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-sandstone">School News</span>
                                        <span className="text-[10px] text-gray-400">• 2 hours ago</span>
                                    </div>
                                    <h4 className="font-bold text-oxford line-clamp-1">Annual Sports Day 2024 Preparations Begin</h4>
                                    <p className="text-xs text-gray-500 mt-1">Updated by Admin</p>
                                </div>
                                <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200 shadow-sm">
                                    <ArrowUpRight size={16} className="text-gray-400" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-oxford rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sandstone/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <h3 className="text-xl font-black mb-8 uppercase tracking-tight relative z-10">Quick Actions</h3>
                    <div className="grid gap-4 relative z-10">
                        {[
                            { name: "Update Results", icon: Trophy, desc: "Add board exam toppers" },
                            { name: "Manage Staff", icon: Users, desc: "Edit faculty profiles" },
                            { name: "Upload Photos", icon: ImageIcon, desc: "Add to event gallery" },
                        ].map((action, i) => (
                            <button
                                key={i}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left"
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
