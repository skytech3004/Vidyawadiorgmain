"use client";

import React from "react";
import GalleryForm from "@/components/admin/GalleryForm";

export default function NewGalleryItemPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-oxford uppercase tracking-tight">Create Gallery Album</h2>
                <p className="text-sm text-gray-500">Group multiple photos into a new event album.</p>
            </div>
            <GalleryForm />
        </div>
    );
}
