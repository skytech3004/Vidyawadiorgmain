"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
    Clock,
    Award,
    BookOpen,
    GraduationCap,
    CheckCircle2,
    ArrowLeft,
    Building2,
    IndianRupee,
    FileText,
    Mail
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import coursesData from "@/data/courses.json";

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const course = coursesData.courses.find((c: any) => c.slug === slug || c.id === slug);

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-oxford mb-4">Course Not Found</h1>
                    <p className="text-gray-600 mb-8">The course you are looking for might have been moved or renamed.</p>
                    <Link href="/courses" className="px-8 py-3 bg-oxford text-white rounded-full font-bold hover:bg-sandstone hover:text-oxford transition-all">
                        Back to Courses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Course Hero */}
            <section className="relative pt-40 pb-24 px-6 bg-oxford text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-sandstone/10 blur-[120px] rounded-full translate-x-1/2" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.button
                        onClick={() => router.back()}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-white/60 hover:text-sandstone font-bold mb-10 transition-colors uppercase tracking-widest text-xs"
                    >
                        <ArrowLeft size={16} />
                        Back to Directory
                    </motion.button>

                    <div className="grid lg:grid-cols-2 gap-12 items-end">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 bg-sandstone/20 border border-sandstone/30 text-sandstone font-bold text-xs uppercase tracking-[0.2em] rounded-full">
                                    {course.category.name}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                                {course.name}
                            </h1>
                            <p className="text-2xl text-white/70 font-medium mb-8">
                                {course.degree}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[2.5rem]"
                        >
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-2">Duration</p>
                                    <div className="flex items-center gap-2 text-xl font-bold">
                                        <Clock className="text-sandstone" size={20} />
                                        {course.duration || "N/A"}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-2">Total Fees</p>
                                    <div className="flex items-center gap-2 text-xl font-bold">
                                        <IndianRupee className="text-sandstone" size={20} />
                                        {course.fees.total}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Course Content */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Department Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-oxford flex items-center justify-center text-white">
                                        <Building2 size={28} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-oxford">Faculty & Department</h2>
                                        <p className="text-gray-500 font-medium">{course.facultyDepartment}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-lg italic">
                                    "Quality higher education focused on academic excellence and professional growth."
                                </p>
                            </motion.div>

                            {/* Optional Papers */}
                            {course.optionalPapers && course.optionalPapers.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100"
                                >
                                    <h3 className="text-2xl font-bold text-oxford mb-8 flex items-center gap-3">
                                        <FileText className="text-sandstone" />
                                        Optional / Specialization Papers
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {course.optionalPapers.map((paper: string, i: number) => (
                                            <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <CheckCircle2 className="text-green-500" size={18} />
                                                <span className="font-bold text-oxford">{paper}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Fees Details */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-oxford text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-sandstone/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <Award className="text-sandstone" />
                                    Fee Structure
                                </h3>

                                <div className="space-y-6 relative z-10">
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                        <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-1">Total Fee</p>
                                        <p className="text-2xl font-black text-sandstone">{course.fees.total}</p>
                                    </div>

                                    {course.fees.installments && Object.keys(course.fees.installments).length > 0 && (
                                        <div className="space-y-4">
                                            <p className="text-white/50 text-xs font-black uppercase tracking-widest px-2">Installment Plan</p>
                                            {Object.entries(course.fees.installments).map(([key, value]) => (
                                                <div key={key} className="flex justify-between items-center px-4 py-2 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                                                    <span className="text-sm font-bold capitalize">{key}</span>
                                                    <span className="text-sm font-bold text-white/80">{value as string}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {course.fees.remarks && (
                                        <div className="p-4 bg-sandstone/10 rounded-2xl border border-sandstone/20">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-sandstone mb-1">Important Note</p>
                                            <p className="text-xs text-white/70 leading-relaxed font-medium">
                                                {course.fees.remarks}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* CTA Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-sandstone p-8 rounded-[2.5rem] shadow-xl text-oxford"
                            >
                                <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">Ready to Apply?</h3>
                                <p className="text-sm font-bold opacity-80 mb-8 leading-relaxed">
                                    Join our community of learners and start your journey towards excellence today.
                                </p>
                                <Link
                                    href="/contact"
                                    className="w-full bg-oxford text-white py-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-oxford/90 transition-all"
                                >
                                    Inquire Now
                                    <Mail size={16} />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
