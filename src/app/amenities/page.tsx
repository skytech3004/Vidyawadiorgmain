import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import Amenity from "@/models/Amenity";
import { AMENITY_DEMO_ITEMS } from "@/lib/amenities-data";

export const metadata = {
    title: "Amenities | Vidyawadi",
    description: "Explore the amenities and campus facilities at Vidyawadi.",
};

function AmenityCard({
    title,
    description,
    image,
}: {
    title: string;
    description: string;
    image: string;
}) {
    return (
        <div className="group relative bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-oxford/40 via-transparent to-sandstone/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-5 sm:p-6">
                <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-white/10 border border-white/10">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        unoptimized
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <h3 className="mt-5 text-2xl font-black text-white leading-tight">{title}</h3>
                <p className="mt-3 text-white/75 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

type Amenity = {
    _id: string;
    title: string;
    description: string;
    image: string;
    order: number;
};

const fallbackAmenities: Amenity[] = AMENITY_DEMO_ITEMS.map((item, idx) => ({
    _id: `demo-${idx}`,
    title: item.title,
    description: item.description,
    image: item.image,
    order: item.order,
}));

async function getAmenities(): Promise<Amenity[]> {
    try {
        await connectDB();
        const amenities = await Amenity.find({}).sort({ order: 1, createdAt: 1 });
        if (amenities.length > 0) {
            return amenities.map((item) => ({
                _id: String(item._id),
                title: item.title,
                description: item.description,
                image: item.image,
                order: item.order ?? 0,
            }));
        }
    } catch (error) {
        console.error("Error loading amenities:", error);
    }

    return fallbackAmenities;
}

export default async function AmenitiesPage() {
    const amenities = await getAmenities();
    const displayAmenities = [...amenities].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return (
        <main className="min-h-screen bg-oxford text-white">
            <Navbar />

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

            <section className="px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayAmenities.map((item) => (
                            <AmenityCard
                                key={item._id}
                                title={item.title}
                                description={item.description}
                                image={item.image}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
