"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck,
    Utensils,
    Lightbulb,
    Wind,
    Wifi,
    Shirt,
    Phone,
    Heart,
    Plus,
    Minus,
    ChevronRight,
    Download,
    MessageSquare,
    MapPin,
    GraduationCap,
    Trophy,
    Users as UsersIcon,
    ArrowRight,
    Star,
    HeartHandshake,
    Music,
    Palette,
    Dumbbell,
    Coffee,
    Stethoscope,
    Calendar,
    CircleCheck,
    CreditCard,
    Banknote,
    School,
    Bed,
    History,
    FileCheck,
    Clock,
    Scale,
    Umbrella,
    Droplets,
    Thermometer,
    ShoppingBag
} from "lucide-react";

const SectionHeader = ({ title, subtitle, light = false }: any) => (
    <div className="text-center mb-16 px-6">
        <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`block text-xs font-black uppercase tracking-[0.3em] mb-4 ${light ? "text-sandstone/80" : "text-sandstone"}`}
        >
            {subtitle}
        </motion.span>
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-6xl font-serif ${light ? "text-white" : "text-oxford"}`}
        >
            {title}
        </motion.h2>
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-sandstone mx-auto mt-8 rounded-full"
        />
    </div>
);

export default function Page() {
    const [activeRoomType, setActiveRoomType] = useState("non-ac");
    const [activeAccordion, setActiveAccordion] = useState<string | null>("entry");

    const rules = [
        {
            id: "entry",
            title: "Entry Policy",
            icon: <History size={20} />,
            content: "An Entry Pass is required for all visitors, which must be signed by the Hostel Incharge & Chief Resident Officer. Parents are welcome to meet their children only on Sundays between 9:30 AM and 6:00 PM."
        },
        {
            id: "exit",
            title: "Exit Policy",
            icon: <FileCheck size={20} />,
            content: "Students are permitted to exit the campus only with approved relatives. An Exit Pass is mandatory and requires official approvals from the administration."
        },
        {
            id: "discipline",
            title: "Discipline Rules",
            icon: <Scale size={20} />,
            content: "We maintain a focused environment: Mobiles are not allowed for school students. Dress code prohibits shorts, sleeveless, or tight clothing. Cosmetics, jewelry, cameras, and large sums of currency are restricted. Morning Yoga and Sports are mandatory for all residents."
        },
        {
            id: "holidays",
            title: "Holidays & Breaks",
            icon: <Umbrella size={20} />,
            content: "The hostel follows a specific holiday calendar including Diwali, Winter Break, and Summer Break. Please note that board exam students may be required to stay during winter breaks for preparation."
        }
    ];

    return (
        <main className="min-h-screen bg-white">
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
                        {/* <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-tight">
                            Hostel <span className="text-sandstone">Life</span>
                        </h1> */}
                        <p className="text-lg md:text-2xl font-light mb-12 max-w-2xl mx-auto text-white/90">
                            Students can experience a home away from home where traditional values meet modern excellence.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 bg-sandstone text-oxford font-black uppercase tracking-widest rounded-2xl shadow-2xl flex items-center gap-3 group"
                            >
                                <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                                Download Prospectus
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-black uppercase tracking-widest rounded-2xl border border-white/30 flex items-center gap-3 transition-all"
                            >
                                Apply Now
                                <ArrowRight size={20} />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
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
                            <div className="absolute -bottom-10 -right-10 bg-oxford p-10 rounded-[2.5rem] shadow-2xl text-white">
                                <div className="text-5xl font-serif text-sandstone mb-2">800+</div>
                                <div className="text-xs font-black uppercase tracking-widest text-white/60">Student Capacity</div>
                            </div>
                        </motion.div>

                        <div className="space-y-8">
                            <div>
                                <span className="block text-xs font-black uppercase tracking-[0.3em] text-sandstone mb-4">
                                    About The Hostel
                                </span>
                                <h2 className="text-4xl md:text-6xl font-serif text-oxford leading-tight">
                                    Your Second Home for <br />
                                    <span>Holistic Growth.</span>
                                </h2>
                            </div>

                            <p className="text-lg text-gray-500 font-light leading-relaxed">
                                Spread across a lush 65-acre campus, Vidyawadi offers a secure and nurturing residential environment. With 8 double-storied hostel buildings, we provide class-wise accommodation for students from Nursery to Graduation.
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-4">
                                {[
                                    { icon: <MapPin size={18} />, text: "65-Acre Safe Campus" },
                                    { icon: <Dumbbell size={18} />, text: "International Sports Stadium" },
                                    { icon: <UsersIcon size={18} />, text: "Class-wise Accommodation" },
                                    { icon: <Star size={18} />, text: "Warden & Maid Support" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-oxford font-bold text-sm">
                                        <div className="text-sandstone">{item.icon}</div>
                                        {item.text}
                                    </div>
                                ))}
                            </div>

                            <div className="p-8 bg-slate-50 rounded-3xl border border-gray-100 flex items-start gap-4">
                                <div className="bg-sandstone/20 p-3 rounded-xl text-sandstone">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-oxford mb-1 font-serif">Professional Caretaking</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Each hostel is managed by 2 dedicated wardens, 2 maids, and a dedicated sweeper to ensure constant support and hygiene.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Facilities Section */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader title="Hostel Facilities" subtitle="World-Class Amenities" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { image: "/uploads/mess/security.jpg", title: "Safety & CCTV", desc: "Round-the-clock security with full CCTV coverage." },
                            { image: "/uploads/mess/Mess.jpg", title: "Pure Jain Food", desc: "Nutritious Satvik meals with 5 servings per day." },
                            { image: "/uploads/mess/RO.jpg", title: "RO Drinking Water", desc: "Pure and safe RO purified drinking water available 24/7." },
                            { image: "/uploads/mess/HOT.jpg", title: "Hot Water", desc: "Constant supply of hot water during winter months." },
                            { image: "/images/RS-CIT IT Computer Center.png", title: "Digital Library", desc: "24/7 access to educational resources and quiet study space." },
                            { image: "/uploads/mess/yoga.jpeg", title: "Yoga & Meditation", desc: "Daily morning sessions for physical and mental well-being." },
                            { image: "/uploads/mess/sport.jpg", title: "Sports Facilities", desc: "International standard stadium and sports ground." },
                            { image: "/uploads/mess/Health.jpg", title: "Health Care 24x7", desc: "On-campus medical assistance and annual checkups." },
                            { image: "/uploads/mess/ac.jpg", title: "AC / Air Cooled", desc: "Well-ventilated rooms with central cooling options." },
                            { image: "/uploads/mess/laundry.jpg", title: "Laundry Services", desc: "Professional and hassle-free laundry services for all students." },
                            { image: "/uploads/mess/Kitchen2.jpg", title: "Canteen Facility", desc: "Safe and hygienic canteen for snacks and refreshments." },
                            { image: "/uploads/mess/tuck.jpg", title: "Tuck Shop", desc: "On-campus tuck shop for all daily essentials and stationery." }
                        ].map((item: any, i) => (
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
                                            {React.cloneElement(item.icon, { size: 64 })}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <h3 className="text-2xl font-serif text-oxford mb-3 group-hover:text-sandstone transition-colors">
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

            {/* 4. Room Section (Tabs) */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader title="Our Accommodations" subtitle="Spacious & Comfortable" />

                    <div className="flex justify-center mb-16">
                        <div className="bg-slate-100 p-2 rounded-2xl flex gap-2">
                            <button
                                onClick={() => setActiveRoomType("non-ac")}
                                className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeRoomType === "non-ac" ? "bg-white text-oxford shadow-lg" : "text-gray-400 hover:text-oxford"}`}
                            >
                                Standard Non-AC
                            </button>
                            <button
                                onClick={() => setActiveRoomType("ac")}
                                className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeRoomType === "ac" ? "bg-white text-oxford shadow-lg" : "text-gray-400 hover:text-oxford"}`}
                            >
                                Premium AC
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeRoomType}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="grid lg:grid-cols-2 gap-12 items-center"
                        >
                            <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
                                <img
                                    src={activeRoomType === "ac" ? "/f837631c-4bc9-4494-b8f1-fff9b07554d8.jpg" : "/hostel.jpg"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="space-y-8">
                                <h3 className="text-3xl md:text-5xl font-serif text-oxford">
                                    {activeRoomType === "ac" ? "Premium AC Suites" : "Standard Air-Cooled Rooms"}
                                </h3>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                    {[
                                        { icon: <Bed size={16} />, label: "Comfortable Bed" },
                                        { icon: <ArrowRight size={16} />, label: "Study Table & Chair" },
                                        { icon: <ShieldCheck size={16} />, label: "Personal Cupboard" },
                                        { icon: <ArrowRight size={16} />, label: "Mattress & Pillow" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-gray-500">
                                            <div className="text-sandstone">{item.icon}</div>
                                            {item.label}
                                        </div>
                                    ))}
                                </div>
                                <div className="p-8 bg-sandstone/5 rounded-3xl border border-sandstone/10">
                                    <h4 className="font-black uppercase tracking-widest text-xs text-sandstone mb-4">What to bring</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Students must bring: 2 Bedsheets, Pillow Cover, Quilt/Blanket, Towel, Napkins, Bucket & Mug, Toiletries, Personal Medicines.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* 5. Fee Structure Section */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader title="Hostel Fee Structure" subtitle="2025 – 26 Session" />

                    <div className="overflow-x-auto rounded-[3rem] shadow-2xl border border-black/5 bg-white">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-oxford text-white">
                                    <th className="p-10 text-xs font-black uppercase tracking-widest">Class / Level</th>
                                    <th className="p-10 text-xs font-black uppercase tracking-widest">Standard (Non-AC)</th>
                                    <th className="p-10 text-xs font-black uppercase tracking-widest">Premium (AC)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { class: "Nursery to V", nonAc: "₹75,500", ac: "-" },
                                    { class: "VI to IX", nonAc: "₹75,500", ac: "₹1,10,500" },
                                    { class: "X to College (UG/PG)", nonAc: "₹80,500", ac: "₹1,10,500" },
                                    { class: "Integrated Courses", nonAc: "₹80,500", ac: "₹1,10,500" },
                                    { class: "B.Ed 1st & 2nd Year", nonAc: "₹80,500", ac: "₹1,10,500" }
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-10 font-bold text-oxford font-serif">{row.class}</td>
                                        <td className="p-10 text-gray-500 font-medium">{row.nonAc} / Year</td>
                                        <td className="p-10">
                                            {row.ac !== "-" ? (
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

                    <div className="mt-12 grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 flex items-start gap-4">
                            <div className="bg-sandstone/10 p-4 rounded-xl text-sandstone">
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-oxford mb-2 font-serif">Short Duration Stay</h4>
                                <p className="text-sm text-gray-500">Non AC: ₹10,000 / Month • AC: ₹12,000 / Month</p>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 flex items-start gap-4">
                            <div className="bg-sandstone/10 p-4 rounded-xl text-sandstone">
                                <Banknote size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-oxford mb-2 font-serif">Cancellation Policy</h4>
                                <p className="text-sm text-gray-500">₹10,000 deduction if cancelled after deposit. Deadline: Aug 15 (School), Oct 30 (College).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Rules & Policies Section (Accordion) */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader title="Rules & Policies" subtitle="Nurturing Discipline" />

                    <div className="space-y-4">
                        {rules.map((rule) => (
                            <div key={rule.id} className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <button
                                    onClick={() => setActiveAccordion(activeAccordion === rule.id ? null : rule.id)}
                                    className="w-full flex items-center justify-between p-8 text-left bg-white group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl transition-colors ${activeAccordion === rule.id ? "bg-sandstone text-white" : "bg-slate-50 text-sandstone group-hover:bg-sandstone/10"}`}>
                                            {rule.icon}
                                        </div>
                                        <span className="text-xl font-bold text-oxford font-serif">{rule.title}</span>
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
                                            <div className="p-8 pt-0 text-gray-500 font-light leading-relaxed border-t border-slate-50">
                                                {rule.content}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
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
                            <h3 className="text-3xl font-serif text-white mb-8">Scholarships & Discounts</h3>
                            <div className="space-y-6">
                                {[
                                    { title: "Merit Scholarship", desc: "10% discount for students securing 95% and above." },
                                    { title: "Sports Excellence", desc: "Special scholarships for National level sports players." },
                                    { title: "Sibling Support", desc: "10% sibling discount applicable for the third child." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="bg-sandstone/20 p-3 rounded-xl text-sandstone shrink-0">
                                            <Trophy size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1 font-serif">{item.title}</h4>
                                            <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Banking Details */}
                        <div className="bg-white rounded-[3rem] p-12 shadow-2xl">
                            <h3 className="text-3xl font-serif text-oxford mb-8">Banking Details</h3>
                            <div className="space-y-4 mb-10 text-sm">
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Account Name</span>
                                    <span className="text-oxford font-black">Marudhar Mahila Shikshan Sangh</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Bank & Branch</span>
                                    <span className="text-oxford font-black">ICICI Bank – Rani Branch</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">A/c Number</span>
                                    <span className="text-sandstone-dark font-black tracking-widest">684605601184</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">IFSC Code</span>
                                    <span className="text-oxford font-black tracking-widest">ICIC0006846</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="flex-1 bg-oxford text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                                    <Phone size={16} />
                                    Call Now
                                </button>
                                <button className="flex-1 bg-sandstone text-oxford py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                                    <Download size={16} />
                                    Bank Card
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
