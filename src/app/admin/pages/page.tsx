"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Plus,
    Edit,
    Trash2,
    ExternalLink,
    Search,
    FileText,
    ChevronRight,
    Loader2
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AdminPages() {
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const res = await fetch("/api/admin/pages");
            const data = await res.json();
            if (data.pages) setPages(data.pages);
        } catch (error) {
            console.error("Failed to fetch pages:", error);
        } finally {
            setLoading(false);
        }
    };

    const deletePage = async (id: string) => {
        if (!confirm("Are you sure you want to delete this page and all its content?")) return;

        try {
            const res = await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
            if (res.ok) {
                setPages(pages.filter(p => p._id !== id));
            }
        } catch (error) {
            console.error("Failed to delete page:", error);
        }
    };

    const filteredPages = pages.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-gray-50 pb-20 pt-24">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-serif text-oxford mb-2">Manage Pages</h1>
                        <p className="text-gray-500">Add, edit, or delete any page on your website.</p>
                    </div>
                    <Link
                        href="/admin/pages/create"
                        className="flex items-center gap-2 px-6 py-3 bg-oxford text-white rounded-xl hover:bg-oxford/90 transition-all font-medium self-start shadow-lg shadow-oxford/10"
                    >
                        <Plus size={20} />
                        Create New Page
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8 flex items-center gap-4">
                    <Search size={20} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by title or slug..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 outline-none text-gray-700 bg-transparent"
                    />
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-oxford mb-4" size={40} />
                        <p className="text-gray-500">Loading your pages...</p>
                    </div>
                ) : filteredPages.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <FileText className="mx-auto text-gray-300 mb-4" size={60} />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No pages found</h3>
                        <p className="text-gray-500 mb-8">Start by creating your first dynamic page.</p>
                        <Link
                            href="/admin/pages/create"
                            className="text-oxford font-semibold hover:underline"
                        >
                            Create a page now
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPages.map((page) => (
                            <div
                                key={page._id}
                                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-xl transition-all group"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-oxford group-hover:text-white transition-colors">
                                        <FileText size={24} />
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/admin/edit/${page.slug}?id=${page._id}`}
                                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                            title="Edit Content"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => deletePage(page._id)}
                                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                            title="Delete Page"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{page.title}</h3>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="text-xs font-mono px-2 py-1 bg-gray-100 text-gray-500 rounded-md">
                                        /{page.slug}
                                    </span>
                                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${page.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {page.status}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                    <Link
                                        href={`/${page.slug}`}
                                        target="_blank"
                                        className="text-sm text-gray-400 hover:text-oxford flex items-center gap-1 transition-colors"
                                    >
                                        View Live <ExternalLink size={14} />
                                    </Link>
                                    <Link
                                        href={`/admin/edit/${page.slug}?id=${page._id}`}
                                        className="text-sm font-bold text-oxford flex items-center gap-1"
                                    >
                                        Edit Sections <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
