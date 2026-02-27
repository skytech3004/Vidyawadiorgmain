"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Save,
    X,
    ImageIcon,
    Tag,
    Type,
    Calendar,
    AlignLeft,
    Trash2,
    Image as ImagesIcon,
    Plus
} from "lucide-react";
import BulkImageUpload from "./BulkImageUpload";
import { cn } from "@/lib/utils";

interface GalleryFormProps {
    initialData?: any;
    isEditing?: boolean;
}

const DEFAULT_CATEGORIES = ["Campus", "Events", "Sports", "Laboratories", "Academic", "Hostel", "Infrastructure", "NAAC", "Others"];

export default function GalleryForm({ initialData, isEditing }: GalleryFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
    const [showBulkUpload, setShowBulkUpload] = useState(!isEditing || (initialData?.images?.length || 0) === 0);
    const [formData, setFormData] = useState<any>(initialData || {
        albumTitle: "",
        description: "",
        category: "Events",
        date: new Date().toISOString().split('T')[0],
        images: [],
        isActive: true
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/admin/gallery-categories");
                const data = await res.json();
                if (data.success && data.categories.length > 0) {
                    const dynCats = data.categories.map((c: any) => c.name);
                    // Merge dynamic with defaults, avoiding duplicates
                    const merged = Array.from(new Set([...dynCats, ...DEFAULT_CATEGORIES]));
                    setCategories(merged);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleBulkUploadComplete = (newUrls: string[]) => {
        setFormData((prev: any) => {
            const combined = [...prev.images, ...newUrls];
            const unique = Array.from(new Set(combined));
            return {
                ...prev,
                images: unique
            };
        });
        setShowBulkUpload(false);
    };

    const removeImage = (index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            images: prev.images.filter((_: any, i: number) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.images.length === 0) {
            alert("Please upload at least one image to the album.");
            return;
        }

        setLoading(true);

        try {
            const url = isEditing
                ? `/api/admin/gallery-albums/${initialData._id}`
                : "/api/admin/gallery-albums";

            const res = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                // Refresh public cache
                await fetch("/api/gallery/revalidate?secret=vidyawadi_refresh_2026");
                router.push("/admin/gallery");
                router.refresh();
            } else {
                const error = await res.json();
                alert(`Error: ${error.error || "Failed to save album"}`);
            }
        } catch (error) {
            console.error("Error saving gallery album:", error);
            alert("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Metadata */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <h4 className="text-xs font-black text-oxford uppercase tracking-widest border-b border-gray-50 pb-4">Album Details</h4>

                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <Type size={14} className="text-sandstone" />
                                Album Title
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.albumTitle}
                                onChange={(e) => setFormData({ ...formData, albumTitle: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-sandstone/10 transition-all bg-gray-50/50 text-sm font-bold"
                                placeholder="e.g. Annual Day 2024"
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <Tag size={14} className="text-sandstone" />
                                Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-sandstone/10 transition-all bg-gray-50/50 text-sm font-bold"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <Calendar size={14} className="text-sandstone" />
                                Event Date
                            </label>
                            <input
                                type="date"
                                required
                                value={formData.date?.split('T')[0]}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-sandstone/10 transition-all bg-gray-50/50 text-sm font-bold"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <AlignLeft size={14} className="text-sandstone" />
                                Final Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-sandstone/10 transition-all bg-gray-50/50 text-sm font-medium min-h-[100px] resize-none"
                                placeholder="Short description about this album..."
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 font-bold text-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
                        >
                            <X size={18} />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] px-8 py-4 rounded-2xl bg-oxford text-white font-black hover:bg-sandstone hover:text-oxford shadow-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] disabled:opacity-50"
                        >
                            <Save size={18} />
                            {loading ? "Saving..." : "Save Album"}
                        </button>
                    </div>
                </div>

                {/* Right Side: Images */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm min-h-[600px] flex flex-col">
                        <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
                            <h4 className="text-xs font-black text-oxford uppercase tracking-widest flex items-center gap-2">
                                <ImagesIcon size={16} className="text-sandstone" />
                                Album Images ({formData.images.length})
                            </h4>
                            {!showBulkUpload && (
                                <button
                                    type="button"
                                    onClick={() => setShowBulkUpload(true)}
                                    className="px-4 py-2 bg-sandstone/10 text-oxford rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-sandstone transition-all"
                                >
                                    <Plus size={14} />
                                    Add More
                                </button>
                            )}
                        </div>

                        {showBulkUpload ? (
                            <BulkImageUpload
                                onUploadComplete={handleBulkUploadComplete}
                                folder={`gallery/${formData.albumTitle.replace(/\s+/g, '-').toLowerCase()}`}
                            />
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                                {formData.images.map((url: string, index: number) => (
                                    <div key={index} className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                                        <img src={url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all hover:scale-110 shadow-lg"
                                                title="Remove Image"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                        <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[8px] font-black text-oxford uppercase shadow-sm">
                                            #{index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!showBulkUpload && formData.images.length === 0 && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 gap-4">
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300">
                                    <ImageIcon size={32} />
                                </div>
                                <p className="text-sm text-gray-400 font-medium italic">No images in this album yet.<br />Upload some to get started!</p>
                                <button
                                    type="button"
                                    onClick={() => setShowBulkUpload(true)}
                                    className="px-6 py-3 bg-sandstone text-oxford rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:scale-105 transition-all"
                                >
                                    Upload First Images
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
