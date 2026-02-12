"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Search,
    Trash2,
    Loader2,
    FileText,
    Edit2,
    Calendar,
    User as UserIcon,
    Tag,
    ChevronRight,
    Eye,
    Settings,
    ExternalLink, // Keep ExternalLink as it's used
    CheckCircle2, // Keep CheckCircle2 as it's used
    XCircle, // Keep XCircle as it's used
    ImageIcon // Keep ImageIcon as it's used
} from "lucide-react";
import Link from "next/link";

export default function BlogManagerPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/blog");
            const data = await res.json();
            if (data.success) {
                setPosts(data.posts);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setPosts(posts.filter(p => p._id !== id));
            }
        } catch (error) {
            alert("Failed to delete post.");
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search posts by title or category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-sandstone transition-colors shadow-sm"
                    />
                </div>

                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 px-6 py-3 bg-oxford text-white rounded-2xl font-bold uppercase tracking-wider shadow-lg hover:bg-sandstone transition-colors group"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    Create New Post
                </Link>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Post</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <Loader2 className="animate-spin mx-auto text-sandstone" size={32} />
                                        <p className="text-sm text-gray-500 mt-4">Loading your stories...</p>
                                    </td>
                                </tr>
                            ) : filteredPosts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <FileText className="text-gray-300" size={32} />
                                        </div>
                                        <p className="text-gray-500 font-medium">No posts found matching your search.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredPosts.map((post, i) => (
                                    <motion.tr
                                        key={post._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                                                    {post.coverImage ? (
                                                        <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-sandstone/10 flex items-center justify-center">
                                                            <ImageIcon className="text-sandstone/40" size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-oxford line-clamp-1">{post.title}</h4>
                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        target="_blank"
                                                        className="text-[10px] text-gray-400 hover:text-sandstone transition-colors flex items-center gap-1 mt-1 font-bold uppercase tracking-widest"
                                                    >
                                                        View Live <ExternalLink size={10} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 bg-sandstone/10 text-sandstone text-[10px] font-black rounded-lg uppercase tracking-widest">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            {post.isPublished ? (
                                                <div className="flex items-center gap-2 text-green-600">
                                                    <CheckCircle2 size={16} />
                                                    <span className="text-xs font-bold">Published</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <XCircle size={16} />
                                                    <span className="text-xs font-bold">Draft</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                                                <Calendar size={14} />
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/blog/${post._id}`}
                                                    className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-100 shadow-sm text-oxford"
                                                >
                                                    <Edit2 size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post._id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 shadow-sm text-red-500"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
