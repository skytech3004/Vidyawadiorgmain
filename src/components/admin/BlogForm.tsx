"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Type, Link, Tag, User, Eye, EyeOff } from "lucide-react";

interface BlogFormProps {
    initialData?: any;
}

export default function BlogForm({ initialData }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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

        try {
            const res = await fetch("/api/admin/blog", {
                method: initialData ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/blog");
                router.refresh();
            }
        } catch (error) {
            console.error("Error saving post:", error);
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
                    <div className="space-y-2">
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

                    {/* Image URL */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            Featured Image URL
                        </label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                            placeholder="/media/blog/featured.webp"
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            Post Content (Markdown or HTML)
                        </label>
                        <textarea
                            required
                            rows={15}
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50 font-mono text-sm"
                            placeholder="Write your story here..."
                        />
                    </div>

                    {/* Published Status */}
                    <div className="md:col-span-2 pt-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-12 h-6 rounded-full transition-all relative ${formData.published ? 'bg-green-500' : 'bg-gray-300'}`}>
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.published ? 'left-7' : 'left-1'}`} />
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                            />
                            <span className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                                {formData.published ? <Eye size={18} /> : <EyeOff size={18} />}
                                {formData.published ? 'Published (Live on Site)' : 'Draft (Admin Only)'}
                            </span>
                        </label>
                    </div>
                </div>
            </div>

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
