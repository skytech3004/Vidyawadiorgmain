"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Plus, Edit2, Trash2, X, MapPin, Clock, Tag, ExternalLink } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface SchoolEvent {
    _id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    type: 'event' | 'news';
    institution: string;
    link: string;
    color: string;
    createdAt: string;
}

export default function EventsPage() {
    const [events, setEvents] = useState<SchoolEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [filterType, setFilterType] = useState<string>("all");

    const [formData, setFormData] = useState({
        _id: "",
        title: "",
        description: "",
        date: new Date().toISOString().split('T')[0],
        time: "",
        location: "",
        type: "event" as 'event' | 'news',
        institution: "all",
        link: "",
        color: "#002147"
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/events");
            const data = await res.json();
            if (data.success) {
                setEvents(data.events);
            } else {
                toast.error("Failed to load events");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error loading events");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (event?: SchoolEvent) => {
        if (event) {
            setFormData({
                _id: event._id,
                title: event.title,
                description: event.description,
                date: event.date.split('T')[0],
                time: event.time,
                location: event.location,
                type: event.type,
                institution: event.institution,
                link: event.link,
                color: event.color
            });
        } else {
            setFormData({
                _id: "",
                title: "",
                description: "",
                date: new Date().toISOString().split('T')[0],
                time: "",
                location: "",
                type: "event",
                institution: "all",
                link: "",
                color: "#002147"
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const isEditing = !!formData._id;
            const url = isEditing
                ? `/api/admin/events/${formData._id}`
                : "/api/admin/events";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                toast.success(isEditing ? "Updated successfully!" : "Created successfully!");
                setIsModalOpen(false);
                fetchEvents();
            } else {
                toast.error(data.error || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error saving event");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this?")) return;

        try {
            const res = await fetch(`/api/admin/events/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Deleted successfully");
                fetchEvents();
            } else {
                toast.error("Failed to delete");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting event");
        }
    };

    const filteredEvents = events.filter(e =>
        filterType === "all" ? true : e.type === filterType
    );

    return (
        <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
            <Toaster position="top-right" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-oxford mb-2">Events & News</h1>
                    <p className="text-gray-500 font-medium">Manage school activities and announcements</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-sandstone hover:bg-oxford text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
                >
                    <Plus size={20} />
                    Add New
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4 mb-8">
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-sandstone/20 transition-all font-medium text-gray-700"
                >
                    <option value="all">All Types</option>
                    <option value="event">Events Only</option>
                    <option value="news">News Only</option>
                </select>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-oxford text-white">
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Info</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Details</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Type</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px]">Institution</th>
                                <th className="p-6 font-bold uppercase tracking-wider text-[10px] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-gray-400">Loading events...</td>
                                </tr>
                            ) : filteredEvents.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-gray-400 flex flex-col items-center justify-center">
                                        <Calendar size={48} className="text-gray-200 mb-4" />
                                        <p>No items found</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredEvents.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-6">
                                            <div className="font-bold text-oxford">{item.title}</div>
                                            <div className="text-xs text-gray-400 font-normal mt-1 flex items-center gap-1">
                                                <Calendar size={12} /> {new Date(item.date).toLocaleDateString()}
                                                {item.time && <><span className="mx-1">•</span> <Clock size={12} /> {item.time}</>}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="text-sm text-gray-600 line-clamp-1">{item.description}</div>
                                            {item.location && <div className="text-xs text-gray-400 flex items-center gap-1 mt-1"><MapPin size={12} /> {item.location}</div>}
                                        </td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: item.color + '20', color: item.color }}>
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase">
                                                {item.institution}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(item)}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
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

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-oxford/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                                <h3 className="text-2xl font-black text-oxford flex items-center gap-3">
                                    {formData.type === 'news' ? <Tag className="text-teal-blue" /> : <Calendar className="text-sandstone" />}
                                    {formData._id ? "Edit Entry" : "Add Entry"}
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 flex-1 overflow-y-auto space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                            placeholder="e.g. Annual Sports Day 2026"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Type *</label>
                                        <select
                                            required
                                            value={formData.type}
                                            onChange={(e) => {
                                                const type = e.target.value as 'event' | 'news';
                                                setFormData({ 
                                                    ...formData, 
                                                    type, 
                                                    color: type === 'news' ? '#14b8a6' : '#002147' 
                                                });
                                            }}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                        >
                                            <option value="event">Event</option>
                                            <option value="news">News</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Institution</label>
                                        <select
                                            required
                                            value={formData.institution}
                                            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                        >
                                            <option value="all">All / Common</option>
                                            <option value="lps">Leeladevi (LPS)</option>
                                            <option value="marudhar-balika-vidyapeeth">Marudhar</option>
                                            <option value="sushiladevi">Sushiladevi (SPS)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Date *</label>
                                        <input
                                            required
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Time</label>
                                        <input
                                            type="text"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                            placeholder="e.g. 10:00 AM - 2:00 PM"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                            placeholder="e.g. School Ground"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">External Link (optional)</label>
                                        <input
                                            type="url"
                                            value={formData.link}
                                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sandstone focus:ring-2 focus:ring-sandstone/20 transition-all font-medium resize-none h-32"
                                        placeholder="Provide more details about the event or news..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Custom Color</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="color"
                                            value={formData.color}
                                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                            className="w-12 h-12 rounded-lg cursor-pointer border-0"
                                        />
                                        <span className="text-xs text-gray-400">Choose a color to represent this item on the calendar</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100 flex justify-end gap-3 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-8 py-3 bg-sandstone hover:bg-oxford text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
                                    >
                                        {isSubmitting ? "Saving..." : "Save Entry"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
