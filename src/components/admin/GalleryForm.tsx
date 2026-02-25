"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Save as SaveIcon,
    X as XIcon,
    Image as ImageIcon,
    Tag as TagIcon,
    Hash as HashIcon,
    Type as TypeIcon
} from "lucide-react";

interface GalleryFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function GalleryForm({ initialData, isEditing }: GalleryFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData || {
        title: "",
        image: "",
        category: "Campus",
        order: 0
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/gallery", {
                method: initialData ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/gallery");
                router.refresh();
            }
        } catch (error) {
            console.error("Error saving gallery item:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <TypeIcon size={16} className="text-sandstone" />
                            Image Title / Caption
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                            placeholder="e.g. Annual Day Celebrations 2024"
                        />
                    </div>

                    {/* Image URL */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <ImageIcon size={16} className="text-sandstone" />
                            Image URL
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                            placeholder="/media/gallery/image-name.webp"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <TagIcon size={16} className="text-sandstone" />
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                        >
                            <option value="Campus">Campus Life</option>
                            <option value="Events">Events & Festivals</option>
                            <option value="Academics">Academics</option>
                            <option value="Sports">Sports</option>
                            <option value="Hostel">Hostel</option>
                        </select>
                    </div>

                    {/* Order */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <HashIcon size={16} className="text-sandstone" />
                            Display Order
                        </label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 justify-end">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                    <XIcon size={20} />
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-xl bg-oxford text-white font-bold hover:bg-oxford/90 shadow-lg shadow-oxford/20 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                    <SaveIcon size={20} />
                    {loading ? "Saving..." : "Save Image"}
                </button>
            </div>
        </form>
    );
}
