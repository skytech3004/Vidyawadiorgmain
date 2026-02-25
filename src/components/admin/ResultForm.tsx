"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, X, Trophy, Hash, Calendar, GraduationCap } from "lucide-react";
import ImageUploadField from "./ImageUploadField";

interface ResultFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function ResultForm({ initialData, isEditing }: ResultFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData || {
        name: "",
        percentage: "",
        class: "XII",
        year: new Date().getFullYear().toString(),
        stream: "",
        image: "",
        institution: "marudhar",
        order: 0,
        resultType: "Board"
    });

    const searchParams = useSearchParams();

    useEffect(() => {
        if (!isEditing) {
            const institutionParam = searchParams.get("institution");
            const typeParam = searchParams.get("resultType");

            if (institutionParam || typeParam) {
                setFormData((prev: any) => ({
                    ...prev,
                    institution: institutionParam || prev.institution,
                    resultType: typeParam || prev.resultType
                }));
            }
        }
    }, [searchParams, isEditing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = isEditing ? `/api/admin/results/${initialData._id}` : "/api/admin/results";

        try {
            const res = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/results");
                router.refresh();
            }
        } catch (error) {
            console.error("Error saving result:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <GraduationCap size={16} className="text-sandstone" />
                            Student Name
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                            placeholder="e.g. Priyanshi Shekhawat"
                        />
                    </div>

                    {/* Percentage */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <Trophy size={16} className="text-sandstone" />
                            Percentage / CGPA
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.percentage}
                            onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                            placeholder="e.g. 98.4%"
                        />
                    </div>

                    {/* Class */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <Hash size={16} className="text-sandstone" />
                            Class
                        </label>
                        <select
                            value={formData.class}
                            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                        >
                            <option value="X">X (Secondary)</option>
                            <option value="XII">XII (Sr. Secondary)</option>
                            <option value="College">College</option>
                        </select>
                    </div>

                    {/* Year */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <Calendar size={16} className="text-sandstone" />
                            Academic Year
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                            placeholder="e.g. 2023-24"
                        />
                    </div>

                    {/* Stream */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            Stream
                        </label>
                        <input
                            type="text"
                            value={formData.stream}
                            onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                            placeholder="e.g. Science, Arts, Commerce"
                        />
                    </div>

                    {/* Institution */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            Institution
                        </label>
                        <select
                            value={formData.institution}
                            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                        >
                            <option value="marudhar">Marudhar Balika Vidyapeeth</option>
                            <option value="lps">Leeladevi English Medium</option>
                            <option value="college">Leela Devi College</option>
                        </select>
                    </div>

                    {/* Result Type */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            Result Type
                        </label>
                        <select
                            value={formData.resultType || "Board"}
                            onChange={(e) => setFormData({ ...formData, resultType: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                        >
                            <option value="Board">Board Topper (VIII, X, XII)</option>
                            <option value="Non-Board">Non-Board Topper (I-VII, IX, XI)</option>
                            <option value="Sports">Sports Achievement</option>
                            <option value="Competitive">Competitive Exams (NEET, JEE, etc.)</option>
                            <option value="Scholarship">Scholarships & Awards</option>
                        </select>
                    </div>

                    {/* Student Photo Upload */}
                    <div className="md:col-span-2">
                        <ImageUploadField
                            label="Student Photo"
                            value={formData.image}
                            onChange={(url: string) => setFormData({ ...formData, image: url })}
                            folder="toppers"
                            description="Clear portrait recommended. Under 2MB. JPG, PNG, WEBP."
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 justify-end">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                    <X size={20} />
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-xl bg-oxford text-white font-bold hover:bg-oxford/90 shadow-lg shadow-oxford/20 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                    <Save size={20} />
                    {loading ? "Saving..." : "Save Result"}
                </button>
            </div>
        </form>
    );
}
