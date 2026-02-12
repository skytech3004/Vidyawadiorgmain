"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    Trash2,
    Loader2,
    Image as ImageIcon,
    Grid,
    List as ListIcon,
    CheckCircle2,
    XCircle,
    MoreVertical,
    Edit2
} from "lucide-react";
import Link from "next/link";

const categories = ["All", "Campus", "Events", "Sports", "Laboratories", "Academic", "Others"];

export default function GalleryManagerPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/gallery");
            const data = await res.json();
            if (data.success) {
                setItems(data.items);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        try {
            const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setItems(items.filter(item => item._id !== id));
            }
        } catch (error) {
            alert("Failed to delete image.");
        }
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-8">
            {/* Header Actions */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search images..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors shadow-sm"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${selectedCategory === cat
                                        ? "bg-sandstone text-oxford shadow-md"
                                        : "bg-white text-gray-400 hover:text-oxford border border-gray-100"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <Link
                    href="/admin/gallery/new"
                    className="flex items-center gap-2 px-6 py-3 bg-oxford text-white rounded-2xl font-bold uppercase tracking-wider shadow-lg hover:bg-sandstone transition-colors group whitespace-nowrap"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    Add Image
                </Link>
            </div>

            {/* Gallery Grid */}
            {loading ? (
                <div className="p-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-sandstone" size={32} />
                    <p className="text-sm text-gray-500 mt-4">Loading your memories...</p>
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-20 text-center border border-gray-100 shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <ImageIcon className="text-gray-300" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-oxford">No images found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {filteredItems.map((item, i) => (
                            <motion.div
                                key={item._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative"
                            >
                                <div className="aspect-square overflow-hidden relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black text-oxford rounded-lg uppercase tracking-widest shadow-sm">
                                            {item.category}
                                        </span>
                                    </div>

                                    <div className="absolute inset-0 bg-oxford/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <Link
                                            href={`/admin/gallery/${item._id}`}
                                            className="p-3 bg-white text-oxford rounded-2xl hover:bg-sandstone transition-colors shadow-lg"
                                        >
                                            <Edit2 size={20} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="p-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-colors shadow-lg"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 bg-white">
                                    <h4 className="font-bold text-oxford text-sm line-clamp-1">{item.title}</h4>
                                    <p className="text-[10px] text-gray-400 mt-1 font-medium italic">Added on {new Date(item.createdAt).toLocaleDateString()}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
