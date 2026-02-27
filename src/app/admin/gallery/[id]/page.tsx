"use client";

import React, { useEffect, useState, use } from "react";
import GalleryForm from "@/components/admin/GalleryForm";
import { Loader2 } from "lucide-react";

export default function EditGalleryAlbumPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [album, setAlbum] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const res = await fetch(`/api/admin/gallery-albums/${resolvedParams.id}`);
                const data = await res.json();
                if (data.success) {
                    setAlbum(data.album);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAlbum();
    }, [resolvedParams.id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20">
                <Loader2 className="animate-spin text-sandstone" size={32} />
                <p className="text-sm text-gray-500 mt-4">Loading album details...</p>
            </div>
        );
    }

    if (!album) {
        return (
            <div className="text-center p-20">
                <h3 className="text-xl font-bold text-oxford">Album not found</h3>
                <p className="text-gray-500">The album you are trying to edit does not exist.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-oxford uppercase tracking-tight">Edit Gallery Album</h2>
                <p className="text-sm text-gray-500">Update the details and images of "{album.albumTitle}".</p>
            </div>
            <GalleryForm initialData={album} isEditing />
        </div>
    );
}
