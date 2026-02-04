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
    Cpu,
    Trophy,
    GraduationCap
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useState } from "react";

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
        <div className="absolute inset-0">
            <img
                src={content.image || "/hostel.jpg"}
                alt={content.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 z-10 text-white text-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center"
            >
                <Flower2 className="text-sandstone mb-6 w-16 h-16" />
                <h1 className="text-5xl md:text-8xl font-serif tracking-tight mb-6">
                    <SafeText value={content.title} />
                </h1>
                {content.subtitle && (
                    <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl uppercase tracking-widest">
                        <SafeText value={content.subtitle} />
                    </p>
                )}
            </motion.div>
        </div>
    </section>
);

const TextContent = ({ content }: any) => (
    <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
            {content.title && (
                <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-8">
                    <SafeText value={content.title} />
                </h2>
            )}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light whitespace-pre-wrap">
                <SafeText value={content.content} />
            </p>
        </div>
    </section>
);

const Gallery = ({ content }: any) => (
    <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
            {content.title && (
                <h2 className="text-4xl font-serif text-oxford mb-12 text-center">
                    <SafeText value={content.title} />
                </h2>
            )}
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
                    <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-6">
                        <SafeText value={content.title} />
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        <SafeText value={content.description} />
                    </p>
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
                            <SafeText value={item.label} />
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
                            <h3 className="text-3xl font-serif text-oxford">
                                <SafeText value={activeItem.title} />
                            </h3>
                            <p className="text-lg text-gray-600 leading-relaxed font-light">
                                <SafeText value={activeItem.desc} />
                            </p>
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
                <h2 className="text-4xl md:text-6xl font-serif leading-tight"><SafeText value={content.title} /></h2>
                <p className="text-sandstone/80 text-xl font-light"><SafeText value={content.description} /></p>
                <div className="pt-8">
                    <h4 className="text-2xl font-serif mb-4 text-sandstone"><SafeText value={content.secondaryHeading} /></h4>
                    <p className="text-sandstone/60 leading-relaxed max-w-md"><SafeText value={content.secondaryDescription} /></p>
                </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl rotate-3">
                <img src={content.image} alt="Care Pillars" className="w-full h-full object-cover" />
            </div>
        </div>
    </section>
);

const Features = ({ content }: any) => {
    const items = Array.isArray(content.items) ? content.items : [];
    const [activeTab, setActiveTab] = useState(items[0]?.id || "");
    const activeContent = items.find((c: any) => c.id === activeTab) || items[0];

    if (!activeContent) return null;

    return (
        <section className={`py-24 px-6 ${content.dark ? "bg-oxford text-white" : "bg-white"}`}>
            <div className="max-w-4xl mx-auto text-center mb-16">
                <Flower2 className={`w-12 h-12 mx-auto mb-4 ${content.dark ? "text-sandstone" : "text-oxford"}`} />
                <h2 className={`text-4xl md:text-6xl font-serif mb-4 ${content.dark ? "text-white" : "text-oxford"}`}><SafeText value={content.title} /></h2>
                <p className={`${content.dark ? "text-white/70" : "text-gray-600"}`}><SafeText value={content.description} /></p>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <div className="h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
                    <motion.img
                        key={activeTab}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={activeContent.img}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col justify-center pl-0 lg:pl-12 order-1 lg:order-2">
                    <div className="space-y-6 relative">
                        <div className={`absolute left-0 top-2 bottom-2 w-0.5 ${content.dark ? "bg-white/10" : "bg-gray-200"}`} />
                        {items.map((item: any) => (
                            <div
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className="pl-8 relative cursor-pointer group"
                            >
                                {activeTab === item.id && (
                                    <motion.div
                                        layoutId="featIndicator"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-sandstone -ml-[1px]"
                                    />
                                )}
                                <h3 className={`text-2xl md:text-3xl font-serif mb-2 transition-colors ${activeTab === item.id ? (content.dark ? "text-sandstone" : "text-oxford") : (content.dark ? "text-white/40 group-hover:text-white" : "text-gray-400 group-hover:text-oxford/60")}`}>
                                    <SafeText value={item.label} />
                                </h3>
                                {activeTab === item.id && (
                                    <p className={`${content.dark ? "text-white/60" : "text-gray-600"} text-sm md:text-base leading-relaxed pt-2`}>
                                        <SafeText value={item.desc} />
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const FoodSection = ({ content }: any) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const images = content.images || ["/hostel.jpg"];
    return (
        <section className="py-24 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-8"><SafeText value={content.title} /></h2>
                    <p className="text-gray-600 leading-relaxed text-lg mb-8"><SafeText value={content.description} /></p>
                    <div className="flex gap-4">
                        <button onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)} className="w-12 h-12 rounded-full border border-oxford text-oxford flex items-center justify-center hover:bg-oxford hover:text-white transition-colors">
                            <ChevronLeft />
                        </button>
                        <button onClick={() => setActiveIndex((activeIndex + 1) % images.length)} className="w-12 h-12 rounded-full border border-oxford text-oxford flex items-center justify-center hover:bg-oxford hover:text-white transition-colors">
                            <ChevronRight />
                        </button>
                    </div>
                </div>
                <div className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
                    <motion.img key={activeIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={images[activeIndex]} className="w-full h-full object-cover" />
                </div>
            </div>
        </section>
    );
};

const GridFeatures = ({ content }: any) => (
    <section className={`py-24 px-6 ${content.dark ? "bg-oxford text-white" : "bg-white text-oxford"}`}>
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-serif mb-8"><SafeText value={content.title} /></h2>
            <p className="opacity-80 max-w-3xl mx-auto mb-16"><SafeText value={content.description} /></p>
            <div className="grid md:grid-cols-3 gap-8">
                {content.items?.map((item: any, i: number) => (
                    <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square">
                        <img src={item.img} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-left">
                            <h3 className="text-2xl font-bold text-white"><SafeText value={item.title} /></h3>
                            {item.desc && <p className="text-white/80 text-sm mt-2"><SafeText value={item.desc} /></p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const VideoSection = ({ content }: any) => (
    <section className="py-24 px-6 bg-white text-center">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-12"><SafeText value={content.title} /></h2>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                <img src={content.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const ProgramIcons = ({ content }: any) => (
    <section className="py-32 px-6 bg-oxford text-white text-center">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-sandstone mb-4"><SafeText value={content.title} /></h2>
            <p className="text-white/70 mb-20"><SafeText value={content.description} /></p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                {content.items?.map((item: any, idx: number) => {
                    const Icon = (LucideIcons as any)[item.icon] || Brain;
                    return (
                        <div key={idx} className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-lg border border-white/20 flex items-center justify-center mb-6 text-sandstone/80">
                                <Icon size={40} strokeWidth={1} />
                            </div>
                            <h3 className="text-xl font-bold mb-4"><SafeText value={item.title} /></h3>
                            <p className="text-white/60 text-sm leading-relaxed"><SafeText value={item.desc} /></p>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

const Academics = ({ content }: any) => (
    <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-oxford"><SafeText value={content.title} /></h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {content.stages?.map((stage: any, i: number) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm text-center font-bold text-oxford border border-gray-100 hover:border-sandstone transition-colors text-sm">
                        <SafeText value={stage} />
                    </div>
                ))}
            </div>
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-oxford mb-6"><SafeText value={content.secondaryTitle} /></h3>
                <div className="grid md:grid-cols-3 gap-8">
                    {content.streams?.map((stream: any, i: number) => (
                        <div key={i} className="space-y-4">
                            <div className={`h-2 w-12 rounded-full ${i === 0 ? "bg-blue-500" : i === 1 ? "bg-green-500" : "bg-orange-500"}`} />
                            <h4 className="text-xl font-black text-oxford"><SafeText value={stream.name} /></h4>
                            <ul className="space-y-2 text-gray-600 text-sm">
                                {stream.subjects?.map((s: any, j: number) => <li key={j}><SafeText value={s} /></li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const Toppers = ({ content }: any) => {
    const categories = Array.isArray(content.categories) ? content.categories : [];
    return (
        <section className="py-16 md:py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-oxford"><SafeText value={content.title} /></h2>
                </div>
                <div className="space-y-12 md:space-y-16">
                    {categories.map((cat: any, i: number) => (
                        <div key={i}>
                            <h3 className="text-2xl font-bold text-oxford mb-6 md:mb-8 text-center flex items-center justify-center gap-3">
                                <Trophy className="text-sandstone" />
                                <SafeText value={cat.name} />
                            </h3>
                            <div className="flex flex-wrap justify-center gap-6">
                                {Array.isArray(cat.students) && cat.students.map((student: any, j: number) => (
                                    <div key={j} className="bg-gray-50 p-6 rounded-2xl text-center border border-transparent hover:border-sandstone/30 hover:shadow-lg transition-all w-full sm:w-[250px] md:w-[220px]">
                                        <div className="w-20 h-20 rounded-full bg-sandstone/10 mx-auto mb-4 overflow-hidden border-2 border-sandstone/20 shadow-inner">
                                            {student.image ? <img src={student.image} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-sandstone font-black"><SafeText value={student.percentage} /></div>}
                                        </div>
                                        <h4 className="font-bold text-oxford mb-1"><SafeText value={student.name} /></h4>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter"><SafeText value={student.stream || student.class} /></p>
                                        <p className="text-lg font-black text-sandstone mt-2"><SafeText value={student.percentage} /></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const StaffList = ({ content }: any) => {
    const staffArray = Array.isArray(content.staff) ? content.staff : [];
    return (
        <section className="py-24 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-oxford"><SafeText value={content.title} /></h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {staffArray.map((staff: any, i: number) => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 hover:border-sandstone transition-colors">
                            <div className="w-10 h-10 rounded-full bg-oxford/5 flex items-center justify-center text-oxford font-bold text-sm shrink-0">{i + 1}</div>
                            <div>
                                <h4 className="font-bold text-oxford text-sm"><SafeText value={staff} /></h4>
                                <p className="text-xs text-gray-500"><SafeText value={staff.designation} fallback="Faculty" /></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Rules = ({ content }: any) => {
    const groups = Array.isArray(content.groups) ? content.groups : [];
    const general = Array.isArray(content.general) ? content.general : [];

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-oxford mb-8 text-center"><SafeText value={content.title} /></h2>
                <div className="space-y-8">
                    {groups.map((group: any, i: number) => (
                        <div key={i} className="bg-gray-50 p-8 rounded-3xl">
                            <h3 className="font-bold text-oxford mb-4"><SafeText value={group.name} /></h3>
                            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                                {Array.isArray(group.subgroups) && group.subgroups.map((sub: any, j: number) => (
                                    <div key={j}>
                                        <strong className="block text-sandstone mb-2"><SafeText value={sub.name} /></strong>
                                        <ul className="list-disc pl-4 space-y-1">
                                            {Array.isArray(sub.items) && sub.items.map((item: any, k: number) => (
                                                <li key={k}><SafeText value={item} /></li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="space-y-4 text-sm text-gray-600">
                        {general.map((item: any, i: number) => (
                            <p key={i}>
                                {typeof item === 'string' && item.includes(":") ? (
                                    <><strong>{item.split(":")[0]}:</strong> <SafeText value={item.split(":")[1]} /></>
                                ) : (
                                    <SafeText value={item} />
                                )}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const SideBySide = ({ content }: any) => {
    const [idx, setIdx] = useState(0);
    const images = content.images || [content.image];
    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div className={`${content.reverse ? "order-2" : "order-1"}`}>
                    <h2 className="text-4xl md:text-6xl font-serif text-oxford mb-6">
                        <SafeText value={content.title} />
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg mb-8">
                        <SafeText value={content.description} />
                    </p>
                    {content.secondaryDescription && (
                        <p className="text-gray-600 leading-relaxed text-lg">
                            <SafeText value={content.secondaryDescription} />
                        </p>
                    )}
                </div>
                <div className={`${content.reverse ? "order-1" : "order-2"} relative`}>
                    <div className="rounded-[2rem] overflow-hidden shadow-2xl h-[400px]">
                        <img src={images[idx]} className="w-full h-full object-cover" />
                    </div>
                    {images.length > 1 && (
                        <div className="flex gap-4 mt-8 justify-center lg:justify-start">
                            <button onClick={() => setIdx((idx - 1 + images.length) % images.length)} className="w-12 h-12 rounded-full border border-sandstone text-sandstone flex items-center justify-center hover:bg-sandstone hover:text-white transition-colors">
                                <ChevronLeft />
                            </button>
                            <button onClick={() => setIdx((idx + 1) % images.length)} className="w-12 h-12 rounded-full border border-sandstone text-sandstone flex items-center justify-center hover:bg-sandstone hover:text-white transition-colors">
                                <ChevronRight />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

// Map template names to components
const COMPONENT_MAP: any = {
    hero: Hero,
    "text-content": TextContent,
    gallery: Gallery,
    amenities: Amenities,
    pillars: Pillars,
    features: Features,
    food: FoodSection,
    "grid-features": GridFeatures,
    video: VideoSection,
    "program-icons": ProgramIcons,
    academics: Academics,
    toppers: Toppers,
    staff: StaffList,
    rules: Rules,
    "side-by-side": SideBySide,
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
