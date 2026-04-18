"use client";

import React from "react";
import { motion } from "framer-motion";
import { School, ChevronRight, GraduationCap, Users, BookOpen, Building2 } from "lucide-react";
import Link from "next/link";

const INSTITUTIONS = [
    { 
        id: "marudhar", 
        name: "Marudhar Balika Vidyapeeth", 
        description: "Hindi & English Medium Senior Secondary School",
        icon: School,
        color: "bg-sandstone",
        stats: "RBSE Affiliated"
    },
    { 
        id: "english", 
        name: "Leeladevi English Medium", 
        description: "English Medium Sr. Sec. School (Residential)",
        icon: GraduationCap,
        color: "bg-oxford",
        stats: "CBSE Affiliated"
    },
    { 
        id: "primary", 
        name: "Sushiladevi Primary School", 
        description: "Foundation and Primary Education",
        icon: Users,
        color: "bg-sandstone-dark",
        stats: "RBSE Affiliated"
    },
    { 
        id: "college", 
        name: "Leela Devi College", 
        description: "Higher Education for Women",
        icon: BookOpen,
        color: "bg-oxford-dark",
        stats: "JNVU Affiliated"
    },
];

export default function InstitutionsSelectionPage() {
    return (
        <div className="space-y-10">
            <div className="max-w-2xl">
                <h1 className="text-3xl font-black text-oxford uppercase tracking-tight mb-2">Institutional Management</h1>
                <p className="text-gray-500 font-medium">Select an institution to manage its specific content, toppers, and settings.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {INSTITUTIONS.map((inst, i) => (
                    <motion.div
                        key={inst.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Link 
                            href={`/admin/institutions/${inst.id}`}
                            className="group block bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-sandstone/20 transition-all relative overflow-hidden h-full"
                        >
                            {/* Abstract Background Icon */}
                            <inst.icon className="absolute -right-8 -bottom-8 w-40 h-40 text-gray-50 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <div className={`w-14 h-14 rounded-2xl ${inst.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <inst.icon size={28} />
                                </div>
                                
                                <h3 className="text-2xl font-black text-oxford mb-2 group-hover:text-sandstone transition-colors leading-tight">
                                    {inst.name}
                                </h3>
                                
                                <p className="text-gray-500 text-sm font-medium mb-8 flex-grow">
                                    {inst.description}
                                </p>
                                
                                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        {inst.stats}
                                    </span>
                                    <div className="flex items-center gap-2 text-oxford font-bold text-sm group-hover:gap-4 transition-all">
                                        Manage
                                        <ChevronRight size={16} className="text-sandstone" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Quick Stats Helper */}
            <div className="bg-oxford p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-sandstone flex items-center justify-center text-oxford shrink-0">
                    <Building2 size={32} />
                </div>
                <div>
                    <h4 className="text-xl font-black mb-2 uppercase tracking-tight">Consolidated View</h4>
                    <p className="text-white/60 text-sm leading-relaxed max-w-xl font-medium">
                        Each institution operates as a distinct entity in the Vidyawadi ecosystem. We've separated them to ensure better clarity and faster updates for merit lists and toppers.
                    </p>
                </div>
            </div>
        </div>
    );
}
