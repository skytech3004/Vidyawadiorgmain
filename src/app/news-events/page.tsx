"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    Calendar,
    Clock,
    MapPin,
    Newspaper,
    ExternalLink,
    Loader2,
    Tag,
} from "lucide-react";

interface SchoolEvent {
    _id: string;
    title: string;
    description: string;
    date: string;
    time?: string;
    location?: string;
    type: "event" | "news";
    institution?: string;
    link?: string;
    image?: string;
    color?: string;
}

export default function NewsEventsPage() {
    const [items, setItems] = useState<SchoolEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "news" | "event">("all");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch("/api/events?limit=100");
                const data = await res.json();
                if (data.success) {
                    setItems(data.events || []);
                }
            } catch (error) {
                console.error("Failed to load news & events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const filtered = useMemo(() => {
        if (filter === "all") return items;
        return items.filter((item) => item.type === filter);
    }, [items, filter]);

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
                        Stay Updated
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="text-4xl md:text-6xl font-black tracking-tight mb-4"
                    >
                        News & Events
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/70 text-lg max-w-2xl font-light"
                    >
                        Latest announcements, campus news, and upcoming events from the Vidyawadi community.
                    </motion.p>
                </div>
            </section>

            <section className="py-16 px-6 bg-slate-50/60">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-3 mb-12">
                        {(
                            [
                                { key: "all", label: "All" },
                                { key: "news", label: "News" },
                                { key: "event", label: "Events" },
                            ] as const
                        ).map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setFilter(tab.key)}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                                    filter === tab.key
                                        ? "bg-oxford text-white shadow-md"
                                        : "bg-white text-oxford/70 border border-oxford/10 hover:border-sandstone hover:text-oxford"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="py-24 flex flex-col items-center justify-center text-gray-400">
                            <Loader2 className="animate-spin mb-4 text-sandstone" size={36} />
                            <p className="font-medium">Loading news & events...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="py-24 text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-oxford/5">
                                <Newspaper className="text-gray-300" size={32} />
                            </div>
                            <p className="text-gray-500 font-medium">No items to show yet. Check back soon.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((item, index) => (
                                <motion.article
                                    key={item._id}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: Math.min(index * 0.05, 0.3) }}
                                    className="bg-white rounded-[1.75rem] overflow-hidden border border-oxford/5 shadow-sm hover:shadow-xl transition-shadow group flex flex-col"
                                >
                                    <div className="aspect-[16/10] bg-oxford/5 relative overflow-hidden">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div
                                                className="w-full h-full flex items-center justify-center"
                                                style={{
                                                    background: `linear-gradient(135deg, ${item.color || "#002147"}22, ${item.color || "#002147"}55)`,
                                                }}
                                            >
                                                {item.type === "news" ? (
                                                    <Tag className="text-oxford/30" size={40} />
                                                ) : (
                                                    <Calendar className="text-oxford/30" size={40} />
                                                )}
                                            </div>
                                        )}
                                        <span
                                            className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white"
                                            style={{
                                                backgroundColor:
                                                    item.type === "news" ? "#0d9488" : "#002147",
                                            }}
                                        >
                                            {item.type}
                                        </span>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-medium mb-3">
                                            <span className="inline-flex items-center gap-1.5">
                                                <Calendar size={13} className="text-sandstone" />
                                                {new Date(item.date).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                            {item.time && (
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Clock size={13} className="text-sandstone" />
                                                    {item.time}
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-xl font-bold text-oxford mb-3 leading-snug group-hover:text-sandstone transition-colors">
                                            {item.title}
                                        </h2>

                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-5 flex-1">
                                            {item.description}
                                        </p>

                                        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
                                            {item.location ? (
                                                <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 truncate">
                                                    <MapPin size={13} className="text-sandstone shrink-0" />
                                                    {item.location}
                                                </span>
                                            ) : (
                                                <span />
                                            )}
                                            {item.link && (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-oxford hover:text-sandstone transition-colors"
                                                >
                                                    Details <ExternalLink size={12} />
                                                </a>
                                            )}
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
