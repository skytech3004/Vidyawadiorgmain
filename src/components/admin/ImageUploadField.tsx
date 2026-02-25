"use client";

import React, { useState } from "react";
import { ImageIcon, X, Upload, Loader2, AlertCircle } from "lucide-react";

interface ImageUploadFieldProps {
    label: string;
    value: string;
    onChange: (url: string) => void;
    folder?: string;
    className?: string;
    description?: string;
}

export default function ImageUploadField({
    label,
    value,
    onChange,
    folder = "uploads",
    className = "",
    description = "Square aspect ratio recommended, under 2MB. formats: JPG, PNG, WEBP."
}: ImageUploadFieldProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (file.size > 2 * 1024 * 1024) {
            setError("File size exceeds 2MB limit.");
            return;
        }

        setError(null);
        setUploading(true);

        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("folder", folder);

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: uploadData
            });
            const data = await res.json();

            if (data.success) {
                onChange(data.url);
            } else {
                setError(data.error || "Upload failed");
            }
        } catch (err) {
            console.error("Upload error:", err);
            setError("A network error occurred during upload.");
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        onChange("");
        setError(null);
    };

    return (
        <div className={`space-y-3 ${className}`}>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
                {label}
            </label>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Preview Area */}
                <div className="w-32 h-32 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative group shrink-0 shadow-inner">
                    {value ? (
                        <>
                            <img
                                src={value}
                                alt="Preview"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=Invalid+Path';
                                }}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                <button
                                    type="button"
                                    onClick={handleRemove}
                                    className="p-2 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-all hover:scale-110 shadow-lg"
                                    title="Remove Image"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-gray-300 flex flex-col items-center gap-2">
                            <ImageIcon size={24} />
                            <span className="text-[10px] font-bold uppercase tracking-tight">Empty</span>
                        </div>
                    )}

                    {uploading && (
                        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
                            <Loader2 className="animate-spin text-sandstone" size={20} />
                            <span className="text-[10px] font-bold text-oxford mt-2">Uploading...</span>
                        </div>
                    )}
                </div>

                {/* Controls Area */}
                <div className="flex-1 space-y-4 w-full">
                    <div className="flex flex-col xl:flex-row gap-3">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all bg-gray-50/50 text-sm font-medium pr-10"
                                placeholder="Paste URL or click upload..."
                            />
                        </div>
                        <label className="cursor-pointer px-6 py-3 bg-white border border-gray-100 text-oxford rounded-xl font-bold hover:bg-oxford hover:text-white transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm group active:scale-95">
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleUpload}
                                disabled={uploading}
                            />
                            <Upload size={18} className="group-hover:-translate-y-1 transition-transform" />
                            <span>Upload</span>
                        </label>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-500 text-[11px] font-bold bg-red-50 p-2 rounded-lg border border-red-100">
                            <AlertCircle size={14} />
                            {error}
                        </div>
                    )}

                    {!error && description && (
                        <p className="text-[10px] text-gray-400 font-medium leading-relaxed uppercase tracking-tighter">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
