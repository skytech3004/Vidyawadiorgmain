"use client";

import { notFound } from "next/navigation";
import { galleryAlbums } from "@/data/galleryData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionRenderer from "@/components/SectionRenderer";

import React from "react";

export default function AlbumDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const album = galleryAlbums.find(a => a.id === id);

    if (!album) {
        notFound();
    }

    const sections = [
        {
            _id: "hero",
            type: "hero",
            isVisible: true,
            content: {
                title: album.title,
                subtitle: album.description,
                image: album.coverImage
            }
        },
        {
            _id: "album-gallery",
            type: "scattered-grid",
            isVisible: true,
            content: {
                title: "Album Photos",
                description: `A collection of ${album.images.length} images from ${album.title}. Scroll down to witness the highlights.`,
                images: album.images
            }
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <SectionRenderer sections={sections} />
            <Footer />
        </main>
    );
}
