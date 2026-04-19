"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Save,
    Loader2,
    Mail,
    Server,
    Key,
    User,
    CheckCircle2,
    AlertCircle,
    Film,
    Images,
    Type,
    Plus,
    Trash2,
    Upload,
    X,
    GripVertical,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import BulkImageUpload from "@/components/admin/BulkImageUpload";
import { cn } from "@/lib/utils";

export default function SettingsManagerPage() {
    const [settings, setSettings] = useState({
        smtp_host: "",
        smtp_port: "",
        smtp_user: "",
        smtp_password: "",
        smtp_from_email: "",
        smtp_secure: "true"
    });
    const [heroSettings, setHeroSettings] = useState({
        hero_type: "video",
        hero_video_url: "",
        hero_carousel_images: [] as string[],
        hero_texts: ["Celebrating 70 Years of Excellence", "शिक्षा भी, संस्कार भी", "Nurturing Minds, Shaping Futures"]
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/settings");
            const data = await res.json();
            if (data.success && data.settings) {
                setSettings({
                    smtp_host: data.settings.smtp_host || "",
                    smtp_port: data.settings.smtp_port || "",
                    smtp_user: data.settings.smtp_user || "",
                    smtp_password: data.settings.smtp_password || "",
                    smtp_from_email: data.settings.smtp_from_email || "",
                    smtp_secure: data.settings.smtp_secure || "true"
                });
                setHeroSettings({
                    hero_type: data.settings.hero_type || "video",
                    hero_video_url: data.settings.hero_video_url || "",
                    hero_carousel_images: data.settings.hero_carousel_images || [],
                    hero_texts: data.settings.hero_texts || ["Celebrating 70 Years of Excellence", "शिक्षा भी, संस्कार भी", "Nurturing Minds, Shaping Futures"]
                });
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...settings, ...heroSettings })
            });
            const data = await res.json();

            if (data.success) {
                setMessage({ type: "success", text: "Settings saved successfully!" });
                setTimeout(() => setMessage(null), 3000);
            } else {
                setMessage({ type: "error", text: data.error || "Failed to save settings." });
            }
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "An error occurred." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-180px)]">
                <Loader2 className="animate-spin text-sandstone" size={48} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl max-h-[calc(100vh-180px)] overflow-y-auto no-scrollbar pb-10">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-oxford uppercase tracking-tight flex items-center gap-3">
                            <Mail className="text-sandstone" />
                            SMTP Configuration
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Configure email delivery settings for system notifications and contact forms.</p>
                    </div>
                </div>

                <div className="p-8">
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-2xl mb-8 flex items-center gap-3 text-sm font-bold ${message.type === "success"
                                    ? "bg-green-50 text-green-600 border border-green-200"
                                    : "bg-red-50 text-red-600 border border-red-200"
                                }`}
                        >
                            {message.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                            {message.text}
                        </motion.div>
                    )}

                    <form onSubmit={handleSave} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2 flex items-center gap-2">
                                    <Server size={14} className="text-sandstone" /> SMTP Host
                                </label>
                                <input
                                    type="text"
                                    name="smtp_host"
                                    value={settings.smtp_host}
                                    onChange={handleChange}
                                    placeholder="e.g. smtp.gmail.com"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2 flex items-center gap-2">
                                    <Server size={14} className="text-sandstone" /> SMTP Port
                                </label>
                                <input
                                    type="text"
                                    name="smtp_port"
                                    value={settings.smtp_port}
                                    onChange={handleChange}
                                    placeholder="e.g. 587 or 465"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2 flex items-center gap-2">
                                    <User size={14} className="text-sandstone" /> SMTP Username
                                </label>
                                <input
                                    type="text"
                                    name="smtp_user"
                                    value={settings.smtp_user}
                                    onChange={handleChange}
                                    placeholder="e.g. your-email@gmail.com"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2 flex items-center gap-2">
                                    <Key size={14} className="text-sandstone" /> SMTP Password / App Password
                                </label>
                                <input
                                    type="password"
                                    name="smtp_password"
                                    value={settings.smtp_password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2 flex items-center gap-2">
                                    <Mail size={14} className="text-sandstone" /> From Email Address
                                </label>
                                <input
                                    type="email"
                                    name="smtp_from_email"
                                    value={settings.smtp_from_email}
                                    onChange={handleChange}
                                    placeholder="e.g. noreply@vidyawadi.com"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2 flex items-center gap-2">
                                    <Server size={14} className="text-sandstone" /> Use Secure Connection (TLS/SSL)
                                </label>
                                <select
                                    name="smtp_secure"
                                    value={settings.smtp_secure}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium appearance-none"
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-8 py-4 bg-oxford text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-black transition-all shadow-xl shadow-oxford/20 flex items-center justify-center gap-3 disabled:opacity-70"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin text-sandstone" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} className="text-sandstone" />
                                        Save Settings
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Hero Section Settings */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mt-10">
                <div className="p-8 border-b border-gray-50 bg-gray-50/30">
                    <h2 className="text-xl font-black text-oxford uppercase tracking-tight flex items-center gap-3">
                        <Film className="text-sandstone" />
                        Hero Section Settings
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Manage the visual background and rotating texts of the home page hero.</p>
                </div>

                <div className="p-8 space-y-10">
                    {/* Content Type Toggle */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2">Main Content Type</label>
                        <div className="flex p-1.5 bg-gray-100 rounded-2xl w-fit">
                            <button
                                onClick={() => setHeroSettings({ ...heroSettings, hero_type: "video" })}
                                className={cn(
                                    "px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2",
                                    heroSettings.hero_type === "video" ? "bg-white text-oxford shadow-sm" : "text-gray-400 hover:text-oxford"
                                )}
                            >
                                <Film size={16} /> Video
                            </button>
                            <button
                                onClick={() => setHeroSettings({ ...heroSettings, hero_type: "carousel" })}
                                className={cn(
                                    "px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2",
                                    heroSettings.hero_type === "carousel" ? "bg-white text-oxford shadow-sm" : "text-gray-400 hover:text-oxford"
                                )}
                            >
                                <Images size={16} /> Carousel
                            </button>
                        </div>
                    </div>

                    {heroSettings.hero_type === "video" ? (
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2 block">Hero Video</label>
                            <div className="grid md:grid-cols-2 gap-8 items-start">
                                <div className="space-y-4">
                                    {heroSettings.hero_video_url ? (
                                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-black group">
                                            <video src={heroSettings.hero_video_url} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                                            <button
                                                onClick={() => setHeroSettings({ ...heroSettings, hero_video_url: "" })}
                                                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="aspect-video rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 bg-gray-50">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                                <Film className="text-sandstone" size={24} />
                                            </div>
                                            <p className="text-xs font-bold text-gray-400">No video uploaded</p>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <p className="text-xs text-gray-500 leading-relaxed italic">Upload a high-quality video for the hero background. Recommended: 1920x1080, MP4 format, under 10MB for fast loading.</p>
                                    <div
                                        onClick={() => document.getElementById('video-upload')?.click()}
                                        className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl flex items-center gap-3 cursor-pointer hover:border-sandstone transition-colors group"
                                    >
                                        <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-sandstone/10 transition-colors">
                                            <Upload className="text-sandstone" size={18} />
                                        </div>
                                        <span className="text-sm font-bold text-oxford">Upload New Video</span>
                                        <input
                                            id="video-upload"
                                            type="file"
                                            accept="video/*"
                                            className="hidden"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                // 100MB limit for videos
                                                if (file.size > 100 * 1024 * 1024) {
                                                    setMessage({ type: "error", text: "Video file is too large. Maximum size allowed is 100MB." });
                                                    return;
                                                }

                                                const formData = new FormData();
                                                formData.append("file", file);
                                                formData.append("folder", "hero");
                                                
                                                try {
                                                    setMessage({ type: "success", text: "Uploading video..." });
                                                    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
                                                    
                                                    if (res.status === 413) {
                                                        setMessage({ type: "error", text: "Upload failed: File too large (413). Please check your server's Nginx configuration." });
                                                        return;
                                                    }

                                                    if (!res.ok) {
                                                        const text = await res.text();
                                                        console.error("Upload failed server response:", text);
                                                        throw new Error(`Server returned error ${res.status}`);
                                                    }

                                                    const contentType = res.headers.get("content-type");
                                                    if (!contentType || !contentType.includes("application/json")) {
                                                        throw new Error("Server returned an invalid response. This often happens when the file is too large for the network.");
                                                    }

                                                    const data = await res.json();
                                                    if (data.success) {
                                                        setHeroSettings({ ...heroSettings, hero_video_url: data.url });
                                                        setMessage({ type: "success", text: "Video uploaded successfully! Don't forget to save settings." });
                                                    } else {
                                                        setMessage({ type: "error", text: data.error || "Failed to upload video." });
                                                    }
                                                } catch (err: any) {
                                                    console.error("Upload error:", err);
                                                    setMessage({ type: "error", text: `Upload error: ${err.message}` });
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2">Carousel Images</label>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{heroSettings.hero_carousel_images.length} Images</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {heroSettings.hero_carousel_images.map((img, idx) => (
                                    <div key={idx} className="group relative aspect-square rounded-[2rem] overflow-hidden bg-gray-100 border border-gray-200">
                                        <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => {
                                                    const newImgs = [...heroSettings.hero_carousel_images];
                                                    newImgs.splice(idx, 1);
                                                    setHeroSettings({ ...heroSettings, hero_carousel_images: newImgs });
                                                }}
                                                className="p-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all hover:scale-110"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[8px] font-black text-oxford uppercase">#{idx + 1}</div>
                                    </div>
                                ))}
                                <div
                                    onClick={() => document.getElementById('carousel-upload')?.click()}
                                    className="aspect-square rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 bg-gray-50/50 hover:bg-white hover:border-sandstone transition-all cursor-pointer group"
                                >
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <Plus className="text-sandstone" size={20} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Add More</span>
                                    <input
                                        id="carousel-upload"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={async (e) => {
                                            const files = Array.from(e.target.files || []);
                                            if (files.length === 0) return;

                                            // Filter out files larger than 100MB
                                            const validFiles = files.filter(file => {
                                                if (file.size > 100 * 1024 * 1024) {
                                                    console.warn(`File ${file.name} skipped: Too large (>100MB)`);
                                                    return false;
                                                }
                                                return true;
                                            });

                                            if (validFiles.length === 0) {
                                                setMessage({ type: "error", text: "All selected files are too large (Max 100MB)." });
                                                return;
                                            }

                                            if (validFiles.length < files.length) {
                                                setMessage({ type: "error", text: `Some files was skipped because they exceed 100MB.` });
                                            }

                                            setMessage({ type: "success", text: `Uploading ${validFiles.length} images...` });

                                            const uploadPromises = validFiles.map(async (file) => {
                                                const formData = new FormData();
                                                formData.append("file", file);
                                                formData.append("folder", "hero/carousel");
                                                try {
                                                    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
                                                    
                                                    if (!res.ok) {
                                                        const text = await res.text();
                                                        console.error(`Upload error for ${file.name}:`, text);
                                                        return { success: false, fileName: file.name };
                                                    }

                                                    const contentType = res.headers.get("content-type");
                                                    if (!contentType || !contentType.includes("application/json")) {
                                                        return { success: false, fileName: file.name, error: "Invalid server response" };
                                                    }

                                                    return res.json();
                                                } catch (err) {
                                                    return { success: false, fileName: file.name };
                                                }
                                            });

                                            try {
                                                const results = await Promise.all(uploadPromises);
                                                const successfulUrls = results.filter(r => r.success).map(r => r.url);
                                                const failedCount = results.filter(r => !r.success).length;

                                                setHeroSettings({
                                                    ...heroSettings,
                                                    hero_carousel_images: [...heroSettings.hero_carousel_images, ...successfulUrls]
                                                });

                                                if (failedCount > 0) {
                                                    setMessage({ type: "error", text: `Uploaded ${successfulUrls.length} images, but ${failedCount} failed.` });
                                                } else {
                                                    setMessage({ type: "success", text: "All images uploaded successfully!" });
                                                }
                                            } catch (err) {
                                                console.error("Bulk upload error:", err);
                                                setMessage({ type: "error", text: "An error occurred during bulk upload." });
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Rotating Texts */}
                    <div className="space-y-6 pt-6 border-t border-gray-50">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2 flex items-center gap-2">
                                <Type size={14} className="text-sandstone" />
                                Hero Rotating Texts
                            </label>
                            <button
                                onClick={() => setHeroSettings({ ...heroSettings, hero_texts: [...heroSettings.hero_texts, ""] })}
                                className="px-4 py-2 bg-sandstone/10 text-oxford rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-sandstone transition-all"
                            >
                                <Plus size={14} /> Add Text
                            </button>
                        </div>

                        <div className="space-y-4">
                            {heroSettings.hero_texts.map((text, idx) => (
                                <div key={idx} className="flex gap-4 items-center group">
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-300 border border-gray-100 group-focus-within:border-sandstone group-focus-within:text-sandstone transition-colors">
                                        {idx + 1}
                                    </div>
                                    <input
                                        type="text"
                                        value={text}
                                        onChange={(e) => {
                                            const newTexts = [...heroSettings.hero_texts];
                                            newTexts[idx] = e.target.value;
                                            setHeroSettings({ ...heroSettings, hero_texts: newTexts });
                                        }}
                                        className="flex-1 px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium sm:text-lg"
                                        placeholder={`Slide ${idx + 1} headline...`}
                                    />
                                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            disabled={idx === 0}
                                            onClick={() => {
                                                const newTexts = [...heroSettings.hero_texts];
                                                [newTexts[idx], newTexts[idx - 1]] = [newTexts[idx - 1], newTexts[idx]];
                                                setHeroSettings({ ...heroSettings, hero_texts: newTexts });
                                            }}
                                            className="p-1 hover:bg-gray-100 rounded-md text-gray-400 disabled:opacity-30"
                                        >
                                            <ChevronUp size={16} />
                                        </button>
                                        <button
                                            disabled={idx === heroSettings.hero_texts.length - 1}
                                            onClick={() => {
                                                const newTexts = [...heroSettings.hero_texts];
                                                [newTexts[idx], newTexts[idx + 1]] = [newTexts[idx + 1], newTexts[idx]];
                                                setHeroSettings({ ...heroSettings, hero_texts: newTexts });
                                            }}
                                            className="p-1 hover:bg-gray-100 rounded-md text-gray-400 disabled:opacity-30"
                                        >
                                            <ChevronDown size={16} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const newTexts = [...heroSettings.hero_texts];
                                            newTexts.splice(idx, 1);
                                            setHeroSettings({ ...heroSettings, hero_texts: newTexts });
                                        }}
                                        className="p-3 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all ml-2"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-10 border-t border-gray-100 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-8 py-4 bg-oxford text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-black transition-all shadow-xl shadow-oxford/20 flex items-center justify-center gap-3 disabled:opacity-70"
                        >
                            {saving ? (
                                <>
                                    <Loader2 size={18} className="animate-spin text-sandstone" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={18} className="text-sandstone" />
                                    Save Hero Settings
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
