"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Save,
    RefreshCcw,
    School,
    CheckCircle2,
    AlertCircle,
    Info,
    MessageSquare,
    Shield,
    Image as ImageIcon,
    Phone,
    MapPin,
    Mail,
    Globe,
    Facebook,
    Instagram,
    Youtube,
    Trophy,
    Plus,
    Trash2,
    Edit3,
    ArrowLeft,
    Users,
    Microscope
} from "lucide-react";
import Link from "next/link";
import ImageUploadField from "@/components/admin/ImageUploadField";

const INSTITUTIONS = [
    { id: "marudhar", name: "Marudhar Balika Vidyapeeth", color: "from-sandstone to-sandstone-dark" },
    { id: "english", name: "Leeladevi English Medium", color: "from-oxford to-oxford-light" },
    { id: "primary", name: "Sushiladevi Primary School", color: "from-sandstone to-oxford-light" },
    { id: "college", name: "Leela Devi College", color: "from-oxford to-sandstone" },
];

export default function InstitutionManager() {
    const { id } = useParams();
    const instId = id as string;
    const institutionInfo = INSTITUTIONS.find(i => i.id === instId);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [formData, setFormData] = useState<any>({});
    const [results, setResults] = useState<any[]>([]);
    const [resultsLoading, setResultsLoading] = useState(false);
    const [faculty, setFaculty] = useState<any[]>([]);
    const [facultyLoading, setFacultyLoading] = useState(false);
    const [labs, setLabs] = useState<any[]>([]);
    const [labsLoading, setLabsLoading] = useState(false);

    // Only show labs card for institutions that have it
    const HAS_LABS = ["college", "marudhar", "english"];
    const labsLabel: Record<string, string> = {
        college: "Laboratories & Research",
        marudhar: "Modern Labs & Facilities",
        english: "Modern Infrastructure",
    };

    useEffect(() => {
        if (instId) {
            fetchData();
            fetchResults();
            fetchFaculty();
            if (HAS_LABS.includes(instId)) fetchLabs();
        }
    }, [instId]);

    const fetchLabs = async () => {
        setLabsLoading(true);
        try {
            const res = await fetch(`/api/admin/labs/${instId}`);
            const data = await res.json();
            if (data.success) setLabs(data.results);
        } catch (e) {
            console.error("Failed to fetch labs", e);
        } finally {
            setLabsLoading(false);
        }
    };

    const fetchFaculty = async () => {
        setFacultyLoading(true);
        try {
            const res = await fetch(`/api/admin/staff?institution=${instId}`);
            const data = await res.json();
            if (data.success) {
                // Filter faculty by institution if API doesn't do it perfectly
                const filtered = data.faculty.filter((f: any) => f.institution === instId);
                setFaculty(filtered);
            }
        } catch (error) {
            console.error("Failed to fetch faculty", error);
        } finally {
            setFacultyLoading(false);
        }
    };

    const fetchResults = async () => {
        setResultsLoading(true);
        try {
            const res = await fetch(`/api/admin/results?institution=${instId}`);
            const data = await res.json();
            if (data.success) {
                setResults(data.results);
            }
        } catch (error) {
            console.error("Failed to fetch results", error);
        } finally {
            setResultsLoading(false);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/institutions");
            const data = await res.json();
            if (data.success) {
                const grouped = data.institutions.reduce((acc: any, inst: any) => {
                    acc[inst.id] = inst;
                    return acc;
                }, {});
                setFormData(grouped[instId] || { id: instId });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Failed to load data" });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (section: string, field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [section]: {
                ...prev?.[section],
                [field]: value
            }
        }));
    };

    const handleFeeChange = (field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            feeStructure: {
                ...prev?.feeStructure,
                [field]: value
            }
        }));
    };

    const handleClassFeeChange = (index: number, field: string, value: any) => {
        const newClasses = [...(formData.feeStructure?.classes || [])];
        newClasses[index] = { ...newClasses[index], [field]: value };
        handleFeeChange("classes", newClasses);
    };

    const addFeeClass = () => {
        const newClasses = [...(formData.feeStructure?.classes || []), { section: "", className: "", totalFee: 0, admissionFee: "" }];
        handleFeeChange("classes", newClasses);
    };

    const removeFeeClass = (index: number) => {
        const newClasses = [...(formData.feeStructure?.classes || [])];
        newClasses.splice(index, 1);
        handleFeeChange("classes", newClasses);
    };

    const handleSimpleChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: "", text: "" });
        try {
            const res = await fetch("/api/admin/institutions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, id: instId }),
            });
            const data = await res.json();
            if (data.success) {
                setMessage({ type: "success", text: "Settings updated successfully!" });
            } else {
                setMessage({ type: "error", text: data.error || "Save failed" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "An error occurred while saving" });
        } finally {
            setSaving(false);
        }
    };

    if (loading && !instId) {
        return (
            <div className="flex items-center justify-center h-96">
                <RefreshCcw className="animate-spin text-sandstone" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header with Back Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin/institutions" 
                        className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-oxford hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-oxford uppercase tracking-tight">
                            {institutionInfo?.name || "Institution Manager"}
                        </h1>
                        <p className="text-sm text-gray-500 font-medium">Manage details, faculty, and results.</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Toppers Card */}
                <Link 
                    href={`/admin/results?institution=${instId}`}
                    className="group block bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-sandstone/20 transition-all relative overflow-hidden h-full"
                >
                    <Trophy className="absolute -right-8 -bottom-8 w-40 h-40 text-gray-50 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 rounded-2xl bg-sandstone flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform">
                            <Trophy size={32} />
                        </div>
                        
                        <h3 className="text-3xl font-black text-oxford mb-4 group-hover:text-sandstone transition-colors leading-tight">
                            Toppers & Merit Lists
                        </h3>
                        
                        <p className="text-gray-500 font-medium mb-12 flex-grow">
                            Manage board results, academic achievers, and historical merit lists for {institutionInfo?.name}.
                        </p>
                        
                        <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Records Found</span>
                                <span className="text-2xl font-black text-oxford">{results.length}</span>
                            </div>
                            <div className="flex items-center gap-2 text-oxford font-bold text-sm group-hover:gap-4 transition-all">
                                Manage Entries
                                <Plus size={16} className="text-sandstone" />
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Faculty Card */}
                <Link 
                    href={`/admin/staff?institution=${instId}`}
                    className="group block bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-sandstone/20 transition-all relative overflow-hidden h-full"
                >
                    <Users className="absolute -right-8 -bottom-8 w-40 h-40 text-gray-50 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 rounded-2xl bg-oxford flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform">
                            <Users size={32} />
                        </div>
                        
                        <h3 className="text-3xl font-black text-oxford mb-4 group-hover:text-sandstone transition-colors leading-tight">
                            Faculties & Staff
                        </h3>
                        
                        <p className="text-gray-500 font-medium mb-12 flex-grow">
                            Maintain the record of teaching staff, administrators, and support personnel for this institution.
                        </p>
                        
                        <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Staff Members</span>
                                <span className="text-2xl font-black text-oxford">{faculty.length}</span>
                            </div>
                            <div className="flex items-center gap-2 text-oxford font-bold text-sm group-hover:gap-4 transition-all">
                                Manage Staff
                                <Plus size={16} className="text-sandstone" />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Labs & Infrastructure Card - only for 3 institutions */}
            {HAS_LABS.includes(instId) && (
                <Link
                    href={`/admin/labs/${instId}`}
                    className="group block bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-sandstone/20 transition-all relative overflow-hidden"
                >
                    <Microscope className="absolute -right-8 -bottom-8 w-40 h-40 text-gray-50 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-oxford to-sandstone flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform">
                            <Microscope size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-oxford mb-4 group-hover:text-sandstone transition-colors leading-tight">
                            {labsLabel[instId]}
                        </h3>
                        <p className="text-gray-500 font-medium mb-12 flex-grow">
                            Manage labs, facilities, and infrastructure entries displayed on the public website for {institutionInfo?.name}.
                        </p>
                        <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Entries</span>
                                <span className="text-2xl font-black text-oxford">{labsLoading ? "..." : labs.length}</span>
                            </div>
                            <div className="flex items-center gap-2 text-oxford font-bold text-sm group-hover:gap-4 transition-all">
                                Manage Labs
                                <Plus size={16} className="text-sandstone" />
                            </div>
                        </div>
                    </div>
                </Link>
            )}

            {/* Fee Structure Section */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden mt-10">
                <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-oxford uppercase tracking-tight flex items-center gap-3">
                            <Save className="text-sandstone" />
                            Fee Structure Management
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Manage academic fees and installments for {institutionInfo?.name}.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Installments</label>
                            <div className="relative">
                                <select 
                                    value={formData.feeStructure?.installments || 2}
                                    onChange={(e) => handleFeeChange("installments", parseInt(e.target.value))}
                                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-sandstone/20 transition-all font-bold text-oxford appearance-none"
                                >
                                    {[1, 2, 3, 4, 6, 12].map(n => (
                                        <option key={n} value={n}>{n} Installments</option>
                                    ))}
                                </select>
                                <RefreshCcw className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                            </div>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-3 bg-oxford text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-black transition-all shadow-lg flex items-center gap-2 disabled:opacity-70"
                        >
                            {saving ? <RefreshCcw size={14} className="animate-spin" /> : <Save size={14} />}
                            Save Fees
                        </button>
                    </div>
                </div>

                <div className="p-8">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-oxford block">Academic Year</label>
                            <input 
                                type="text"
                                value={formData.feeStructure?.year || "2026-27"}
                                onChange={(e) => handleFeeChange("year", e.target.value)}
                                placeholder="e.g. 2026-27"
                                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-oxford focus:border-sandstone outline-none w-40"
                            />
                        </div>
                        <button 
                            onClick={addFeeClass}
                            className="px-4 py-2 bg-sandstone/10 text-oxford rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-sandstone transition-all"
                        >
                            <Plus size={14} /> Add Class
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Section</th>
                                    <th className="py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Class Name</th>
                                    <th className="py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Total Fee (₹)</th>
                                    <th className="py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Installment (Calculated)</th>
                                    <th className="py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Admission Fee</th>
                                    <th className="py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {formData.feeStructure?.classes?.map((item: any, idx: number) => (
                                    <tr key={idx} className="group">
                                        <td className="py-4 pr-4">
                                            <input 
                                                type="text"
                                                value={item.section || ""}
                                                onChange={(e) => handleClassFeeChange(idx, "section", e.target.value)}
                                                placeholder="e.g. Hindi Medium"
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-oxford focus:bg-white focus:border-sandstone outline-none transition-all"
                                            />
                                        </td>
                                        <td className="py-4 pr-4">
                                            <input 
                                                type="text"
                                                value={item.className}
                                                onChange={(e) => handleClassFeeChange(idx, "className", e.target.value)}
                                                placeholder="e.g. Nursery"
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-oxford focus:bg-white focus:border-sandstone outline-none transition-all"
                                            />
                                        </td>
                                        <td className="py-4 px-4">
                                            <input 
                                                type="number"
                                                value={item.totalFee}
                                                onChange={(e) => handleClassFeeChange(idx, "totalFee", parseInt(e.target.value))}
                                                className="w-32 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-black text-oxford focus:bg-white focus:border-sandstone outline-none transition-all"
                                            />
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="px-4 py-2 bg-sandstone/5 rounded-xl text-sm font-bold text-sandstone-dark border border-sandstone/10">
                                                ₹{(item.totalFee / (formData.feeStructure?.installments || 2)).toLocaleString()} × {formData.feeStructure?.installments || 2}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <input 
                                                type="text"
                                                value={item.admissionFee}
                                                onChange={(e) => handleClassFeeChange(idx, "admissionFee", e.target.value)}
                                                placeholder="e.g. ₹2,500"
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-oxford focus:bg-white focus:border-sandstone outline-none transition-all"
                                            />
                                        </td>
                                        <td className="py-4 text-right">
                                            <button 
                                                onClick={() => removeFeeClass(idx)}
                                                className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {(!formData.feeStructure?.classes || formData.feeStructure.classes.length === 0) && (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-gray-400 italic text-sm">
                                            No fee records found. Click "Add Class" to begin.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Quick Actions Helper */}
            <div className="bg-sandstone/10 p-8 rounded-[3rem] border border-sandstone/20 flex flex-col md:flex-row items-center gap-8">
                <div className="w-16 h-16 rounded-2xl bg-white border border-sandstone/20 flex items-center justify-center text-sandstone shrink-0 shadow-sm">
                    <Info size={32} />
                </div>
                <div>
                    <h4 className="text-xl font-black text-oxford mb-2 uppercase tracking-tight">Institutional Dashboard</h4>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-2xl font-medium">
                        You are currently managing <strong>{institutionInfo?.name}</strong>. Any changes made to toppers or faculty records will be immediately visible on the public institutional website.
                    </p>
                </div>
            </div>
        </div>
    );
}
