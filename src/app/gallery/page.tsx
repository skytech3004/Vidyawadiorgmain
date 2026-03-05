"use client";

import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Image as ImageIcon, X, ChevronLeft, ChevronRight, Loader2, Filter } from "lucide-react";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryAlbum {
    _id: string;
    albumTitle: string;
    description: string;
    images: string[];
    category: string;
    date: string;
    updatedAt: string;
}

function GalleryContent() {
    const searchParams = useSearchParams();
    const urlCategory = searchParams.get("category");

    const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
    const [dynamicCategories, setDynamicCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        if (urlCategory) {
            setActiveCategory(urlCategory);
        }
    }, [urlCategory]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [galleryRes, catsRes] = await Promise.all([
                    fetch("/api/gallery"),
                    fetch("/api/admin/gallery-categories")
                ]);

                const galleryData = await galleryRes.json();
                const catsData = await catsRes.json();

                if (galleryData.success && galleryData.data) {
                    const sortedAlbums = galleryData.data.sort((a: any, b: any) =>
                        new Date(b.date || b.updatedAt).getTime() - new Date(a.date || a.updatedAt).getTime()
                    );
                    setAlbums(sortedAlbums);
                }
                if (catsData.success && catsData.categories) {
                    setDynamicCategories(catsData.categories.map((c: any) => c.name));
                }
            } catch (error) {
                console.error("Failed to fetch gallery:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const categories = useMemo(() => {
        const albumCats = new Set(albums.map(a => a.category || "General"));
        return Array.from(new Set(["All", ...dynamicCategories, ...Array.from(albumCats)])).sort();
    }, [albums, dynamicCategories]);

    const filteredAlbums = useMemo(() => {
        if (activeCategory === "All") return albums;
        return albums.filter(a => (a.category || "General") === activeCategory);
    }, [albums, activeCategory]);

    const allImages = useMemo(() => {
        return filteredAlbums.flatMap(album =>
            album.images.map(img => ({ url: img, albumTitle: album.albumTitle }))
        );
    }, [filteredAlbums]);

    const openLightbox = (url: string) => {
        const index = allImages.findIndex(img => img.url === url);
        if (index !== -1) setSelectedImage(index);
    };

    return (
        <main className="min-h-screen bg-white font-inter">
            <Navbar />

            {/* Header */}
            <section id="home" data-theme="dark" className="pt-40 pb-10 px-6 bg-oxford text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sandstone/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sandstone font-bold uppercase tracking-[0.4em] text-sm block mb-4"
                    >
                        Our Visual Journey
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 leading-tight uppercase"
                    >
                        Our <span className="text-sandstone">Gallery</span>
                    </motion.h1>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full mb-8"
                    />
                    <p className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                        Witness the journey of excellence, creativity, and joy through our curated collection of moments.
                    </p>
                </div>
            </section>

            {/* Filter Bar */}
            <div className="sticky top-[120px] z-40 px-6 mt-6">
                <div className="max-w-7xl mx-auto bg-sandstone rounded-[2.5rem] p-2 shadow-xl border border-sandstone/20 overflow-x-auto flex items-center gap-6 no-scrollbar">
                    <div className="flex items-center gap-3 text-oxford/60 font-black uppercase text-[10px] tracking-widest shrink-0 ml-4 line-clamp-1">
                        <Filter className="w-3.5 h-3.5" />
                        Category
                    </div>
                    <div className="flex gap-2 shrink-0 pr-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "relative px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-colors duration-300 whitespace-nowrap z-10",
                                    activeCategory === cat ? "text-white" : "text-oxford/50 hover:text-oxford"
                                )}
                            >
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-oxford rounded-full -z-10 border border-white/20 shadow-lg"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <section className="pt-16 pb-24 px-4 md:px-6 min-h-[600px]">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-20 gap-4">
                            <Loader2 className="w-12 h-12 animate-spin text-sandstone" />
                            <p className="text-oxford font-bold uppercase tracking-widest text-xs">Curating Memories...</p>
                        </div>
                    ) : (
                        <div className="space-y-32 md:space-y-40">
                            {filteredAlbums.length > 0 ? (
                                filteredAlbums.map((album, idx) => (
                                    <motion.div
                                        key={album._id}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="space-y-10 md:space-y-12"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black/5 pb-8 md:pb-10 gap-6">
                                            <div className="max-w-2xl">
                                                <div className="flex items-center gap-3 text-sandstone text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                                                    <span className="w-10 h-px bg-sandstone/30" />
                                                    {album.category}
                                                </div>
                                                <h3 className="text-3xl md:text-5xl font-black text-oxford uppercase tracking-tight mb-4">
                                                    {album.albumTitle}
                                                </h3>
                                                {album.description && (
                                                    <p className="text-sm md:text-base text-gray-500 font-medium italic max-w-xl border-l-2 border-sandstone/30 pl-6 py-1">
                                                        "{album.description}"
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 text-oxford/40 text-[10px] font-black uppercase tracking-widest bg-slate-50 px-5 py-3 rounded-2xl border border-black/5">
                                                <Calendar className="w-4 h-4 text-sandstone" />
                                                {new Date(album.date).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {album.images.slice(0, 12).map((img, i) => (
                                                <motion.div
                                                    key={img}
                                                    whileHover={{ y: -10, scale: 1.02 }}
                                                    onClick={() => openLightbox(img)}
                                                    className="group relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-slate-50 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700"
                                                >
                                                    <Image
                                                        src={img}
                                                        alt={`${album.albumTitle} - ${i + 1}`}
                                                        fill
                                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                                        loading={idx === 0 && i < 4 ? "eager" : "lazy"}
                                                        priority={idx === 0 && i < 4}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]">
                                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                                                            <ImageIcon size={24} />
                                                        </div>
                                                    </div>

                                                    <div className="absolute bottom-4 left-4 right-4">
                                                        <p className="text-white text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 text-shadow-sm">
                                                            View Moment {i + 1}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-40">
                                    <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-black/5">
                                        <ImageIcon className="text-slate-200" size={40} />
                                    </div>
                                    <h4 className="text-2xl font-black text-oxford uppercase tracking-tight">No moments found</h4>
                                    <p className="text-slate-400 mt-2 font-medium">Try another category or check back later.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-oxford/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all z-[110]"
                        >
                            <X size={24} />
                        </button>

                        <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(prev => prev! > 0 ? prev! - 1 : allImages.length - 1);
                                }}
                                className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        </div>

                        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(prev => prev! < allImages.length - 1 ? prev! + 1 : 0);
                                }}
                                className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        <div className="relative w-full max-w-6xl aspect-video md:aspect-[16/10] xl:aspect-[16/9]">
                            {selectedImage !== null && (
                                <Image
                                    src={allImages[selectedImage].url}
                                    alt={allImages[selectedImage].albumTitle}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            )}
                        </div>

                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Viewing Moment</p>
                            <h4 className="text-white text-lg md:text-2xl font-black uppercase tracking-tight">
                                {allImages[selectedImage!].albumTitle}
                            </h4>
                            <p className="text-sandstone text-[10px] font-bold uppercase mt-2">
                                {selectedImage + 1} / {allImages.length}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}

export default function GalleryPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-oxford flex items-center justify-center">
                <Loader2 className="animate-spin text-sandstone" size={48} />
            </div>
        }>
            <GalleryContent />
        </Suspense>
    );
}
