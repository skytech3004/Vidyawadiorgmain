"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Edit2, Loader2, Phone, Plus, Save, Trash2, X } from "lucide-react";

type ContactForm = {
    _id?: string;
    office: string;
    phone: string;
    email: string;
    order: string;
};

const EMPTY_FORM: ContactForm = {
    office: "",
    phone: "",
    email: "",
    order: "0",
};

export default function ImportantContactsAdminPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [banner, setBanner] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [form, setForm] = useState<ContactForm>(EMPTY_FORM);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/important-contacts");
            const data = await res.json();
            if (data.success) {
                setItems(data.contacts || []);
            }
        } catch {
            setBanner({ type: "error", text: "Failed to load important contacts" });
        } finally {
            setLoading(false);
        }
    };

    const openModal = (item?: any) => {
        if (item) {
            setForm({
                _id: item._id,
                office: item.office || "",
                phone: item.phone || "",
                email: item.email || "",
                order: String(item.order ?? 0),
            });
        } else {
            setForm(EMPTY_FORM);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setForm(EMPTY_FORM);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setBanner(null);

        try {
            const isEditing = Boolean(form._id);
            const res = await fetch(
                isEditing ? `/api/admin/important-contacts/${form._id}` : "/api/admin/important-contacts",
                {
                    method: isEditing ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        office: form.office,
                        phone: form.phone,
                        email: form.email,
                        order: Number(form.order) || 0,
                    }),
                }
            );
            const data = await res.json();
            if (data.success) {
                setBanner({ type: "success", text: isEditing ? "Contact updated." : "Contact added." });
                closeModal();
                await fetchItems();
            } else {
                setBanner({ type: "error", text: data.error || "Unable to save contact" });
            }
        } catch {
            setBanner({ type: "error", text: "An error occurred while saving" });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this contact?")) return;
        try {
            const res = await fetch(`/api/admin/important-contacts/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setBanner({ type: "success", text: "Contact deleted." });
                await fetchItems();
            } else {
                setBanner({ type: "error", text: data.error || "Unable to delete contact" });
            }
        } catch {
            setBanner({ type: "error", text: "An error occurred while deleting" });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Loader2 className="animate-spin text-sandstone" size={48} />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto pb-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-oxford uppercase tracking-tight">Important Contacts</h1>
                    <p className="text-gray-500 mt-2">Manage the contact directory shown on the /contact page.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-oxford text-white font-black uppercase tracking-widest text-xs shadow-lg hover:bg-sandstone hover:text-oxford transition-colors"
                >
                    <Plus size={16} />
                    Add Contact
                </button>
            </div>

            {banner && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-8 rounded-2xl border px-4 py-3 flex items-center gap-3 text-sm font-bold ${banner.type === "success"
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-red-700"
                        }`}
                >
                    {banner.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    {banner.text}
                </motion.div>
            )}

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50/80 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <th className="p-6">Name of Office</th>
                                <th className="p-6">Phone No.</th>
                                <th className="p-6">Email</th>
                                <th className="p-6">Order</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-400">
                                        <Phone size={40} className="mx-auto mb-4 text-gray-200" />
                                        No important contacts found.
                                    </td>
                                </tr>
                            ) : (
                                items.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-6 font-bold text-oxford">{item.office}</td>
                                        <td className="p-6 text-gray-600">{item.phone || "-"}</td>
                                        <td className="p-6 text-gray-600 break-all">{item.email || "-"}</td>
                                        <td className="p-6 text-gray-400 font-bold">{item.order ?? 0}</td>
                                        <td className="p-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openModal(item)}
                                                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-oxford/60 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.form
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onSubmit={handleSubmit}
                            className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
                                <h2 className="text-xl md:text-2xl font-black text-oxford uppercase tracking-tight">
                                    {form._id ? "Edit Contact" : "Add Contact"}
                                </h2>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-red-500"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="p-6 md:p-8 grid gap-6">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Name of Office</label>
                                    <input
                                        required
                                        type="text"
                                        value={form.office}
                                        onChange={(e) => setForm({ ...form, office: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-sandstone outline-none transition-all text-oxford font-medium"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Phone No.</label>
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-sandstone outline-none transition-all text-oxford font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-sandstone outline-none transition-all text-oxford font-medium"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Order</label>
                                    <input
                                        type="number"
                                        value={form.order}
                                        onChange={(e) => setForm({ ...form, order: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-sandstone outline-none transition-all text-oxford font-medium"
                                    />
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/40">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-5 py-3 rounded-2xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-6 py-3 rounded-2xl bg-oxford text-white font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-sandstone hover:text-oxford transition-colors disabled:opacity-60"
                                >
                                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                    Save Contact
                                </button>
                            </div>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
