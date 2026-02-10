"use client";

import { motion, AnimatePresence } from "framer-motion";
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
    Cpu,
    Trophy,
    GraduationCap,
    Wind,
    Wifi,
    Shield,
    Shirt,
    Phone,
    Heart,
    Utensils,
    Handshake,
    Lightbulb
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useState, useRef } from "react";

const SafeText = ({ value, fallback = "" }: { value: any, fallback?: string }) => {
    if (value === null || value === undefined) return <>{fallback}</>;
    if (typeof value === "string") return <>{value}</>;
    if (typeof value === "number") return <>{value}</>;
    if (typeof value === "object") {
        if (Array.isArray(value)) return <><SafeText value={value[0]} /></>;
        const text = value.text || value.title || value.name || value.label || value.content || value.fullName || "";
        if (text) return <>{String(text)}</>;
        return <>{JSON.stringify(value)}</>;
    }
    return <>{String(value)}</>;
};

// --- Section Components ---

const Hero = ({ content }: any) => (
    <section className="relative h-screen w-full overflow-hidden">
        <motion.div
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute inset-0"
        >
            <img
                src={content.image || "/hostel.jpg"}
                alt={content.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 z-10 text-white text-center px-6">
            <div className="overflow-hidden mb-6">
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <Flower2 className="text-sandstone w-16 h-16" />
                </motion.div>
            </div>

            <div className="overflow-hidden mb-6">
                <motion.h1
                    initial={{ y: 200 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-serif tracking-tight"
                >
                    <SafeText value={content.title} />
                </motion.h1>
            </div>

            {content.subtitle && (
                <div className="overflow-hidden">
                    <motion.p
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 0.9 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="text-xl md:text-2xl font-light max-w-2xl uppercase tracking-widest"
                    >
                        <SafeText value={content.subtitle} />
                    </motion.p>
                </div>
            )}
        </div>
    </section>
);

const TextContent = ({ content }: any) => (
    <section className={`py-32 px-6 ${content.variant === "orange" ? "bg-sandstone text-white" : "bg-white"}`}>
        <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.1 }}
            className="max-w-4xl mx-auto text-center"
        >
            {content.title && (
                <div className="overflow-hidden mb-8">
                    <motion.h2
                        initial={{ y: 100 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`text-4xl md:text-6xl font-serif ${content.variant === "orange" ? "text-white" : "text-oxford"}`}
                    >
                        <SafeText value={content.title} />
                    </motion.h2>
                </div>
            )}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`text-lg md:text-xl leading-relaxed font-light whitespace-pre-wrap ${content.variant === "orange" ? "text-white/90" : "text-gray-600"}`}
            >
                <SafeText value={content.content} />
            </motion.p>
        </motion.div>
    </section>
);

const TabbedFeatures = ({ content }: any) => {
    const items = content.items || [];
    const [activeId, setActiveId] = useState(items[0]?.id || "");
    const activeItem = items.find((i: any) => i.id === activeId) || items[0];

    return (
        <section className="py-24 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-4"><SafeText value={content.title} /></h2>
                    <p className="text-gray-500 max-w-2xl mx-auto font-light"><SafeText value={content.description} /></p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl"
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeId}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                src={activeItem?.image}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.1 }}
                        className="space-y-2"
                    >
                        {items.map((item: any) => (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                onClick={() => setActiveId(item.id)}
                                className="w-full text-left group"
                            >
                                <div className={`flex gap-4 p-6 rounded-2xl transition-all duration-500 ${activeId === item.id ? "bg-white shadow-xl ring-1 ring-black/5" : "hover:bg-white/50"}`}>
                                    <div className={`w-1 h-auto rounded-full transition-all duration-500 ${activeId === item.id ? "bg-sandstone scale-y-100" : "bg-gray-200 scale-y-50 group-hover:bg-sandstone/30 group-hover:scale-y-75"}`} />
                                    <div className="flex-1">
                                        <h3 className={`text-xl font-bold transition-colors duration-500 ${activeId === item.id ? "text-oxford" : "text-gray-400"}`}>
                                            <SafeText value={item.label} />
                                        </h3>
                                        <AnimatePresence initial={false}>
                                            {activeId === item.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.4 }}
                                                >
                                                    <p className="text-gray-500 mt-2 text-sm leading-relaxed overflow-hidden py-1 font-light">
                                                        <SafeText value={item.desc} />
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const CardGrid = ({ content }: any) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-4xl md:text-6xl font-serif text-oxford mb-4 ${content.subtitle ? "mb-2" : ""}`}><SafeText value={content.title} /></h2>
                    {content.subtitle && <h3 className="text-4xl md:text-6xl font-serif text-sandstone mb-6"><SafeText value={content.subtitle} /></h3>}
                    <p className="text-gray-500 max-w-2xl mx-auto font-light"><SafeText value={content.description} /></p>
                </motion.div>

                <div className="relative group">
                    <motion.div
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.1 }}
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide snap-x"
                    >
                        {content.items?.map((item: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="min-w-[300px] md:min-w-[320px] lg:min-w-[350px] snap-center py-4"
                            >
                                <motion.div
                                    whileHover={{ y: -12 }}
                                    className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-sandstone/10 transition-all duration-500 group/card border border-black/5"
                                >
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                                    </div>
                                    <div className="bg-sandstone p-6 text-center">
                                        <h4 className="text-white font-bold text-lg"><SafeText value={item.label} /></h4>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {content.items?.length > 4 && (
                        <div className="flex justify-center gap-4 mt-8">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
                                className="w-12 h-12 rounded-full border border-sandstone text-sandstone flex items-center justify-center hover:bg-sandstone hover:text-white transition-all shadow-lg"
                            >
                                <ChevronLeft />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
                                className="w-12 h-12 rounded-full border border-sandstone text-sandstone flex items-center justify-center hover:bg-sandstone hover:text-white transition-all shadow-lg"
                            >
                                <ChevronRight />
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const SideBySide = ({ content }: any) => {
    const [idx, setIdx] = useState(0);
    const images = content.images || [content.image];
    return (
        <section className={`py-24 px-6 overflow-hidden ${content.variant === "gray" ? "bg-slate-50" : "bg-white"}`}>
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={`${content.reverse ? "order-2" : "order-1"}`}
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-6 leading-tight">
                        <SafeText value={content.title} />
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg mb-8 font-light">
                        <SafeText value={content.description} />
                    </p>
                    {content.secondaryDescription && (
                        <p className="text-gray-600 leading-relaxed text-lg font-light mb-8">
                            <SafeText value={content.secondaryDescription} />
                        </p>
                    )}
                    {images.length > 1 && (
                        <div className="flex gap-4 mt-8">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIdx((idx - 1 + images.length) % images.length)}
                                className="w-12 h-12 rounded-full border border-sandstone text-sandstone flex items-center justify-center hover:bg-sandstone hover:text-white transition-colors shadow-lg"
                            >
                                <ChevronLeft />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIdx((idx + 1) % images.length)}
                                className="w-12 h-12 rounded-full border border-sandstone text-sandstone flex items-center justify-center hover:bg-sandstone hover:text-white transition-colors shadow-lg"
                            >
                                <ChevronRight />
                            </motion.button>
                        </div>
                    )}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className={`${content.reverse ? "order-1" : "order-2"} relative`}
                >
                    <div className="rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] h-[400px] md:h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                src={images[idx]}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const ScatteredGrid = ({ content }: any) => {
    const images = Array.isArray(content.images) ? content.images : [];
    return (
        <section className="py-24 px-6 bg-slate-50 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(#002147_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                    className="columns-2 md:columns-4 lg:columns-5 gap-6 space-y-6 mb-20"
                >
                    {images.map((img: string, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{
                                y: -10,
                                rotate: (i % 2 === 0 ? 1 : -1),
                                transition: { duration: 0.3 }
                            }}
                            className="relative group rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 break-inside-avoid ring-1 ring-black/5"
                        >
                            <img src={img} alt={`Sport ${i}`} className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 border border-white/20 group-hover:border-white/40 rounded-3xl pointer-events-none transition-colors" />
                        </motion.div>
                    ))}
                </motion.div>
                <div className="text-center mt-12 relative flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="overflow-hidden">
                            <motion.h2
                                initial={{ y: 100 }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="text-6xl md:text-8xl font-serif text-oxford mb-6 font-medium"
                            >
                                <SafeText value={content.title} />
                            </motion.h2>
                        </div>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="w-16 h-1 bg-sandstone mb-8 mx-auto"
                        />
                        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed"><SafeText value={content.description} /></p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const CTASection = ({ content }: any) => (
    <section className="py-32 px-6 bg-oxford relative overflow-hidden">
        <motion.div
            animate={{
                x: [0, 50, 0],
                rotate: [0, 5, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-2/3 h-full bg-sandstone/10 skew-x-12 translate-x-1/2 rounded-full"
        />
        <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="max-w-5xl mx-auto relative z-10 text-center"
        >
            <div className="overflow-hidden mb-8">
                <motion.h2
                    initial={{ y: 100 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-4xl md:text-7xl font-serif text-white"
                >
                    <SafeText value={content.title} />
                </motion.h2>
            </div>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-white/70 text-xl mb-12 max-w-3xl mx-auto font-light"
            >
                <SafeText value={content.description} />
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-wrap justify-center gap-6"
            >
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(230,126,34,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-sandstone text-white font-bold rounded-full transition-all shadow-2xl"
                >
                    <SafeText value={content.primaryLabel || "Contact Us"} />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "#002147" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 border-2 border-white text-white font-bold rounded-full transition-all"
                >
                    <SafeText value={content.secondaryLabel || "Apply Online"} />
                </motion.button>
            </motion.div>
        </motion.div>
    </section>
);

const Gallery = ({ content }: any) => (
    <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
            {content.title && (
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-serif text-oxford mb-12 text-center"
                >
                    <SafeText value={content.title} />
                </motion.h2>
            )}
            <motion.div
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
                className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4"
            >
                {Array.isArray(content.images) && content.images.map((img: string, i: number) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all break-inside-avoid"
                    >
                        <img
                            src={img}
                            alt={`Gallery ${i}`}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
);

const GridFeatures = ({ content }: any) => (
    <section className={`py-24 px-6 ${content.dark ? "bg-oxford text-white" : "bg-white text-oxford"}`}>
        <div className="max-w-7xl mx-auto text-center">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-serif mb-8"
            >
                <SafeText value={content.title} />
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="opacity-80 max-w-3xl mx-auto mb-16 font-light"
            >
                <SafeText value={content.description} />
            </motion.p>
            <motion.div
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
                className="grid md:grid-cols-3 gap-8"
            >
                {content.items?.map((item: any, i: number) => (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        key={i}
                        className="group relative overflow-hidden rounded-2xl aspect-square"
                    >
                        <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <h3 className="text-2xl font-bold text-white mb-2"><SafeText value={item.title} /></h3>
                            {item.desc && <p className="text-white/80 text-sm font-light"><SafeText value={item.desc} /></p>}
                            <div className="w-8 h-0.5 bg-sandstone mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
);

const VideoSection = ({ content }: any) => (
    <section className="py-24 px-6 bg-white text-center">
        <div className="max-w-5xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-serif text-oxford mb-12"
            >
                <SafeText value={content.title} />
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] group cursor-pointer"
            >
                <img src={content.thumbnail} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-24 h-24 rounded-full bg-sandstone/90 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl transition-all"
                    >
                        <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent ml-2" />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    </section>
);

export default function SectionRenderer({ sections }: { sections: any[] }) {
    if (!sections || !Array.isArray(sections)) return null;

    const COMPONENT_MAP: any = {
        hero: Hero,
        "text-content": TextContent,
        gallery: Gallery,
        "tabbed-features": TabbedFeatures,
        "card-grid": CardGrid,
        "side-by-side": SideBySide,
        "scattered-grid": ScatteredGrid,
        "cta-section": CTASection,
        "grid-features": GridFeatures,
        video: VideoSection,
    };

    return (
        <AnimatePresence>
            {sections.filter(s => s && s.isVisible).map((section) => {
                const Component = COMPONENT_MAP[section.type] || TextContent;
                return <Component key={section._id} content={section.content} settings={section.settings} />;
            })}
        </AnimatePresence>
    );
}
