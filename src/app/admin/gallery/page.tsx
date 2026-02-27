"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Trash2,
    Loader2,
    Image as ImageIcon,
    Edit2,
    RefreshCw,
    Calendar,
    ChevronRight,
    Images,
    Tag,
    Settings,
    X,
    GripVertical
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DEFAULT_CATEGORIES = ["All", "Campus", "Events", "Sports", "Laboratories", "Academic", "Hostel", "Infrastructure", "NAAC", "Others"];

export default function GalleryManagerPage() {
    const [albums, setAlbums] = useState<any[]>([]);
    const [dynamicCategories, setDynamicCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [syncing, setSyncing] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const [albumsRes, catsRes] = await Promise.all([
                fetch("/api/admin/gallery-albums"),
                fetch("/api/admin/gallery-categories")
            ]);

            const albumsData = await albumsRes.json();
            const catsData = await catsRes.json();

            if (albumsData.success) setAlbums(albumsData.albums);
            if (catsData.success) setDynamicCategories(catsData.categories);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSync = async () => {
        setSyncing(true);
        try {
            const res = await fetch("/api/gallery/revalidate?secret=vidyawadi_refresh_2026");
            const data = await res.json();
            if (data.revalidated) {
                alert("Gallery Cache Refreshed Successfully!");
            }
        } catch (error) {
            console.error("Sync error:", error);
            alert("Failed to sync gallery cache.");
        } finally {
            setSyncing(false);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        try {
            const res = await fetch("/api/admin/gallery-categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newCategoryName })
            });
            const data = await res.json();
            if (data.success) {
                setDynamicCategories([...dynamicCategories, data.category]);
                setNewCategoryName("");
                setIsCategoryModalOpen(false);
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert("Failed to add category");
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm("Are you sure? This will not delete the albums, but they will lose this category tag.")) return;
        try {
            const res = await fetch(`/api/admin/gallery-categories/${id}`, { method: "DELETE" });
            if (res.ok) {
                setDynamicCategories(dynamicCategories.filter(c => c._id !== id));
            }
        } catch (error) {
            alert("Failed to delete category");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteAlbum = async (id: string) => {
        if (!confirm("Are you sure you want to delete this entire album?")) return;
        try {
            const res = await fetch(`/api/admin/gallery-albums/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setAlbums(albums.filter(album => album._id !== id));
            }
        } catch (error) {
            alert("Failed to delete album.");
        }
    };

    const categoriesList = ["All", ...dynamicCategories.map(c => c.name)];

    const filteredAlbums = albums.filter(album => {
        const matchesSearch = album.albumTitle.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === "All" || album.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6">
            {/* Top Row: Search & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="relative w-full md:w-96 shrink-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search albums..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors shadow-sm"
                    />
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button
                        onClick={handleSync}
                        disabled={syncing}
                        className="flex items-center gap-2 px-6 py-3 bg-sandstone/10 text-oxford rounded-2xl font-bold uppercase tracking-wider hover:bg-sandstone transition-all group disabled:opacity-50"
                    >
                        <RefreshCw size={20} className={cn(syncing && "animate-spin")} />
                        {syncing ? "Syncing..." : "Sync Public"}
                    </button>
                    <Link
                        href="/admin/gallery/new"
                        className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-red-700 transition-all group whitespace-nowrap scale-105"
                    >
                        <Images size={20} className="group-hover:scale-110 transition-transform" />
                        New Images
                    </Link>
                </div>
            </div>

            {/* Bottom Row: Wrapping Filters & Management */}
            <div className="flex flex-wrap items-center gap-2 bg-white/50 p-4 rounded-3xl border border-gray-50 shadow-sm">
                {categoriesList.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                            "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border shadow-sm",
                            selectedCategory === cat
                                ? "bg-sandstone text-oxford border-sandstone"
                                : "bg-white text-gray-400 hover:text-oxford border-gray-50/50"
                        )}
                    >
                        {cat}
                    </button>
                ))}

                <div className="flex items-center gap-2 pl-4 border-l border-gray-100 h-10 ml-auto md:ml-3">
                    <button
                        onClick={() => setIsCategoryModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-sandstone text-oxford rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm hover:bg-neutral-800 hover:text-white transition-all group shrink-0"
                        title="Add New Category"
                    >
                        <Plus size={14} className="group-hover:scale-110 transition-transform" />
                        <span>Add Category</span>
                    </button>
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm hover:bg-gray-100 hover:text-oxford transition-all group shrink-0"
                        title="Manage Categories"
                    >
                        <Settings size={14} className="group-hover:rotate-45 transition-transform" />
                        <span>Manage</span>
                    </button>
                </div>
            </div>

            {
                loading ? (
                    <div className="p-20 text-center">
                        <Loader2 className="animate-spin mx-auto text-sandstone" size={32} />
                        <p className="text-sm text-gray-500 mt-4">Loading albums...</p>
                    </div>
                ) : filteredAlbums.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100 shadow-sm">
                        <ImageIcon className="text-gray-300 mx-auto mb-6" size={40} />
                        <h3 className="text-xl font-bold text-oxford">No albums found</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredAlbums.map((album: any) => (
                                <motion.div
                                    key={album._id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all flex flex-col"
                                >
                                    <div className="aspect-[16/10] overflow-hidden relative bg-gray-100">
                                        {album.images?.[0] ? (
                                            <img src={album.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300"><Images size={48} /></div>
                                        )}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-[10px] font-black text-oxford rounded-xl uppercase tracking-widest shadow-sm border border-black/5">
                                                {album.category}
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/admin/gallery/${album._id}`} className="p-3 bg-white text-oxford rounded-xl hover:bg-sandstone transition-colors shadow-lg"><Edit2 size={18} /></Link>
                                            <button onClick={() => handleDeleteAlbum(album._id)} className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-lg"><Trash2 size={18} /></button>
                                        </div>
                                        <div className="absolute bottom-4 left-4 px-4 py-2 bg-oxford/90 text-white text-[10px] font-bold rounded-xl flex items-center gap-2 backdrop-blur-xl border border-white/10">
                                            <Images size={14} />{album.images?.length || 0} Photos
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-4 flex-1 flex flex-col">
                                        <h4 className="text-xl font-black text-oxford line-clamp-1 uppercase tracking-tight">{album.albumTitle}</h4>
                                        <p className="text-xs text-gray-400 font-medium italic flex items-center gap-2"><Calendar size={12} />{new Date(album.date || album.createdAt).toDateString()}</p>
                                        {album.description && <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed italic border-l-2 border-sandstone/20 pl-4">"{album.description}"</p>}
                                        <div className="pt-4 mt-auto border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex -space-x-2">
                                                {album.images?.slice(0, 5).map((img: string, i: number) => (
                                                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden"><img src={img} className="h-full w-full object-cover" /></div>
                                                ))}
                                            </div>
                                            <Link href={`/admin/gallery/${album._id}`} className="text-[10px] font-black uppercase tracking-widest text-oxford/40 hover:text-sandstone transition-colors flex items-center gap-1">View Album <ChevronRight size={14} /></Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )
            }

            {/* Add Category Modal */}
            <AnimatePresence>
                {isCategoryModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCategoryModalOpen(false)} className="absolute inset-0 bg-oxford/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl border border-white/10">
                            <h3 className="text-2xl font-black text-oxford uppercase tracking-tight mb-2">Create New Category</h3>
                            <p className="text-sm text-gray-400 mb-8">Group your albums with a custom tag.</p>
                            <input type="text" autoFocus value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()} className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 mb-6 font-bold text-oxford focus:ring-4 focus:ring-sandstone/10 outline-none" placeholder="e.g. Science Fair 2024" />
                            <div className="flex gap-4">
                                <button onClick={() => setIsCategoryModalOpen(false)} className="flex-1 py-4 text-gray-400 font-bold uppercase text-xs tracking-widest">Cancel</button>
                                <button onClick={handleAddCategory} className="flex-2 px-8 py-4 bg-oxford text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-sandstone hover:text-oxford transition-all">Add Category</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Manage Categories Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditModalOpen(false)} className="absolute inset-0 bg-oxford/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="relative bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl border border-white/10 max-h-[80vh] flex flex-col">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-black text-oxford uppercase tracking-tight">Manage Categories</h3>
                                <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
                            </div>
                            <div className="flex-1 overflow-y-auto pr-2 space-y-4 no-scrollbar">
                                {dynamicCategories.length === 0 ? (
                                    <p className="text-center py-10 text-gray-300 italic">No custom categories added yet.</p>
                                ) : (
                                    dynamicCategories.map((cat: any) => (
                                        <div key={cat._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group">
                                            <div className="flex items-center gap-3">
                                                <GripVertical className="text-gray-300" size={18} />
                                                <span className="font-bold text-oxford">{cat.name}</span>
                                            </div>
                                            <button onClick={() => handleDeleteCategory(cat._id)} className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                                        </div>
                                    ))
                                )}
                            </div>
                            <p className="mt-6 text-[10px] text-gray-400 uppercase tracking-widest font-black text-center">* System categories cannot be deleted.</p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div >
    );
}
