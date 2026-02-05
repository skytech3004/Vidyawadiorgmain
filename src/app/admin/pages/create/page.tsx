"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Save,
    Link as LinkIcon,
    FileText,
    Settings,
    Loader2
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function CreatePage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTitle(val);
        // Auto-generate slug
        setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/pages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, slug })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to create page");

            router.push(`/admin/edit/${data.page.slug}?id=${data.page._id}`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-20 pt-24">
            <Navbar />

            <div className="max-w-2xl mx-auto px-6">
                <Link
                    href="/admin/pages"
                    className="flex items-center gap-2 text-gray-400 hover:text-oxford transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Pages
                </Link>

                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-oxford text-white rounded-2xl flex items-center justify-center">
                                <Plus size={24} />
                            </div>
                            <h1 className="text-3xl font-serif text-oxford">Create Page</h1>
                        </div>

                        {error && (
                            <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <FileText size={16} className="text-gray-400" />
                                    Page Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={handleTitleChange}
                                    placeholder="e.g., Admissions 2024"
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-oxford focus:ring-4 focus:ring-oxford/5 outline-none transition-all text-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <LinkIcon size={16} className="text-gray-400" />
                                    URL Slug
                                </label>
                                <div className="flex items-center gap-2 px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50">
                                    <span className="text-gray-400 text-sm">vidyawadi.school/</span>
                                    <input
                                        type="text"
                                        required
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        className="flex-1 bg-transparent outline-none text-gray-700 font-mono"
                                    />
                                </div>
                                <p className="text-xs text-gray-400">Lowercase letters, numbers, and hyphens only.</p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-oxford text-white rounded-2xl hover:bg-oxford/90 disabled:bg-gray-200 disabled:text-gray-400 transition-all font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-oxford/20"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <Save size={20} />
                                )}
                                Create & Continue
                            </button>
                        </form>
                    </div>

                    <div className="bg-slate-50 p-8 border-t border-gray-100">
                        <div className="flex items-center gap-3 text-oxford mb-4">
                            <Settings size={20} />
                            <h3 className="font-bold">Next Steps</h3>
                        </div>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li className="flex gap-2">
                                <span className="w-5 h-5 rounded-full bg-oxford/10 text-oxford flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                                Define your page meta settings and status.
                            </li>
                            <li className="flex gap-2">
                                <span className="w-5 h-5 rounded-full bg-oxford/10 text-oxford flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                                Add sections like Hero, FAQ, or Gallery.
                            </li>
                            <li className="flex gap-2">
                                <span className="w-5 h-5 rounded-full bg-oxford/10 text-oxford flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                                Publish to make it live on the website.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}

// Add Plus icon since I missed it in imports
function Plus(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
    )
}
