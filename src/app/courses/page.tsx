"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, BookOpen, GraduationCap, Clock, Award, ArrowRight, ChevronRight, Globe } from "lucide-react";
import Link from "next/link";
import coursesData from "@/data/courses.json";

interface Course {
    slug: string;
    name: string;
    degree: string;
    duration?: string;
    facultyDepartment: string;
    category: {
        slug: string;
        name: string;
    };
    fees: {
        total: string;
    };
}

const categories = [
    { name: "All Courses", slug: "all" },
    { name: "Undergraduate (UG)", slug: "ug" },
    { name: "Integrated Undergraduate", slug: "integrated-ug" },
    { name: "Postgraduate (PG)", slug: "pg" },
    { name: "Distance Education", slug: "distance" },
    { name: "Skill Courses", slug: "skill" },
];

export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredCourses = useMemo(() => {
        return coursesData.courses.filter((course: any) => {
            const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.facultyDepartment.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === "all" || course.category.slug === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 bg-oxford text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-sandstone/10 blur-[120px] rounded-full translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-white/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/2" />

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sandstone font-bold uppercase tracking-[0.4em] text-sm block mb-4"
                    >
                        Academic Excellence
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black mb-6 leading-tight"
                    >
                        Course Directory
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-white/70 max-w-2xl mx-auto mb-10"
                    >
                        Explore our wide range of undergraduate, postgraduate, and skill-based programs designed
                        to empower the next generation of leaders.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center"
                    >
                        <a
                            href="https://vidyawadicollege.org/courses"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-3 bg-sandstone text-oxford rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                        >
                            <Globe size={18} />
                            Visit Official Portal
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm py-6">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                            {categories.map((cat) => (
                                <button
                                    key={cat.slug}
                                    onClick={() => setSelectedCategory(cat.slug)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${selectedCategory === cat.slug
                                        ? "bg-oxford text-white shadow-lg scale-105"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full lg:w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sandstone transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search courses, degrees..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-full py-3.5 pl-12 pr-6 outline-none focus:ring-2 focus:ring-sandstone/20 focus:border-sandstone transition-all"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <p className="text-gray-500 font-medium">
                            Showing <span className="text-oxford font-bold">{filteredCourses.length}</span> courses
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredCourses.map((course: any, i: number) => (
                                <motion.div
                                    layout
                                    key={course.slug}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: i * 0.02 }}
                                    className="group bg-white rounded-[2rem] border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
                                >
                                    {/* Card Header */}
                                    <div className="p-8 pb-0">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-oxford/5 flex items-center justify-center text-oxford group-hover:bg-oxford group-hover:text-white transition-all duration-300">
                                                <GraduationCap size={24} />
                                            </div>
                                            <span className="px-3 py-1 bg-sandstone/10 border border-sandstone/20 text-sandstone-dark text-[10px] font-black uppercase tracking-widest rounded-full">
                                                {course.category.name}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-oxford mb-2 group-hover:text-sandstone transition-colors min-h-[3.5rem] line-clamp-2">
                                            {course.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 font-medium mb-6">
                                            {course.facultyDepartment}
                                        </p>
                                    </div>

                                    {/* Card Details */}
                                    <div className="p-8 pt-0 flex-grow">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <Clock className="text-sandstone" size={16} />
                                                <span>Duration: <span className="font-bold text-oxford">{course.duration || "Contact for info"}</span></span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <Award className="text-sandstone" size={16} />
                                                <span>Fees: <span className="font-bold text-oxford">{course.fees.total}</span></span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="p-8 pt-0 mt-auto">
                                        <Link
                                            href={course.externalLink || `/courses/${course.id || course.slug}`}
                                            target={course.externalLink ? "_blank" : "_self"}
                                            className="inline-flex items-center gap-2 text-oxford font-black text-xs uppercase tracking-widest hover:gap-4 transition-all"
                                        >
                                            View Details
                                            <ChevronRight size={16} className="text-sandstone" />
                                        </Link>
                                    </div>

                                    <div className="h-1.5 w-0 group-hover:w-full bg-sandstone transition-all duration-500" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredCourses.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="text-gray-400" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-oxford mb-2">No courses found</h3>
                            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                            <button
                                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                                className="mt-8 text-sandstone font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
