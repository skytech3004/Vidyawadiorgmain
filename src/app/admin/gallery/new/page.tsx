"use client";

import React from "react";
import GalleryForm from "@/components/admin/GalleryForm";

export default function NewGalleryItemPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-oxford uppercase tracking-tight">Add Gallery Image</h2>
                <p className="text-sm text-gray-500">Add a new photo to the school's event gallery.</p>
            </div>
            <GalleryForm />
        </div>
    );
}
