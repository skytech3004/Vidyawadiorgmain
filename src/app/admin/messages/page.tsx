"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, MessageSquare, Save, User, Edit3, Type, LayoutTemplate } from "lucide-react";
import FileUploadField from "@/components/admin/FileUploadField";
import TiptapEditor from "@/components/admin/TiptapEditor";
import { cn } from "@/lib/utils";

type MessageRole = "president" | "secretary" | "ceo";

type MessageForm = {
    role: MessageRole;
    title: string;
    name: string;
    photo: string;
    content: string;
};

const MESSAGE_SECTIONS: Array<{ role: MessageRole; label: string; helper: string }> = [
    { role: "president", label: "President's Message", helper: "Opening message from the Management" },
    { role: "secretary", label: "Secretary's Message", helper: "Official note from the Principal" },
    { role: "ceo", label: "CEO's Message", helper: "Leadership note from the CEO" },
];

const EMPTY_MESSAGES: Record<MessageRole, MessageForm> = {
    president: { role: "president", title: "", name: "", photo: "", content: "" },
    secretary: { role: "secretary", title: "", name: "", photo: "", content: "" },
    ceo: { role: "ceo", title: "", name: "", photo: "", content: "" },
};

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<Record<MessageRole, MessageForm>>(EMPTY_MESSAGES);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [banner, setBanner] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [activeTab, setActiveTab] = useState<MessageRole>("president");

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/messages");
            const data = await res.json();
            if (data.success && Array.isArray(data.messages)) {
                const nextState = { ...EMPTY_MESSAGES };
                data.messages.forEach((message: Partial<MessageForm>) => {
                    if (message.role && nextState[message.role as MessageRole]) {
                        nextState[message.role as MessageRole] = {
                            role: message.role as MessageRole,
                            title: message.title || "",
                            name: message.name || "",
                            photo: message.photo || "",
                            content: message.content || "",
                        };
                    }
                });
                setMessages(nextState);
            }
        } catch (error) {
            setBanner({ type: "error", text: "Failed to load messages" });
        } finally {
            setLoading(false);
        }
    };

    const updateMessage = (role: MessageRole, field: keyof Omit<MessageForm, "role">, value: string) => {
        setMessages((prev) => ({
            ...prev,
            [role]: {
                ...prev[role],
                [field]: value,
            },
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setBanner(null);
        try {
            const res = await fetch("/api/admin/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: Object.values(messages) }),
            });
            const data = await res.json();
            if (data.success) {
                setBanner({ type: "success", text: "Leadership messages updated successfully." });
                await fetchMessages();
            } else {
                setBanner({ type: "error", text: data.error || "Unable to save messages" });
            }
        } catch (error) {
            setBanner({ type: "error", text: "An error occurred while saving" });
        } finally {
            setSaving(false);
            setTimeout(() => setBanner(null), 5000);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-sandstone" size={48} />
            </div>
        );
    }

    const activeSection = MESSAGE_SECTIONS.find(s => s.role === activeTab)!;
    const activeMessage = messages[activeTab];
    const isReady = activeMessage.title && activeMessage.content && activeMessage.photo;

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Top Header */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-oxford tracking-tight">Leadership Messages</h1>
                        <p className="text-gray-500 mt-1 font-medium">Manage Management, Principal, and CEO messages.</p>
                    </div>
                    
                    <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        <div className="flex p-1.5 bg-slate-100 rounded-2xl border border-gray-200 shrink-0">
                            {MESSAGE_SECTIONS.map((section) => (
                                <button
                                    key={section.role}
                                    onClick={() => setActiveTab(section.role)}
                                    className={cn(
                                        "px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                                        activeTab === section.role 
                                            ? "bg-white text-oxford shadow-sm border border-gray-200" 
                                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                    )}
                                >
                                    {section.label}
                                </button>
                            ))}
                        </div>
                        
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSave}
                            disabled={saving}
                            className="inline-flex shrink-0 items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-sandstone text-oxford font-black uppercase tracking-widest text-xs shadow-lg hover:bg-sandstone-dark transition-all disabled:opacity-70"
                        >
                            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            {saving ? "Saving..." : "Save All"}
                        </motion.button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-10">
                <AnimatePresence>
                    {banner && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={cn(
                                "mb-8 rounded-2xl border px-6 py-4 flex items-center gap-3 text-sm font-bold shadow-sm",
                                banner.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"
                            )}
                        >
                            {banner.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                            {banner.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                >
                    {/* Header Info */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-gray-100 flex items-center justify-center text-sandstone">
                                <MessageSquare size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-oxford">{activeSection.label}</h2>
                                <p className="text-gray-500 font-medium">{activeSection.helper}</p>
                            </div>
                        </div>
                        <div className={cn(
                            "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border",
                            isReady ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"
                        )}>
                            {isReady ? 'Ready for Website' : 'Draft Missing Fields'}
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Editor Section */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                        <Type size={16} className="text-sandstone" /> Message Title
                                    </label>
                                    <input
                                        type="text"
                                        value={activeMessage.title}
                                        onChange={(e) => updateMessage(activeTab, "title", e.target.value)}
                                        placeholder={`E.g. A Message from the ${activeSection.label.split("'s")[0]}`}
                                        className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-gray-200 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all font-bold text-oxford text-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                        <User size={16} className="text-sandstone" /> Leader Name
                                    </label>
                                    <input
                                        type="text"
                                        value={activeMessage.name}
                                        onChange={(e) => updateMessage(activeTab, "name", e.target.value)}
                                        placeholder={`E.g. Prof.(Dr.) Punita Soni`}
                                        className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-gray-200 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all font-bold text-oxford text-lg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                    <Edit3 size={16} className="text-sandstone" /> Message Content
                                </label>
                                <TiptapEditor
                                    value={activeMessage.content}
                                    onChange={(val) => updateMessage(activeTab, "content", val)}
                                />
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Photo Upload */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-oxford mb-6 flex items-center gap-2">
                                        <User size={18} className="text-sandstone" /> Leader Photo
                                    </h3>
                                    <div className="aspect-[4/5] max-w-sm mx-auto rounded-[1.5rem] overflow-hidden bg-slate-50 border-2 border-dashed border-gray-200 relative group mb-6">
                                        {activeMessage.photo ? (
                                            <img 
                                                src={activeMessage.photo} 
                                                alt="Leader" 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                                                <User size={48} className="mb-4 opacity-50" />
                                                <p className="font-bold text-sm text-gray-500 mb-1">No Photo</p>
                                                <p className="text-xs">Upload a vertical portrait</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <FileUploadField
                                    label="Change Photo"
                                    value={activeMessage.photo}
                                    onChange={(url) => updateMessage(activeTab, "photo", url)}
                                    folder={`messages/${activeTab}`}
                                    accept="image/*"
                                />
                            </div>

                            {/* Live Preview Mini */}
                            <div className="bg-oxford rounded-[2rem] p-8 shadow-2xl relative overflow-hidden text-white flex flex-col">
                                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                    <div className="absolute inset-0 bg-[radial-gradient(#E2C792_1px,transparent_1px)] [background-size:16px_16px]" />
                                </div>
                                <div className="relative z-10 flex-1 flex flex-col">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-sandstone flex items-center gap-2 mb-6">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                        Website Preview
                                    </h3>
                                    
                                    <h4 className="text-xl font-bold mb-4">
                                        {activeMessage.title || "Message Title..."}
                                    </h4>
                                    
                                    <div 
                                        className="text-white text-sm leading-relaxed font-light mb-6 prose prose-sm prose-invert flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar"
                                        dangerouslySetInnerHTML={{ __html: activeMessage.content || "Message content will appear here..." }}
                                    />

                                    <div className="pt-6 border-t border-white/10 flex items-center gap-4 mt-auto">
                                        <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden shrink-0">
                                            {activeMessage.photo && <img src={activeMessage.photo} className="w-full h-full object-cover" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white mb-0.5">
                                                {activeMessage.name || "Leader Name"}
                                            </p>
                                            <p className="text-[10px] font-bold text-sandstone uppercase tracking-wide">
                                                {activeSection.label.replace("'s Message", "")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
