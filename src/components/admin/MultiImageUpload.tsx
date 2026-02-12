"use client";

import React, { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2, GripVertical, Trash2 } from "lucide-react";

interface MultiImageUploadProps {
    onImagesChange: (urls: string[]) => void;
    images: string[];
    folder?: string;
}

export default function MultiImageUpload({
    onImagesChange,
    images = [],
    folder = "gallery"
}: MultiImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setUploading(true);
        const newUrls: string[] = [...images];

        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("folder", folder);

                const res = await fetch("/api/admin/upload", {
                    method: "POST",
                    body: formData,
                });
                const data = await res.json();
                if (data.success) {
                    newUrls.push(data.url);
                }
            }
            onImagesChange(newUrls);
        } catch (error) {
            alert("An error occurred during some uploads");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const removeImage = (index: number) => {
        const updated = images.filter((_, i) => i !== index);
        onImagesChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-sandstone">Album Photos</label>
                <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{images.length} Images</span>
            </div>

            {/* Upload Trigger */}
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full py-8 border-2 border-dashed border-gray-100 bg-gray-50/50 rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-all group lg:min-h-[160px]"
            >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {uploading ? (
                        <Loader2 className="animate-spin text-sandstone" size={20} />
                    ) : (
                        <Upload className="text-gray-400" size={20} />
                    )}
                </div>
                <div className="text-center">
                    <p className="text-xs font-bold text-oxford">Click to upload multiple photos</p>
                    <p className="text-[10px] text-gray-400 tracking-tighter uppercase font-medium">Select one or more images (JPG, PNG, WebP)</p>
                </div>
            </button>

            <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            {/* Image List */}
            <div className="space-y-3">
                {images.map((url, index) => (
                    <div
                        key={`${url}-${index}`}
                        className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-2xl group hover:border-sandstone/30 transition-colors shadow-sm"
                    >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                            <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-mono text-gray-400 truncate">{url.split('/').pop()}</p>
                            <p className="text-[9px] font-black text-sandstone uppercase tracking-widest mt-0.5">Ready for display</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}

                {images.length === 0 && !uploading && (
                    <div className="text-center py-12 px-6 border border-gray-50 rounded-3xl bg-gray-50/30">
                        <ImageIcon className="mx-auto text-gray-200 mb-2" size={32} />
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No images in this album yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
