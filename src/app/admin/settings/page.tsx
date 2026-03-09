"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Save,
    Loader2,
    Mail,
    Server,
    Key,
    User,
    CheckCircle2,
    AlertCircle
} from "lucide-react";

export default function SettingsManagerPage() {
    const [settings, setSettings] = useState({
        smtp_host: "",
        smtp_port: "",
        smtp_user: "",
        smtp_password: "",
        smtp_from_email: "",
        smtp_secure: "true"
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/settings");
            const data = await res.json();
            if (data.success && data.settings) {
                setSettings({
                    smtp_host: data.settings.smtp_host || "",
                    smtp_port: data.settings.smtp_port || "",
                    smtp_user: data.settings.smtp_user || "",
                    smtp_password: data.settings.smtp_password || "",
                    smtp_from_email: data.settings.smtp_from_email || "",
                    smtp_secure: data.settings.smtp_secure || "true"
                });
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });
            const data = await res.json();

            if (data.success) {
                setMessage({ type: "success", text: "Settings saved successfully!" });
                setTimeout(() => setMessage(null), 3000);
            } else {
                setMessage({ type: "error", text: data.error || "Failed to save settings." });
            }
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "An error occurred." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-180px)]">
                <Loader2 className="animate-spin text-sandstone" size={48} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl max-h-[calc(100vh-180px)] overflow-y-auto no-scrollbar pb-10">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-oxford uppercase tracking-tight flex items-center gap-3">
                            <Mail className="text-sandstone" />
                            SMTP Configuration
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Configure email delivery settings for system notifications and contact forms.</p>
                    </div>
                </div>

                <div className="p-8">
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-2xl mb-8 flex items-center gap-3 text-sm font-bold ${message.type === "success"
                                    ? "bg-green-50 text-green-600 border border-green-200"
                                    : "bg-red-50 text-red-600 border border-red-200"
                                }`}
                        >
                            {message.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                            {message.text}
                        </motion.div>
                    )}

                    <form onSubmit={handleSave} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2 flex items-center gap-2">
                                    <Server size={14} className="text-sandstone" /> SMTP Host
                                </label>
                                <input
                                    type="text"
                                    name="smtp_host"
                                    value={settings.smtp_host}
                                    onChange={handleChange}
                                    placeholder="e.g. smtp.gmail.com"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2 flex items-center gap-2">
                                    <Server size={14} className="text-sandstone" /> SMTP Port
                                </label>
                                <input
                                    type="text"
                                    name="smtp_port"
                                    value={settings.smtp_port}
                                    onChange={handleChange}
                                    placeholder="e.g. 587 or 465"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2 flex items-center gap-2">
                                    <User size={14} className="text-sandstone" /> SMTP Username
                                </label>
                                <input
                                    type="text"
                                    name="smtp_user"
                                    value={settings.smtp_user}
                                    onChange={handleChange}
                                    placeholder="e.g. your-email@gmail.com"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2 flex items-center gap-2">
                                    <Key size={14} className="text-sandstone" /> SMTP Password / App Password
                                </label>
                                <input
                                    type="password"
                                    name="smtp_password"
                                    value={settings.smtp_password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2 flex items-center gap-2">
                                    <Mail size={14} className="text-sandstone" /> From Email Address
                                </label>
                                <input
                                    type="email"
                                    name="smtp_from_email"
                                    value={settings.smtp_from_email}
                                    onChange={handleChange}
                                    placeholder="e.g. noreply@vidyawadi.com"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-oxford ml-2 flex items-center gap-2">
                                    <Server size={14} className="text-sandstone" /> Use Secure Connection (TLS/SSL)
                                </label>
                                <select
                                    name="smtp_secure"
                                    value={settings.smtp_secure}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-sandstone focus:ring-0 transition-all outline-none text-oxford font-medium appearance-none"
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-8 py-4 bg-oxford text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-black transition-all shadow-xl shadow-oxford/20 flex items-center justify-center gap-3 disabled:opacity-70"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin text-sandstone" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} className="text-sandstone" />
                                        Save Settings
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
