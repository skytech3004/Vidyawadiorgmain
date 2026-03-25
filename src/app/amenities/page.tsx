import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
    BookOpen,
    Dumbbell,
    ShieldCheck,
    Wifi,
    Bus,
    Utensils,
    Camera,
    CreditCard,
    Home,
    Trophy,
} from "lucide-react";

export const metadata = {
    title: "Amenities | Vidyawadi",
    description: "Explore the amenities and campus facilities at Vidyawadi.",
};

function AmenityCard({
    icon,
    title,
    bullets,
}: {
    icon: React.ReactNode;
    title: string;
    bullets: string[];
}) {
    return (
        <div className="group relative bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-oxford/40 via-transparent to-sandstone/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-8">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-sandstone flex items-center justify-center">
                    {icon}
                </div>
                <h3 className="mt-6 text-2xl font-black text-white leading-tight">{title}</h3>
                <ul className="mt-4 space-y-3">
                    {bullets.map((b, i) => (
                        <li key={i} className="flex gap-3 text-white/75 text-sm leading-relaxed">
                            <span className="mt-2 w-2 h-2 rounded-full bg-sandstone/70 shrink-0" />
                            <span>{b}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function AmenitiesPage() {
    return (
        <main className="min-h-screen bg-oxford text-white">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-sandstone/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-teal-blue/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                        <p className="text-sandstone font-bold uppercase tracking-[0.4em] text-sm mb-4">
                            Vidyawadi Campus
                        </p>
                        <h1 className="text-4xl md:text-6xl font-black leading-tight">
                            Amenities & Facilities
                        </h1>
                        <p className="mt-6 text-white/70 text-lg leading-relaxed">
                            From academics and sports to hostel life and internet connectivity, Vidyawadi
                            provides facilities designed for holistic development.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="/apply"
                                className="px-10 py-4 bg-sandstone text-oxford rounded-full font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-white transition-all"
                            >
                                Apply Now
                            </Link>
                            <Link
                                href="/hostel"
                                className="px-10 py-4 bg-white/10 border border-white/15 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/15 transition-all"
                            >
                                Hostel Facilities
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cards */}
            <section className="px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AmenityCard
                            icon={<BookOpen size={26} className="text-sandstone" />}
                            title="Library"
                            bullets={[
                                "Best course books, reference books, and inspirational titles.",
                                "Upgrading the library is an ongoing process.",
                                "A well-equipped library supports all-round development.",
                            ]}
                        />

                        <AmenityCard
                            icon={<Dumbbell size={26} className="text-sandstone" />}
                            title="Sports Complex"
                            bullets={[
                                "Stadium to accommodate 300 people.",
                                "National standard athletics track and national level courts (basketball, volleyball).",
                                "Indoor gymnasium hall with gymnastic, badminton, table-tennis & Yoga education.",
                                "Football & hockey ground.",
                            ]}
                        />

                        <AmenityCard
                            icon={<Trophy size={26} className="text-sandstone" />}
                            title="Horse Riding & Skill Development"
                            bullets={[
                                "Horse riding available as part of campus activities.",
                                "Training and coaching for holistic growth (arts, culture, and practical skills).",
                                "Skill development includes baking, embroidery, stitching, personal grooming and more.",
                            ]}
                        />

                        <AmenityCard
                            icon={<Home size={26} className="text-sandstone" />}
                            title="Hostel Life"
                            bullets={[
                                "7 hostels accommodating 700 students.",
                                "A disciplined lifestyle focused on study and personality development.",
                                "Mess serves Jain food cooked in a hygienic environment (capacity: 400).",
                            ]}
                        />

                        <AmenityCard
                            icon={<Wifi size={26} className="text-sandstone" />}
                            title="Internet Facilities"
                            bullets={[
                                "Internet through leased line and Wi-Fi for continuous connectivity.",
                                "Campus and hostels are Wi-Fi enabled for round-the-clock access.",
                                "Supports preparation for seminars, projects and research-oriented work.",
                            ]}
                        />

                        <AmenityCard
                            icon={<Bus size={26} className="text-sandstone" />}
                            title="Transportation Facility"
                            bullets={[
                                "Bus facility for day scholars commuting from villages up to 50 km.",
                                "Marked routes and pickup points with communicated pickup timing.",
                                "Careful selection of reliable drivers for student safety.",
                            ]}
                        />

                        <AmenityCard
                            icon={<Camera size={26} className="text-sandstone" />}
                            title="Campus Security (Camera Systems)"
                            bullets={[
                                "Video surveillance installed across the campus facilities.",
                                "Cameras cover dormitories, libraries, sports complexes and key campus areas.",
                                "Designed to ensure safety for students, faculty and facilities.",
                            ]}
                        />

                        <AmenityCard
                            icon={<ShieldCheck size={26} className="text-sandstone" />}
                            title="Safety & Discipline"
                            bullets={[
                                "Hostel life revolves around discipline, duty and devotion.",
                                "Infringement of hostel discipline is viewed seriously by authorities.",
                                "A structured environment for focused learning and well-being.",
                            ]}
                        />

                        <AmenityCard
                            icon={<CreditCard size={26} className="text-sandstone" />}
                            title="ATM Facility"
                            bullets={[
                                "An on-campus automated teller machine for basic banking transactions.",
                            ]}
                        />

                        <AmenityCard
                            icon={<Utensils size={26} className="text-sandstone" />}
                            title="Food Zone"
                            bullets={[
                                "Day scholars are supported with a canteen facility for breakfast and evening tea with snacks.",
                                "Canteen management works under the trust’s oversight with focus on quality and hygiene.",
                                "Hostel mess serves Jain food in a hygienic environment.",
                            ]}
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

