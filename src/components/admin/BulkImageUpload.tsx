"use client";

import React, { useState, useRef } from "react";
import { Upload, X, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadState {
    id: string;
    file: File;
    progress: number;
    status: "pending" | "uploading" | "completed" | "error";
    url?: string;
    error?: string;
}

interface BulkImageUploadProps {
    onUploadComplete: (urls: string[]) => void;
    folder?: string;
    maxFiles?: number;
    className?: string;
}

export default function BulkImageUpload({
    onUploadComplete,
    folder = "gallery",
    maxFiles = 50,
    className
}: BulkImageUploadProps) {
    const [uploadQueue, setUploadQueue] = useState<FileUploadState[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        addFilesToQueue(selectedFiles);
    };

    const addFilesToQueue = (files: File[]) => {
        const newFiles: FileUploadState[] = files.slice(0, maxFiles - uploadQueue.length).map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            progress: 0,
            status: "pending"
        }));

        setUploadQueue(prev => [...prev, ...newFiles]);

        // Auto-start uploads
        newFiles.forEach(fileState => {
            uploadFile(fileState);
        });
    };

    const uploadFile = (fileState: FileUploadState) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        formData.append("file", fileState.file);
        formData.append("folder", folder);

        xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
                const progress = Math.round((e.loaded / e.total) * 100);
                updateFileStatus(fileState.id, { progress });
            }
        });

        xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    updateFileStatus(fileState.id, {
                        status: "completed",
                        url: response.url,
                        progress: 100
                    });

                    // Check if all uploads are done to notify parent
                    checkAllComplete(fileState.id, response.url);
                } else {
                    updateFileStatus(fileState.id, {
                        status: "error",
                        error: response.error || "Upload failed"
                    });
                }
            } else {
                updateFileStatus(fileState.id, { status: "error", error: "Connection error" });
            }
        });

        xhr.addEventListener("error", () => {
            updateFileStatus(fileState.id, { status: "error", error: "Network error" });
        });

        updateFileStatus(fileState.id, { status: "uploading" });
        xhr.open("POST", "/api/admin/upload");
        xhr.send(formData);
    };

    const updateFileStatus = (id: string, updates: Partial<FileUploadState>) => {
        setUploadQueue(prev => prev.map(item =>
            item.id === id ? { ...item, ...updates } : item
        ));
    };

    const checkAllComplete = (currentId: string, currentUrl: string) => {
        setUploadQueue(prev => {
            const updated = prev.map(item => item.id === currentId ? { ...item, status: "completed" as const, url: currentUrl } : item);

            // Check if all items that are not in 'error' state are 'completed'
            const allFinished = updated.every(item => item.status === "completed" || item.status === "error");

            if (allFinished) {
                const successfulUrls = updated
                    .filter(item => item.status === "completed" && item.url)
                    .map(item => item.url!);

                if (successfulUrls.length > 0) {
                    // Use a small timeout to ensure state has settled and avoid race conditions with multiple rapid completions
                    setTimeout(() => onUploadComplete(successfulUrls), 50);
                }
            }
            return updated;
        });
    };

    const removeFile = (id: string) => {
        setUploadQueue(prev => prev.filter(item => item.id !== id));
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        addFilesToQueue(files);
    };

    return (
        <div className={cn("space-y-6", className)}>
            {/* Drop Zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                    "relative border-2 border-dashed rounded-[2rem] p-12 transition-all cursor-pointer group flex flex-col items-center justify-center text-center gap-4",
                    isDragging
                        ? "border-sandstone bg-sandstone/5 scale-[1.01]"
                        : "border-gray-200 bg-gray-50/50 hover:border-sandstone/50 hover:bg-white"
                )}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                />
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Upload className="text-sandstone" size={32} />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-oxford">Click or Drag images here</h4>
                    <p className="text-sm text-gray-500 mt-1">Upload multiple photos at once. Max {maxFiles} images.</p>
                </div>
            </div>

            {/* Upload Queue */}
            {uploadQueue.length > 0 && (
                <div className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <h5 className="text-sm font-black text-oxford uppercase tracking-widest">Upload Queue ({uploadQueue.length})</h5>
                        <button
                            onClick={() => setUploadQueue([])}
                            className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline"
                        >
                            Clear All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {uploadQueue.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 relative group">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                                    {item.status === "completed" && item.url ? (
                                        <img src={item.url} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <ImageIcon size={20} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-xs font-bold text-oxford truncate pr-4">{item.file.name}</p>
                                        <span className="text-[10px] font-black text-gray-400 uppercase">
                                            {item.status === "uploading" ? `${item.progress}%` : item.status}
                                        </span>
                                    </div>

                                    {/* Progress Bar Container */}
                                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={cn(
                                                "h-full transition-all duration-300 rounded-full",
                                                item.status === "completed" ? "bg-green-500" :
                                                    item.status === "error" ? "bg-red-500" : "bg-sandstone"
                                            )}
                                            style={{ width: `${item.progress}%` }}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); removeFile(item.id); }}
                                    className="p-1.5 hover:bg-white hover:text-red-500 rounded-lg transition-colors text-gray-400 opacity-0 group-hover:opacity-100"
                                >
                                    <X size={14} />
                                </button>

                                {item.status === "completed" && (
                                    <div className="absolute -top-1 -right-1">
                                        <CheckCircle2 size={16} className="text-green-500 fill-white" />
                                    </div>
                                )}
                                {item.status === "error" && (
                                    <div className="absolute -top-1 -right-1" title={item.error}>
                                        <AlertCircle size={16} className="text-red-500 fill-white" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
