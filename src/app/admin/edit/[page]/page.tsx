"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
    ChevronLeft,
    Save,
    Upload,
    Loader2,
    Check,
    Plus,
    Trash2,
    GripVertical,
    Settings,
    Image as ImageIcon,
    Type,
    AlignLeft,
    Code,
    Layout,
    Eye
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

// --- Default Schemas for Hints ---
const SECTION_TEMPLATES: any = {
    hero: [
        { key: "title", label: "Hero Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "text" },
        { key: "image", label: "Background Image", type: "image" }
    ],
    gallery: [
        { key: "images", label: "Images", type: "gallery" }
    ],
    "text-content": [
        { key: "title", label: "Title", type: "text" },
        { key: "content", label: "Content", type: "textarea" }
    ],
    features: [
        { key: "title", label: "Section Title", type: "text" },
        { key: "items", label: "Feature Items (JSON)", type: "json" }
    ]
};

function EditorContent() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageSlug = params.page as string;
    const pageId = searchParams.get("id");

    const [page, setPage] = useState<any>(null);
    const [sections, setSections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeSectionId, setActiveSectionId] = useState<string>("");
    const [activeSection, setActiveSection] = useState<any>(null);

    useEffect(() => {
        if (pageId) {
            fetchPageAndSections();
        }
    }, [pageId]);

    const fetchPageAndSections = async () => {
        setLoading(true);
        try {
            // Fetch Page
            const pageRes = await fetch(`/api/admin/pages/${pageId}`);
            const pageData = await pageRes.json();
            setPage(pageData.page);

            // Fetch Sections
            const secRes = await fetch(`/api/admin/sections?pageId=${pageId}`);
            const secData = await secRes.json();
            setSections(secData.sections);

            if (secData.sections.length > 0) {
                setActiveSectionId(secData.sections[0]._id);
                setActiveSection(secData.sections[0]);
            }
        } catch (error) {
            console.error("Failed to load page editor", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSectionChange = (sectionId: string) => {
        const sec = sections.find(s => s._id === sectionId);
        setActiveSectionId(sectionId);
        setActiveSection(sec);
    };

    const handleFieldChange = (key: string, value: any) => {
        if (!activeSection) return;

        const updatedSection = {
            ...activeSection,
            content: {
                ...activeSection.content,
                [key]: value
            }
        };

        setActiveSection(updatedSection);
        setSections(sections.map(s => s._id === activeSection._id ? updatedSection : s));
    };

    const handleImageUpload = (key: string, file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            handleFieldChange(key, reader.result);
        };
    };

    const saveSection = async () => {
        if (!activeSection) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/sections/${activeSection._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(activeSection)
            });
            if (!res.ok) throw new Error("Failed to save section");
            alert("Section saved successfully!");
        } catch (error) {
            alert("Error saving section");
        } finally {
            setSaving(false);
        }
    };

    const addSection = async (type: string) => {
        try {
            const res = await fetch("/api/admin/sections", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pageId,
                    type,
                    content: {},
                    order: sections.length
                })
            });
            const data = await res.json();
            setSections([...sections, data.section]);
            handleSectionChange(data.section._id);
        } catch (error) {
            console.error("Failed to add section");
        }
    };

    const deleteSection = async (id: string) => {
        if (!confirm("Delete this section?")) return;
        try {
            await fetch(`/api/admin/sections/${id}`, { method: "DELETE" });
            const filtered = sections.filter(s => s._id !== id);
            setSections(filtered);
            if (filtered.length > 0) handleSectionChange(filtered[0]._id);
            else setActiveSection(null);
        } catch (error) {
            console.error("Failed to delete section");
        }
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <Loader2 className="animate-spin text-oxford mb-4" size={40} />
            <p className="text-gray-500 font-medium">Preparing Editor...</p>
        </div>
    );

    const schema = SECTION_TEMPLATES[activeSection?.type] || [];
    // If no schema, infer from content keys
    const fields = schema.length > 0 ? schema :
        activeSection ? Object.keys(activeSection.content).map(k => ({ key: k, label: k, type: 'text' })) : [];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Toolbar */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-20 z-10 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/admin/pages" className="p-2 hover:bg-gray-100 rounded-lg">
                        <ChevronLeft className="text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-oxford">{page?.title}</h1>
                        <p className="text-xs text-gray-400 font-mono">/{page?.slug}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href={`/${page?.slug}`}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-oxford transition-colors font-medium text-sm"
                    >
                        <Eye size={18} />
                        View Live
                    </Link>
                    <button
                        onClick={saveSection}
                        disabled={saving}
                        className="flex items-center gap-2 bg-oxford text-white px-6 py-2.5 rounded-xl font-bold hover:bg-oxford/90 transition-all disabled:opacity-50 shadow-lg shadow-oxford/10"
                    >
                        {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Section
                    </button>
                </div>
            </header>

            <div className="flex flex-1 max-w-7xl mx-auto w-full p-6 gap-8">
                {/* Sidebar */}
                <aside className="w-80 shrink-0 flex flex-col gap-8">
                    {/* Page Settings */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Settings size={14} /> Page Settings
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Status</label>
                                <select
                                    value={page?.status}
                                    onChange={async (e) => {
                                        const newStatus = e.target.value;
                                        setPage({ ...page, status: newStatus });
                                        await fetch(`/api/admin/pages/${page._id}`, {
                                            method: "PUT",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ status: newStatus })
                                        });
                                    }}
                                    className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-oxford"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Sections List */}
                    <div className="flex-1 overflow-y-auto no-scrollbar">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Layout size={14} /> Page Sections
                            </h2>
                            <button
                                onClick={() => addSection("text-content")}
                                className="p-1 text-oxford hover:bg-oxford/5 rounded-md transition-colors"
                                title="Add Section"
                            >
                                <Plus size={18} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {sections.map((sec, index) => (
                                <div
                                    key={sec._id}
                                    className={`group flex items-center gap-2 p-2 rounded-xl transition-all ${activeSectionId === sec._id ? "bg-white shadow-md border border-gray-100" : "hover:bg-gray-100"
                                        }`}
                                >
                                    <div className="cursor-grab p-1 text-gray-300">
                                        <GripVertical size={16} />
                                    </div>
                                    <button
                                        onClick={() => handleSectionChange(sec._id)}
                                        className={`flex-1 text-left py-2 px-2 rounded-lg font-medium transition-colors ${activeSectionId === sec._id ? "text-oxford" : "text-gray-500"
                                            }`}
                                    >
                                        <span className="text-[10px] text-gray-300 mr-2">#{index + 1}</span>
                                        {sec.type.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                    </button>
                                    <button
                                        onClick={() => deleteSection(sec._id)}
                                        className="opacity-0 group-hover:opacity-100 p-1.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Editor Area */}
                <main className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    {activeSection ? (
                        <>
                            <div className="p-8 border-b border-gray-50 bg-slate-50/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] font-bold text-oxford uppercase tracking-widest px-2 py-1 bg-oxford/10 rounded-full mb-2 inline-block">
                                            {activeSection.type} Template
                                        </span>
                                        <h2 className="text-2xl font-serif text-oxford capitalize">
                                            Edit {activeSection.type.replace(/-/g, " ")}
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <label className="text-sm font-medium text-gray-500">Visible</label>
                                        <input
                                            type="checkbox"
                                            checked={activeSection.isVisible}
                                            onChange={(e) => {
                                                const updated = { ...activeSection, isVisible: e.target.checked };
                                                setActiveSection(updated);
                                                setSections(sections.map(s => s._id === updated._id ? updated : s));
                                            }}
                                            className="w-5 h-5 accent-oxford"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                                <div className="space-y-10 max-w-4xl">
                                    {fields.map((field: any) => {
                                        const val = activeSection.content[field.key] || "";

                                        return (
                                            <div key={field.key} className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                                                        {field.type === 'text' && <Type size={16} className="text-gray-400" />}
                                                        {field.type === 'textarea' && <AlignLeft size={16} className="text-gray-400" />}
                                                        {field.type === 'image' && <ImageIcon size={16} className="text-gray-400" />}
                                                        {field.type === 'json' && <Code size={16} className="text-gray-400" />}
                                                        {field.label}
                                                    </label>
                                                </div>

                                                {field.type === "text" && (
                                                    <input
                                                        type="text"
                                                        value={val}
                                                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-oxford focus:ring-4 focus:ring-oxford/5 outline-none transition-all text-lg"
                                                    />
                                                )}

                                                {field.type === "textarea" && (
                                                    <textarea
                                                        value={val}
                                                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                                        rows={6}
                                                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-oxford focus:ring-4 focus:ring-oxford/5 outline-none transition-all resize-y text-lg leading-relaxed"
                                                    />
                                                )}

                                                {field.type === "image" && (
                                                    <div className="space-y-4">
                                                        {val && (
                                                            <div className="relative group aspect-video bg-gray-100 rounded-3xl overflow-hidden border border-gray-200">
                                                                <img src={val} alt="Preview" className="w-full h-full object-cover" />
                                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                    <button
                                                                        onClick={() => handleFieldChange(field.key, "")}
                                                                        className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                                    >
                                                                        <Trash2 size={24} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-200 rounded-3xl hover:bg-gray-50 cursor-pointer transition-colors group">
                                                            <Upload size={32} className="text-gray-300 group-hover:text-oxford mb-4 transition-colors" />
                                                            <p className="text-sm font-bold text-gray-500 group-hover:text-oxford transition-colors">
                                                                {val ? "Replace current image" : "Choose an image to upload"}
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-2">Maximum file size: 2MB</p>
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={(e) => e.target.files?.[0] && handleImageUpload(field.key, e.target.files[0])}
                                                            />
                                                        </label>
                                                    </div>
                                                )}

                                                {field.type === "gallery" && (
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                        {Array.isArray(val) && val.map((img: string, idx: number) => (
                                                            <div key={idx} className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
                                                                <img src={img} className="w-full h-full object-cover" />
                                                                <button
                                                                    onClick={() => {
                                                                        const copy = [...val];
                                                                        copy.splice(idx, 1);
                                                                        handleFieldChange(field.key, copy);
                                                                    }}
                                                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-200 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors group">
                                                            <Plus size={24} className="text-gray-300 group-hover:text-oxford" />
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                accept="image/*"
                                                                multiple
                                                                onChange={(e) => {
                                                                    const files = Array.from(e.target.files || []);
                                                                    files.forEach(file => {
                                                                        const reader = new FileReader();
                                                                        reader.readAsDataURL(file);
                                                                        reader.onloadend = () => {
                                                                            const current = Array.isArray(activeSection.content[field.key]) ? activeSection.content[field.key] : [];
                                                                            handleFieldChange(field.key, [...current, reader.result]);
                                                                        };
                                                                    });
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                )}

                                                {field.type === "json" && (
                                                    <textarea
                                                        value={typeof val === 'object' ? JSON.stringify(val, null, 2) : val}
                                                        onChange={(e) => {
                                                            try {
                                                                const json = JSON.parse(e.target.value);
                                                                handleFieldChange(field.key, json);
                                                            } catch (err) {
                                                                // Allow typing
                                                                handleFieldChange(field.key, e.target.value);
                                                            }
                                                        }}
                                                        rows={10}
                                                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 font-mono text-sm focus:border-oxford focus:ring-4 focus:ring-oxford/5 outline-none transition-all leading-relaxed"
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}

                                    {/* Add Field Button */}
                                    <div className="pt-10 border-t border-gray-100">
                                        <button
                                            onClick={() => {
                                                const key = prompt("Field key (e.g., buttonText):");
                                                if (key) handleFieldChange(key, "");
                                            }}
                                            className="flex items-center gap-2 text-gray-400 hover:text-oxford transition-colors font-medium text-sm"
                                        >
                                            <Plus size={16} /> Add Custom Field
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-20">
                            <Layout className="text-gray-200 mb-6" size={100} />
                            <h3 className="text-2xl font-serif text-gray-900 mb-2">No section selected</h3>
                            <p className="text-gray-500 mb-8 max-w-xs">Select a section from the sidebar or add a new one to start editing.</p>
                            <button
                                onClick={() => addSection("hero")}
                                className="px-8 py-3 bg-oxford text-white rounded-xl font-bold shadow-lg shadow-oxford/20"
                            >
                                Add My First Section
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default function UniversalEditor() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditorContent />
        </Suspense>
    );
}
