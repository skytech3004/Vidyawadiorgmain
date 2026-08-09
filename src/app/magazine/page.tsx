"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Calendar, Download, ExternalLink, Loader2 } from "lucide-react";

interface MagazineIssue {
    _id: string;
    title: string;
    description?: string;
    coverImage?: string;
    pdfUrl: string;
    issueDate: string;
    volume?: string;
}

export default function MagazinePage() {
    const [magazines, setMagazines] = useState<MagazineIssue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMagazines = async () => {
            try {
                const res = await fetch("/api/magazine");
                const data = await res.json();
                if (data.success) {
                    setMagazines(data.magazines || []);
                }
            } catch (error) {
                console.error("Failed to load magazines:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMagazines();
    }, []);

    return (
        <main className="min-h-screen bg-white font-inter">
            <Navbar />

            <section
                id="home"
                data-theme="dark"
                className="pt-40 pb-16 px-6 bg-oxford text-white relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sandstone/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-white/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sandstone font-bold uppercase tracking-[0.35em] text-sm block mb-4"
                    >
                        Campus Publications
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="text-4xl md:text-6xl font-black tracking-tight mb-4"
                    >
                        Magazine
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/70 text-lg max-w-2xl font-light"
                    >
                        Browse and download issues of the Vidyawadi magazine — stories, achievements, and campus life.
                    </motion.p>
                </div>
            </section>

            <section className="py-16 px-6 bg-slate-50/60">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="py-24 flex flex-col items-center justify-center text-gray-400">
                            <Loader2 className="animate-spin mb-4 text-sandstone" size={36} />
                            <p className="font-medium">Loading magazines...</p>
                        </div>
                    ) : magazines.length === 0 ? (
                        <div className="py-24 text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-oxford/5">
                                <BookOpen className="text-gray-300" size={32} />
                            </div>
                            <p className="text-gray-500 font-medium">No magazine issues published yet.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {magazines.map((issue, index) => (
                                <motion.article
                                    key={issue._id}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: Math.min(index * 0.05, 0.3) }}
                                    className="bg-white rounded-[1.75rem] overflow-hidden border border-oxford/5 shadow-sm hover:shadow-xl transition-shadow group flex flex-col"
                                >
                                    <div className="aspect-[3/4] bg-oxford/5 relative overflow-hidden">
                                        {issue.coverImage ? (
                                            <img
                                                src={issue.coverImage}
                                                alt={issue.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-oxford to-oxford/80 text-white p-6 text-center">
                                                <BookOpen className="mb-4 text-sandstone" size={40} />
                                                <p className="font-bold text-sm leading-snug">{issue.title}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5 flex flex-col flex-1">
                                        {issue.volume && (
                                            <span className="text-[10px] font-black uppercase tracking-widest text-sandstone mb-2">
                                                {issue.volume}
                                            </span>
                                        )}
                                        <h2 className="text-lg font-bold text-oxford mb-2 leading-snug group-hover:text-sandstone transition-colors">
                                            {issue.title}
                                        </h2>
                                        {issue.description && (
                                            <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                                                {issue.description}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between gap-2 pt-4 border-t border-gray-100 mt-auto">
                                            <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                                                <Calendar size={13} className="text-sandstone" />
                                                {new Date(issue.issueDate).toLocaleDateString("en-IN", {
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <a
                                                    href={issue.pdfUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-lg text-oxford hover:bg-oxford/5 transition-colors"
                                                    title="View"
                                                >
                                                    <ExternalLink size={16} />
                                                </a>
                                                <a
                                                    href={issue.pdfUrl}
                                                    download
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-oxford text-white text-xs font-bold uppercase tracking-wider hover:bg-sandstone hover:text-oxford transition-colors"
                                                >
                                                    <Download size={12} />
                                                    PDF
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
