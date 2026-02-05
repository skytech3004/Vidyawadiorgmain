"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    Flower2
} from "lucide-react";

export default function CoCurricularPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* 1. Hero Section */}
            <section className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/sports-day.jpg"
                        alt="Co-Curricular Activities"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/hostel.jpg";
                        }}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 z-10 text-white text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="flex flex-col items-center"
                    >
                        <Flower2 className="text-sandstone mb-4 w-12 h-12" />
                        <h1 className="text-5xl md:text-7xl font-serif tracking-wide">Co Curricular</h1>
                    </motion.div>
                </div>
            </section>

            {/* 2. Beyond the Classroom Banner */}
            <section className="bg-sandstone py-32 px-6 text-center text-white">
                <div className="max-w-5xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-serif mb-8"
                    >
                        Beyond the Classroom
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl leading-relaxed font-light opacity-95 max-w-3xl mx-auto"
                    >
                        At Vidyawadi, we believe that true education nurtures every part of a child's being. As a leading Gurukul academy focused on holistic growth, our students go far beyond academics—engaging in music, yoga, sports, creative arts, and leadership-building programs that cultivate balance, creativity, and inner discipline.
                    </motion.p>
                </div>
            </section>

            {/* 3. Sports Grid Collage */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
                        {[
                            "/leeladevi.jpg", "/sports-day.jpg", "/011.png", "/hostel.jpg",
                            "/science-lab.jpg", "/marudhar_balika.jpg", "/leeladevi.jpg", "/011.png"
                        ].map((src, i) => (
                            <div key={i} className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all break-inside-avoid">
                                <img
                                    src={src}
                                    alt="Activity"
                                    className="w-full h-auto object-cover hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "/hostel.jpg";
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Sports Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-6">Sports</h2>
                    <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        At Vidyawadi, the spirit of discipline, teamwork, and excellence is forged on the field. Through expert coaching in volleyball, basketball, football, handball, athletics, taekwondo, and access to a 400m track, our students consistently excel—from district tournaments to national stages.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 h-64 md:h-80 rounded-2xl overflow-hidden">
                        <img src="/sports-day.jpg" className="w-full h-full object-cover" alt="Sports 1" onError={(e) => { (e.target as HTMLImageElement).src = "/hostel.jpg" }} />
                    </div>
                    <div className="h-64 md:h-80 rounded-2xl overflow-hidden">
                        <img src="/011.png" className="w-full h-full object-cover" alt="Sports 2" onError={(e) => { (e.target as HTMLImageElement).src = "/hostel.jpg" }} />
                    </div>
                    <div className="h-64 md:h-80 rounded-2xl overflow-hidden">
                        <img src="/marudhar_balika.jpg" className="w-full h-full object-cover" alt="Sports 3" onError={(e) => { (e.target as HTMLImageElement).src = "/hostel.jpg" }} />
                    </div>
                </div>
            </section>

            {/* 5. NCC Section */}
            <NCCSection />

            {/* 6. Fine Arts Section */}
            <FineArtsSection />

            {/* 7. Elevate Clubs */}
            <ElevateClubsSection />

            {/* 8. Cooking Section */}
            <CookingSection />

            {/* 9. Literary Section (From Words to Expression) */}
            <LiterarySection />

            {/* 10. Performing Arts (Tabs) */}
            <PerformingArtsSection />

            {/* 11. Creative Expressions (Video) */}
            <section className="py-24 px-6 bg-white text-center">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-12">Creative Expressions</h2>
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                        <img
                            src="/science-lab.jpg"
                            alt="Creative Expressions"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/hostel.jpg";
                            }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent ml-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function NCCSection() {
    const images = ["/sports-day.jpg", "/hostel.jpg"]; // Placeholders
    const [idx, setIdx] = useState(0);

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                    <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-6">NCC</h2>
                    <p className="text-gray-600 leading-relaxed text-lg mb-8">
                        As part of the 10th Rajasthan Battalion Senior Wing, our NCC unit instills discipline, leadership, and national pride. Through drills, camps, and training, cadets build resilience, responsibility, and the strength to serve society with confidence.
                    </p>
                </div>
                <div className="order-1 lg:order-2 relative">
                    <div className="rounded-[2rem] overflow-hidden shadow-2xl h-[400px]">
                        <img
                            src={images[idx]}
                            alt="NCC Cadets"
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = "/hostel.jpg" }}
                        />
                    </div>
                    <div className="flex gap-4 mt-8 justify-center lg:justify-start">
                        <button onClick={() => setIdx(0)} className="w-12 h-12 rounded-full border border-sandstone text-sandstone flex items-center justify-center hover:bg-sandstone hover:text-white transition-colors">
                            <ChevronLeft />
                        </button>
                        <button onClick={() => setIdx(1)} className="w-12 h-12 rounded-full border border-sandstone text-sandstone flex items-center justify-center hover:bg-sandstone hover:text-white transition-colors">
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FineArtsSection() {
    return (
        <section className="py-24 px-6 bg-oxford text-white text-center">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-serif mb-6">Fine Arts</h2>
                <p className="text-white/80 max-w-3xl mx-auto mb-16 leading-relaxed">
                    Exploring creativity through diverse mediums, our Fine Arts program nurtures expression, environmental awareness, and hands-on skill development.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Drawing", img: "/011.png" },
                        { title: "Paper Recycling", img: "/marudhar_balika.jpg", desc: "Teaches eco-friendly habits by turning waste paper into useful and creative items." },
                        { title: "Quilling", img: "/leeladevi.jpg" },
                        // { title: "Painting", img: "/science-lab.jpg" } 
                    ].map((item, idx) => (
                        <div key={idx} className="group relative overflow-hidden rounded-2xl aspect-square">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).src = "/hostel.jpg" }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-sandstone/90 to-transparent flex flex-col justify-end p-6 text-left">
                                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                {item.desc && <p className="text-sm opacity-90">{item.desc}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ElevateClubsSection() {
    const clubs = [
        {
            id: "fashion",
            label: "Fashion Designing",
            desc: "Students explore creativity and style by designing outfits and learning the basics of fashion.",
            img: "/leeladevi.jpg"
        },
        {
            id: "shark",
            label: "Shark Tank",
            desc: "Budding entrepreneurs pitch ideas, learn business strategies, and understand market dynamics.",
            img: "/011.png"
        },
        {
            id: "tech",
            label: "Tech Hackathon",
            desc: "Coding, problem-solving, and innovation come together in high-energy technical challenges.",
            img: "/science-lab.jpg"
        },
        {
            id: "vedic",
            label: "Vedic Math",
            desc: "Ancient Indian mathematical techniques to enhance calculation speed and mental agility.",
            img: "/marudhar_balika.jpg"
        }
    ];

    const [activeTab, setActiveTab] = useState("fashion");
    const activeContent = clubs.find(c => c.id === activeTab) || clubs[0];

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <Flower2 className="w-12 h-12 text-oxford mx-auto mb-4" />
                <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-4">Elevate Clubs</h2>
                <p className="text-gray-600">Our Elevate Clubs spark creativity and innovation—empowering students to explore their passions and develop real-world skills.</p>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <div className="h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
                    <motion.img
                        key={activeTab}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        src={activeContent.img}
                        alt={activeContent.label}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/hostel.jpg" }}
                    />
                </div>

                <div className="flex flex-col justify-center pl-0 lg:pl-12 order-1 lg:order-2">
                    <div className="space-y-6 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-200" />

                        {clubs.map((club) => (
                            <div
                                key={club.id}
                                onClick={() => setActiveTab(club.id)}
                                className="pl-8 relative cursor-pointer group"
                            >
                                {/* Active Indicator */}
                                {activeTab === club.id && (
                                    <motion.div
                                        layoutId="elevateIndicator"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-sandstone -ml-[1px]"
                                    />
                                )}

                                <h3 className={`text-2xl md:text-3xl font-serif mb-2 transition-colors ${activeTab === club.id ? "text-oxford" : "text-gray-400 group-hover:text-oxford/60"}`}>
                                    {club.label}
                                </h3>

                                <motion.div
                                    initial={false}
                                    animate={{ height: activeTab === club.id ? "auto" : 0, opacity: activeTab === club.id ? 1 : 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-gray-600 leading-relaxed max-w-md pt-2 text-sm md:text-base">
                                        {club.desc}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function CookingSection() {
    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-8">Cooking</h2>
                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                        Cooking is a creative life skill woven into everyday learning. Students explore nutrition, hygiene, food science, and meal planning through hands-on sessions in the kitchen. Fireless Cooking introduces younger students to healthy eating and safety, while the Multi-Cuisine Club lets seniors experiment with regional and global recipes—celebrating food diversity and teamwork.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        Every Sunday, senior classes prepare Sunday Snacks for the hostel—planning, cooking, and serving meals that blend leadership with the joy of sharing. These traditions nurture confidence, collaboration, and a lifelong appreciation for wholesome food.
                    </p>
                </div>
                <div className="relative h-[400px] rounded-[2rem] overflow-hidden shadow-2xl">
                    <img
                        src="/hostel.jpg"
                        alt="Students Cooking"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/hostel.jpg" }}
                    />
                </div>
            </div>
        </section>
    );
}

function LiterarySection() {
    return (
        <section className="py-24 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-4">From Words to Expression</h2>
                    <p className="text-gray-600">Building strong language skills to inspire imagination, clarity, and confident communication.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Reading",
                            desc: "Invites focus, imagination, and a lifelong love for books.",
                            img: "/marudhar_balika.jpg"
                        },
                        {
                            title: "Creative Writing",
                            desc: "Encouraging self-expression through stories, poems, and ideas.",
                            img: "/011.png"
                        },
                        {
                            title: "Debating",
                            desc: "Sharpening thinking, confidence, and the power to speak with clarity.",
                            img: "/science-lab.jpg"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                            <div className="h-64 overflow-hidden">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).src = "/hostel.jpg" }} />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-serif text-oxford mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PerformingArtsSection() {
    const tabs = [
        {
            id: "music",
            label: "Music",
            title: "Music",
            desc: "Opportunities to learn instruments, Indian vocals, and build confidence through rhythm, melody, and teamwork.",
            img: "/leeladevi.jpg"
        },
        {
            id: "dance",
            label: "Dance",
            title: "Dance",
            desc: "Expressing stories and emotions through classical (Kathak, Bharatnatyam) and folk dance forms.",
            img: "/marudhar_balika.jpg"
        },
        {
            id: "theatre",
            label: "Theatre",
            title: "Theatre",
            desc: "Workshops and productions that enhance public speaking, empathy, and dramatic expression.",
            img: "/011.png"
        }
    ];

    const [activeTab, setActiveTab] = useState("music");
    const activeContent = tabs.find(t => t.id === activeTab) || tabs[0];

    return (
        <section className="py-24 px-6 bg-slate-50">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-4">Performing Arts</h2>
                <p className="text-gray-600">Encouraging students to explore their voice, presence, and passion through meaningful artistic experiences.</p>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <div className="h-[500px] rounded-3xl overflow-hidden shadow-xl">
                    <motion.img
                        key={activeTab}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        src={activeContent.img}
                        alt={activeContent.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/hostel.jpg" }}
                    />
                </div>

                <div className="flex flex-col justify-center pl-0 lg:pl-12">
                    <div className="space-y-8 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-200" />

                        {tabs.map((tab) => (
                            <div
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className="pl-8 relative cursor-pointer group"
                            >
                                {/* Active Indicator */}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-oxford -ml-[1px]"
                                    />
                                )}

                                <h3 className={`text-3xl font-serif mb-2 transition-colors ${activeTab === tab.id ? "text-oxford" : "text-gray-400 group-hover:text-oxford/60"}`}>
                                    {tab.label}
                                </h3>

                                <motion.div
                                    initial={false}
                                    animate={{ height: activeTab === tab.id ? "auto" : 0, opacity: activeTab === tab.id ? 1 : 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-gray-600 leading-relaxed max-w-md pt-2">
                                        {tab.desc}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
