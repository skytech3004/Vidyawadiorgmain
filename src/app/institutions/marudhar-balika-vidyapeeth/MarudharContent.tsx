"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, Trophy, School, Star, Microscope, Medal, Phone, MapPin, Globe, CheckCircle2 } from "lucide-react";
import StudentResultsTable from "@/components/StudentResultsTable";
import PerfectScoreAchievers from "@/components/PerfectScoreAchievers";
import StudentModal, { StudentProps } from "@/components/StudentModal";
import FacultyGrid from "@/components/FacultyGrid";
import { getAllMarudharSections } from "@/lib/marudharContent";

interface Facility {
    _id?: string;
    name: string;
    icon: string;
    img: string;
    order?: number;
}

export default function MarudharContent() {
    const [selectedStudent, setSelectedStudent] = useState<StudentProps | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loadingFacilities, setLoadingFacilities] = useState(true);
    const [institution, setInstitution] = useState<any>(null);
    const [loadingInstitution, setLoadingInstitution] = useState(true);

    useEffect(() => {
        const fetchInstitution = async () => {
            try {
                const res = await fetch("/api/institutions/marudhar", { cache: "no-store" });
                const data = await res.json();
                if (data.success) {
                    setInstitution(data.institution);
                }
            } catch (error) {
                console.error("Failed to fetch institution data", error);
            } finally {
                setLoadingInstitution(false);
            }
        };

        const fetchFacilities = async () => {
            try {
                const res = await fetch("/api/infrastructure?institution=marudhar", { cache: "no-store" });
                const data = await res.json();
                if (data.success) {
                    setFacilities(data.results as Facility[]);
                }
            } catch (error) {
                console.error("Failed to fetch marudhar facilities", error);
            } finally {
                setLoadingFacilities(false);
            }
        };

        fetchInstitution();
        fetchFacilities();
    }, []);

    // Resolve CMS sections saved by admin (falls back to defaults when empty)
    const sections = useMemo(
        () => getAllMarudharSections(institution),
        [institution]
    );
    const {
        hero: heroData,
        principal: principalData,
        whyChooseUs: whyChooseUsData,
        resultsStats: resultsStatsData,
        scholarships: scholarshipsData,
        beyondAcademics: beyondAcademicsData,
        whatWeDo: whatWeDoData,
        uniformInstructions: uniformInstructionsData,
        gargiAward: gargiAwardData,
        cta: ctaData,
    } = sections;

    const heroPhones = String(heroData.phone || "")
        .split(/[,/|]/)
        .map((p: string) => p.trim())
        .filter(Boolean);

    const principalParagraphs = String(principalData.message || "")
        .split(/\n+/)
        .map((p: string) => p.trim())
        .filter(Boolean);

    const openModal = (student: StudentProps) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedStudent(null), 300);
    };

    return (
        <main className="min-h-screen bg-white font-devanagari">
            <StudentModal isOpen={isModalOpen} onClose={closeModal} student={selectedStudent} />
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 bg-oxford/90 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sandstone/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row gap-8 items-center mb-10"
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-sandstone overflow-hidden bg-white shrink-0">
                            <img src={heroData.logo} alt={`${heroData.name} Logo`} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <span className="text-sandstone font-bold uppercase tracking-widest text-sm mb-4 block">{heroData.affiliation}</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                                {heroData.name}
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl">
                                {heroData.tagline}
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 text-sm font-medium text-white/80">
                        <div className="flex items-start gap-3">
                            <MapPin className="text-sandstone shrink-0" size={20} />
                            <span className="whitespace-pre-line">{String(heroData.address).replace(/,\s*/g, ",\n")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="text-sandstone shrink-0" size={20} />
                            <div className="flex flex-col">
                                {heroPhones.map((phone: string) => (
                                    <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-sandstone transition-colors">
                                        {phone}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Globe className="text-sandstone shrink-0" size={20} />
                            <a
                                href={heroData.webUrl?.startsWith("http") ? heroData.webUrl : `https://${heroData.webUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-sandstone transition-colors"
                            >
                                {String(heroData.webUrl).replace(/^https?:\/\//, "")}
                            </a>
                        </div>
                    </div>

                    {institution?.prospectus && (
                        <div className="mt-12 flex flex-wrap gap-4">
                            <a 
                                href={institution.prospectus} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-8 py-3 bg-sandstone text-oxford rounded-full font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:bg-white transition-all shadow-lg"
                            >
                                <BookOpen size={18} />
                                Download Prospectus
                            </a>
                        </div>
                    )}
                </div>
            </section>
            {/* About Section */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Leadership</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight">Principal’s Message</h2>
                        <div className="h-1.5 w-24 bg-sandstone mt-6 rounded-full mb-10" />
                        <div className="prose text-gray-600 leading-relaxed space-y-4 mb-8">
                            <p className="text-lg text-oxford/80">
                                {principalData.quote}
                            </p>
                            {principalParagraphs.map((para: string, i: number) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-sandstone shadow-lg">
                                <img
                                    src={principalData.photo}
                                    alt={principalData.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="font-bold text-oxford">
                                <p className="text-lg">{principalData.name}</p>
                                <p className="text-xs text-sandstone uppercase tracking-widest">Principal</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-oxford/5 rounded-[2.5rem] p-10 border border-oxford/10 shadow-xl">
                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4 text-center">Our Ethos</span>
                            <h3 className="text-3xl font-bold text-oxford mb-6 flex justify-center items-center gap-3">
                                <Star className="text-sandstone fill-sandstone" />
                                Our Core Values
                            </h3>
                            <div className="h-1 bg-sandstone w-16 mx-auto mb-8 rounded-full" />
                            <ul className="space-y-4">
                                {principalData.coreValues.map((item: any, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700">
                                        <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-1" />
                                        <div>
                                            <span className="font-bold text-oxford block">{item.title}</span>
                                            <span className="text-sm">{item.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-8 bg-oxford rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sandstone/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <h3 className="text-xl font-bold mb-4 relative z-10">Our School</h3>
                            <p className="text-white/80 text-sm leading-relaxed relative z-10">
                                {heroData.name} is known for its reputation and adherence to quality education, State of the Art Infrastructure, and a nurturing environment. We offer a comprehensive curriculum and engage students in traditional and innovative educational methods to empower them for future success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Why Choose Us Section */}
            <section className="py-24 px-6 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Why Choose Us?</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight">{whyChooseUsData.title}</h2>
                        <div className="h-1.5 w-24 bg-sandstone mt-6 rounded-full mb-10" />
                        <div className="prose text-gray-600 leading-relaxed space-y-4">
                            <p>
                                {whyChooseUsData.description}
                            </p>
                            <p className="text-lg font-medium text-oxford">
                                &ldquo;{whyChooseUsData.quote}&rdquo;
                            </p>
                        </div>
                        <a href="/apply" className="inline-block mt-8 px-8 py-3 bg-oxford text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-sandstone hover:text-oxford transition-all">
                            Apply for Admission
                        </a>
                    </div>
                    <div className="relative">
                        <div className="bg-white rounded-[2.5rem] p-10 border border-oxford/5 shadow-xl">
                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4 text-center">Excellence</span>
                            <h3 className="text-3xl font-bold text-oxford mb-6 flex justify-center items-center gap-3">
                                <Star className="text-sandstone fill-sandstone" />
                                Why Vidyawadi?
                            </h3>
                            <div className="h-1 bg-sandstone w-16 mx-auto mb-8 rounded-full" />
                            <ul className="space-y-4">
                                {whyChooseUsData.bullets.map((item: string, i: number) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700">
                                        <CheckCircle2 size={18} className="text-green-600 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Infrastructure</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight text-center">Modern Labs & Facilities</h2>
                        <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full mb-8" />
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg italic">
                            “Well-equipped laboratories with modern and best technological facilities”
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loadingFacilities ? (
                            <div className="col-span-full py-12 text-center text-gray-500">
                                <div className="w-12 h-12 border-4 border-sandstone border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                <p className="font-bold">Loading Facilities...</p>
                            </div>
                        ) : facilities.length === 0 ? (
                            <div className="col-span-full py-12 text-center text-gray-500">
                                <p className="font-bold">No facilities published yet.</p>
                            </div>
                        ) : facilities.map((facility, i) => {
                            // Dynamically resolve icon from lucide-react if needed
                            const renderIcon = (iconName: string) => {
                                switch (iconName) {
                                    case "Microscope": return <Microscope className="text-gray-300 group-hover:text-sandstone transition-colors" size={64} />;
                                    case "Globe": return <Globe className="text-gray-300 group-hover:text-sandstone transition-colors" size={64} />;
                                    case "Trophy": return <Trophy className="text-gray-300 group-hover:text-sandstone transition-colors" size={64} />;
                                    case "School": return <School className="text-gray-300 group-hover:text-sandstone transition-colors" size={64} />;
                                    case "BookOpen": return <BookOpen className="text-gray-300 group-hover:text-sandstone transition-colors" size={64} />;
                                    case "CheckCircle2": return <CheckCircle2 className="text-gray-300 group-hover:text-sandstone transition-colors" size={64} />;
                                    default: return <Star className="text-gray-300 group-hover:text-sandstone transition-colors" size={64} />;
                                }
                            };

                            const renderSmallIcon = (iconName: string) => {
                                switch (iconName) {
                                    case "Microscope": return <Microscope className="text-sandstone shrink-0 mt-1" size={24} />;
                                    case "Globe": return <Globe className="text-sandstone shrink-0 mt-1" size={24} />;
                                    case "Trophy": return <Trophy className="text-sandstone shrink-0 mt-1" size={24} />;
                                    case "School": return <School className="text-sandstone shrink-0 mt-1" size={24} />;
                                    case "BookOpen": return <BookOpen className="text-sandstone shrink-0 mt-1" size={24} />;
                                    case "CheckCircle2": return <CheckCircle2 className="text-sandstone shrink-0 mt-1" size={24} />;
                                    default: return <Star className="text-sandstone shrink-0 mt-1" size={24} />;
                                }
                            };

                            return (
                                <div key={facility._id || i} className="group overflow-hidden rounded-[2rem] bg-white shadow-xl hover:shadow-2xl transition-all border border-oxford/5">
                                    {facility.img ? (
                                        <div className="h-80 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-oxford/20 group-hover:bg-transparent transition-colors z-10" />
                                            <img
                                                src={facility.img}
                                                alt={facility.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-gray-50 flex items-center justify-center">
                                            {renderIcon(facility.icon)}
                                        </div>
                                    )}
                                    <div className="p-6 relative">
                                        <div className="flex items-start gap-4">
                                            {!facility.img && renderSmallIcon(facility.icon)}
                                            <h3 className="font-bold text-oxford text-lg">{facility.name}</h3>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            {/* Academic Results */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Academic Excellence</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-oxford mt-2">Outstanding Results</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Our students consistently achieve top results at district and state levels, proving our commitment to quality education.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {resultsStatsData.stats.map((stat: any, i: number) => (
                            <div key={i} className="bg-white p-10 rounded-[2rem] shadow-xl border border-oxford/5 text-center hover:-translate-y-2 transition-transform">
                                <h3 className="text-sandstone-dark font-bold uppercase text-xs tracking-[0.2em] mb-4">{stat.class}</h3>
                                <p className="text-4xl font-black text-oxford">{stat.score}</p>
                                <p className="text-[10px] text-green-600 font-bold mt-2 uppercase tracking-widest">Pass Percentage</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-oxford text-white p-8 rounded-2xl flex flex-col justify-center items-center text-center">
                            <Star size={48} className="text-sandstone mb-4" />
                            <h3 className="text-3xl font-bold mb-2">{resultsStatsData.students90Count} Students</h3>
                            <p className="text-white/80">Scored above 90% in board exams</p>
                            <h2 className="text-3xl font-bold mb-2">In {resultsStatsData.students90Year}</h2>
                        </div>
                        <div className="bg-oxford text-white p-8 rounded-2xl flex flex-col justify-center items-center text-center">
                            <Medal size={48} className="text-sandstone mb-4" />
                            <h3 className="text-3xl font-bold mb-2">Perfect Scores</h3>
                            <p className="text-white/80">{resultsStatsData.perfectScoresDesc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Scorers Table */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Meritorious Students</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight text-center">Board Exam Toppers</h2>
                        <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full mb-8" />
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Celebrating the dedication and hard work of our top performers.
                        </p>
                    </div>
                    <StudentResultsTable institution="marudhar" title="Board Exam Toppers" />
                </div>
            </section>


            {/* Fee Structure Section */}
            <section className="py-24 px-6 bg-white overflow-hidden text-devanagari">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Investment in Education</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight text-center">Fee Structure {institution?.feeStructure?.year || "2026–27"}</h2>
                        <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full mb-8" />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {institution?.feeStructure?.classes ? (
                            Object.entries(
                                institution.feeStructure.classes.reduce((acc: any, cls: any) => {
                                    const section = cls.section || "General";
                                    if (!acc[section]) acc[section] = [];
                                    acc[section].push(cls);
                                    return acc;
                                }, {})
                            ).map(([section, classes]: [string, any], sectionIdx: number) => (
                                <div key={sectionIdx} className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-100 hover:border-sandstone/30 hover:shadow-2xl transition-all duration-500 group/card shadow-sm">
                                    <h3 className="text-2xl font-bold text-oxford mb-6 flex items-center gap-3 group-hover/card:text-sandstone transition-colors">
                                        {sectionIdx % 2 === 0 ? <BookOpen className="text-sandstone" /> : <Globe className="text-sandstone" />}
                                        {section}
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="py-4 font-black uppercase text-[10px] tracking-widest text-gray-400">Class</th>
                                                    <th className="py-4 font-black uppercase text-[10px] tracking-widest text-gray-400">Installments</th>
                                                    <th className="py-4 font-black uppercase text-[10px] tracking-widest text-gray-400 text-right">Total Fee</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {classes.map((row: any, i: number) => {
                                                    const installments = institution.feeStructure.installments || 2;
                                                    const installmentAmount = Math.round(row.totalFee / installments);
                                                    return (
                                                        <tr key={i} className="hover:bg-sandstone/5 transition-colors group cursor-pointer">
                                                            <td className="py-4 px-4 font-bold text-oxford group-hover:text-sandstone transition-colors">{row.className}</td>
                                                            <td className="py-4 px-4 text-gray-500 text-sm">
                                                                ₹{installmentAmount.toLocaleString()} × {installments}
                                                            </td>
                                                            <td className="py-4 px-4 text-right font-black text-sandstone-dark">
                                                                ₹{row.totalFee.toLocaleString()}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100 text-xs text-gray-500">
                                        <p><strong>Admission Fee:</strong> {classes.filter((c: any) => c.admissionFee).map((c: any) => `${c.className}: ${c.admissionFee}`).join(" | ")}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            /* Fallback to original hardcoded tables if dynamic data is missing */
                            <>
                                {/* Hindi Medium */}
                                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-100 hover:border-sandstone/30 hover:shadow-2xl transition-all duration-500 group/card opacity-50">
                                    <h3 className="text-2xl font-bold text-oxford mb-6 flex items-center gap-3 group-hover/card:text-sandstone transition-colors">
                                        <BookOpen className="text-sandstone" />
                                        RBSE Hindi Medium
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="py-4 font-black uppercase text-[10px] tracking-widest text-gray-400">Class</th>
                                                    <th className="py-4 font-black uppercase text-[10px] tracking-widest text-gray-400">Installments</th>
                                                    <th className="py-4 font-black uppercase text-[10px] tracking-widest text-gray-400 text-right">Total Fee</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {[
                                                    { class: "VI – VIII", inst: "₹4,750 × 2", total: "₹19,000" },
                                                    { class: "IX – X", inst: "₹6,300 × 2", total: "₹25,200" },
                                                    { class: "XI – XII Arts", inst: "₹6,700 × 2", total: "₹26,800" },
                                                    { class: "XI – XII Commerce", inst: "₹6,700 × 2", total: "₹26,800" },
                                                    { class: "XI – XII Science", inst: "₹8,250 × 2", total: "₹33,000" },
                                                ].map((row, i) => (
                                                    <tr key={i} className="hover:bg-sandstone/5 transition-colors group cursor-pointer">
                                                        <td className="py-4 px-4 font-bold text-oxford group-hover:text-sandstone transition-colors">{row.class}</td>
                                                        <td className="py-4 px-4 text-gray-500 text-sm">{row.inst}</td>
                                                        <td className="py-4 px-4 text-right font-black text-sandstone-dark">{row.total}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100 text-xs text-gray-500">
                                        <p><strong>Admission Fee:</strong> VI–VIII: ₹2,000 | IX–XII: ₹4,000</p>
                                    </div>
                                </div>

                                {/* English Medium */}
                                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-100 hover:border-sandstone/30 hover:shadow-2xl transition-all duration-500 group/card opacity-50">
                                    <h3 className="text-2xl font-bold text-oxford mb-6 flex items-center gap-3 group-hover/card:text-sandstone transition-colors">
                                        <Globe className="text-sandstone" />
                                        RBSE English Medium
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="py-4 font-black uppercase text-[10px] tracking-widest text-gray-400">Class</th>
                                                    <th className="py-4 font-black uppercase text-[10px] tracking-widest text-gray-400">Installments</th>
                                                    <th className="py-4 font-black uppercase text-[10px] tracking-widest text-gray-400 text-right">Total Fee</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {[
                                                    { class: "VI – VIII", inst: "₹5,100 × 2", total: "₹20,400" },
                                                    { class: "IX – X", inst: "₹6,750 × 2", total: "₹27,000" },
                                                    { class: "XI – XII Arts", inst: "₹7,200 × 2", total: "₹28,800" },
                                                    { class: "XI – XII Commerce", inst: "₹7,200 × 2", total: "₹28,800" },
                                                    { class: "XI – XII Science", inst: "₹8,850 × 2", total: "₹35,400" },
                                                ].map((row, i) => (
                                                    <tr key={i} className="hover:bg-sandstone/5 transition-colors group cursor-pointer">
                                                        <td className="py-4 px-4 font-bold text-oxford group-hover:text-sandstone transition-colors">{row.class}</td>
                                                        <td className="py-4 px-4 text-gray-500 text-sm">{row.inst}</td>
                                                        <td className="py-4 px-4 text-right font-black text-sandstone-dark">{row.total}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100 text-xs text-gray-500">
                                        <p><strong>Admission Fee:</strong> VI–VIII: ₹2,000 | IX–XII: ₹4,000</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Scholarships & Merit Awards */}

            <section className="py-24 px-6 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Recognition & Rewards</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight text-center">Scholarships & Awards</h2>
                        <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full mb-8" />
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto font-medium">
                            By Balika Shiksha Foundation, Government of Rajasthan (Jaipur)
                        </p>
                    </div>

                    <div className="mb-20">
                        <div className="text-center mb-10">
                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4">State Level Recognition</span>
                            <h3 className="text-3xl font-bold text-oxford flex justify-center items-center gap-3">
                                <Trophy className="text-sandstone" />
                                EWS Merit Promotion Scheme
                            </h3>
                            <div className="h-1 bg-sandstone w-16 mx-auto mt-6 rounded-full" />
                        </div>
                        <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-center">
                            Under this scheme, three meritorious students who secured positions in the State Merit List were awarded {scholarshipsData.ewsAmount} each.
                        </p>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 overflow-hidden rounded-[2.5rem] border border-oxford/5 shadow-xl bg-white">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-oxford text-white">
                                        <tr>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm">Student Name</th>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm">Class & Stream</th>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm">Percentage</th>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm text-right">Scholarship</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-oxford/10 text-gray-700">
                                        {scholarshipsData.ewsStudents.map((student: any, i: number) => (
                                            <tr
                                                key={i}
                                                className="hover:bg-oxford/5 transition-colors cursor-pointer"
                                                onClick={() => openModal({ ...student, percentage: student.percent, description: "EWS Merit Promotion Scheme Awardee" })}
                                            >
                                                <td className="p-4 md:p-6 font-bold text-oxford flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative border border-gray-300">
                                                        <img src={student.img} alt={student.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    {student.name}
                                                </td>
                                                <td className="p-4 md:p-6">{student.class}</td>
                                                <td className="p-4 md:p-6 font-bold">{student.percent}</td>
                                                <td className="p-4 md:p-6 text-right font-black text-green-600">{student.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Visual Highlight for EWS */}
                            <div className="bg-oxford text-white p-8 rounded-2xl flex flex-col justify-center items-center text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-sandstone/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <Trophy size={64} className="text-sandstone mb-6" />
                                <h4 className="text-4xl font-black mb-2">{scholarshipsData.ewsTotalDistributed}</h4>
                                <p className="text-white/80 font-medium">Total Scholarship Distributed</p>
                                <div className="mt-6 px-4 py-2 bg-white/10 rounded-lg text-sm font-bold uppercase tracking-wider">
                                    State Level Recognition
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="text-center mb-10 mt-12">
                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4">District Level Recognition</span>
                            <h3 className="text-3xl font-bold text-oxford flex justify-center items-center gap-3">
                                <Medal className="text-sandstone" />
                                Padmakshi (Merit) Award Scheme
                            </h3>
                            <div className="h-1 bg-sandstone w-16 mx-auto mt-6 rounded-full" />
                        </div>
                        <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-center">
                            Under the Padmakshi Award Scheme, students who secured first position in Pali District in their respective classes were honored with cash prizes.
                        </p>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Visual Highlight for Padmakshi */}
                            <div className="bg-sandstone text-oxford p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center relative overflow-hidden order-2 lg:order-1 shadow-xl">
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                                <Star size={64} className="text-oxford mb-6" />
                                <h4 className="text-4xl font-black mb-2">₹1,25,000</h4>
                                <p className="text-oxford/80 font-medium">Total Cash Prizes Awarded</p>
                                <div className="mt-6 px-4 py-2 bg-oxford/10 rounded-lg text-sm font-bold uppercase tracking-wider">
                                    District Toppers
                                </div>
                            </div>

                            <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-oxford/10 shadow-lg bg-white order-1 lg:order-2">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-oxford text-white">
                                        <tr>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm">Student Name</th>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm">Class & Stream</th>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm">Percentage</th>
                                            <th className="p-4 md:p-6 font-bold uppercase tracking-wider text-xs md:text-sm text-right">Award Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-oxford/10 text-gray-700">
                                        {[
                                            { name: "Nirma", class: "Class VIII", percent: "95.33%", amount: "₹25,000", img: "/images/nirma.png" },
                                            { name: "Mahima Surana", class: "XII Arts", percent: "96.00%", amount: "₹75,000", img: "/images/mahima_surana.png" },
                                            { name: "Mamata Kumari", class: "XII Commerce", percent: "82.40%", amount: "₹75,000", img: "/images/mamtakuwari.png" }
                                        ].map((student, i) => (
                                            <tr
                                                key={i}
                                                className="hover:bg-oxford/5 transition-colors cursor-pointer"
                                                onClick={() => openModal({ ...student, percentage: student.percent, description: "Padmakshi Merit Award Winner" })}
                                            >
                                                <td className="p-4 md:p-6 font-bold text-oxford flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative border border-gray-300">
                                                        <img src={student.img} alt={student.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    {student.name}
                                                </td>
                                                <td className="p-4 md:p-6">{student.class}</td>
                                                <td className="p-4 md:p-6 font-bold">{student.percent}</td>
                                                <td className="p-4 md:p-6 text-right font-black text-green-600">{student.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* GARGI AWARD */}
                    <div className="mt-20 bg-oxford text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sandstone/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 text-center">
                            <span className="text-sandstone-light font-bold uppercase tracking-[0.4em] text-xs block mb-4">{gargiAwardData.eyebrow}</span>
                            <h3 className="text-4xl font-bold mb-6 flex items-center justify-center gap-3">
                                <Trophy className="text-sandstone" size={40} />
                                {gargiAwardData.title}
                            </h3>
                            <div className="h-1.5 w-24 bg-sandstone mx-auto mb-10 rounded-full" />
                            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                                {gargiAwardData.description}
                            </p>

                            <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                                    <p className="text-sm font-medium uppercase tracking-wider text-sandstone mb-1">Class X</p>
                                    <p className="text-3xl font-black">{gargiAwardData.class10Amount}</p>
                                    <p className="text-xs text-white/70 mt-1">Award Amount</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                                    <p className="text-sm font-medium uppercase tracking-wider text-sandstone mb-1">Class XII</p>
                                    <p className="text-3xl font-black">{gargiAwardData.class12Amount}</p>
                                    <p className="text-xs text-white/70 mt-1">Award Amount</p>
                                </div>
                            </div>

                            <p className="text-sm text-white/60">
                                {gargiAwardData.eligibility}
                            </p>
                        </div>
                    </div>

                    {/* Perfect Score Achievers */}
                    <div className="mt-20">
                        <div className="text-center mb-10">
                            <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Academic Excellence</span>
                            <h3 className="text-3xl font-bold text-oxford mt-2">Perfect Score Achievers</h3>
                            <p className="text-gray-600 mt-2">Students who scored 100 out of 100 marks in Board Exams</p>
                        </div>

                        <PerfectScoreAchievers
                            institution="marudhar"
                            onSelect={(student) => openModal(student)}
                        />
                    </div>
                </div>
            </section>

            {/* Beyond Academics */}
            <section className="py-20 px-6 bg-oxford text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Co-Curricular Excellence</span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-2">Beyond Academics</h2>
                        <p className="text-white/80 mt-4 max-w-2xl mx-auto">
                            “With wings of courage and dreams, the sky is the limit.”
                        </p>
                    </div>

                    {/* NCC Achievement - Harshita */}
                    <div
                        className="mb-20 bg-white/5 rounded-3xl p-8 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                        onClick={() => openModal({
                            name: "Cadet Harshita",
                            class: "IX A",
                            img: "/images/harishta.png",
                            achievement: "NCC National Thal Sainik Camp 2025",
                            description: "Selected for AITSC 2025"
                        })}
                    >
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="md:w-1/3 text-center">
                                <div className="w-48 h-48 mx-auto rounded-full bg-sandstone/20 overflow-hidden mb-6 border-4 border-sandstone/30 relative">
                                    <img src="/images/harishta.png" alt="Cadet Harshita" className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">Cadet Harshita</h3>
                                <p className="text-sandstone font-medium mb-4">Class: IX A</p>
                                <div className="inline-block px-4 py-2 bg-white/10 rounded-lg text-sm font-bold uppercase tracking-wider text-white">
                                    Selected for AITSC 2025
                                </div>
                            </div>
                            <div className="md:w-2/3">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Medal className="text-sandstone" />
                                    NCC Achievement – National Thal Sainik Camp
                                </h3>
                                <p className="text-white/80 mb-6">
                                    We are proud of our girl for her selection in the National Thal Sainik Camp 2025 (AITSC).
                                </p>
                                <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                                    <table className="w-full text-left text-white/90">
                                        <thead className="bg-white/10 text-sandstone">
                                            <tr>
                                                <th className="p-4 font-bold uppercase text-xs tracking-wider">Camp Name</th>
                                                <th className="p-4 font-bold uppercase text-xs tracking-wider">Dates</th>
                                                <th className="p-4 font-bold uppercase text-xs tracking-wider">Location</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10 text-sm">
                                            {beyondAcademicsData.nccCamps.map((row: any, i: number) => (
                                                <tr key={i}>
                                                    <td className="p-4 font-medium">{row.camp}</td>
                                                    <td className="p-4">{row.date}</td>
                                                    <td className="p-4">{row.loc}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Sports Achievements */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Trophy className="text-sandstone" />
                                District, State & National Level Talents
                            </h3>

                            {/* National Level */}
                            <div className="mb-8">
                                <h4 className="text-lg font-bold text-sandstone mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                                    <Globe size={16} /> National Level (Sports)
                                </h4>
                                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                    <table className="w-full text-left text-white/90 text-sm">
                                        <thead className="bg-white/10">
                                            <tr>
                                                <th className="p-3">Student Name</th>
                                                <th className="p-3">Class</th>
                                                <th className="p-3">Sport</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10">
                                            {beyondAcademicsData.sportsNational.map((row: any, i: number) => (
                                                <tr
                                                    key={i}
                                                    className="hover:bg-white/5 transition-colors cursor-pointer"
                                                    onClick={() => openModal({
                                                        name: row.name,
                                                        class: row.cls,
                                                        img: row.img,
                                                        sport: row.sport,
                                                        description: "National Level Sports Achievement"
                                                    })}
                                                >
                                                    <td className="p-3 font-bold flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden">
                                                            <img src={row.img} alt={row.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        {row.name}
                                                    </td>
                                                    <td className="p-3">{row.cls}</td>
                                                    <td className="p-3 text-sandstone">{row.sport}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* State Level */}
                            <div>
                                <h4 className="text-lg font-bold text-sandstone mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                                    <MapPin size={16} /> State Level (Sports)
                                </h4>
                                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                    <table className="w-full text-left text-white/90 text-sm">
                                        <thead className="bg-white/10">
                                            <tr>
                                                <th className="p-3">Student Name</th>
                                                <th className="p-3">Class</th>
                                                <th className="p-3">Sport</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10">
                                            {beyondAcademicsData.sportsState.map((row: any, i: number) => (
                                                <tr
                                                    key={i}
                                                    className="hover:bg-white/5 transition-colors cursor-pointer"
                                                    onClick={() => openModal({
                                                        name: row.name,
                                                        class: row.cls,
                                                        img: row.img,
                                                        sport: row.sport,
                                                        description: "State Level Sports Achievement"
                                                    })}
                                                >
                                                    <td className="p-3 font-bold flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden">
                                                            <img src={row.img} alt={row.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        {row.name}
                                                    </td>
                                                    <td className="p-3">{row.cls}</td>
                                                    <td className="p-3 text-sandstone">{row.sport}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Science Achievements */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Microscope className="text-sandstone" />
                                Science Models & Quiz
                            </h3>

                            {/* District Level */}
                            <div>
                                <h4 className="text-lg font-bold text-sandstone mb-4 uppercase tracking-wider text-sm">District Level</h4>
                                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                    <table className="w-full text-left text-white/90 text-sm">
                                        <thead className="bg-white/10">
                                            <tr>
                                                <th className="p-3">Student Name</th>
                                                <th className="p-3">Class</th>
                                                <th className="p-3">Achievement</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10">
                                            {beyondAcademicsData.scienceDistrict.map((row: any, i: number) => (
                                                <tr
                                                    key={i}
                                                    className="hover:bg-white/5 transition-colors cursor-pointer"
                                                    onClick={() => openModal({
                                                        name: row.name,
                                                        class: row.cls,
                                                        img: row.img,
                                                        achievement: row.ach,
                                                        description: "District Level Science Achievement"
                                                    })}
                                                >
                                                    <td className="p-3 font-bold flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden">
                                                            <img src={row.img} alt={row.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        {row.name}
                                                    </td>
                                                    <td className="p-3">{row.cls}</td>
                                                    <td className="p-3 text-sandstone">{row.ach}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* What We Do Section */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm block mb-4">Our Activities</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-oxford leading-tight text-center">What We Do</h2>
                        <div className="h-1.5 w-24 bg-sandstone mx-auto mt-6 rounded-full mb-8" />
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Glimpses of our vibrant school life and academic activities.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {whatWeDoData.videos.map((video: any, i: number) => (
                            <div key={i} className="group overflow-hidden rounded-[2rem] bg-white shadow-xl hover:shadow-2xl transition-all border border-oxford/5">
                                <div className="h-64 sm:h-80 xl:h-64 overflow-hidden relative">
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 bg-gray-100"
                                    >
                                        <source src={video.url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Faculty Section */}
            <FacultyGrid institution="marudhar" title="Marudhar Balika Vidyapeeth Navigators" />

            {/* School Uniform & General Instructions Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                    <div className="bg-oxford/5 rounded-3xl p-8 md:p-12 border border-oxford/10">
                        <h3 className="text-2xl font-bold text-oxford mb-6 flex items-center gap-3">
                            <Star className="text-sandstone fill-sandstone" />
                            UNIFORM
                        </h3>
                        <div className="space-y-8 text-gray-700">
                            <div>
                                <h4 className="font-bold text-oxford text-lg mb-4 border-b border-oxford/10 pb-2">Class VI to VIII (Tunic-shirt)</h4>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex gap-3 items-start">
                                        <CheckCircle2 size={18} className="text-green-600 mt-0.5 shrink-0" />
                                        <span>{uniformInstructionsData.class6to8}</span>
                                    </li>
                                    <li className="flex gap-3 items-start text-oxford/80 ml-7">
                                        <span>{uniformInstructionsData.class6to8WedSat}</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-oxford text-lg mb-4 border-b border-oxford/10 pb-2">Class IX to XII (Salwar-kurta and Dupatta)</h4>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex gap-3 items-start">
                                        <CheckCircle2 size={18} className="text-green-600 mt-0.5 shrink-0" />
                                        <span>{uniformInstructionsData.class9to12}</span>
                                    </li>
                                    <li className="flex gap-3 items-start text-oxford/80 ml-7">
                                        <span>{uniformInstructionsData.class9to12WedSat}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-4 border-t border-oxford/10">
                                <h4 className="font-bold text-oxford flex items-center gap-2">
                                    <Medal size={20} className="text-sandstone" />
                                    Winter Code
                                </h4>
                                <p className="text-sm mt-2 ml-7">{uniformInstructionsData.winterCode}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-oxford">General Instructions</h2>
                        <div className="grid gap-4">
                            {uniformInstructionsData.rules.map((rule: any, i: number) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-sandstone/10 flex items-center justify-center shrink-0 mt-1">
                                        <span className="text-oxford font-bold text-xs">{i + 1}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-oxford">{rule.title}</h4>
                                        <p className="text-sm text-gray-600">{rule.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Infrastructure */}


            {/* CTA */}
            <section className="py-20 px-6 bg-sandstone">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-black text-oxford mb-6 uppercase tracking-tight">{ctaData.title}</h2>
                    <p className="text-xl text-oxford/80 font-medium mb-10">
                        {ctaData.description}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href={`tel:${String(ctaData.phone).replace(/\s/g, "")}`} className="px-8 py-4 bg-oxford text-white rounded-full font-bold uppercase tracking-wider shadow-lg hover:bg-white hover:text-oxford transition-all">
                            Call: {ctaData.phone}
                        </a>
                        <a href="#contact" className="px-8 py-4 bg-white text-oxford rounded-full font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all">
                            {ctaData.visitText}
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
