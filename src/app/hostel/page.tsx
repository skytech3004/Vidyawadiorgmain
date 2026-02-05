"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    School,
    Wifi,
    ShieldCheck,
    Shirt,
    Phone,
    Wind,
    Smile,
    Users,
    Brain,
    HeartHandshake,
    MessageCircle,
    Flower2,
    ChevronLeft,
    ChevronRight,
    Play
} from "lucide-react";

export default function HostelPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* 1. Hero Section */}
            <section className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/hostel.jpg"
                        alt="Vidyawadi Hostel Life"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 z-10 text-white text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="flex flex-col items-center"
                    >
                        <Flower2 size={64} className="text-sandstone mb-4" />
                        <h1 className="text-5xl md:text-7xl font-serif tracking-wide mb-2">Boarding</h1>
                        <p className="text-lg md:text-xl font-light tracking-widest uppercase opacity-90">At Vidyawadi</p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Your Home Away From Home Banner */}
            <section className="bg-sandstone py-24 px-6 text-center text-white">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-serif mb-8"
                    >
                        Your Home Away From Home
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl leading-relaxed font-light opacity-95"
                    >
                        At Vidyawadi, hundreds of girls from across India live in a safe, caring, and structured environment—fostering growth, independence, and lifelong friendships.
                    </motion.p>
                </div>
            </section>

            {/* 3. Amenities Section */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-4">Amenities</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explore thoughtfully designed spaces and services that ensure comfort, safety, and well-being, making our boarding experience truly exceptional.
                        </p>
                    </div>

                    <AmenitiesTabs />
                </div>
            </section>

            {/* 4. Well-being Section (Chetna Prabha) */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-6">Chetna Prabha</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto mb-16">
                        Our signature initiative dedicated to empowering young minds through holistic development and self-awareness.
                    </p>

                    <h3 className="text-4xl font-serif text-sandstone mb-12">At The Heart</h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Emotional Well-being", img: "/011.png" }, // Using varied placeholders
                            { title: "Social Well-being", img: "/marudhar_balika.jpg" },
                            { title: "Cognitive Well-being", img: "/leeladevi.jpg" },
                            { title: "Ethics & Integrity", img: "/hostel.jpg" }
                        ].map((item, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="rounded-xl overflow-hidden aspect-[4/3] mb-0 relative">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div className="bg-sandstone text-white py-3 px-4 text-center font-medium shadow-lg relative -mt-4 mx-4 rounded-lg z-10 group-hover:-translate-y-1 transition-transform">
                                    {item.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Programs and Practices */}
            <section className="py-32 px-6 bg-oxford text-white text-center">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif text-sandstone mb-4">Programs and Practices</h2>
                    <p className="text-white/70 mb-20">Includes training for teachers and staff to support adolescent well-being with empathy.</p>

                    <div className="grid md:grid-cols-4 gap-12">
                        {[
                            {
                                icon: <MessageCircle strokeWidth={1} />,
                                title: "Individual Counseling",
                                desc: "One-on-one support to help girls talk about their feelings, handle challenges, and build confidence in a safe, private space."
                            },
                            {
                                icon: <Users strokeWidth={1} />,
                                title: "Group Workshops",
                                desc: "Interactive sessions where girls learn life skills – like handling peer pressure, building self-esteem, and speaking up with confidence."
                            },
                            {
                                icon: <Brain strokeWidth={1} />,
                                title: "Mindfulness",
                                desc: "Simple daily meditation, reflection, or quiet time to help girls feel calm, focused, and balanced."
                            },
                            {
                                icon: <HeartHandshake strokeWidth={1} />,
                                title: "Ethical Dialogues",
                                desc: "Heartfelt conversations inspired by Indian values that help girls think about right and wrong, purpose, and the kind of person they want to become."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-lg border border-white/20 flex items-center justify-center mb-6 text-sandstone/80 [&>svg]:w-10 [&>svg]:h-10">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Pillars of Care */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-oxford mb-4">Pillars of Care</h2>
                        <p className="text-gray-600">From daily care to guided learning and weekend fun, we support your child's growth—both inside and outside the classroom.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                        <div className="rounded-2xl overflow-hidden h-[400px]">
                            <img src="/hostel.jpg" alt="Sanrakshika" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="w-1 h-12 bg-sandstone mb-6" />
                            <h3 className="text-3xl font-serif text-oxford mb-6">Sanrakshika</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Compassionate protectors, our Sanrakshikas are dedicated female caretakers who ensure safety, structure, and discipline—offering protective oversight that feels like family. They are trained to handle emergencies, provide emotional support, and ensure every student follows a healthy routine.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-oxford font-medium">
                                    <ShieldCheck className="text-sandstone" size={20} /> 24/7 Supervision
                                </li>
                                <li className="flex items-center gap-3 text-oxford font-medium">
                                    <HeartHandshake className="text-sandstone" size={20} /> Emotional Support
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. A Glimpse into Campus Living */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto self-center text-center">
                    <h2 className="text-4xl md:text-5xl font-serif text-oxford mb-12">A Glimpse into Campus living</h2>
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                        <img
                            src="/sports-day.jpg"
                            alt="Campus Living Video Thumbnail"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/hostel.jpg";
                            }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Nutritious Satvik Food */}
            <FoodSection />

            {/* 9. Gallery */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                        {[
                            { src: "/011.png", className: "md:col-span-2 md:row-span-2" },
                            { src: "/hostel.jpg", className: "md:col-span-1 md:row-span-1" },
                            { src: "/leeladevi.jpg", className: "md:col-span-1 md:row-span-2" },
                            { src: "/marudhar_balika.jpg", className: "md:col-span-1 md:row-span-1" },
                            { src: "/science-lab.jpg", className: "md:col-span-1 md:row-span-1" }, // Fallback if missing
                            { src: "/011.png", className: "md:col-span-1 md:row-span-1" }
                        ].map((item, idx) => (
                            <div key={idx} className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${item.className}`}>
                                <img
                                    src={item.src}
                                    alt="Gallery"
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
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

            <Footer />
        </main>
    );
}

function AmenitiesTabs() {
    const amenities = [
        {
            id: "ac",
            title: "Central AC with Cooling & Heating",
            desc: "Spacious, well-ventilated hostel buildings equipped with central cooling and heating ensure year-round comfort.",
            img: "/011.png"
        },
        {
            id: "wifi",
            title: "Dormitories with Wi-Fi",
            desc: "Each dormitory is equipped with secure Wi-Fi, allowing students to use their personal tablets for researched based learning.",
            img: "/hostel.jpg"
        },
        {
            id: "security",
            title: "Safety Surveillance",
            desc: "Round-the-clock security with CCTV monitoring and dedicated female residential caretakers ensure a completely safe environment.",
            img: "/leeladevi.jpg"
        },
        {
            id: "laundry",
            title: "Dedicated Laundry Facilities",
            desc: "In-house modern laundry services ensure that students have clean uniforms and clothes without hassle.",
            img: "/marudhar_balika.jpg"
        },
        {
            id: "phone",
            title: "Phone Access Points",
            desc: "Designated calling times and phone access points allow students to stay connected with their families regularly.",
            img: "/011.png"
        }
    ];

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl overflow-hidden shadow-xl h-[400px] lg:h-[500px]"
            >
                <img
                    src={amenities[activeTab].img}
                    alt={amenities[activeTab].title}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* List Side */}
            <div className="flex flex-col justify-center space-y-6">
                {amenities.map((item, idx) => (
                    <div
                        key={idx}
                        className="cursor-pointer group relative pl-6 transition-all"
                        onClick={() => setActiveTab(idx)}
                    >
                        {/* Active Indicator Line */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300 ${activeTab === idx ? "bg-sandstone" : "bg-gray-200 group-hover:bg-sandstone/50"}`} />

                        <h3 className={`text-xl font-medium mb-2 transition-colors ${activeTab === idx ? "text-oxford" : "text-gray-400 group-hover:text-oxford/70"}`}>
                            {item.title}
                        </h3>

                        {/* Description shows only if active */}
                        <div className={`grid transition-all duration-300 ease-in-out ${activeTab === idx ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                            <div className="overflow-hidden">
                                <p className="text-gray-600 text-sm leading-relaxed pb-2">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function FoodSection() {
    const images = [
        "/011.png",
        "/hostel.jpg",
        "/marudhar_balika.jpg"
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const nextImage = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section className="py-24 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-2">Nutritious</h2>
                    <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-8">Satvik Food</h2>
                    <p className="text-gray-600 leading-relaxed text-lg mb-8">
                        Fresh, farm-to-plate meals grown on campus nourish the body and mind. Dining together on the floor fosters humility, gratitude, and a strong sense of community. Meals align with the lunar calendar, with a specially curated menu on Poornima, Ekadashi, and Amavasya.
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={prevImage}
                            className="w-12 h-12 rounded-full border border-oxford text-oxford flex items-center justify-center hover:bg-oxford hover:text-white transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="w-12 h-12 rounded-full border border-oxford text-oxford flex items-center justify-center hover:bg-oxford hover:text-white transition-colors"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
                    <motion.img
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        src={images[activeIndex]}
                        alt="Nutritious Food"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/hostel.jpg";
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
