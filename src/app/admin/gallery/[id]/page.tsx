"use client";

import React, { useEffect, useState } from "react";
import GalleryForm from "@/components/admin/GalleryForm";
import { Loader2 } from "lucide-react";

export default function EditGalleryItemPage({ params }: { params: Promise<{ id: string }> }) {
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const { id } = await params;
                const res = await fetch(`/api/admin/gallery/${id}`);
                const data = await res.json();
                if (data.success) {
                    setItem(data.item);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [params]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20">
                <Loader2 className="animate-spin text-sandstone" size={32} />
                <p className="text-sm text-gray-500 mt-4">Loading image details...</p>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="text-center p-20">
                <h3 className="text-xl font-bold text-oxford">Image not found</h3>
                <p className="text-gray-500">The image you are trying to edit does not exist.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-oxford uppercase tracking-tight">Edit Gallery Image</h2>
                <p className="text-sm text-gray-500">Update the details of "{item.title}".</p>
            </div>
            <GalleryForm initialData={item} isEditing />
        </div>
    );
}
