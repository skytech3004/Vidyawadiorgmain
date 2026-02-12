"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { Upload, X, ImageIcon, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface AdvancedImageUploadProps {
    onUpload: (url: string) => void;
    onRemove: () => void;
    value?: string;
    folder?: string;
    label?: string;
}

export default function AdvancedImageUpload({
    onUpload,
    onRemove,
    value,
    folder = "media",
    label = "Image"
}: AdvancedImageUploadProps) {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setError(null);
        setIsUploading(true);
        setProgress(0);

        try {
            // 1. Client-Side Format Correction (Handle HEIC / Octet-Stream)
            let processingFile = file;
            const extension = file.name.split('.').pop()?.toLowerCase();

            // If browser doesn't recognize type, or it's HEIC, mark it as image
            if (!file.type || file.type === "application/octet-stream" || extension === "heic" || extension === "heif") {
                console.log("[UPLOAD] Correcting MIME type for:", file.name);
                // We create a new file object with a proper image type so the compression tool handles it
                processingFile = new File([file], file.name, { type: "image/jpeg" });
            }

            // 1. Client-side compression
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1600,
                useWebWorker: true,
                fileType: "image/webp" // Force output to webp if possible
            };

            const compressedFile = await imageCompression(processingFile, options);

            // 2. Upload with Progress
            const formData = new FormData();
            formData.append("file", compressedFile);
            formData.append("folder", folder);

            const response = await axios.post("/api/admin/media", formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || 1)
                    );
                    setProgress(percentCompleted);
                },
            });

            if (response.data.success) {
                onUpload(response.data.url);
            } else {
                setError(response.data.error || "Upload failed");
            }
        } catch (err: any) {
            console.error("Upload Error:", err);
            setError(err.response?.data?.error || "An error occurred during upload");
        } finally {
            setIsUploading(false);
        }
    }, [folder, onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
            'application/octet-stream': ['.heic', '.heif'], // Some browsers use this for HEIC
        },
        multiple: false,
        maxSize: 10 * 1024 * 1024, // Increased to 10MB to allow high-res HEIC uploads
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">{label}</label>
                {isUploading && (
                    <span className="text-[10px] font-black text-sandstone animate-pulse">{progress}%</span>
                )}
            </div>

            {value ? (
                <div className="relative group">
                    <div className="aspect-video rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm relative">
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-oxford/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                            <button
                                type="button"
                                onClick={onRemove}
                                className="p-4 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all shadow-xl hover:scale-110 active:scale-95 flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
                            >
                                <X size={18} />
                                Remove
                            </button>
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
                        <CheckCircle2 size={16} />
                    </div>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={`
            relative aspect-video rounded-[2rem] border-2 border-dashed transition-all cursor-pointer overflow-hidden
            ${isDragActive ? "border-sandstone bg-sandstone/5 scale-[0.99]" : "border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200"}
            ${error ? "border-red-200 bg-red-50/30" : ""}
          `}
                >
                    <input {...getInputProps()} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center gap-4">
                        <div className={`
              w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-sm transition-all duration-500
              ${isUploading ? "bg-sandstone text-white rotate-180" : "bg-white text-gray-400 group-hover:scale-110"}
            `}>
                            {isUploading ? (
                                <Loader2 className="animate-spin" size={28} />
                            ) : (
                                <Upload size={28} />
                            )}
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-bold text-oxford">
                                {isUploading ? "Processing..." : "Drop photo here or click"}
                            </p>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                                WebP preferred, max 2MB
                            </p>
                        </div>

                        {isUploading && (
                            <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden mt-2">
                                <div
                                    className="h-full bg-sandstone transition-all duration-300 rounded-full"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 animate-bounce">
                                <AlertCircle size={14} />
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
