"use client";

import React, { useState } from "react";
import {
    Save,
    Image as ImageIcon,
    Type,
    FileText,
    Loader2,
    ArrowLeft,
    LayoutGrid
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdvancedImageUpload from "./AdvancedImageUpload";
import AdvancedMultiUpload from "./AdvancedMultiUpload";

interface GalleryFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function GalleryForm({ initialData, isEditing = false }: GalleryFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        coverImage: initialData?.coverImage || "",
        images: initialData?.images || [],
        category: initialData?.category || "School Life",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEditing
                ? `/api/admin/gallery/${initialData._id}`
                : "/api/admin/gallery";

            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success) {
                router.push("/admin/gallery");
                router.refresh();
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (error) {
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <Link
                href="/admin/gallery"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-oxford transition-colors mb-8 font-bold text-xs uppercase tracking-widest"
            >
                <ArrowLeft size={16} />
                Back to Gallery
            </Link>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm space-y-10">
                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Album Title</label>
                            <div className="relative">
                                <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Annual Day 2024"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors font-bold text-oxford"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors appearance-none font-bold text-oxford"
                            >
                                <option>School Life</option>
                                <option>Events</option>
                                <option>Campus</option>
                                <option>Academic</option>
                                <option>Sports</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Short summary of this album..."
                            rows={3}
                            className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors resize-none font-medium"
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Advanced Cover Image Upload */}
                        <AdvancedImageUpload
                            label="Album Cover Photo"
                            folder="gallery"
                            value={formData.coverImage}
                            onUpload={(url: string) => setFormData({ ...formData, coverImage: url })}
                            onRemove={() => setFormData({ ...formData, coverImage: "" })}
                        />

                        <div className="space-y-6">
                            <div className="p-6 bg-sandstone/5 rounded-3xl border border-sandstone/10">
                                <h4 className="text-xs font-black text-oxford uppercase tracking-widest mb-2">Album Tips</h4>
                                <ul className="space-y-2">
                                    <li className="text-[10px] text-gray-500 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-sandstone rounded-full" />
                                        Use a high-quality cover image
                                    </li>
                                    <li className="text-[10px] text-gray-400 flex items-center gap-2 font-medium">
                                        <span className="w-1 h-1 bg-sandstone rounded-full" />
                                        Upload related images in bulk below
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-50" />

                    {/* Advanced Multi-Image Gallery Component */}
                    <AdvancedMultiUpload
                        images={formData.images}
                        folder="gallery"
                        onImagesChange={(urls: string[]) => setFormData({ ...formData, images: urls })}
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-8 py-4 bg-white text-gray-400 rounded-2xl font-bold uppercase tracking-wider hover:text-oxford transition-colors"
                    >
                        Discard
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-10 py-4 bg-oxford text-white rounded-2xl font-bold uppercase tracking-wider shadow-xl hover:bg-sandstone transition-colors flex items-center gap-2 group disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                <Save size={20} className="group-hover:scale-110 transition-transform" />
                                {isEditing ? "Update Album" : "Create Album"}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
