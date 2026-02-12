"use client";

import React, { useState } from "react";
import {
    Save,
    Trophy,
    School,
    GraduationCap,
    Calendar,
    Image as ImageIcon,
    Hash,
    Loader2,
    ArrowLeft,
    BookOpen
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdvancedImageUpload from "./AdvancedImageUpload";

interface ResultFormProps {
    initialData?: any;
    isEditing?: boolean;
}

const classes = ["X", "XII"];
const institutions = ["LPS", "Marudhar"];

export default function ResultForm({ initialData, isEditing = false }: ResultFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        percentage: initialData?.percentage || "",
        stream: initialData?.stream || "-",
        class: initialData?.class || "XII",
        year: initialData?.year || "2024-25",
        institution: initialData?.institution || "LPS",
        image: initialData?.image || "",
        order: initialData?.order || 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEditing
                ? `/api/admin/results/${initialData._id}`
                : "/api/admin/results";

            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success) {
                router.push("/admin/results");
                router.refresh();
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (error) {
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto pb-20">
            <Link
                href="/admin/results"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-oxford transition-colors mb-8 font-bold text-xs uppercase tracking-widest"
            >
                <ArrowLeft size={16} />
                Back to Results
            </Link>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Student Name</label>
                        <div className="relative">
                            <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Priyanshi Jain"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Percentage / Score</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">%</span>
                                <input
                                    type="text"
                                    value={formData.percentage}
                                    onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                                    placeholder="95.4"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Stream</label>
                            <div className="relative">
                                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input
                                    type="text"
                                    value={formData.stream}
                                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                                    placeholder="e.g. Science"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Class</label>
                            <div className="relative">
                                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <select
                                    value={formData.class}
                                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors appearance-none"
                                >
                                    {classes.map(cl => (
                                        <option key={cl} value={cl}>Class {cl}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Academic Year</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input
                                    type="text"
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    placeholder="2023-24"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Institution</label>
                            <div className="relative">
                                <School className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <select
                                    value={formData.institution}
                                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors appearance-none"
                                >
                                    {institutions.map(inst => (
                                        <option key={inst} value={inst}>{inst}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Rank / Position</label>
                            <div className="relative">
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* New Image Upload Component */}
                    <div className="max-w-md">
                        <AdvancedImageUpload
                            label="Student Photo"
                            folder="results"
                            value={formData.image}
                            onUpload={(url: string) => setFormData({ ...formData, image: url })}
                            onRemove={() => setFormData({ ...formData, image: "" })}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-8 py-4 bg-white text-gray-400 rounded-2xl font-bold uppercase tracking-wider hover:text-oxford transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-10 py-4 bg-oxford text-white rounded-2xl font-bold uppercase tracking-wider shadow-xl hover:bg-sandstone transition-colors flex items-center gap-2 group disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                <Save size={20} className="group-hover:scale-110 transition-transform" />
                                {isEditing ? "Update Result" : "Add Record"}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
