"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Facility {
    _id: string;
    title: string;
    description: string;
    icon: string;
    theme?: string;
    features?: string[];
    image: string;
    order?: number;
}

function getGradient(theme?: string) {
    if (theme === "bg-sandstone") return "from-sandstone to-sandstone-dark";
    if (theme === "bg-sandstone-dark") return "from-sandstone-dark to-oxford";
    if (theme === "bg-teal-blue") return "from-teal-blue to-oxford";
    if (theme === "bg-oxford-dark") return "from-oxford-dark to-oxford";
    return "from-oxford to-oxford-dark";
}

export default function Facilities() {
    const [facilities, setFacilities] = useState<Facility[]>([]);

    useEffect(() => {
        let isMounted = true;

        const loadFacilities = async () => {
            try {
                const res = await fetch("/api/facilities", { cache: "no-store" });
                const data = await res.json();
                if (isMounted && data.success && Array.isArray(data.facilities) && data.facilities.length > 0) {
                    setFacilities(data.facilities);
                }
            } catch (error) {
                console.error("Error loading facilities:", error);
            }
        };

        loadFacilities();
        return () => {
            isMounted = false;
        };
    }, []);

    const displayFacilities = [...facilities].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return (
        <section id="facilities" data-theme="light" className="py-24 px-6 bg-[#fcf9f2] scroll-mt-24 font-inter">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20"
                >
                    <span className="text-sandstone font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Our Infrastructure</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-oxford mb-6 uppercase tracking-tight">
                        World-Class <span className="text-sandstone">Facilities</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-sandstone mx-auto rounded-full mb-8" />
                    <p className="text-lg text-oxford/70 max-w-2xl mx-auto leading-relaxed">
                        Providing an exceptional environment that nurtures academic brilliance and holistic growth in every student.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {displayFacilities.length === 0 ? (
                        <div className="col-span-full rounded-[2rem] border border-dashed border-oxford/10 bg-white p-10 text-center text-gray-500 shadow-sm">
                            <h3 className="text-2xl font-black text-oxford mb-3">No facilities found</h3>
                            <p>Add facility records in the admin panel and they will load from the database here.</p>
                        </div>
                    ) : (
                        displayFacilities.map((fac, i) => (
                        <motion.div
                            key={fac._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-sandstone/20"
                        >
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={fac.image}
                                    alt={fac.title}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className={cn("absolute inset-0 bg-gradient-to-t z-10", getGradient(fac.theme), "opacity-90")} />
                            </div>

                            <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                                <div className="mb-6 transform transition-all duration-500 delay-100 group-hover:translate-y-[-10px]">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-sandstone/10 backdrop-blur-md rounded-2xl text-sandstone border border-sandstone/20 min-w-14 flex items-center justify-center">
                                            <span className="text-xs font-black uppercase tracking-[0.2em] text-white">{fac.icon || fac.title.slice(0, 2)}</span>
                                        </div>
                                        <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
                                            {fac.title}
                                        </h3>
                                    </div>
                                    <p className="text-white/80 text-lg leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                        {fac.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 transform translate-y-4 group-hover:translate-y-0">
                                        {fac.features?.map((feat) => (
                                            <span key={feat} className="px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-black bg-white/10 backdrop-blur-md border border-white/10 text-white">
                                                {feat}
                                            </span>
                                        ))}
                                    </div>

                                    <button className="flex items-center gap-4 text-sandstone font-black text-sm uppercase tracking-widest group/btn bg-white/5 hover:bg-sandstone hover:text-oxford px-6 py-4 rounded-2xl transition-all duration-300 w-fit backdrop-blur-sm border border-sandstone/30">
                                        Explore Excellence
                                        <div className="w-8 h-px bg-current group-hover/btn:w-12 transition-all duration-300" />
                                    </button>
                                </div>
                            </div>

                            <div className="absolute top-0 right-0 w-32 h-32 bg-sandstone/10 backdrop-blur-3xl rounded-bl-[5rem] z-10 translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-700" />
                        </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
