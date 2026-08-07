"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HostelGallery from "@/components/HostelGallery3D";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck, Utensils, Lightbulb, Wind, Wifi, Shirt, Phone, Heart,
    Plus, Minus, ChevronRight, Download, MessageSquare, MapPin, GraduationCap,
    Trophy, Users as UsersIcon, ArrowRight, Star, HeartHandshake, Music,
    Palette, Dumbbell, Coffee, Stethoscope, Calendar, CircleCheck, CreditCard,
    Banknote, School, Bed, History, FileCheck, Clock, Scale, Umbrella, Droplets,
    Thermometer, ShoppingBag
} from "lucide-react";

const SectionHeader = ({ title, subtitle, light = false }: any) => (
    <div className="text-center mb-16 px-6">
        <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`block text-sm font-bold uppercase tracking-[0.4em] mb-4 ${light ? "text-sandstone-light" : "text-sandstone-dark"}`}
        >
            {subtitle}
        </motion.span>
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-6xl font-bold leading-tight ${light ? "text-white" : "text-oxford"}`}
        >
            {title}
        </motion.h2>
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full"
        />
    </div>
);

export default function Page() {
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
    const [hostelData, setHostelData] = useState<any>(null);

    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTo(0, 0);

        const fetchHostelData = async () => {
            try {
                const res = await fetch("/api/hostel");
                const data = await res.json();
                if (data.success) {
                    setHostelData(data.hostel);
                    if (data.hostel?.rules?.length > 0) {
                        setActiveAccordion(data.hostel.rules[0].id);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch hostel data", err);
            }
        };
        fetchHostelData();
    }, []);

    const defaultRules = [
        {
            id: "entry",
            title: "Entry Policy",
            icon: "History",
            content: "An Entry Pass is required for all visitors, which must be signed by the Hostel Incharge & Chief Resident Officer. Parents are welcome to meet their children only on Sundays between 9:30 AM and 6:00 PM."
        },
        {
            id: "exit",
            title: "Exit Policy",
            icon: "FileCheck",
            content: "Students are permitted to exit the campus only with approved relatives. An Exit Pass is mandatory and requires official approvals from the administration."
        }
    ];

    const rules = hostelData?.rules?.length > 0 ? hostelData.rules : defaultRules;

    const defaultFeatures = [
        { icon: "MapPin", text: "65-Acre Safe Campus" },
        { icon: "Dumbbell", text: "International Sports Stadium" },
        { icon: "Users", text: "Class-wise Accommodation" },
        { icon: "Star", text: "Warden & Maid Support" }
    ];
    const features = hostelData?.about?.features?.length > 0 ? hostelData.about.features : defaultFeatures;

    const IconMap: any = { MapPin, Dumbbell, Users: UsersIcon, Star, ShieldCheck, History, FileCheck, Scale, Umbrella };

    return (
        <main className="min-h-screen bg-white font-devanagari">
            <Navbar />

            {/* 1. Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src="/hostel.jpg"
                        alt="Vidyawadi Hostel"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-oxford/60 via-oxford/40 to-white" />
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-sandstone text-oxford text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                            Education with Sanskar
                        </span>
                        <p className="text-lg md:text-2xl font-light mb-12 max-w-2xl mx-auto text-white/90">
                            Students can experience a home away from home where traditional values meet modern excellence.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            {hostelData?.prospectus ? (
                                <motion.a
                                    href={hostelData.prospectus}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 bg-sandstone text-oxford font-black uppercase tracking-widest rounded-2xl shadow-2xl flex items-center gap-3 group"
                                >
                                    <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                                    Download Prospectus
                                </motion.a>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 bg-sandstone text-oxford font-black uppercase tracking-widest rounded-2xl shadow-2xl flex items-center gap-3 group"
                                >
                                    <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                                    Download Prospectus
                                </motion.button>
                            )}
                            <a href="/apply" className="contents">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-black uppercase tracking-widest rounded-2xl border border-white/30 flex items-center gap-3 transition-all"
                                >
                                    Apply Now
                                    <ArrowRight size={20} />
                                </motion.button>
                            </a>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-oxford text-center opacity-50"
                >
                    <div className="w-1 h-12 bg-oxford/20 mx-auto rounded-full overflow-hidden">
                        <motion.div
                            animate={{ y: [0, 48, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-full h-1/3 bg-sandstone rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            {/* 2. About Section */}
            <section className="py-24 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                                <img src="/f837631c-4bc9-4494-b8f1-fff9b07554d8.jpg" alt="Campus Gardens" className="w-full h-full object-cover" />
                            </div>
                            {hostelData?.about?.stats?.[0] && (
                                <div className="absolute -bottom-10 -right-10 bg-oxford p-10 rounded-[2.5rem] shadow-2xl text-white">
                                    <div className="text-5xl text-sandstone mb-2">{hostelData.about.stats[0].value}</div>
                                    <div className="text-xs font-black uppercase tracking-widest text-white/60">{hostelData.about.stats[0].label}</div>
                                </div>
                            )}
                        </motion.div>

                        <div className="space-y-8">
                            <div>
                                <span className="block text-xs font-black uppercase tracking-[0.3em] text-sandstone mb-4">
                                    About The Hostel
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-oxford leading-tight whitespace-pre-wrap">
                                    {hostelData?.about?.title || "Your Second Home for \nHolistic Growth."}
                                </h2>
                            </div>

                            <div 
                                className="text-lg text-gray-500 font-light leading-relaxed whitespace-pre-wrap prose prose-lg prose-sandstone max-w-none"
                                dangerouslySetInnerHTML={{ __html: hostelData?.about?.description || "Spread across a lush 65-acre campus, Vidyawadi offers a secure and nurturing residential environment. With 8 double-storied hostel buildings, we provide class-wise accommodation for students from Nursery to Graduation." }}
                            />

                            <div className="grid grid-cols-2 gap-6 pt-4">
                                {features.map((item: any, i: number) => {
                                    const IconCmp = IconMap[item.icon] || MapPin;
                                    return (
                                        <div key={i} className="flex items-center gap-3 text-oxford font-bold text-sm">
                                            <div className="text-sandstone"><IconCmp size={18} /></div>
                                            {item.text}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Hostel Gallery */}
            <HostelGallery customImages={hostelData?.gallery} />

            {/* 4. Facilities Section */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader title="Hostel Facilities" subtitle="World-Class Amenities" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {(hostelData?.facilities?.length > 0 ? hostelData.facilities : [
                            { image: "/uploads/mess/security.jpg", title: "Safety & CCTV", desc: "Round-the-clock security with full CCTV coverage." },
                            { image: "/images/jain_meals.png", title: "Pure Jain Food", desc: "Nutritious Satvik meals with 5 servings per day." },
                            { image: "/uploads/mess/RO.jpg", title: "RO Drinking Water", desc: "Pure and safe RO purified drinking water available 24/7." },
                            { image: "/uploads/mess/HOT.jpg", title: "Hot Water", desc: "Constant supply of hot water during winter months." }
                        ]).map((item: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative flex flex-col bg-slate-50 rounded-[2rem] overflow-hidden border border-black/5 hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-sandstone group-hover:scale-110 transition-transform duration-700">
                                            <ShieldCheck size={64} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <h3 className="text-2xl text-oxford font-bold mb-3 group-hover:text-sandstone transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 font-light text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Fee Structure Section */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader title="Hostel Fee Structure" subtitle="2026 – 27 Session" />

                    <div className="overflow-x-auto rounded-[3rem] shadow-2xl border-2 border-gray-100 bg-white hover:border-sandstone/30 hover:shadow-2xl transition-all duration-500 group/card">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-oxford text-white">
                                    <th className="p-10 text-xs font-black uppercase tracking-widest">Class / Level</th>
                                    <th className="p-10 text-xs font-black uppercase tracking-widest">Standard (Non-AC)</th>
                                    <th className="p-10 text-xs font-black uppercase tracking-widest">Premium (AC)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">                                 
                                {(hostelData?.fees?.table?.length > 0 ? hostelData.fees.table : [
                                    { className: "Nursery to Class 5", nonAc: "₹87,500", ac: "₹1,20,500" },
                                    { className: "Class 6", nonAc: "₹87,500", ac: "₹1,22,500" }
                                ]).map((row: any, i: number) => (
                                    <tr key={i} className="hover:bg-sandstone/5 group transition-colors cursor-pointer">
                                        <td className="p-10 font-bold text-oxford group-hover:text-sandstone transition-colors">{row.className || row.class}</td>
                                        <td className="p-10 text-gray-500 font-medium">{row.nonAc} / Year</td>
                                        <td className="p-10">
                                            {row.ac && row.ac !== "-" ? (
                                                <span className="text-sandstone-dark font-black">{row.ac} / Year</span>
                                            ) : (
                                                <span className="text-gray-300">N/A</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-12 grid lg:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 flex items-start gap-5 hover:shadow-lg transition-shadow">
                            <div className="bg-sandstone/10 p-4 rounded-2xl text-sandstone shrink-0">
                                <CreditCard size={28} />
                            </div>
                            <div className="w-full">
                                <h4 className="font-bold text-oxford mb-4 text-xl border-b border-gray-50 pb-3">Short Duration Stay</h4>
                                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                                    The institution offers short-term accommodation facilities as per the following tariff:
                                </p>
                                <div className="space-y-3 text-sm text-gray-600 font-medium bg-slate-50 p-5 rounded-2xl border border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Non-AC</span>
                                        <span className="font-black text-oxford text-base">{hostelData?.fees?.shortDuration?.nonAc || "₹10,000"} <span className="text-xs text-gray-400 font-normal">/ month</span></span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">AC</span>
                                        <span className="font-black text-oxford text-base">{hostelData?.fees?.shortDuration?.ac || "₹12,000"} <span className="text-xs text-gray-400 font-normal">/ month</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 flex items-start gap-5 hover:shadow-lg transition-shadow">
                            <div className="bg-sandstone/10 p-4 rounded-2xl text-sandstone shrink-0">
                                <Banknote size={28} />
                            </div>
                            <div className="w-full">
                                <h4 className="font-bold text-oxford mb-4 text-xl border-b border-gray-50 pb-3">Cancellation Policy</h4>
                                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                                    In the event of cancellation after the payment of the deposit, a deduction of <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full whitespace-nowrap">{hostelData?.fees?.cancellation?.penalty || "₹10,000"}</span> shall be applicable.
                                </p>
                                <p className="text-sm text-gray-500 mb-4 font-semibold">The last dates for cancellation are as follows:</p>
                                <div className="space-y-3 text-sm text-gray-600 font-medium bg-slate-50 p-5 rounded-2xl border border-gray-100">
                                    <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-50 shadow-sm">
                                        <span className="flex items-center gap-2"><School size={16} className="text-sandstone" /> School</span>
                                        <span className="font-black text-oxford">{hostelData?.fees?.cancellation?.schoolDate || "August 15"}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-50 shadow-sm">
                                        <span className="flex items-center gap-2"><GraduationCap size={16} className="text-sandstone" /> College</span>
                                        <span className="font-black text-oxford">{hostelData?.fees?.cancellation?.collegeDate || "October 30"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Rules & Policies Section */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader title="Rules & Policies" subtitle="Nurturing Discipline" />

                    <div className="space-y-4">
                        {rules.map((rule: any, idx: number) => {
                            const IconCmp = IconMap[rule.icon] || History;
                            return (
                            <div key={rule.id || rule._id || idx} className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <button
                                    onClick={() => setActiveAccordion(activeAccordion === rule.id ? null : rule.id)}
                                    className="w-full flex items-center justify-between p-8 text-left bg-white group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl transition-colors ${activeAccordion === rule.id ? "bg-sandstone text-white" : "bg-slate-50 text-sandstone group-hover:bg-sandstone/10"}`}>
                                            <IconCmp size={20} />
                                        </div>
                                        <span className="text-xl font-bold text-oxford">{rule.title}</span>
                                    </div>
                                    <div className={`transition-transform duration-300 ${activeAccordion === rule.id ? "rotate-45" : ""}`}>
                                        <Plus size={24} className="text-sandstone" />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {activeAccordion === rule.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div 
                                                className="p-8 pt-0 text-gray-500 font-light leading-relaxed border-t border-slate-50 whitespace-pre-wrap prose prose-sandstone max-w-none"
                                                dangerouslySetInnerHTML={{ __html: rule.content }}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )})}
                    </div>
                </div>
            </section>

            {/* 7. Scholarships & Banking Details */}
            <section className="py-24 px-6 bg-oxford relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(#E2C792_1px,transparent_1px)] [background-size:20px_20px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Scholarships */}
                        <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-12 border border-white/10">
                            <h3 className="text-3xl text-white mb-8">Scholarships & Discounts</h3>
                            <div className="space-y-6">
                                {(hostelData?.scholarships?.length > 0 ? hostelData.scholarships : [
                                    { title: "Merit Scholarship", desc: "10% discount for students securing 95% and above." },
                                    { title: "Sports Excellence", desc: "Special scholarships for National level sports players." }
                                ]).map((item: any, i: number) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="bg-sandstone/20 p-3 rounded-xl text-sandstone shrink-0">
                                            <Trophy size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">{item.title}</h4>
                                            <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Banking Details */}
                        <div className="bg-white rounded-[3rem] p-12 shadow-2xl">
                            <h3 className="text-3xl text-oxford mb-8">Banking Details</h3>
                            <div className="space-y-4 mb-10 text-sm">
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Account Name</span>
                                    <span className="text-oxford font-black">{hostelData?.banking?.accountName || "Marudhar Mahila Shikshan Sangh"}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Bank & Branch</span>
                                    <span className="text-oxford font-black">{hostelData?.banking?.bankAndBranch || "ICICI Bank – Rani Branch"}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">A/c Number</span>
                                    <span className="text-sandstone-dark font-black tracking-widest">{hostelData?.banking?.accountNumber || "684605601184"}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">IFSC Code</span>
                                    <span className="text-oxford font-black tracking-widest">{hostelData?.banking?.ifscCode || "ICIC0006846"}</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="flex-1 bg-oxford text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                                    <Phone size={16} />
                                    Call Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
