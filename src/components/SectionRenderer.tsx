"use client";

import { motion } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    Flower2,
    ShieldCheck,
    HeartHandshake,
    MessageCircle,
    Users,
    Brain,
    Check,
    Star,
    Award,
    Music,
    Palette,
    Cpu
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useState } from "react";

// --- Section Components ---

const Hero = ({ content }: any) => (
    <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
            <img
                src={content.image || "/hostel.jpg"}
                alt={content.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white text-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center"
            >
                <Flower2 className="text-sandstone mb-6 w-16 h-16" />
                <h1 className="text-5xl md:text-8xl font-serif tracking-tight mb-6">{content.title}</h1>
                <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl">{content.subtitle}</p>
            </motion.div>
        </div>
    </section>
);

const TextContent = ({ content }: any) => (
    <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
            {content.title && <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-8">{content.title}</h2>}
            <div className="text-lg md:text-xl text-gray-600 leading-relaxed font-light whitespace-pre-wrap">
                {content.content}
            </div>
        </div>
    </section>
);

const Gallery = ({ content }: any) => (
    <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
            {content.title && <h2 className="text-4xl font-serif text-oxford mb-12 text-center">{content.title}</h2>}
            <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {Array.isArray(content.images) && content.images.map((img: string, i: number) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all break-inside-avoid"
                    >
                        <img
                            src={img}
                            alt={`Gallery ${i}`}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const Amenities = ({ content }: any) => {
    const [activeTab, setActiveTab] = useState(content.items?.[0]?.id || "");
    const activeItem = content.items?.find((item: any) => item.id === activeTab) || content.items?.[0];

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-6">{content.title}</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">{content.description}</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {content.items?.map((item: any) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`px-8 py-3 rounded-full font-bold transition-all ${activeTab === item.id
                                ? "bg-oxford text-white shadow-xl"
                                : "bg-slate-50 text-gray-400 hover:bg-slate-100"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {activeItem && (
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    >
                        <div className="rounded-3xl overflow-hidden shadow-2xl">
                            <img src={activeItem.image} alt={activeItem.label} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-3xl font-serif text-oxford">{activeItem.title}</h3>
                            <p className="text-lg text-gray-600 leading-relaxed font-light">{activeItem.desc}</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

const Pillars = ({ content }: any) => (
    <section className="py-24 px-6 bg-oxford text-white rounded-[4rem] mx-4 mb-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl font-serif leading-tight">{content.title}</h2>
                <p className="text-sandstone/80 text-xl font-light">{content.description}</p>
                <div className="pt-8">
                    <h4 className="text-2xl font-serif mb-4 text-sandstone">{content.secondaryHeading}</h4>
                    <p className="text-sandstone/60 leading-relaxed max-w-md">{content.secondaryDescription}</p>
                </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl rotate-3">
                <img src={content.image} alt="Care Pillars" className="w-full h-full object-cover" />
            </div>
        </div>
    </section>
);

// Map template names to components
const COMPONENT_MAP: any = {
    hero: Hero,
    "text-content": TextContent,
    gallery: Gallery,
    amenities: Amenities,
    pillars: Pillars,
};

export default function SectionRenderer({ sections }: { sections: any[] }) {
    return (
        <>
            {sections.filter(s => s.isVisible).map((section) => {
                const Component = COMPONENT_MAP[section.type] || TextContent;
                return <Component key={section._id} content={section.content} settings={section.settings} />;
            })}
        </>
    );
}
