"use client";

import React, { useState, useEffect } from "react";
import { RefreshCcw, Users, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FacultyMember {
    _id: string;
    name: string;
    designation: string;
    image?: string;
    order: number;
}

interface FacultyGridProps {
    institution: "marudhar" | "english" | "primary" | "college";
    title?: string;
}

export default function FacultyGrid({ institution, title }: FacultyGridProps) {
    const [faculty, setFaculty] = useState<FacultyMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(12);

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const res = await fetch(`/api/staff?institution=${institution}`);
                const data = await res.json();
                if (data.success) {
                    setFaculty(data.faculty);
                }
            } catch (error) {
                console.error("Failed to fetch faculty", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFaculty();
    }, [institution]);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <RefreshCcw className="animate-spin text-sandstone" size={32} />
            </div>
        );
    }

    if (faculty.length === 0) {
        return null;
    }

    const loadMore = () => {
        setVisibleCount((prev) => prev + 12);
    };

    // Styling configurations based on institution
    const configs = {
        marudhar: {
            containerBg: "bg-white",
            cardClass: "bg-white p-4 rounded-xl shadow-sm border border-oxford/10 flex items-center gap-3 hover:border-sandstone transition-colors group",
            iconClass: "w-12 h-12 rounded-full bg-oxford/5 flex items-center justify-center overflow-hidden border border-oxford/10 group-hover:border-sandstone transition-colors shrink-0",
            nameClass: "font-bold text-oxford text-xs",
            designationClass: "text-[10px] text-gray-500 uppercase tracking-wider",
            buttonText: "Show More Faculty",
            buttonClass: "px-8 py-3 bg-oxford text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-sandstone hover:text-oxford transition-all shadow-lg",
            hasArrow: false,
            defaultTitle: "Our Dedicated Faculty"
        },
        english: {
            containerBg: "bg-gray-50",
            cardClass: "bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex items-center gap-4 hover:bg-white hover:shadow-xl transition-all group",
            iconClass: "w-10 h-10 rounded-full bg-oxford/5 flex items-center justify-center text-oxford font-bold text-sm shrink-0",
            nameClass: "font-bold text-oxford text-sm",
            designationClass: "text-xs text-gray-500",
            buttonText: "View More Navigators",
            buttonClass: "px-8 py-3 bg-white border-2 border-oxford text-oxford text-sm font-black uppercase tracking-widest rounded-full hover:bg-oxford hover:text-white transition-all shadow-md",
            hasArrow: false,
            defaultTitle: "LPS Educational Navigators"
        },
        primary: {
            containerBg: "bg-gray-50",
            cardClass: "bg-white p-4 rounded-xl shadow-sm border border-oxford/10 flex items-center gap-3 hover:border-sandstone transition-colors group",
            iconClass: "w-10 h-10 rounded-full bg-oxford/5 flex items-center justify-center text-oxford font-bold text-xs shrink-0 group-hover:bg-sandstone group-hover:text-white transition-colors",
            nameClass: "font-bold text-oxford text-xs",
            designationClass: "text-[10px] text-gray-500 uppercase tracking-wider",
            buttonText: "Load More Mentors",
            buttonClass: "px-8 py-3 bg-white text-oxford border-2 border-oxford rounded-full font-bold uppercase tracking-wider shadow-lg hover:bg-oxford hover:text-white transition-all flex items-center gap-2",
            hasArrow: true,
            defaultTitle: "SPS School Mentors"
        },
        college: {
            containerBg: "bg-white",
            cardClass: "bg-white p-6 rounded-2xl shadow-sm border border-oxford/10 flex items-center gap-5 hover:border-sandstone hover:shadow-xl transition-all group",
            iconClass: "w-14 h-14 rounded-full bg-oxford/5 flex items-center justify-center overflow-hidden border border-oxford/10 group-hover:border-sandstone transition-colors shrink-0",
            nameClass: "font-black text-oxford text-sm",
            designationClass: "text-xs text-sandstone font-bold uppercase tracking-widest",
            buttonText: "Discover More Faculty",
            buttonClass: "px-10 py-4 bg-oxford text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-sandstone hover:text-oxford transition-all shadow-xl",
            hasArrow: true,
            defaultTitle: "College Faculty Mentors"
        }
    };

    const config = configs[institution];

    return (
        <section className={`py-24 px-6 ${config.containerBg}`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Our Excellence</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight">
                        {title || config.defaultTitle}
                    </h2>
                    <p className="mt-4 text-sandstone font-bold uppercase tracking-widest text-sm">
                        Total {faculty.length} {institution === "college" ? "Members" : "Navigators"}
                    </p>
                    <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full mb-8" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AnimatePresence mode="popLayout">
                        {faculty.slice(0, visibleCount).map((member, i) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: (i % 12) * 0.05 }}
                                key={member._id}
                                className={config.cardClass}
                            >
                                <div className={config.iconClass}>
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="font-bold">{institution === "english" || institution === "primary" ? member.order : member.name.charAt(0)}</span>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h4 className={config.nameClass}>{member.name}</h4>
                                    <p className={config.designationClass}>{member.designation}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {visibleCount < faculty.length && (
                    <div className="mt-16 text-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={loadMore}
                            className={config.buttonClass}
                        >
                            {config.buttonText}
                            {config.hasArrow && <ArrowRight size={18} />}
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
}
