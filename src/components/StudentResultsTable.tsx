"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronRight, Trophy, GraduationCap, Medal, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Topper {
    _id: string;
    name: string;
    percentage: number;
    class: string;
    year: string;
    stream: string;
    image?: string;
    institution: string;
    resultType: string;
}

interface Props {
    institution: "marudhar" | "english" | "primary" | "college";
    title?: string;
}

export default function StudentResultsTable({ institution, title }: Props) {
    const [results, setResults] = useState<Topper[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedYears, setExpandedYears] = useState<string[]>([]);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/results?institution=${institution}`);
                const data = await res.json();
                if (data.success) {
                    setResults(data.results);
                    
                    // Default to expand the latest year
                    if (data.results.length > 0) {
                        const years = [...new Set(data.results.map((r: Topper) => r.year))] as string[];
                        const latestYear = years.sort().reverse()[0];
                        setExpandedYears([latestYear]);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch results", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [institution]);

    // Group results by year
    const groupedResults = useMemo(() => {
        const groups: Record<string, Topper[]> = {};
        results.forEach(res => {
            if (!groups[res.year]) groups[res.year] = [];
            groups[res.year].push(res);
        });
        
        // Sort years descending
        return Object.keys(groups)
            .sort((a, b) => b.localeCompare(a))
            .map(year => ({
                year,
                data: groups[year].sort((a, b) => {
                    // Sort by class (XII, then X, then others) and then percentage
                    if (a.class === "XII" && b.class !== "XII") return -1;
                    if (a.class !== "XII" && b.class === "XII") return 1;
                    if (a.class === "X" && b.class !== "X") return -1;
                    if (a.class !== "X" && b.class === "X") return 1;
                    return b.percentage - a.percentage;
                })
            }));
    }, [results]);

    const toggleYear = (year: string) => {
        setExpandedYears(prev => 
            prev.includes(year) 
            ? prev.filter(y => y !== year) 
            : [...prev, year]
        );
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center py-20 gap-4">
                <div className="w-12 h-12 border-4 border-sandstone border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Merit Lists...</p>
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                <Trophy size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-500 font-medium">No toppers records found for this institution yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 w-full max-w-7xl mx-auto">
            {title && (
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-sandstone/10 flex items-center justify-center text-sandstone">
                        <Trophy size={28} />
                    </div>
                    <h2 className="text-3xl font-black text-oxford uppercase tracking-tight">{title}</h2>
                </div>
            )}

            <div className="space-y-4">
                {groupedResults.map((group, groupIdx) => {
                    const isExpanded = expandedYears.includes(group.year);
                    const isLatestYear = groupIdx === 0;

                    return (
                        <div 
                            key={group.year} 
                            className={`rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                                isExpanded ? "bg-white border-oxford shadow-2xl" : "bg-gray-50 border-gray-100 hover:border-sandstone/30"
                            }`}
                        >
                            {/* Accordion Header */}
                            <button
                                onClick={() => toggleYear(group.year)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                                        isExpanded ? "bg-oxford text-white" : "bg-white text-oxford shadow-sm group-hover:bg-sandstone group-hover:text-oxford"
                                    }`}>
                                        <Trophy size={20} />
                                    </div>
                                    <div>
                                        <h3 className={`text-xl font-black uppercase tracking-tight transition-colors ${isExpanded ? "text-oxford" : "text-gray-400 group-hover:text-oxford"}`}>
                                            Academic Session {group.year}
                                        </h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            {group.data.length} Total Toppers Listed
                                        </p>
                                    </div>
                                </div>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                    isExpanded ? "bg-oxford text-white rotate-180" : "bg-white text-gray-300 group-hover:text-sandstone"
                                }`}>
                                    <ChevronDown size={20} />
                                </div>
                            </button>

                            {/* Accordion Content */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <div className="px-8 pb-10">
                                            {/* Top Highlights (only if latest or has many results) */}
                                            {isLatestYear && group.data.filter(r => r.class === "XII" || r.class === "X").length > 0 && (
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                                                    {group.data.filter(r => (r.class === "XII" || r.class === "X") && r.percentage >= 90).slice(0, 5).map((topper, i) => (
                                                        <div key={topper._id} className="bg-gray-50 p-6 rounded-3xl border border-transparent hover:border-sandstone/30 hover:shadow-xl transition-all text-center group/card">
                                                            <div className="w-20 h-20 rounded-full bg-white mx-auto mb-4 overflow-hidden border-2 border-sandstone shadow-md relative">
                                                                <img 
                                                                    src={topper.image || "https://cdn-icons-png.flaticon.com/512/4288/4288270.png"} 
                                                                    alt={topper.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                <div className="absolute inset-0 bg-oxford/10 group-hover/card:bg-transparent transition-colors" />
                                                            </div>
                                                            <h4 className="font-black text-oxford text-sm mb-1 truncate">{topper.name}</h4>
                                                            <p className="text-[10px] font-bold text-sandstone uppercase mb-2">Class {topper.class} {topper.stream !== "-" ? `(${topper.stream})` : ""}</p>
                                                            <div className="text-xl font-black text-oxford">{topper.percentage}%</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Table View */}
                                            <div className="overflow-x-auto rounded-[2rem] border border-gray-100 bg-white">
                                                <table className="w-full text-left border-collapse min-w-[700px]">
                                                    <thead className="bg-gray-50 border-b border-gray-100">
                                                        <tr>
                                                            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Student Name</th>
                                                            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Class & Stream</th>
                                                            <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Percentage</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50">
                                                        {group.data.map((topper) => (
                                                            <tr key={topper._id} className="hover:bg-gray-50/50 transition-colors group/row">
                                                                <td className="py-4 px-6">
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-oxford group-hover/row:bg-sandstone group-hover/row:text-white transition-colors">
                                                                            <Star size={14} />
                                                                        </div>
                                                                        <span className="font-bold text-oxford group-hover/row:text-sandstone transition-colors">{topper.name}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="py-4 px-6">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="px-3 py-1 bg-oxford/5 text-oxford text-[10px] font-bold rounded-full uppercase tracking-tighter">
                                                                            Class {topper.class}
                                                                        </span>
                                                                        {topper.stream !== "-" && (
                                                                            <span className="px-3 py-1 bg-sandstone/10 text-sandstone text-[10px] font-bold rounded-full uppercase tracking-tighter">
                                                                                {topper.stream}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                                <td className="py-4 px-6 text-right">
                                                                    <span className="text-lg font-black text-oxford group-hover/row:text-sandstone transition-colors">
                                                                        {topper.percentage}%
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
