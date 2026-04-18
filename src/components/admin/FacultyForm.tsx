"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, X, User, Briefcase, Hash, Mail, Phone } from "lucide-react";
import ImageUploadField from "./ImageUploadField";

interface FacultyFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function FacultyForm({ initialData, isEditing }: FacultyFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData || {
        name: "",
        designation: "",
        institution: "marudhar",
        order: 0,
        image: "",
        email: "",
        phone: ""
    });

    const searchParams = useSearchParams();

    useEffect(() => {
        if (!isEditing) {
            const institutionParam = searchParams.get("institution");
            if (institutionParam) {
                setFormData((prev: any) => ({
                    ...prev,
                    institution: institutionParam
                }));
            }
        }
    }, [searchParams, isEditing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = isEditing ? `/api/admin/staff/${initialData._id}` : "/api/admin/staff";

        try {
            const res = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push(`/admin/institutions/${formData.institution}`);
                router.refresh();
            }
        } catch (error) {
            console.error("Error saving faculty member:", error);
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
                            <User size={16} className="text-sandstone" />
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                            placeholder="e.g. Ms. Priya Sangeeta"
                        />
                    </div>

                    {/* Designation */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <Briefcase size={16} className="text-sandstone" />
                            Designation
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.designation}
                            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                            placeholder="e.g. Principal or PGT - History"
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
                            <option value="english">Leeladevi English Medium</option>
                            <option value="primary">Sushiladevi Primary School</option>
                            <option value="college">Leela Devi College</option>
                        </select>
                    </div>

                    {/* Order */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <Hash size={16} className="text-sandstone" />
                            Display Order
                        </label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                            placeholder="0"
                        />
                    </div>

                    {/* Email (Optional) */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <Mail size={16} className="text-sandstone" />
                            Email (Optional)
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                            placeholder="email@example.com"
                        />
                    </div>

                    {/* Phone (Optional) */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-oxford uppercase tracking-wider flex items-center gap-2">
                            <Phone size={16} className="text-sandstone" />
                            Phone (Optional)
                        </label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-gray-50/50"
                            placeholder="+91 00000 00000"
                        />
                    </div>

                    {/* Photo Upload */}
                    <div className="md:col-span-2">
                        <ImageUploadField
                            label="Faculty Photo"
                            value={formData.image}
                            onChange={(url: string) => setFormData({ ...formData, image: url })}
                            folder="faculty"
                            description="Portrait photo recommended. Under 2MB."
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
                    {loading ? "Saving..." : "Save Member"}
                </button>
            </div>
        </form>
    );
}
