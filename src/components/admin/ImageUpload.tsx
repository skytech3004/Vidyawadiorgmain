"use client";

import React, { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
    onUpload: (url: string) => void;
    onRemove: () => void;
    value?: string;
    folder?: string;
    label?: string;
}

export default function ImageUpload({
    onUpload,
    onRemove,
    value,
    folder = "uploads",
    label = "Image"
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                onUpload(data.url);
            } else {
                alert(data.error || "Upload failed");
            }
        } catch (error) {
            alert("An error occurred during upload");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">{label}</label>

            <div className="relative">
                {value ? (
                    <div className="relative aspect-video rounded-3xl overflow-hidden group border border-gray-100 shadow-sm">
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-oxford/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                type="button"
                                onClick={onRemove}
                                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="w-full aspect-video rounded-3xl border-2 border-dashed border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center gap-3 hover:bg-gray-50 transition-all group disabled:opacity-50"
                    >
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            {uploading ? (
                                <Loader2 className="animate-spin text-sandstone" size={24} />
                            ) : (
                                <Upload className="text-gray-400 group-hover:text-sandstone" size={24} />
                            )}
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-bold text-oxford">Click to upload {label.toLowerCase()}</p>
                            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">PNG, JPG or WebP up to 5MB</p>
                        </div>
                    </button>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
            </div>
        </div>
    );
}
