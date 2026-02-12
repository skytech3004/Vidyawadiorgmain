"use client";

import React, { useState, useEffect } from "react";
import {
    Save,
    Type,
    Loader2,
    ArrowLeft,
    Link as LinkIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdvancedImageUpload from "./AdvancedImageUpload";

interface BlogFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        content: initialData?.content || "",
        category: initialData?.category || "News",
        coverImage: initialData?.coverImage || "",
        isPublished: initialData?.isPublished ?? false,
        author: initialData?.author || "Vidyawadi Admin",
    });

    // Auto-slug generation
    useEffect(() => {
        if (!isEditing && formData.title) {
            const generatedSlug = formData.title
                .toLowerCase()
                .replace(/[^\w\s-]/g, "") // Remove special characters
                .replace(/\s+/g, "-")     // Replace spaces with -
                .replace(/-+/g, "-")      // Replace multiple - with single -
                .trim();
            setFormData(prev => ({ ...prev, slug: generatedSlug }));
        }
    }, [formData.title, isEditing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEditing
                ? `/api/admin/blog/${initialData._id}`
                : "/api/admin/blog";

            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success) {
                router.push("/admin/blog");
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
                href="/admin/blog"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-oxford transition-colors mb-8 font-bold text-xs uppercase tracking-widest"
            >
                <ArrowLeft size={16} />
                Back to Newsroom
            </Link>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm space-y-8">
                    {/* Title & Slug Section */}
                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Post Title</label>
                            <div className="relative">
                                <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter a compelling headline..."
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors font-bold text-oxford"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Display Slug (URL)</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="post-url-slug"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors text-xs font-mono text-gray-500"
                                    required
                                />
                            </div>
                            <p className="text-[9px] text-gray-400 uppercase tracking-wider px-1">Generated automatically from title. Edit only if necessary.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors appearance-none font-bold text-oxford"
                            >
                                <option value="News">School News</option>
                                <option value="Achievement">Student Achievement</option>
                                <option value="Event">Upcoming Event</option>
                                <option value="Academic">Academic Update</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Author Name</label>
                            <input
                                type="text"
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                placeholder="Vidyawadi Admin"
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors font-bold text-oxford"
                            />
                        </div>
                    </div>

                    {/* Advanced Image Upload Component */}
                    <AdvancedImageUpload
                        label="Banner Image"
                        folder="blog"
                        value={formData.coverImage}
                        onUpload={(url: string) => setFormData({ ...formData, coverImage: url })}
                        onRemove={() => setFormData({ ...formData, coverImage: "" })}
                    />

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Content</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Tell the story..."
                            rows={12}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-3xl focus:outline-none focus:border-sandstone transition-colors resize-none leading-relaxed"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-oxford/5 rounded-2xl border border-oxford/10">
                        <input
                            type="checkbox"
                            id="isPublished"
                            checked={formData.isPublished}
                            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                            className="w-5 h-5 accent-oxford"
                        />
                        <label htmlFor="isPublished" className="text-sm font-black text-oxford uppercase tracking-widest cursor-pointer">
                            Publish this post immediately
                        </label>
                    </div>
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
                                {isEditing ? "Update News" : "Broadcast Now"}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
