"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { Upload, X, ImageIcon, Loader2, CheckCircle2, Trash2, LayoutGrid } from "lucide-react";

interface AdvancedMultiUploadProps {
    onImagesChange: (urls: string[]) => void;
    images: string[];
    folder?: string;
}

export default function AdvancedMultiUpload({
    onImagesChange,
    images = [],
    folder = "gallery"
}: AdvancedMultiUploadProps) {
    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        setIsUploading(true);
        const newUrls: string[] = [...images];

        try {
            const uploadPromises = acceptedFiles.map(async (file, index) => {
                const fileId = `${file.name}-${Date.now()}`;

                // 1. Client-Side Format Correction
                let processingFile = file;
                const extension = file.name.split('.').pop()?.toLowerCase();

                if (!file.type || file.type === "application/octet-stream" || extension === "heic" || extension === "heif") {
                    processingFile = new File([file], file.name, { type: "image/jpeg" });
                }

                // 2. Client-side compression
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1600,
                    useWebWorker: true,
                    fileType: "image/webp"
                };
                const compressedFile = await imageCompression(processingFile, options);

                // 2. Parallel Upload with Progress
                const formData = new FormData();
                formData.append("file", compressedFile);
                formData.append("folder", folder);

                const response = await axios.post("/api/admin/media", formData, {
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                        setUploadProgress(prev => ({ ...prev, [fileId]: percent }));
                    },
                });

                if (response.data.success) {
                    return response.data.url;
                }
                return null;
            });

            const results = await Promise.all(uploadPromises);
            const filteredResults = results.filter(url => url !== null) as string[];
            onImagesChange([...images, ...filteredResults]);
        } catch (error) {
            console.error("Bulk Upload Error:", error);
            alert("Some files failed to upload");
        } finally {
            setIsUploading(false);
            setUploadProgress({});
        }
    }, [folder, images, onImagesChange]);

    const removeImage = (index: number) => {
        const updated = images.filter((_, i) => i !== index);
        onImagesChange(updated);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
            'application/octet-stream': ['.heic', '.heif'],
        },
        multiple: true,
        maxSize: 10 * 1024 * 1024,
    });

    const totalProgress = Object.values(uploadProgress).length > 0
        ? Math.round(Object.values(uploadProgress).reduce((a, b) => a + b, 0) / Object.values(uploadProgress).length)
        : 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-sandstone">Batch Processing</label>
                <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    {images.length} Loaded
                </span>
            </div>

            <div
                {...getRootProps()}
                className={`
          relative py-12 border-2 border-dashed rounded-[2.5rem] transition-all cursor-pointer flex flex-col items-center justify-center gap-4 text-center
          ${isDragActive ? "border-sandstone bg-sandstone/5" : "border-gray-100 bg-gray-50/50 hover:bg-gray-50"}
          ${isUploading ? "opacity-75 cursor-not-allowed" : ""}
        `}
            >
                <input {...getInputProps()} />
                <div className={`
          w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-sm transition-all
          ${isUploading ? "bg-sandstone text-white animate-pulse" : "bg-white text-gray-400"}
        `}>
                    {isUploading ? <Loader2 className="animate-spin" /> : <Upload size={28} />}
                </div>

                <div className="space-y-1">
                    <p className="text-sm font-bold text-oxford">
                        {isUploading ? `Uploading ${Object.keys(uploadProgress).length} files...` : "Drop images to process in bulk"}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium tracking-wide">
                        Auto-converted to WebP + Thumbnails generated
                    </p>
                </div>

                {isUploading && (
                    <div className="w-64 space-y-2 px-8">
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-sandstone transition-all duration-300"
                                style={{ width: `${totalProgress}%` }}
                            />
                        </div>
                        <p className="text-[10px] font-black text-sandstone uppercase">{totalProgress}% Overall</p>
                    </div>
                )}
            </div>

            {/* Grid View of Uploaded Images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((url, index) => (
                    <div key={`${url}-${index}`} className="group relative aspect-square rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                        <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-oxford/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center hover:bg-red-600 transition-all shadow-lg hover:rotate-12"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/40 backdrop-blur-md rounded-full text-[8px] text-white font-bold tracking-tighter uppercase">
                            WebP
                        </div>
                    </div>
                ))}

                {images.length === 0 && !isUploading && (
                    <div className="col-span-full py-16 text-center bg-gray-50/50 rounded-[2.5rem] border border-gray-50">
                        <LayoutGrid className="mx-auto text-gray-200 mb-2" size={32} />
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No shots uploaded</p>
                    </div>
                )}
            </div>
        </div>
    );
}
