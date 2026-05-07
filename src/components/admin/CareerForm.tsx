"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface CareerFormProps {
    onClose: () => void;
    onSuccess: () => void;
    career?: any;
}

export default function CareerForm({ onClose, onSuccess, career }: CareerFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: career?.title || "",
        category: career?.category || "Teaching",
        subjects: career?.subjects || "",
        requirements: career?.requirements || "",
        isActive: career?.isActive ?? true,
        order: career?.order || 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const url = career ? `/api/admin/careers/${career._id}` : "/api/admin/careers";
            const method = career ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to save career");
            }

            toast.success(`Career ${career ? "updated" : "added"} successfully`);
            onSuccess();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-oxford/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-black text-oxford">
                        {career ? "Edit Career" : "Add Career"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto no-scrollbar">
                    <form id="career-form" onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-oxford">Job Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all"
                                    placeholder="e.g. Pre Primary Teacher"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-oxford">Category *</label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all bg-white"
                                >
                                    <option value="Teaching">Teaching Positions</option>
                                    <option value="Non-Teaching">Non-Teaching Positions</option>
                                    <option value="Administrative">Administrative</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold text-oxford">Subjects (Optional)</label>
                                <input
                                    type="text"
                                    value={formData.subjects}
                                    onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all"
                                    placeholder="e.g. English, Math, Science"
                                />
                            </div>

                             <div className="space-y-2 md:col-span-2">
                                 <div className="flex justify-between items-center">
                                     <label className="text-sm font-bold text-oxford">Specific Requirements (HTML Supported) *</label>
                                     <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Use &lt;h1&gt;, &lt;li&gt;, &lt;br&gt; for formatting</span>
                                 </div>
                                 <textarea
                                     required
                                     value={formData.requirements}
                                     onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all h-48 font-mono text-xs"
                                     placeholder="e.g. <p>Join us for...</p> <ul><li>3 years exp</li></ul>"
                                 />
                             </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-oxford">Display Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2 flex flex-col justify-center">
                                <label className="flex items-center gap-3 cursor-pointer mt-6">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-300 text-sandstone focus:ring-sandstone"
                                    />
                                    <span className="text-sm font-bold text-oxford">Is Active (Visible on site)</span>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-colors"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="career-form"
                        disabled={isLoading}
                        className="px-6 py-3 rounded-xl font-bold text-white bg-sandstone hover:bg-sandstone-dark transition-colors flex items-center gap-2"
                    >
                        {isLoading && <Loader2 size={18} className="animate-spin" />}
                        {career ? "Update Career" : "Save Career"}
                    </button>
                </div>
            </div>
        </div>
    );
}
