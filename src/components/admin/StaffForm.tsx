"use client";

import React, { useState } from "react";
import {
    Save,
    User as UserIcon,
    Briefcase,
    School,
    Image as ImageIcon,
    Hash,
    Loader2,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdvancedImageUpload from "./AdvancedImageUpload";

interface StaffFormProps {
    initialData?: any;
    isEditing?: boolean;
}

const institutions = ["LPS", "Marudhar", "College", "Hostel"];

export default function StaffForm({ initialData, isEditing = false }: StaffFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        designation: initialData?.designation || "",
        institution: initialData?.institution || "LPS",
        image: initialData?.image || "",
        order: initialData?.order || 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEditing
                ? `/api/admin/staff/${initialData._id}`
                : "/api/admin/staff";

            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success) {
                router.push("/admin/staff");
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
                href="/admin/staff"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-oxford transition-colors mb-8 font-bold text-xs uppercase tracking-widest"
            >
                <ArrowLeft size={16} />
                Back to Staff List
            </Link>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Full Name</label>
                        <div className="relative">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Dr. Kavita Sharma"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Designation</label>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input
                                    type="text"
                                    value={formData.designation}
                                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                    placeholder="e.g. Senior Lecturer"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors"
                                    required
                                />
                            </div>
                        </div>

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
                    </div>

                    {/* New Advanced Image Upload Component */}
                    <div className="max-w-md">
                        <AdvancedImageUpload
                            label="Profile Photo"
                            folder="staff"
                            value={formData.image}
                            onUpload={(url: string) => setFormData({ ...formData, image: url })}
                            onRemove={() => setFormData({ ...formData, image: "" })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-sandstone px-1">Display Rank / Order</label>
                        <div className="relative">
                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors"
                            />
                        </div>
                        <p className="text-[10px] text-gray-400 px-1 italic">Lower numbers appear first in the navigators list.</p>
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
                                {isEditing ? "Update Profile" : "Add Navigator"}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
