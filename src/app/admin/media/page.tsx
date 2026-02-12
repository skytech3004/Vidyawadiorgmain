"use client";

import React, { useEffect, useState } from "react";
import {
    ImageIcon,
    Trash2,
    Copy,
    Search,
    ExternalLink,
    Info,
    Loader2,
    CheckCircle2,
    Clock,
    HardDrive
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MediaLibraryPage() {
    const [loading, setLoading] = useState(true);
    const [media, setMedia] = useState<any[]>([]);
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/media");
            const data = await res.json();
            if (data.success) {
                setMedia(data.files);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteMedia = async (url: string) => {
        if (!confirm("Are you sure? This will remove the image permanently.")) return;

        try {
            const res = await fetch(`/api/admin/media/item?url=${encodeURIComponent(url)}`, {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.success) {
                setMedia(media.filter(m => m.url !== url));
                if (selectedImage?.url === url) setSelectedImage(null);
            }
        } catch (error) {
            alert("Failed to delete");
        }
    };

    const copyUrl = (url: string) => {
        navigator.clipboard.writeText(window.location.origin + url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const filteredMedia = media.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-oxford mb-2">Media Library</h1>
                    <p className="text-gray-400 font-medium">Manage and optimize your school's digital assets.</p>
                </div>

                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-sandstone transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search assets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl w-full md:w-80 shadow-sm focus:outline-none focus:border-sandstone transition-all"
                    />
                </div>
            </div>

            <div className="grid lg:grid-cols-[1fr,350px] gap-8">
                {/* Grid View */}
                <div className="space-y-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-[500px] bg-white rounded-[2.5rem] border border-gray-50 shadow-sm">
                            <Loader2 className="animate-spin text-sandstone" size={40} />
                            <p className="mt-4 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Indexing library...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredMedia.map((item) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    key={item.url}
                                    onClick={() => setSelectedImage(item)}
                                    className={`
                    group relative aspect-square rounded-3xl overflow-hidden cursor-pointer transition-all duration-300
                    ${selectedImage?.url === item.url ? "ring-4 ring-sandstone scale-95 shadow-2xl" : "hover:scale-[1.02] shadow-sm"}
                  `}
                                >
                                    <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-oxford/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                                        <div className="px-2 py-0.5 bg-white/90 backdrop-blur shadow-sm rounded-full text-[8px] font-black text-oxford uppercase tracking-tighter">
                                            {formatSize(item.size)}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredMedia.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50/50 rounded-[2.5rem] border border-gray-100">
                            <ImageIcon className="text-gray-200 mb-4" size={48} />
                            <p className="text-gray-400 font-bold">No assets found</p>
                        </div>
                    )}
                </div>

                {/* Info Sidebar */}
                <div className="relative">
                    <div className="sticky top-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden min-h-[600px] flex flex-col">
                        <AnimatePresence mode="wait">
                            {selectedImage ? (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="p-6 flex flex-col h-full"
                                    key={selectedImage.url}
                                >
                                    <div className="aspect-square rounded-3xl overflow-hidden mb-6 border border-gray-50">
                                        <img src={selectedImage.thumbnail} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="space-y-6 flex-1">
                                        <div>
                                            <h3 className="text-lg font-black text-oxford truncate mb-1">{selectedImage.name}</h3>
                                            <p className="text-[10px] text-sandstone font-black uppercase tracking-widest flex items-center gap-1">
                                                <CheckCircle2 size={12} />
                                                Processed WebP
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm">
                                                    <HardDrive size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-tight">File Size</p>
                                                    <p className="text-xs font-bold text-oxford">{formatSize(selectedImage.size)}</p>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm">
                                                    <Clock size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-tight">Uploaded</p>
                                                    <p className="text-xs font-bold text-oxford">{new Date(selectedImage.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-4">
                                            <button
                                                onClick={() => copyUrl(selectedImage.url)}
                                                className={`
                          w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest transition-all
                          ${copied ? "bg-green-500 text-white" : "bg-oxford text-white hover:bg-sandstone shadow-lg hover:shadow-xl"}
                        `}
                                            >
                                                {copied ? (
                                                    <>
                                                        <CheckCircle2 size={16} />
                                                        Copied to Clipboard
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy size={16} />
                                                        Copy High-Res URL
                                                    </>
                                                )}
                                            </button>

                                            <a
                                                href={selectedImage.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-full py-4 rounded-2xl border border-gray-100 flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest text-gray-400 hover:text-oxford hover:bg-gray-50 transition-all"
                                            >
                                                <ExternalLink size={16} />
                                                Open Original
                                            </a>

                                            <button
                                                onClick={() => deleteMedia(selectedImage.url)}
                                                className="w-full py-4 rounded-2xl border border-red-100 flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest text-red-400 hover:bg-red-50 transition-all mt-8"
                                            >
                                                <Trash2 size={16} />
                                                Delete Permanently
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                                    <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200 mb-6 border border-gray-100">
                                        <Info size={32} />
                                    </div>
                                    <h3 className="text-xl font-black text-oxford mb-2">Metadata Box</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">Select an asset from the grid to view detailed dimensions, optimization stats, and direct links.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
