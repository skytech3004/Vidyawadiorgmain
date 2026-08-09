"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Type, Link, Tag, User, Eye, EyeOff, Edit3, Upload, Loader2, ImageIcon } from "lucide-react";
import TiptapEditor from "@/components/admin/TiptapEditor";

interface BlogFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function BlogForm({ initialData, isEditing }: BlogFormProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState(initialData || {
        title: "",
        slug: "",
        content: "",
        category: "General",
        image: "",
        tags: [],
        author: "Admin",
        published: false
    });

    const handleFeaturedUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setError("Featured image must be under 2MB.");
            return;
        }

        setError(null);
        setUploading(true);

        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("folder", "blog");

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: uploadData,
            });
            const data = await res.json();

            if (data.success) {
                setFormData((prev: any) => ({ ...prev, image: data.url }));
            } else {
                setError(data.error || "Image upload failed");
            }
        } catch (err) {
            console.error("Upload error:", err);
            setError("Network error during image upload");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    useEffect(() => {
        if (!initialData && formData.title) {
            setFormData((prev: any) => ({ ...prev, slug: generateSlug(formData.title) }));
        }
    }, [formData.title, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const url = isEditing && initialData?._id
                ? `/api/admin/blog/${initialData._id}`
                : "/api/admin/blog";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                router.push("/admin/blog");
                router.refresh();
            } else {
                setError(data.error || "Failed to save post");
            }
        } catch (err) {
            console.error("Error saving post:", err);
            setError("Network error while saving post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <Type size={16} className="text-sandstone" />
                            Post Title
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50 text-xl font-bold"
                            placeholder="Enter a compelling title..."
                        />
                    </div>

                    {/* Slug */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <Link size={16} className="text-sandstone" />
                            Slug (URL Item)
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <Tag size={16} className="text-sandstone" />
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                        >
                            <option value="General">General</option>
                            <option value="Admissions">Admissions</option>
                            <option value="Events">Events</option>
                            <option value="Achievement">Achievement</option>
                            <option value="Academics">Academics</option>
                        </select>
                    </div>

                    {/* Author */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <User size={16} className="text-sandstone" />
                            Author
                        </label>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                        />
                    </div>

                    {/* Featured Image URL + Upload */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <ImageIcon size={16} className="text-sandstone" />
                            Featured Image URL
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                value={formData.image || ""}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="flex-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                                placeholder="Paste URL or upload an image..."
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="px-6 py-3 rounded-xl bg-oxford text-white font-bold hover:bg-oxford/90 transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload size={18} />
                                        Upload
                                    </>
                                )}
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFeaturedUpload}
                            />
                        </div>
                        {formData.image && (
                            <div className="mt-3 w-full max-w-xs aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                                <img
                                    src={formData.image}
                                    alt="Featured preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            "https://placehold.co/640x360?text=Invalid+Image";
                                    }}
                                />
                            </div>
                        )}
                        <p className="text-xs text-gray-400">JPG, PNG, or WEBP · under 2MB · 16:9 recommended</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <Edit3 size={16} className="text-sandstone" />
                            Post Content
                        </label>

                        <TiptapEditor
                            value={formData.content}
                            onChange={(value) =>
                                setFormData({
                                    ...formData,
                                    content: value,
                                })
                            }
                            minHeightClass="min-h-[520px]"
                        />
                    </div>

                    {/* Published Status */}
                    <div className="md:col-span-2 pt-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-12 h-6 rounded-full transition-all relative ${formData.published ? "bg-green-500" : "bg-gray-300"}`}>
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.published ? "left-7" : "left-1"}`} />
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={!!formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                            />
                            <span className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                                {formData.published ? <Eye size={18} /> : <EyeOff size={18} />}
                                {formData.published ? "Published (Live on Site)" : "Draft (Admin Only)"}
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {error && (
                <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="flex items-center gap-4 justify-end">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                    <X size={20} />
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-xl bg-oxford text-white font-bold hover:bg-oxford/90 shadow-lg shadow-oxford/20 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                    <Save size={20} />
                    {loading ? "Saving..." : "Save Post"}
                </button>
            </div>
        </form>
    );
}
