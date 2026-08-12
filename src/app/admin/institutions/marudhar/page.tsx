"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Save,
    RefreshCcw,
    School,
    CheckCircle2,
    AlertCircle,
    Info,
    Image as ImageIcon,
    Phone,
    MapPin,
    Globe,
    Trophy,
    Plus,
    Trash2,
    Edit3,
    ArrowLeft,
    Users,
    Microscope,
    Loader2,
    X,
    Star,
    BookOpen,
    Medal,
    ExternalLink,
    Shield
} from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import FileUploadField from "@/components/admin/FileUploadField";
import StudentResultsTable from "@/components/StudentResultsTable";
import FacultyGrid from "@/components/FacultyGrid";
import StudentModal, { StudentProps } from "@/components/StudentModal";

// Fallback hardcoded defaults from the public website
const DEFAULTS = {
    hero: {
        name: "Marudhar Balika Vidyapeeth",
        tagline: "Empowering Girls Through Education, Excellence & Values",
        affiliation: "Hindi & English Medium Senior Secondary School (RBSE)",
        logo: "/marudhar_balika.jpg",
        address: "Khimel, Station Rani – 306115, District Pali (Rajasthan)",
        phone: "6377204205, 6377204207",
        email: "info@vidyawadi.org",
        webUrl: "www.vidyawadi.org"
    },
    principal: {
        name: "Ms. Priya Sangeeta",
        photo: "/hindi-principal.png",
        quote: "“Education is the most powerful weapon which you can use to change the world.” – Nelson Mandela",
        message: "Dear Students, Parents and Well-Wishers,\n\nIt gives me immense pleasure to welcome you to Marudhar Balika Vidyapeeth (Sr. Sec.) School, Vidyawadi. Our institution stands as a symbol of dedication, discipline and excellence in girls’ education. We believe that education is not merely the acquisition of knowledge, but the development of character, confidence and compassion.\n\nOur aim is to provide a safe, supportive and inspiring environment where every child can discover her potential and grow into a responsible and capable individual. We focus on academic excellence along with moral values, leadership qualities and life skills. With the support of qualified and committed teachers, we strive to nurture creativity, critical thinking and a spirit of inquiry among our students.\n\nIn this rapidly changing world, we continuously update our teaching methods and integrate digital learning to prepare our students for future challenges. We encourage participation in co-curricular and extracurricular activities to ensure the holistic development of every learner.\n\nI am confident that with the cooperation of parents and the dedication of our staff, we will continue to scale new heights of success and bring pride to our institution.\n\nLet us work together to empower our daughters with knowledge, confidence and strong values so that they may shine brightly in every sphere of life.",
        coreValues: [
            { title: "Discover Yourself", desc: "Explore unique talents and interests." },
            { title: "Be Your Own Light", desc: "Lead with integrity and wisdom." },
            { title: "Make Your Own Path", desc: "Inspire independent thinking and courage." }
        ]
    },
    whyChooseUs: {
        title: "Shaping Bright Futures",
        description: "Marudhar Balika Vidyapeeth is a premier girls’ senior secondary school dedicated to academic excellence, character building, and all-round development. Managed by Marudhar Mahila Shikshan Sangh, Vidyawadi, our institution provides quality education in Hindi & English Medium under RBSE.",
        quote: "We believe that educated girls build stronger families, communities, and the nation.",
        bullets: [
            "100% Board Results",
            "Experienced & Dedicated Faculty",
            "Focus on Girls’ Empowerment",
            "Strong Academic & Co-curricular Balance",
            "Safe & Supportive Environment",
            "Proven Record of State & National Achievements"
        ]
    },
    resultsStats: {
        stats: [
            { class: "XII Arts", score: "100%" },
            { class: "XII Science", score: "100%" },
            { class: "XII Commerce", score: "100%" },
            { class: "X & VIII (All)", score: "100%" },
        ],
        students90Count: "34",
        students90Year: "2025",
        perfectScoresDesc: "Multiple students achieved 100/100 marks in subjects"
    },
    scholarships: {
        ewsAmount: "₹15,000",
        ewsTotalDistributed: "₹45,000",
        ewsStudents: [
            { name: "Mahima Surana", class: "XII Arts", percent: "96.00%", amount: "₹15,000", img: "/images/mahima_surana.png" },
            { name: "Kirtika Kanwar", class: "XII Science", percent: "95.80%", amount: "₹15,000", img: "/images/kitika_kuwar.png" },
            { name: "Himanshi Kanwar", class: "XII Arts", percent: "95.40%", amount: "₹15,000", img: "/images/himanshi_kanwar.png" }
        ]
    },
    beyondAcademics: {
        featuredAchievement: {
            title: "NCC Achievement - National Thal Sainik Camp",
            description: "We are proud of our girl for her selection in the National Thal Sainik Camp 2025 (AITSC).",
            name: "Cadet Harshita",
            cls: "IX A",
            badge: "SELECTED FOR AITSC 2025",
            img: "/images/harishta.png"
        },
        nccCamps: [
            { camp: "ATC", date: "17 May 2026 – 27 Session May 2025", loc: "Jodhpur" },
            { camp: "Pre TSC – I", date: "04 July 2025 – 13 July 2025", loc: "Jodhpur" },
            { camp: "Pre TSC – II", date: "21 July 2025 – 30 July 2025", loc: "Sri Ganganagar" },
            { camp: "IG SC TSC", date: "02 Aug 2025 – 11 Aug 2025", loc: "Udaipur" }
        ],
        sportsNational: [
            { name: "Kanchan Kanwar", cls: "IX A", sport: "Volleyball", img: "/images/kanchan_kawar.png" },
            { name: "Umrao Kanwar", cls: "X B", sport: "Volleyball", img: "/images/kamraw_kawar.png" },
            { name: "Durvisha Solanki", cls: "XII B", sport: "Rifle Shooting", img: "/images/duvisha_solanki.png" },
            { name: "Hemu Kanwar", cls: "XI B", sport: "Wrestling", img: "/images/hemu_kawar.png" }
        ],
        sportsState: [
            { name: "Kanchan Kanwar", cls: "IX A", sport: "Athletics (Shot Put)", img: "/images/kanchan_kawar.png" }
        ],
        scienceDistrict: [
            { name: "Prithvi Charan", cls: "VIII A", ach: "Quiz Competition", img: "/images/puthvi_charn.png" },
            { name: "Vedika Sharma", cls: "XII A", ach: "Smart Fire Safety Device", img: "/images/devika_sharma.png" },
            { name: "Garima Kanwar", cls: "VIII A", ach: "Smart Fire Safety Device Model", img: "/images/garima_kawar.png" },
            { name: "Heena Kanwar", cls: "VII B", ach: "Geometrical Park Model", img: "/images/hina_kawar.png" }
        ]
    },
    whatWeDo: {
        videos: [
            { url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773142123/WhatsApp_Video_2026-03-10_at_12.21.30_r1zahz.mp4", title: "Campus Activity" },
            { url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126080/WhatsApp_Video_2026-03-10_at_12.13.55_1_nmxdbj.mp4", title: "Student Life" },
            { url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126079/WhatsApp_Video_2026-03-10_at_12.13.55_hbh5uh.mp4", title: "Learning & Growth" },
            { url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126078/WhatsApp_Video_2026-03-10_at_12.13.54_zzosza.mp4", title: "Extracurriculars" },
            { url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126078/WhatsApp_Video_2026-03-10_at_12.13.46_tlxxqk.mp4", title: "Special Events" },
            { url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126078/WhatsApp_Video_2026-03-10_at_12.13.55_2_zjupvk.mp4", title: "Sports & Fitness" }
        ]
    },
    uniformInstructions: {
        class6to8: "Maroon checked shirt and grey tunic, black ribbon or hair band, black shoes and grey socks.",
        class6to8WedSat: "Two days a week (Wednesday & Saturday): White skirt and white shirt, white ribbon, black shoes and white socks.",
        class9to12: "Maroon checked kurta, white salwar and white dupatta, black ribbon, black shoes and grey socks.",
        class9to12WedSat: "Two days a week (Wednesday & Saturday): White salwar Kurta and maroon dupatta, white ribbon, black shoes and white socks.",
        winterCode: "Class VI to XII: Navy Blue Blazer",
        rules: [
            { title: "Regularity", desc: "Minimum 75% attendance is mandatory." },
            { title: "Mobile Phones", desc: "Strictly prohibited on campus." },
            { title: "Bullying", desc: "Zero tolerance policy for any form of harassment." },
            { title: "Hygiene", desc: "Nails trimmed, clean uniform, no makeup/jewellery." }
        ]
    },
    cta: {
        title: "Admissions Open",
        description: "Give your daughter the opportunity to grow into a confident, educated, and successful individual.",
        phone: "6377204205",
        visitText: "Visit Campus"
    },
    gargiAward: {
        eyebrow: "Academic Brilliance",
        title: "GARGI Award Recipients",
        description: "We are proud to announce that 115 students from our institution have been honored under the GARGI AWARD Scheme for their academic excellence.",
        class10Amount: "₹6,000",
        class12Amount: "₹5,000",
        eligibility: "Eligibility: Students scoring 75% or more marks in board exams."
    }
};

export default function MarudharVisualEditor() {
    const instId = "marudhar";
    const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [formData, setFormData] = useState<any>({});
    
    // Auxiliary data collections
    const [facilities, setFacilities] = useState<any[]>([]);
    const [loadingFacilities, setLoadingFacilities] = useState(true);
    const [resultsCount, setResultsCount] = useState(0);
    const [facultyCount, setFacultyCount] = useState(0);
    
    // Modal states for topper preview inside admin
    const [selectedStudent, setSelectedStudent] = useState<StudentProps | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Visual editor active section drawer
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
        fetchAuxiliaryData();
    }, []);

    const parseJSONField = (str: string | undefined, subKey: string | null, fallback: any) => {
        if (!str) return fallback;
        try {
            const parsed = JSON.parse(str);
            if (subKey) return parsed[subKey] !== undefined ? parsed[subKey] : fallback;
            return parsed;
        } catch (e) {
            return fallback;
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/institutions");
            const data = await res.json();
            if (data.success) {
                const marudharData = data.institutions.find((inst: any) => inst.id === instId);
                setFormData(marudharData || { id: instId });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Failed to load institution data" });
        } finally {
            setLoading(false);
        }
    };

    const fetchAuxiliaryData = async () => {
        // Fetch facilities (infrastructure)
        setLoadingFacilities(true);
        try {
            const res = await fetch("/api/infrastructure?institution=marudhar");
            const data = await res.json();
            if (data.success) setFacilities(data.results);
        } catch (e) {
            console.error("Failed to fetch facilities", e);
        } finally {
            setLoadingFacilities(false);
        }

        // Fetch counts for summary badges
        try {
            const resResults = await fetch(`/api/admin/results?institution=${instId}`);
            const dataResults = await resResults.json();
            if (dataResults.success) setResultsCount(dataResults.results.length);

            const resStaff = await fetch(`/api/admin/staff?institution=${instId}`);
            const dataStaff = await resStaff.json();
            if (dataStaff.success) {
                const filtered = dataStaff.faculty.filter((f: any) => f.institution === instId);
                setFacultyCount(filtered.length);
            }
        } catch (e) {
            console.error("Failed to fetch counts", e);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: "", text: "" });
        try {
            const res = await fetch("/api/admin/institutions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, id: instId })
            });
            const data = await res.json();
            if (data.success) {
                setMessage({ type: "success", text: "Changes saved successfully!" });
                setFormData(data.institution);
                setTimeout(() => setMessage({ type: "", text: "" }), 4000);
                return true;
            } else {
                setMessage({ type: "error", text: data.error || "Save failed" });
                return false;
            }
        } catch (error) {
            setMessage({ type: "error", text: "An error occurred while saving" });
            return false;
        } finally {
            setSaving(false);
        }
    };

    const handleDoneAndSave = async () => {
        const ok = await handleSave();
        if (ok) setActiveSection(null);
    };

    // Safe getters with public-page fallbacks
    const getSectionData = (sectionId: string, defaultData: any) => {
        if (!formData || loading) return defaultData;

        if (sectionId === "hero") {
            return {
                name: formData.name || defaultData.name,
                tagline: formData.tagline || defaultData.tagline,
                logo: formData.logo || defaultData.logo,
                affiliation: formData.affiliation || defaultData.affiliation,
                address: formData.contact?.address || defaultData.address,
                phone: formData.contact?.phone || defaultData.phone,
                email: formData.contact?.email || defaultData.email,
                webUrl: formData.contact?.webUrl || defaultData.webUrl
            };
        }

        if (sectionId === "principal") {
            const parsedAbout = parseJSONField(formData.about?.content, null, {});
            return {
                name: formData.principalMessage?.principalName || defaultData.name,
                photo: formData.principalMessage?.principalPhoto || defaultData.photo,
                quote: formData.principalMessage?.quote || defaultData.quote,
                message: formData.principalMessage?.message || defaultData.message,
                coreValues: parsedAbout.coreValues || defaultData.coreValues
            };
        }

        if (sectionId === "why-choose-us") {
            const parsed = parseJSONField(formData.about?.content, null, {});
            return {
                title: parsed.whyChooseUsTitle || defaultData.title,
                description: parsed.whyChooseUsDescription || defaultData.description,
                quote: parsed.whyChooseUsQuote || defaultData.quote,
                bullets: parsed.whyChooseUsBullets || defaultData.bullets
            };
        }

        if (sectionId === "results-stats") {
            const parsed = parseJSONField(formData.mission?.content, null, {});
            return {
                stats: parsed.stats || defaultData.stats,
                students90Count: parsed.students90Count || defaultData.students90Count,
                students90Year: parsed.students90Year || defaultData.students90Year,
                perfectScoresDesc: parsed.perfectScoresDesc || defaultData.perfectScoresDesc
            };
        }

        if (sectionId === "scholarships") {
            const parsed = parseJSONField(formData.mission?.content, null, {});
            return {
                ewsAmount: parsed.ewsAmount || defaultData.ewsAmount,
                ewsTotalDistributed: parsed.ewsTotalDistributed || defaultData.ewsTotalDistributed,
                ewsStudents: parsed.ewsStudents || defaultData.ewsStudents
            };
        }

        if (sectionId === "beyond-academics") {
            const parsed = parseJSONField(formData.vision?.content, null, {});
            return {
                featuredAchievement: parsed.featuredAchievement || defaultData.featuredAchievement,
                nccCamps: parsed.nccCamps || defaultData.nccCamps,
                sportsNational: parsed.sportsNational || defaultData.sportsNational,
                sportsState: parsed.sportsState || defaultData.sportsState,
                scienceDistrict: parsed.scienceDistrict || defaultData.scienceDistrict
            };
        }

        if (sectionId === "what-we-do") {
            const parsed = parseJSONField(formData.vision?.content, null, {});
            return {
                videos: parsed.videos || defaultData.videos
            };
        }

        if (sectionId === "uniform-instructions") {
            const parsedUniform = parseJSONField(formData.uniform?.content, null, {});
            const parsedRules = parseJSONField(formData.rules?.content, null, {});
            return {
                class6to8: parsedUniform.class6to8 || defaultData.class6to8,
                class6to8WedSat: parsedUniform.class6to8WedSat || defaultData.class6to8WedSat,
                class9to12: parsedUniform.class9to12 || defaultData.class9to12,
                class9to12WedSat: parsedUniform.class9to12WedSat || defaultData.class9to12WedSat,
                winterCode: parsedUniform.winterCode || defaultData.winterCode,
                rules: parsedRules.rules || defaultData.rules
            };
        }

        if (sectionId === "cta") {
            const parsed = parseJSONField(formData.rules?.content, null, {});
            return {
                title: parsed.ctaTitle || defaultData.title,
                description: parsed.ctaDescription || defaultData.description,
                phone: parsed.ctaPhone || defaultData.phone,
                visitText: parsed.ctaVisitText || defaultData.visitText
            };
        }

        if (sectionId === "gargi-award") {
            const parsed = parseJSONField(formData.rules?.content, null, {});
            return {
                eyebrow: parsed.gargiAward?.eyebrow || defaultData.eyebrow,
                title: parsed.gargiAward?.title || defaultData.title,
                description: parsed.gargiAward?.description || defaultData.description,
                class10Amount: parsed.gargiAward?.class10Amount || defaultData.class10Amount,
                class12Amount: parsed.gargiAward?.class12Amount || defaultData.class12Amount,
                eligibility: parsed.gargiAward?.eligibility || defaultData.eligibility
            };
        }

        return defaultData;
    };

    // State updaters for visual forms
    const updateSectionData = (sectionId: string, updatedFields: any) => {
        setFormData((prev: any) => {
            const updated = { ...prev };

            if (sectionId === "hero") {
                updated.name = updatedFields.name;
                updated.tagline = updatedFields.tagline;
                updated.logo = updatedFields.logo;
                updated.affiliation = updatedFields.affiliation;
                updated.contact = {
                    ...updated.contact,
                    address: updatedFields.address,
                    phone: updatedFields.phone,
                    email: updatedFields.email,
                    webUrl: updatedFields.webUrl
                };
            } else if (sectionId === "principal") {
                updated.principalMessage = {
                    ...updated.principalMessage,
                    principalName: updatedFields.name,
                    principalPhoto: updatedFields.photo,
                    quote: updatedFields.quote,
                    message: updatedFields.message
                };

                const currentAbout = parseJSONField(prev.about?.content, null, {});
                currentAbout.coreValues = updatedFields.coreValues;
                updated.about = {
                    ...updated.about,
                    content: JSON.stringify(currentAbout)
                };
            } else if (sectionId === "why-choose-us") {
                const currentAbout = parseJSONField(prev.about?.content, null, {});
                currentAbout.whyChooseUsTitle = updatedFields.title;
                currentAbout.whyChooseUsDescription = updatedFields.description;
                currentAbout.whyChooseUsQuote = updatedFields.quote;
                currentAbout.whyChooseUsBullets = updatedFields.bullets;

                updated.about = {
                    ...updated.about,
                    content: JSON.stringify(currentAbout)
                };
            } else if (sectionId === "results-stats") {
                const currentMission = parseJSONField(prev.mission?.content, null, {});
                currentMission.stats = updatedFields.stats;
                currentMission.students90Count = updatedFields.students90Count;
                currentMission.students90Year = updatedFields.students90Year;
                currentMission.perfectScoresDesc = updatedFields.perfectScoresDesc;

                updated.mission = {
                    ...updated.mission,
                    content: JSON.stringify(currentMission)
                };
            } else if (sectionId === "scholarships") {
                const currentMission = parseJSONField(prev.mission?.content, null, {});
                currentMission.ewsAmount = updatedFields.ewsAmount;
                currentMission.ewsTotalDistributed = updatedFields.ewsTotalDistributed;
                currentMission.ewsStudents = updatedFields.ewsStudents;

                updated.mission = {
                    ...updated.mission,
                    content: JSON.stringify(currentMission)
                };
            } else if (sectionId === "beyond-academics") {
                const currentVision = parseJSONField(prev.vision?.content, null, {});
                currentVision.featuredAchievement = updatedFields.featuredAchievement;
                currentVision.nccCamps = updatedFields.nccCamps;
                currentVision.sportsNational = updatedFields.sportsNational;
                currentVision.sportsState = updatedFields.sportsState;
                currentVision.scienceDistrict = updatedFields.scienceDistrict;

                updated.vision = {
                    ...updated.vision,
                    content: JSON.stringify(currentVision)
                };
            } else if (sectionId === "what-we-do") {
                const currentVision = parseJSONField(prev.vision?.content, null, {});
                currentVision.videos = updatedFields.videos;

                updated.vision = {
                    ...updated.vision,
                    content: JSON.stringify(currentVision)
                };
            } else if (sectionId === "uniform-instructions") {
                const currentUniform = parseJSONField(prev.uniform?.content, null, {});
                currentUniform.class6to8 = updatedFields.class6to8;
                currentUniform.class6to8WedSat = updatedFields.class6to8WedSat;
                currentUniform.class9to12 = updatedFields.class9to12;
                currentUniform.class9to12WedSat = updatedFields.class9to12WedSat;
                currentUniform.winterCode = updatedFields.winterCode;

                updated.uniform = {
                    ...updated.uniform,
                    content: JSON.stringify(currentUniform)
                };

                const currentRules = parseJSONField(prev.rules?.content, null, {});
                currentRules.rules = updatedFields.rules;

                updated.rules = {
                    ...updated.rules,
                    content: JSON.stringify(currentRules)
                };
            } else if (sectionId === "cta") {
                const currentRules = parseJSONField(prev.rules?.content, null, {});
                currentRules.ctaTitle = updatedFields.title;
                currentRules.ctaDescription = updatedFields.description;
                currentRules.ctaPhone = updatedFields.phone;
                currentRules.ctaVisitText = updatedFields.visitText;

                updated.rules = {
                    ...updated.rules,
                    content: JSON.stringify(currentRules)
                };
            } else if (sectionId === "gargi-award") {
                const currentRules = parseJSONField(prev.rules?.content, null, {});
                currentRules.gargiAward = {
                    eyebrow: updatedFields.eyebrow,
                    title: updatedFields.title,
                    description: updatedFields.description,
                    class10Amount: updatedFields.class10Amount,
                    class12Amount: updatedFields.class12Amount,
                    eligibility: updatedFields.eligibility
                };

                updated.rules = {
                    ...updated.rules,
                    content: JSON.stringify(currentRules)
                };
            }

            return updated;
        });
    };

    // Specific field-level state changes (e.g. fees structure)
    const handleFeeChange = (field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            feeStructure: {
                ...prev?.feeStructure,
                [field]: value
            }
        }));
    };

    const handleClassFeeChange = (index: number, field: string, value: any) => {
        const newClasses = [...(formData.feeStructure?.classes || [])];
        newClasses[index] = { ...newClasses[index], [field]: value };
        handleFeeChange("classes", newClasses);
    };

    const addFeeClass = () => {
        const newClasses = [...(formData.feeStructure?.classes || []), { section: "", className: "", totalFee: 0, admissionFee: "" }];
        handleFeeChange("classes", newClasses);
    };

    const removeFeeClass = (index: number) => {
        const newClasses = [...(formData.feeStructure?.classes || [])];
        newClasses.splice(index, 1);
        handleFeeChange("classes", newClasses);
    };

    // Resolve specific section details
    const heroData = getSectionData("hero", DEFAULTS.hero);
    const principalData = getSectionData("principal", DEFAULTS.principal);
    const whyChooseUsData = getSectionData("why-choose-us", DEFAULTS.whyChooseUs);
    const resultsStatsData = getSectionData("results-stats", DEFAULTS.resultsStats);
    const scholarshipsData = getSectionData("scholarships", DEFAULTS.scholarships);
    const beyondAcademicsData = getSectionData("beyond-academics", DEFAULTS.beyondAcademics);
    const whatWeDoData = getSectionData("what-we-do", DEFAULTS.whatWeDo);
    const uniformInstructionsData = getSectionData("uniform-instructions", DEFAULTS.uniformInstructions);
    const gargiAwardData = getSectionData("gargi-award", DEFAULTS.gargiAward);
    const ctaData = getSectionData("cta", DEFAULTS.cta);

    const openTopperModal = (student: StudentProps) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const closeTopperModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedStudent(null), 300);
    };

    const toggleSectionEdit = (id: string) => {
        if (activeSection === id) {
            setActiveSection(null);
        } else {
            setActiveSection(id);
            setTimeout(() => {
                document.getElementById(`preview-sec-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
        }
    };

    // Visual overlay rendering for each editable section
    const renderAdminSectionWrapper = (id: string, label: string, children: React.ReactNode) => {
        const isSelected = activeSection === id;
        return (
            <div
                id={`preview-sec-${id}`}
                className={`relative group/section transition-all duration-300 ${
                    isSelected ? "ring-4 ring-sandstone/40 bg-sandstone/5 z-20" : "hover:ring-4 hover:ring-sandstone/10"
                }`}
            >
                {/* Visual indicator borders for the section container */}
                <div className="absolute inset-0 border border-dashed border-transparent group-hover/section:border-sandstone/50 pointer-events-none transition-colors z-20" />

                {/* Floating section indicators */}
                <div className={`absolute top-4 right-4 z-40 transition-all flex items-center gap-2 ${
                    isSelected ? "opacity-100" : "opacity-0 group-hover/section:opacity-100 group-hover/section:translate-y-0 translate-y-2"
                }`}>
                    <span className="bg-oxford text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md border border-white/10">
                        {label}
                    </span>
                    <button
                        onClick={() => (isSelected ? handleDoneAndSave() : toggleSectionEdit(id))}
                        disabled={saving && isSelected}
                        className={`px-4 py-1.5 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1 border ${
                            isSelected
                                ? "bg-oxford text-white border-oxford/20 hover:bg-black"
                                : "bg-sandstone text-oxford border-sandstone-dark/10 hover:bg-white"
                        }`}
                    >
                        {isSelected ? (saving ? <><Loader2 size={12} className="animate-spin" /> Saving...</> : <><Save size={12} /> Save & Done</>) : <><Edit3 size={12} /> Edit Section</>}
                    </button>
                </div>

                {/* Inline edit panel — opens right inside this section */}
                <AnimatePresence>
                    {isSelected && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="relative z-30 overflow-hidden"
                        >
                            <div className="bg-white border-b-2 border-sandstone/30 shadow-inner">
                                <div className="px-6 py-4 bg-gradient-to-r from-sandstone/15 to-white border-b border-sandstone/20 flex items-center justify-between gap-4">
                                    <div>
                                        <span className="text-[10px] font-black text-sandstone uppercase tracking-widest">Inline Editor</span>
                                        <h3 className="text-sm font-black text-oxford uppercase tracking-tight">{label}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() => setActiveSection(null)}
                                            className="px-3 py-1.5 border border-gray-200 text-oxford hover:bg-gray-50 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="px-4 py-1.5 bg-oxford text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-black disabled:opacity-70"
                                        >
                                            {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                                            Save
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6 max-h-[70vh] overflow-y-auto select-text">
                                    {renderSectionForm(id)}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {children}
            </div>
        );
    };

    // Inline section forms renderer
    const renderSectionForm = (sectionId: string) => {
        if (sectionId === "hero") {
            return (
                <div className="space-y-6">
                    <ImageUploadField
                        label="School Logo"
                        value={heroData.logo}
                        onChange={(url) => updateSectionData("hero", { ...heroData, logo: url })}
                        folder="institution/logo"
                        description="Uploaded logo is displayed in the hero section header (Max 2MB)."
                    />
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">School Name</label>
                        <input
                            type="text"
                            value={heroData.name}
                            onChange={(e) => updateSectionData("hero", { ...heroData, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all font-bold text-oxford text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Tagline</label>
                        <textarea
                            value={heroData.tagline}
                            onChange={(e) => updateSectionData("hero", { ...heroData, tagline: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all text-sm text-gray-600 font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Affiliation Info</label>
                        <input
                            type="text"
                            value={heroData.affiliation}
                            onChange={(e) => updateSectionData("hero", { ...heroData, affiliation: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all text-sm font-medium text-gray-700"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Address</label>
                        <textarea
                            value={heroData.address}
                            onChange={(e) => updateSectionData("hero", { ...heroData, address: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all text-sm text-gray-600 font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Numbers</label>
                        <input
                            type="text"
                            value={heroData.phone}
                            onChange={(e) => updateSectionData("hero", { ...heroData, phone: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all text-sm text-gray-700"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Website URL</label>
                        <input
                            type="text"
                            value={heroData.webUrl}
                            onChange={(e) => updateSectionData("hero", { ...heroData, webUrl: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all text-sm text-gray-700"
                        />
                    </div>
                    <FileUploadField
                        label="Prospectus PDF"
                        value={formData.prospectus || ""}
                        onChange={(url) => setFormData((prev: any) => ({ ...prev, prospectus: url }))}
                        folder="prospectus/marudhar"
                        description="Upload official school prospectus in PDF format (Max 50MB)."
                    />
                </div>
            );
        }

        if (sectionId === "principal") {
            return (
                <div className="space-y-6">
                    <ImageUploadField
                        label="Principal Photo"
                        value={principalData.photo}
                        onChange={(url) => updateSectionData("principal", { ...principalData, photo: url })}
                        folder="principal/photo"
                        description="Aspect ratio 1:1, under 2MB. formats: JPG, PNG, WEBP."
                    />
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Principal Name</label>
                        <input
                            type="text"
                            value={principalData.name}
                            onChange={(e) => updateSectionData("principal", { ...principalData, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all font-bold text-oxford text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Principal Quote</label>
                        <textarea
                            value={principalData.quote}
                            onChange={(e) => updateSectionData("principal", { ...principalData, quote: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all text-sm text-gray-600 font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Principal Message</label>
                        <textarea
                            value={principalData.message}
                            onChange={(e) => updateSectionData("principal", { ...principalData, message: e.target.value })}
                            rows={10}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all text-xs text-gray-600 leading-relaxed font-medium"
                        />
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                        <h4 className="font-bold text-oxford text-sm uppercase tracking-tight mb-4">Core Values</h4>
                        {principalData.coreValues.map((val: any, idx: number) => (
                            <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 mb-4">
                                <div className="space-y-1">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Value {idx + 1} Title</label>
                                    <input
                                        type="text"
                                        value={val.title}
                                        onChange={(e) => {
                                            const updatedValues = [...principalData.coreValues];
                                            updatedValues[idx] = { ...val, title: e.target.value };
                                            updateSectionData("principal", { ...principalData, coreValues: updatedValues });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white font-bold text-oxford text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Value {idx + 1} Description</label>
                                    <input
                                        type="text"
                                        value={val.desc}
                                        onChange={(e) => {
                                            const updatedValues = [...principalData.coreValues];
                                            updatedValues[idx] = { ...val, desc: e.target.value };
                                            updateSectionData("principal", { ...principalData, coreValues: updatedValues });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white text-gray-600 text-xs"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (sectionId === "why-choose-us") {
            return (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Section Title</label>
                        <input
                            type="text"
                            value={whyChooseUsData.title}
                            onChange={(e) => updateSectionData("why-choose-us", { ...whyChooseUsData, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all font-bold text-oxford text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Main Paragraphs</label>
                        <textarea
                            value={whyChooseUsData.description}
                            onChange={(e) => updateSectionData("why-choose-us", { ...whyChooseUsData, description: e.target.value })}
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all text-sm text-gray-600 font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Highlight Quote</label>
                        <input
                            type="text"
                            value={whyChooseUsData.quote}
                            onChange={(e) => updateSectionData("why-choose-us", { ...whyChooseUsData, quote: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all text-sm font-medium text-gray-700"
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-oxford text-sm uppercase tracking-tight">"Why Vidyawadi" Bullets</h4>
                            <button
                                onClick={() => {
                                    const bullets = [...whyChooseUsData.bullets, "New feature list item"];
                                    updateSectionData("why-choose-us", { ...whyChooseUsData, bullets });
                                }}
                                className="px-3 py-1 bg-sandstone/10 text-oxford rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:bg-sandstone transition-all"
                            >
                                <Plus size={12} /> Add Bullet
                            </button>
                        </div>
                        {whyChooseUsData.bullets.map((bullet: string, idx: number) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    value={bullet}
                                    onChange={(e) => {
                                        const bullets = [...whyChooseUsData.bullets];
                                        bullets[idx] = e.target.value;
                                        updateSectionData("why-choose-us", { ...whyChooseUsData, bullets });
                                    }}
                                    className="flex-1 px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all text-xs font-medium text-gray-700"
                                />
                                <button
                                    onClick={() => {
                                        const bullets = [...whyChooseUsData.bullets];
                                        bullets.splice(idx, 1);
                                        updateSectionData("why-choose-us", { ...whyChooseUsData, bullets });
                                    }}
                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (sectionId === "infrastructure-labs") {
            return (
                <div className="space-y-6">
                    <div className="bg-sandstone/10 p-6 rounded-2xl border border-sandstone/20 text-center">
                        <Microscope className="mx-auto text-sandstone mb-3" size={32} />
                        <h4 className="font-bold text-oxford mb-1">Infrastructure Management</h4>
                        <p className="text-xs text-gray-500 mb-4">Labs, facilities, and dynamic campus locations are managed globally across all institutions.</p>
                        <Link
                            href={`/admin/labs/${instId}`}
                            className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-oxford text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-md"
                        >
                            Open Facilities Manager
                            <ExternalLink size={12} />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Entries</span>
                            <span className="px-2.5 py-0.5 bg-gray-100 rounded-full font-bold text-xs text-gray-600">{facilities.length} Labs</span>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {facilities.map((fac) => (
                                <div key={fac._id} className="py-3 flex items-center justify-between gap-3 text-xs">
                                    <div className="flex items-center gap-3">
                                        {fac.img ? (
                                            <img src={fac.img} className="w-10 h-10 object-cover rounded-lg border border-gray-200" />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 font-bold">
                                                {fac.icon?.charAt(0) || "L"}
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-bold text-oxford truncate w-48">{fac.name}</p>
                                            <p className="text-[10px] text-gray-400 font-medium">Order: {fac.order || 0}</p>
                                        </div>
                                    </div>
                                    <Link href={`/admin/labs/${instId}`} className="text-sandstone-dark font-bold hover:underline">Edit</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        if (sectionId === "results-stats") {
            return (
                <div className="space-y-6">
                    <div className="bg-sandstone/10 p-6 rounded-2xl border border-sandstone/20 text-center">
                        <Trophy className="mx-auto text-sandstone mb-3" size={32} />
                        <h4 className="font-bold text-oxford mb-1">Toppers Merit Lists</h4>
                        <p className="text-xs text-gray-500 mb-4">Board toppers database records are managed in the results board panel.</p>
                        <Link
                            href={`/admin/results?institution=${instId}`}
                            className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-oxford text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-md"
                        >
                            Open Board Merit Manager
                            <ExternalLink size={12} />
                        </Link>
                    </div>

                    <div className="pt-4 border-t border-gray-100 space-y-4">
                        <h4 className="font-bold text-oxford text-sm uppercase tracking-tight">Board Stats Cards</h4>
                        {resultsStatsData.stats.map((stat: any, idx: number) => (
                            <div key={idx} className="flex gap-2">
                                <div className="flex-1 space-y-1">
                                    <label className="block text-[9px] font-bold text-gray-400 uppercase">Class/Category</label>
                                    <input
                                        type="text"
                                        value={stat.class}
                                        onChange={(e) => {
                                            const stats = [...resultsStatsData.stats];
                                            stats[idx] = { ...stat, class: e.target.value };
                                            updateSectionData("results-stats", { ...resultsStatsData, stats });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 font-bold text-oxford text-xs"
                                    />
                                </div>
                                <div className="w-24 space-y-1">
                                    <label className="block text-[9px] font-bold text-gray-400 uppercase">Score/Percent</label>
                                    <input
                                        type="text"
                                        value={stat.score}
                                        onChange={(e) => {
                                            const stats = [...resultsStatsData.stats];
                                            stats[idx] = { ...stat, score: e.target.value };
                                            updateSectionData("results-stats", { ...resultsStatsData, stats });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 font-bold text-sandstone-dark text-xs"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-gray-100 space-y-4">
                        <h4 className="font-bold text-oxford text-sm uppercase tracking-tight">Honors Highlights</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase">Students Count (Above 90%)</label>
                                <input
                                    type="text"
                                    value={resultsStatsData.students90Count}
                                    onChange={(e) => updateSectionData("results-stats", { ...resultsStatsData, students90Count: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 text-xs font-bold text-oxford"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase">Board Session Year</label>
                                <input
                                    type="text"
                                    value={resultsStatsData.students90Year}
                                    onChange={(e) => updateSectionData("results-stats", { ...resultsStatsData, students90Year: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 text-xs font-bold text-oxford"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase">Perfect Scores Description</label>
                            <input
                                type="text"
                                value={resultsStatsData.perfectScoresDesc}
                                onChange={(e) => updateSectionData("results-stats", { ...resultsStatsData, perfectScoresDesc: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 text-xs font-medium text-gray-600"
                            />
                        </div>
                    </div>
                </div>
            );
        }

        if (sectionId === "scholarships") {
            return (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">EWS Individual Prize Amount</label>
                        <input
                            type="text"
                            value={scholarshipsData.ewsAmount}
                            onChange={(e) => updateSectionData("scholarships", { ...scholarshipsData, ewsAmount: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all font-bold text-oxford text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Total EWS Scheme Distribution</label>
                        <input
                            type="text"
                            value={scholarshipsData.ewsTotalDistributed}
                            onChange={(e) => updateSectionData("scholarships", { ...scholarshipsData, ewsTotalDistributed: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone focus:ring-4 focus:ring-sandstone/10 outline-none transition-all font-bold text-oxford text-sm"
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 space-y-4">
                        <h4 className="font-bold text-oxford text-sm uppercase tracking-tight">EWS Meritorious Students</h4>
                        {scholarshipsData.ewsStudents.map((student: any, idx: number) => (
                            <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                                <ImageUploadField
                                    label={`Photo (Student ${idx + 1})`}
                                    value={student.img}
                                    onChange={(url) => {
                                        const ewsStudents = [...scholarshipsData.ewsStudents];
                                        ewsStudents[idx] = { ...student, img: url };
                                        updateSectionData("scholarships", { ...scholarshipsData, ewsStudents });
                                    }}
                                    folder="scholarships/ews"
                                />
                                <div className="space-y-1">
                                    <label className="block text-[9px] font-bold text-gray-400 uppercase">Student Name</label>
                                    <input
                                        type="text"
                                        value={student.name}
                                        onChange={(e) => {
                                            const ewsStudents = [...scholarshipsData.ewsStudents];
                                            ewsStudents[idx] = { ...student, name: e.target.value };
                                            updateSectionData("scholarships", { ...scholarshipsData, ewsStudents });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white font-bold text-oxford text-xs"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase">Class & Stream</label>
                                        <input
                                            type="text"
                                            value={student.class}
                                            onChange={(e) => {
                                                const ewsStudents = [...scholarshipsData.ewsStudents];
                                                ewsStudents[idx] = { ...student, class: e.target.value };
                                                updateSectionData("scholarships", { ...scholarshipsData, ewsStudents });
                                            }}
                                            className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white text-gray-600 text-xs font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase">Percentage</label>
                                        <input
                                            type="text"
                                            value={student.percent}
                                            onChange={(e) => {
                                                const ewsStudents = [...scholarshipsData.ewsStudents];
                                                ewsStudents[idx] = { ...student, percent: e.target.value };
                                                updateSectionData("scholarships", { ...scholarshipsData, ewsStudents });
                                            }}
                                            className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white text-oxford text-xs font-black"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (sectionId === "beyond-academics") {
            return (
                <div className="space-y-6">
                    {/* Featured NCC spotlight */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <h4 className="font-bold text-oxford text-sm uppercase tracking-tight">Featured NCC Achievement</h4>
                            <span className="px-3 py-1 bg-sandstone/10 text-oxford rounded-lg text-[9px] font-black uppercase tracking-widest">
                                Admin Spotlight
                            </span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                            <ImageUploadField
                                label="Student Image"
                                value={beyondAcademicsData.featuredAchievement.img}
                                onChange={(url) => {
                                    updateSectionData("beyond-academics", {
                                        ...beyondAcademicsData,
                                        featuredAchievement: { ...beyondAcademicsData.featuredAchievement, img: url }
                                    });
                                }}
                                folder="beyond-academics/featured"
                                description="Use the portrait shown on the left card in the admin preview."
                            />
                            <div className="space-y-1">
                                <label className="block text-[9px] font-bold text-gray-400 uppercase">Headline</label>
                                <input
                                    type="text"
                                    value={beyondAcademicsData.featuredAchievement.title}
                                    onChange={(e) => {
                                        updateSectionData("beyond-academics", {
                                            ...beyondAcademicsData,
                                            featuredAchievement: { ...beyondAcademicsData.featuredAchievement, title: e.target.value }
                                        });
                                    }}
                                    className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white font-bold text-oxford text-xs"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-[9px] font-bold text-gray-400 uppercase">Subheading</label>
                                <input
                                    type="text"
                                    value={beyondAcademicsData.featuredAchievement.description}
                                    onChange={(e) => {
                                        updateSectionData("beyond-academics", {
                                            ...beyondAcademicsData,
                                            featuredAchievement: { ...beyondAcademicsData.featuredAchievement, description: e.target.value }
                                        });
                                    }}
                                    className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white text-gray-600 text-xs"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="block text-[9px] font-bold text-gray-400 uppercase">Student Name</label>
                                    <input
                                        type="text"
                                        value={beyondAcademicsData.featuredAchievement.name}
                                        onChange={(e) => {
                                            updateSectionData("beyond-academics", {
                                                ...beyondAcademicsData,
                                                featuredAchievement: { ...beyondAcademicsData.featuredAchievement, name: e.target.value }
                                            });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white font-bold text-oxford text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-[9px] font-bold text-gray-400 uppercase">Class</label>
                                    <input
                                        type="text"
                                        value={beyondAcademicsData.featuredAchievement.cls}
                                        onChange={(e) => {
                                            updateSectionData("beyond-academics", {
                                                ...beyondAcademicsData,
                                                featuredAchievement: { ...beyondAcademicsData.featuredAchievement, cls: e.target.value }
                                            });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white text-gray-600 text-xs"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="block text-[9px] font-bold text-gray-400 uppercase">Badge Text</label>
                                <input
                                    type="text"
                                    value={beyondAcademicsData.featuredAchievement.badge}
                                    onChange={(e) => {
                                        updateSectionData("beyond-academics", {
                                            ...beyondAcademicsData,
                                            featuredAchievement: { ...beyondAcademicsData.featuredAchievement, badge: e.target.value }
                                        });
                                    }}
                                    className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white text-gray-700 text-xs font-bold"
                                />
                            </div>
                        </div>
                    </div>

                    {/* NCC Camps */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <h4 className="font-bold text-oxford text-sm uppercase tracking-tight">NCC Camps History</h4>
                            <button
                                onClick={() => {
                                    const nccCamps = [...beyondAcademicsData.nccCamps, { camp: "New Camp", date: "Duration Details", loc: "Location" }];
                                    updateSectionData("beyond-academics", { ...beyondAcademicsData, nccCamps });
                                }}
                                className="px-3 py-1 bg-sandstone/10 text-oxford rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1 hover:bg-sandstone transition-all"
                            >
                                <Plus size={10} /> Add Camp
                            </button>
                        </div>
                        {beyondAcademicsData.nccCamps.map((camp: any, idx: number) => (
                            <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-2 relative">
                                <button
                                    onClick={() => {
                                        const nccCamps = [...beyondAcademicsData.nccCamps];
                                        nccCamps.splice(idx, 1);
                                        updateSectionData("beyond-academics", { ...beyondAcademicsData, nccCamps });
                                    }}
                                    className="absolute top-2 right-2 p-1 text-red-300 hover:text-red-500 rounded hover:bg-red-50"
                                >
                                    <Trash2 size={12} />
                                </button>
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                    <input
                                        type="text"
                                        value={camp.camp}
                                        onChange={(e) => {
                                            const nccCamps = [...beyondAcademicsData.nccCamps];
                                            nccCamps[idx] = { ...camp, camp: e.target.value };
                                            updateSectionData("beyond-academics", { ...beyondAcademicsData, nccCamps });
                                        }}
                                        className="px-2 py-1 bg-white border border-gray-200 rounded font-bold"
                                        placeholder="Camp"
                                    />
                                    <input
                                        type="text"
                                        value={camp.date}
                                        onChange={(e) => {
                                            const nccCamps = [...beyondAcademicsData.nccCamps];
                                            nccCamps[idx] = { ...camp, date: e.target.value };
                                            updateSectionData("beyond-academics", { ...beyondAcademicsData, nccCamps });
                                        }}
                                        className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-500"
                                        placeholder="Dates"
                                    />
                                    <input
                                        type="text"
                                        value={camp.loc}
                                        onChange={(e) => {
                                            const nccCamps = [...beyondAcademicsData.nccCamps];
                                            nccCamps[idx] = { ...camp, loc: e.target.value };
                                            updateSectionData("beyond-academics", { ...beyondAcademicsData, nccCamps });
                                        }}
                                        className="px-2 py-1 bg-white border border-gray-200 rounded"
                                        placeholder="Location"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* National Sports Achievements */}
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <h4 className="font-bold text-oxford text-sm uppercase tracking-tight">National level Sports</h4>
                            <button
                                onClick={() => {
                                    const sportsNational = [...beyondAcademicsData.sportsNational, { name: "Name", cls: "Class", sport: "Sport", img: "" }];
                                    updateSectionData("beyond-academics", { ...beyondAcademicsData, sportsNational });
                                }}
                                className="px-3 py-1 bg-sandstone/10 text-oxford rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1 hover:bg-sandstone transition-all"
                            >
                                <Plus size={10} /> Add Entry
                            </button>
                        </div>
                        {beyondAcademicsData.sportsNational.map((sport: any, idx: number) => (
                            <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-2 relative">
                                <button
                                    onClick={() => {
                                        const sportsNational = [...beyondAcademicsData.sportsNational];
                                        sportsNational.splice(idx, 1);
                                        updateSectionData("beyond-academics", { ...beyondAcademicsData, sportsNational });
                                    }}
                                    className="absolute top-2 right-2 p-1 text-red-300 hover:text-red-500 rounded hover:bg-red-50"
                                >
                                    <Trash2 size={12} />
                                </button>
                                <ImageUploadField
                                    label="Student Image"
                                    value={sport.img}
                                    onChange={(url) => {
                                        const sportsNational = [...beyondAcademicsData.sportsNational];
                                        sportsNational[idx] = { ...sport, img: url };
                                        updateSectionData("beyond-academics", { ...beyondAcademicsData, sportsNational });
                                    }}
                                    folder="sports/national"
                                />
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                    <input
                                        type="text"
                                        value={sport.name}
                                        onChange={(e) => {
                                            const sportsNational = [...beyondAcademicsData.sportsNational];
                                            sportsNational[idx] = { ...sport, name: e.target.value };
                                            updateSectionData("beyond-academics", { ...beyondAcademicsData, sportsNational });
                                        }}
                                        className="px-2 py-1 bg-white border border-gray-200 rounded font-bold"
                                        placeholder="Name"
                                    />
                                    <input
                                        type="text"
                                        value={sport.cls}
                                        onChange={(e) => {
                                            const sportsNational = [...beyondAcademicsData.sportsNational];
                                            sportsNational[idx] = { ...sport, cls: e.target.value };
                                            updateSectionData("beyond-academics", { ...beyondAcademicsData, sportsNational });
                                        }}
                                        className="px-2 py-1 bg-white border border-gray-200 rounded"
                                        placeholder="Class"
                                    />
                                    <input
                                        type="text"
                                        value={sport.sport}
                                        onChange={(e) => {
                                            const sportsNational = [...beyondAcademicsData.sportsNational];
                                            sportsNational[idx] = { ...sport, sport: e.target.value };
                                            updateSectionData("beyond-academics", { ...beyondAcademicsData, sportsNational });
                                        }}
                                        className="px-2 py-1 bg-white border border-gray-200 rounded"
                                        placeholder="Sport"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* State level Sports */}
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <h4 className="font-bold text-oxford text-sm uppercase tracking-tight">State level Sports</h4>
                        </div>
                        {beyondAcademicsData.sportsState.map((sport: any, idx: number) => (
                            <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-2 font-bold text-xs">
                                <ImageUploadField
                                    label="Student Image"
                                    value={sport.img}
                                    onChange={(url) => {
                                        const sportsState = [...beyondAcademicsData.sportsState];
                                        sportsState[idx] = { ...sport, img: url };
                                        updateSectionData("beyond-academics", { ...beyondAcademicsData, sportsState });
                                    }}
                                    folder="sports/state"
                                />
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                    <input
                                        type="text"
                                        value={sport.name}
                                        onChange={(e) => {
                                            const sportsState = [...beyondAcademicsData.sportsState];
                                            sportsState[idx] = { ...sport, name: e.target.value };
                                            updateSectionData("beyond-academics", { ...beyondAcademicsData, sportsState });
                                        }}
                                        className="px-2 py-1 bg-white border border-gray-200 rounded font-bold"
                                        placeholder="Name"
                                    />
                                    <input
                                        type="text"
                                        value={sport.cls}
                                        onChange={(e) => {
                                            const sportsState = [...beyondAcademicsData.sportsState];
                                            sportsState[idx] = { ...sport, cls: e.target.value };
                                            updateSectionData("beyond-academics", { ...beyondAcademicsData, sportsState });
                                        }}
                                        className="px-2 py-1 bg-white border border-gray-200 rounded"
                                        placeholder="Class"
                                    />
                                    <input
                                        type="text"
                                        value={sport.sport}
                                        onChange={(e) => {
                                            const sportsState = [...beyondAcademicsData.sportsState];
                                            sportsState[idx] = { ...sport, sport: e.target.value };
                                            updateSectionData("beyond-academics", { ...beyondAcademicsData, sportsState });
                                        }}
                                        className="px-2 py-1 bg-white border border-gray-200 rounded"
                                        placeholder="Sport"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Science Achievements */}
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <h4 className="font-bold text-oxford text-sm uppercase tracking-tight">Science Projects Achievements</h4>
                            <button
                                onClick={() => {
                                    const scienceDistrict = [...beyondAcademicsData.scienceDistrict, { name: "Name", cls: "Class", ach: "Achievement", img: "" }];
                                    updateSectionData("beyond-academics", { ...beyondAcademicsData, scienceDistrict });
                                }}
                                className="px-3 py-1 bg-sandstone/10 text-oxford rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1 hover:bg-sandstone transition-all"
                            >
                                <Plus size={10} /> Add Entry
                            </button>
                        </div>
                        {beyondAcademicsData.scienceDistrict.map((sci: any, idx: number) => (
                            <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-2 relative">
                                <button
                                    onClick={() => {
                                        const scienceDistrict = [...beyondAcademicsData.scienceDistrict];
                                        scienceDistrict.splice(idx, 1);
                                        updateSectionData("beyond-academics", { ...beyondAcademicsData, scienceDistrict });
                                    }}
                                    className="absolute top-2 right-2 p-1 text-red-300 hover:text-red-500 rounded hover:bg-red-50"
                                >
                                    <Trash2 size={12} />
                                </button>
                                <ImageUploadField
                                    label="Student Image"
                                    value={sci.img}
                                    onChange={(url) => {
                                        const scienceDistrict = [...beyondAcademicsData.scienceDistrict];
                                        scienceDistrict[idx] = { ...sci, img: url };
                                        updateSectionData("beyond-academics", { ...beyondAcademicsData, scienceDistrict });
                                    }}
                                    folder="science/district"
                                />
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                    <input
                                        type="text"
                                        value={sci.name}
                                        onChange={(e) => {
                                            const scienceDistrict = [...beyondAcademicsData.scienceDistrict];
                                            scienceDistrict[idx] = { ...sci, name: e.target.value };
                                            updateSectionData("beyond-academics", { ...beyondAcademicsData, scienceDistrict });
                                        }}
                                        className="px-2 py-1 bg-white border border-gray-200 rounded font-bold"
                                        placeholder="Name"
                                    />
                                    <input
                                        type="text"
                                        value={sci.cls}
                                        onChange={(e) => {
                                            const scienceDistrict = [...beyondAcademicsData.scienceDistrict];
                                            scienceDistrict[idx] = { ...sci, cls: e.target.value };
                                            updateSectionData("beyond-academics", { ...beyondAcademicsData, scienceDistrict });
                                        }}
                                        className="px-2 py-1 bg-white border border-gray-200 rounded"
                                        placeholder="Class"
                                    />
                                    <input
                                        type="text"
                                        value={sci.ach}
                                        onChange={(e) => {
                                            const scienceDistrict = [...beyondAcademicsData.scienceDistrict];
                                            scienceDistrict[idx] = { ...sci, ach: e.target.value };
                                            updateSectionData("beyond-academics", { ...beyondAcademicsData, scienceDistrict });
                                        }}
                                        className="px-2 py-1 bg-white border border-gray-200 rounded"
                                        placeholder="Achievement"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (sectionId === "what-we-do") {
            return (
                <div className="space-y-6">
                    <h4 className="font-bold text-oxford text-sm uppercase tracking-tight">Campus Videos Grid</h4>
                    {whatWeDoData.videos.map((vid: any, idx: number) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 font-bold text-xs">
                            <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase">Video Title</label>
                                <input
                                    type="text"
                                    value={vid.title}
                                    onChange={(e) => {
                                        const videos = [...whatWeDoData.videos];
                                        videos[idx] = { ...vid, title: e.target.value };
                                        updateSectionData("what-we-do", { ...whatWeDoData, videos });
                                    }}
                                    className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white font-bold text-oxford text-xs"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase">Cloudinary Video MP4 URL</label>
                                <input
                                    type="text"
                                    value={vid.url}
                                    onChange={(e) => {
                                        const videos = [...whatWeDoData.videos];
                                        videos[idx] = { ...vid, url: e.target.value };
                                        updateSectionData("what-we-do", { ...whatWeDoData, videos });
                                    }}
                                    className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white text-gray-600 text-xs"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (sectionId === "faculty-grid") {
            return (
                <div className="space-y-6">
                    <div className="bg-sandstone/10 p-6 rounded-2xl border border-sandstone/20 text-center">
                        <Users className="mx-auto text-sandstone mb-3" size={32} />
                        <h4 className="font-bold text-oxford mb-1">Faculties & Staff Directory</h4>
                        <p className="text-xs text-gray-500 mb-4">Teaching faculty, designations, photos, and sort orders are managed globally.</p>
                        <Link
                            href={`/admin/staff?institution=${instId}`}
                            className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-oxford text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-md"
                        >
                            Open Staff Directory Manager
                            <ExternalLink size={12} />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Staff</span>
                            <span className="px-2.5 py-0.5 bg-gray-100 rounded-full font-bold text-xs text-gray-600">{facultyCount} Members</span>
                        </div>
                        <p className="text-xs text-gray-400 italic">Managing these entries here dynamically updates the list rendered in the preview and on the public school page.</p>
                    </div>
                </div>
            );
        }

        if (sectionId === "fee-structure") {
            return (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold text-oxford text-sm uppercase tracking-tight">Academic Fees Setup</h4>
                        <button
                            onClick={addFeeClass}
                            className="px-3 py-1.5 bg-sandstone/10 text-oxford rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:bg-sandstone transition-all"
                        >
                            <Plus size={12} /> Add Class
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase">Academic Year</label>
                            <input
                                type="text"
                                value={formData.feeStructure?.year || "2026-27"}
                                onChange={(e) => handleFeeChange("year", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 text-xs font-bold text-oxford"
                                placeholder="e.g. 2026-27"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase">Installments</label>
                            <select
                                value={formData.feeStructure?.installments || 2}
                                onChange={(e) => handleFeeChange("installments", parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 text-xs font-bold text-oxford appearance-none"
                            >
                                {[1, 2, 3, 4, 6, 12].map((n) => (
                                    <option key={n} value={n}>{n} Installments</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        {formData.feeStructure?.classes?.map((item: any, idx: number) => (
                            <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 relative group">
                                <button
                                    onClick={() => removeFeeClass(idx)}
                                    className="absolute top-2 right-2 p-1.5 text-red-300 hover:text-red-500 rounded hover:bg-red-50"
                                >
                                    <Trash2 size={14} />
                                </button>
                                <div className="space-y-1">
                                    <label className="block text-[9px] font-bold text-gray-400 uppercase">Medium / Stream Section</label>
                                    <input
                                        type="text"
                                        value={item.section || ""}
                                        onChange={(e) => handleClassFeeChange(idx, "section", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white font-bold text-oxford text-xs"
                                        placeholder="e.g. RBSE Hindi Medium"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-[9px] font-bold text-gray-400 uppercase">Class Name</label>
                                    <input
                                        type="text"
                                        value={item.className || ""}
                                        onChange={(e) => handleClassFeeChange(idx, "className", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white font-bold text-oxford text-xs"
                                        placeholder="e.g. VI – VIII"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase">Total Fee (₹)</label>
                                        <input
                                            type="number"
                                            value={item.totalFee || 0}
                                            onChange={(e) => handleClassFeeChange(idx, "totalFee", parseInt(e.target.value) || 0)}
                                            className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white font-black text-sandstone-dark text-xs"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase">Admission Fee</label>
                                        <input
                                            type="text"
                                            value={item.admissionFee || ""}
                                            onChange={(e) => handleClassFeeChange(idx, "admissionFee", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white text-oxford text-xs font-bold"
                                            placeholder="e.g. ₹2,000"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (sectionId === "uniform-instructions") {
            return (
                <div className="space-y-6">
                    <h4 className="font-bold text-oxford text-sm uppercase tracking-tight border-b border-gray-100 pb-2">Uniform Code</h4>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Class VI to VIII Uniform</label>
                        <textarea
                            value={uniformInstructionsData.class6to8}
                            onChange={(e) => updateSectionData("uniform-instructions", { ...uniformInstructionsData, class6to8: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all text-xs font-medium text-gray-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Class VI to VIII Wed/Sat Uniform</label>
                        <textarea
                            value={uniformInstructionsData.class6to8WedSat}
                            onChange={(e) => updateSectionData("uniform-instructions", { ...uniformInstructionsData, class6to8WedSat: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all text-xs font-medium text-gray-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Class IX to XII Uniform</label>
                        <textarea
                            value={uniformInstructionsData.class9to12}
                            onChange={(e) => updateSectionData("uniform-instructions", { ...uniformInstructionsData, class9to12: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all text-xs font-medium text-gray-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Class IX to XII Wed/Sat Uniform</label>
                        <textarea
                            value={uniformInstructionsData.class9to12WedSat}
                            onChange={(e) => updateSectionData("uniform-instructions", { ...uniformInstructionsData, class9to12WedSat: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all text-xs font-medium text-gray-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Winter Blazer uniform</label>
                        <input
                            type="text"
                            value={uniformInstructionsData.winterCode}
                            onChange={(e) => updateSectionData("uniform-instructions", { ...uniformInstructionsData, winterCode: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all text-xs font-bold text-oxford"
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-oxford text-sm uppercase tracking-tight">General Instructions</h4>
                            <button
                                onClick={() => {
                                    const rules = [...uniformInstructionsData.rules, { title: "New Rule", desc: "Rule detail" }];
                                    updateSectionData("uniform-instructions", { ...uniformInstructionsData, rules });
                                }}
                                className="px-3 py-1 bg-sandstone/10 text-oxford rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:bg-sandstone transition-all"
                            >
                                <Plus size={12} /> Add Rule
                            </button>
                        </div>
                        {uniformInstructionsData.rules.map((rule: any, idx: number) => (
                            <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-2 relative">
                                <button
                                    onClick={() => {
                                        const rules = [...uniformInstructionsData.rules];
                                        rules.splice(idx, 1);
                                        updateSectionData("uniform-instructions", { ...uniformInstructionsData, rules });
                                    }}
                                    className="absolute top-2 right-2 p-1 text-red-300 hover:text-red-500 rounded hover:bg-red-50"
                                >
                                    <Trash2 size={12} />
                                </button>
                                <div className="space-y-1">
                                    <label className="block text-[9px] font-bold text-gray-400 uppercase">Title</label>
                                    <input
                                        type="text"
                                        value={rule.title}
                                        onChange={(e) => {
                                            const rules = [...uniformInstructionsData.rules];
                                            rules[idx] = { ...rule, title: e.target.value };
                                            updateSectionData("uniform-instructions", { ...uniformInstructionsData, rules });
                                        }}
                                        className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded font-bold text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-[9px] font-bold text-gray-400 uppercase">Detail</label>
                                    <input
                                        type="text"
                                        value={rule.desc}
                                        onChange={(e) => {
                                            const rules = [...uniformInstructionsData.rules];
                                            rules[idx] = { ...rule, desc: e.target.value };
                                            updateSectionData("uniform-instructions", { ...uniformInstructionsData, rules });
                                        }}
                                        className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded text-gray-600 text-xs"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (sectionId === "cta") {
            return (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">CTA Title</label>
                        <input
                            type="text"
                            value={ctaData.title}
                            onChange={(e) => updateSectionData("cta", { ...ctaData, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all font-bold text-oxford text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                        <textarea
                            value={ctaData.description}
                            onChange={(e) => updateSectionData("cta", { ...ctaData, description: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all text-sm text-gray-600 font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Phone</label>
                        <input
                            type="text"
                            value={ctaData.phone}
                            onChange={(e) => updateSectionData("cta", { ...ctaData, phone: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all text-sm text-gray-700"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Secondary Visit text</label>
                        <input
                            type="text"
                            value={ctaData.visitText}
                            onChange={(e) => updateSectionData("cta", { ...ctaData, visitText: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all text-sm text-gray-700"
                        />
                    </div>
                </div>
            );
        }

        if (sectionId === "gargi-award") {
            return (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Section Eyebrow</label>
                        <input
                            type="text"
                            value={gargiAwardData.eyebrow}
                            onChange={(e) => updateSectionData("gargi-award", { ...gargiAwardData, eyebrow: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all font-bold text-oxford text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Section Title</label>
                        <input
                            type="text"
                            value={gargiAwardData.title}
                            onChange={(e) => updateSectionData("gargi-award", { ...gargiAwardData, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all font-bold text-oxford text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                        <textarea
                            value={gargiAwardData.description}
                            onChange={(e) => updateSectionData("gargi-award", { ...gargiAwardData, description: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all text-sm text-gray-600 font-medium"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Class X Award</label>
                            <input
                                type="text"
                                value={gargiAwardData.class10Amount}
                                onChange={(e) => updateSectionData("gargi-award", { ...gargiAwardData, class10Amount: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all text-sm font-bold text-oxford"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Class XII Award</label>
                            <input
                                type="text"
                                value={gargiAwardData.class12Amount}
                                onChange={(e) => updateSectionData("gargi-award", { ...gargiAwardData, class12Amount: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all text-sm font-bold text-oxford"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Eligibility Note</label>
                        <input
                            type="text"
                            value={gargiAwardData.eligibility}
                            onChange={(e) => updateSectionData("gargi-award", { ...gargiAwardData, eligibility: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-sandstone outline-none transition-all text-sm text-gray-700"
                        />
                    </div>
                </div>
            );
        }

        return null;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="text-center space-y-4">
                    <RefreshCcw className="animate-spin text-sandstone mx-auto" size={48} />
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Loading Page Editor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
            {/* Top Toolbar */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm select-none">
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/institutions"
                        className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-oxford hover:bg-gray-100 transition-colors shadow-sm shrink-0"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-lg font-black text-oxford uppercase tracking-tight flex items-center gap-2">
                            <School className="text-sandstone" size={20} />
                            {formData.name || "Marudhar Balika Vidyapeeth"}
                        </h1>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Interactive Page Editor</p>
                    </div>
                </div>

                {/* Viewport Toggles */}
                <div className="flex items-center gap-1 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200/50">
                    <button
                        onClick={() => setViewport("desktop")}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                            viewport === "desktop" ? "bg-white text-oxford shadow-md" : "text-gray-400 hover:text-oxford"
                        }`}
                    >
                        Desktop
                    </button>
                    <button
                        onClick={() => setViewport("tablet")}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                            viewport === "tablet" ? "bg-white text-oxford shadow-md" : "text-gray-400 hover:text-oxford"
                        }`}
                    >
                        Tablet
                    </button>
                    <button
                        onClick={() => setViewport("mobile")}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                            viewport === "mobile" ? "bg-white text-oxford shadow-md" : "text-gray-400 hover:text-oxford"
                        }`}
                    >
                        Mobile
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    {saving && (
                        <span className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest">
                            <Loader2 className="animate-spin text-sandstone" size={16} />
                            Saving...
                        </span>
                    )}
                    {message.text && (
                        <span
                            className={`text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider border shadow-sm ${
                                message.type === "success"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                            }`}
                        >
                            {message.text}
                        </span>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2.5 bg-oxford text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-black active:scale-95 transition-all shadow-md flex items-center gap-2 disabled:opacity-75 disabled:pointer-events-none"
                    >
                        <Save size={14} />
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Editor Workspace */}
            <div className="flex-1 overflow-y-auto">
                {/* Visual Preview Container */}
                <div className="p-8 flex justify-center items-start bg-gray-50 select-none min-h-full">
                    <div
                        className={`bg-white shadow-2xl transition-all duration-500 overflow-hidden relative border border-gray-200 rounded-[2rem] flex flex-col ${
                            viewport === "desktop"
                                ? "w-full"
                                : viewport === "tablet"
                                ? "w-[768px] min-h-[1024px]"
                                : "w-[480px] min-h-[850px]"
                        }`}
                    >
                        {/* Interactive Page View Replica */}
                        <div className="w-full bg-white select-text font-devanagari">
                            <StudentModal isOpen={isModalOpen} onClose={closeTopperModal} student={selectedStudent} />

                            {/* Header / Navbar Mockup */}
                            <div className="bg-white border-b border-gray-100 py-4 px-6 flex justify-between items-center text-xs opacity-60 pointer-events-none select-none">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                                        <img src={heroData.logo} alt="logo" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="font-black text-oxford uppercase tracking-wider">{heroData.name}</span>
                                </div>
                                <div className="flex gap-4 font-bold text-gray-500 uppercase tracking-widest">
                                    <span>About Us</span>
                                    <span>Academics</span>
                                    <span>Admission</span>
                                    <span>Infrastructure</span>
                                    <span>Contact</span>
                                </div>
                            </div>

                            {/* Section 1: Hero Section */}
                            {renderAdminSectionWrapper(
                                "hero",
                                "Hero Section & Logo",
                                <section className="relative pt-32 pb-20 px-6 bg-oxford/90 text-white overflow-hidden">
                                    <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sandstone/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                                    <div className="max-w-7xl mx-auto relative z-10">
                                        <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
                                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-sandstone overflow-hidden bg-white shrink-0 shadow-xl">
                                                <img src={heroData.logo} alt="Logo" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <span className="text-sandstone font-bold uppercase tracking-widest text-xs mb-4 block">
                                                    {heroData.affiliation}
                                                </span>
                                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight text-white">
                                                    {heroData.name}
                                                </h1>
                                                <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl">
                                                    {heroData.tagline}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-6 text-xs font-medium text-white/80">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="text-sandstone shrink-0" size={18} />
                                                <span>{heroData.address}</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Phone className="text-sandstone shrink-0" size={18} />
                                                <span className="whitespace-pre-line">{heroData.phone}</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Globe className="text-sandstone shrink-0" size={18} />
                                                <span className="hover:text-sandstone transition-colors">{heroData.webUrl}</span>
                                            </div>
                                        </div>

                                        {formData.prospectus && (
                                            <div className="mt-10">
                                                <span className="px-6 py-2.5 bg-sandstone text-oxford rounded-full font-bold uppercase tracking-wider text-[10px] inline-flex items-center gap-2 shadow-lg">
                                                    <BookOpen size={14} />
                                                    Download Prospectus PDF
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Section 2: Principal Message & Core Values */}
                            {renderAdminSectionWrapper(
                                "principal",
                                "Principal Message & Values",
                                <section className="py-20 px-6 bg-white overflow-hidden">
                                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                                        <div>
                                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4">Leadership</span>
                                            <h2 className="text-3xl md:text-4xl font-bold text-oxford leading-tight">Principal’s Message</h2>
                                            <div className="h-1.5 w-20 bg-sandstone mt-4 rounded-full mb-10" />
                                            <div className="text-gray-600 leading-relaxed text-sm space-y-4 mb-8">
                                                <p className="text-base text-oxford/80 italic font-medium">
                                                    {principalData.quote}
                                                </p>
                                                {principalData.message.split("\n\n").map((para: string, i: number) => (
                                                    <p key={i}>{para}</p>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-sandstone shadow-md">
                                                    <img src={principalData.photo} alt={principalData.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="font-bold text-oxford">
                                                    <p className="text-base">{principalData.name}</p>
                                                    <p className="text-[10px] text-sandstone uppercase tracking-widest font-black">Principal</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative space-y-8">
                                            <div className="bg-oxford/5 rounded-[2rem] p-8 border border-oxford/10 shadow-lg">
                                                <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-[10px] block mb-4 text-center">Our Ethos</span>
                                                <h3 className="text-xl font-bold text-oxford mb-6 flex justify-center items-center gap-2">
                                                    <Star className="text-sandstone fill-sandstone" size={18} />
                                                    Our Core Values
                                                </h3>
                                                <div className="h-0.5 bg-sandstone w-12 mx-auto mb-6 rounded-full" />
                                                <ul className="space-y-4">
                                                    {principalData.coreValues.map((item: any, i: number) => (
                                                        <li key={i} className="flex items-start gap-3 text-gray-700">
                                                            <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-1" />
                                                            <div>
                                                                <span className="font-bold text-oxford text-sm block">{item.title}</span>
                                                                <span className="text-xs text-gray-500">{item.desc}</span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="bg-oxford rounded-2xl p-6 text-white relative overflow-hidden shadow-md">
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-sandstone/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                                <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-sandstone">Our School</h3>
                                                <p className="text-white/80 text-xs leading-relaxed">
                                                    Marudhar Balika Vidyapeeth is known for its reputation and adherence to quality education, State of the Art Infrastructure, and a nurturing environment. We offer a comprehensive curriculum and engage students in traditional and innovative educational methods to empower them for future success.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Section 3: Why Choose Us */}
                            {renderAdminSectionWrapper(
                                "why-choose-us",
                                "Why Choose Us Section",
                                <section className="py-20 px-6 bg-gray-50 overflow-hidden">
                                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                                        <div>
                                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4">Why Choose Us?</span>
                                            <h2 className="text-3xl md:text-4xl font-bold text-oxford leading-tight">{whyChooseUsData.title}</h2>
                                            <div className="h-1.5 w-20 bg-sandstone mt-4 rounded-full mb-10" />
                                            <div className="text-gray-600 leading-relaxed text-sm space-y-4">
                                                {whyChooseUsData.description.split("\n\n").map((para: string, i: number) => (
                                                    <p key={i}>{para}</p>
                                                ))}
                                            </div>
                                            <span className="inline-block mt-8 px-6 py-2.5 bg-oxford text-white rounded-full font-bold uppercase tracking-wider text-[10px]">
                                                Apply for Admission
                                            </span>
                                        </div>
                                        <div className="relative">
                                            <div className="bg-white rounded-[2rem] p-8 border border-oxford/5 shadow-xl">
                                                <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-[10px] block mb-4 text-center">Excellence</span>
                                                <h3 className="text-xl font-bold text-oxford mb-6 flex justify-center items-center gap-2">
                                                    <Star className="text-sandstone fill-sandstone" size={18} />
                                                    Why Vidyawadi?
                                                </h3>
                                                <div className="h-0.5 bg-sandstone w-12 mx-auto mb-6 rounded-full" />
                                                <ul className="space-y-4">
                                                    {whyChooseUsData.bullets.map((item: string, i: number) => (
                                                        <li key={i} className="flex items-center gap-3 text-gray-700 text-xs font-bold">
                                                            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Section 4: Modern Labs & Facilities (Infrastructure) */}
                            {renderAdminSectionWrapper(
                                "infrastructure-labs",
                                "Infrastructure & Labs (" + facilities.length + " entries)",
                                <section className="py-20 px-6 bg-white overflow-hidden">
                                    <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-16">
                                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4">Infrastructure</span>
                                            <h2 className="text-3xl md:text-4xl font-bold text-oxford leading-tight text-center">Modern Labs & Facilities</h2>
                                            <div className="h-1.5 w-20 bg-sandstone mx-auto mt-4 rounded-full mb-8" />
                                            <p className="text-gray-600 max-w-2xl mx-auto text-sm italic">
                                                “Well-equipped laboratories with modern and best technological facilities”
                                            </p>
                                        </div>

                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {loadingFacilities ? (
                                                <div className="col-span-full py-12 text-center text-gray-400 font-bold">
                                                    Loading facilities preview...
                                                </div>
                                            ) : facilities.length === 0 ? (
                                                <div className="col-span-full py-12 text-center text-gray-400 italic text-sm">
                                                    No facilities entries found. Use the Facilities Manager to create new entries.
                                                </div>
                                            ) : (
                                                facilities.map((fac, i) => (
                                                    <div key={fac._id || i} className="group overflow-hidden rounded-2xl bg-white shadow-md border border-oxford/5">
                                                        {fac.img ? (
                                                            <div className="h-56 overflow-hidden relative">
                                                                <img src={fac.img} alt={fac.name} className="w-full h-full object-cover" />
                                                            </div>
                                                        ) : (
                                                            <div className="h-40 bg-gray-50 flex items-center justify-center">
                                                                <Microscope className="text-gray-300" size={48} />
                                                            </div>
                                                        )}
                                                        <div className="p-4 bg-white border-t border-gray-50">
                                                            <h3 className="font-bold text-oxford text-sm truncate">{fac.name}</h3>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Section 5: Academic Results Stats */}
                            {renderAdminSectionWrapper(
                                "results-stats",
                                "Results Stats Cards",
                                <section className="py-20 px-6 bg-gray-50">
                                    <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-16">
                                            <span className="text-sandstone font-bold uppercase tracking-widest text-xs">Academic Excellence</span>
                                            <h2 className="text-2xl md:text-3xl font-bold text-oxford mt-2">Outstanding Results</h2>
                                            <p className="text-gray-500 mt-2 text-xs max-w-xl mx-auto font-medium">
                                                Our students consistently achieve top results at district and state levels, proving our commitment to quality education.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                                            {resultsStatsData.stats.map((stat: any, i: number) => (
                                                <div key={i} className="bg-white p-6 rounded-2xl shadow-md border border-oxford/5 text-center">
                                                    <h3 className="text-sandstone-dark font-black uppercase text-[10px] tracking-[0.2em] mb-2">{stat.class}</h3>
                                                    <p className="text-2xl font-black text-oxford">{stat.score}</p>
                                                    <p className="text-[9px] text-green-600 font-bold mt-1 uppercase tracking-widest">Pass Percentage</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6 text-sm text-white">
                                            <div className="bg-oxford p-6 rounded-xl flex flex-col justify-center items-center text-center">
                                                <Star size={32} className="text-sandstone mb-2" />
                                                <h3 className="text-xl font-bold mb-1">{resultsStatsData.students90Count} Students</h3>
                                                <p className="text-white/80 text-xs">Scored above 90% in board exams in {resultsStatsData.students90Year}</p>
                                            </div>
                                            <div className="bg-oxford p-6 rounded-xl flex flex-col justify-center items-center text-center">
                                                <Medal size={32} className="text-sandstone mb-2" />
                                                <h3 className="text-xl font-bold mb-1">Perfect Scores</h3>
                                                <p className="text-white/80 text-xs">{resultsStatsData.perfectScoresDesc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Section 6: Board Exam Toppers Table */}
                            {renderAdminSectionWrapper(
                                "board-toppers",
                                "Board Toppers (" + resultsCount + " entries)",
                                <section className="py-20 px-6 bg-white overflow-hidden select-none pointer-events-none opacity-90">
                                    <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-10">
                                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4">Meritorious Students</span>
                                            <h2 className="text-3xl md:text-4xl font-bold text-oxford leading-tight text-center">Board Exam Toppers</h2>
                                            <div className="h-1.5 w-20 bg-sandstone mx-auto mt-4 rounded-full mb-6" />
                                        </div>
                                        <div className="pointer-events-none select-none">
                                            <StudentResultsTable institution="marudhar" />
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Section 7: Fee Structure Management */}
                            {renderAdminSectionWrapper(
                                "fee-structure",
                                "Fee Structure Management (" + (formData.feeStructure?.classes?.length || 0) + " classes)",
                                <section className="py-20 px-6 bg-white overflow-hidden border-t border-gray-100 Devanagari font-sans">
                                    <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-12">
                                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4">Investment in Education</span>
                                            <h2 className="text-3xl md:text-4xl font-bold text-oxford leading-tight text-center">
                                                Fee Structure {formData.feeStructure?.year || "2026–27"}
                                            </h2>
                                            <div className="h-1.5 w-20 bg-sandstone mx-auto mt-4 rounded-full" />
                                        </div>

                                        <div className="grid lg:grid-cols-2 gap-12">
                                            {formData.feeStructure?.classes && formData.feeStructure.classes.length > 0 ? (
                                                Object.entries(
                                                    formData.feeStructure.classes.reduce((acc: any, cls: any) => {
                                                        const section = cls.section || "General Details";
                                                        if (!acc[section]) acc[section] = [];
                                                        acc[section].push(cls);
                                                        return acc;
                                                    }, {})
                                                ).map(([section, classes]: [string, any], sectionIdx: number) => (
                                                    <div key={sectionIdx} className="bg-white p-6 rounded-3xl border-2 border-gray-100 hover:border-sandstone/20 shadow-md">
                                                        <h3 className="text-lg font-bold text-oxford mb-4 flex items-center gap-2">
                                                            {sectionIdx % 2 === 0 ? <BookOpen size={16} className="text-sandstone" /> : <Globe size={16} className="text-sandstone" />}
                                                            {section}
                                                        </h3>
                                                        <div className="overflow-x-auto">
                                                            <table className="w-full text-left text-xs">
                                                                <thead>
                                                                    <tr className="border-b border-gray-200">
                                                                        <th className="py-3 font-black uppercase text-[9px] tracking-widest text-gray-400">Class</th>
                                                                        <th className="py-3 font-black uppercase text-[9px] tracking-widest text-gray-400">Installments</th>
                                                                        <th className="py-3 font-black uppercase text-[9px] tracking-widest text-gray-400 text-right">Total Fee</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-gray-100 text-gray-700">
                                                                    {classes.map((row: any, i: number) => {
                                                                        const installments = formData.feeStructure.installments || 2;
                                                                        const installmentAmount = Math.round(row.totalFee / installments);
                                                                        return (
                                                                            <tr key={i} className="hover:bg-sandstone/5 transition-colors">
                                                                                <td className="py-3 font-bold text-oxford">{row.className}</td>
                                                                                <td className="py-3 text-gray-500">
                                                                                    ₹{installmentAmount.toLocaleString()} × {installments}
                                                                                </td>
                                                                                <td className="py-3 text-right font-black text-sandstone-dark">
                                                                                    ₹{row.totalFee.toLocaleString()}
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="mt-4 p-3 bg-gray-50 rounded-xl text-[10px] text-gray-500 font-medium">
                                                            <p><strong>Admission Fee:</strong> {classes.filter((c: any) => c.admissionFee).map((c: any) => `${c.className}: ${c.admissionFee}`).join(" | ")}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-span-full py-12 text-center text-gray-400 italic text-sm">
                                                    No Fee Structure configured in database yet. Add classes in editor panel.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Section 8: Scholarships & Awards */}
                            {renderAdminSectionWrapper(
                                "scholarships",
                                "Scholarships & Awards",
                                <section className="py-20 px-6 bg-gray-50 overflow-hidden">
                                    <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-12">
                                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4">Recognition & Rewards</span>
                                            <h2 className="text-3xl md:text-4xl font-bold text-oxford leading-tight text-center">Scholarships & Awards</h2>
                                            <div className="h-1.5 w-20 bg-sandstone mx-auto mt-4 rounded-full mb-4" />
                                            <p className="text-gray-500 text-xs max-w-xl mx-auto font-medium">
                                                By Balika Shiksha Foundation, Government of Rajasthan (Jaipur)
                                            </p>
                                        </div>

                                        <div className="mb-16">
                                            <div className="text-center mb-8">
                                                <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-[10px] block mb-2">State Level Recognition</span>
                                                <h3 className="text-xl font-bold text-oxford flex justify-center items-center gap-2">
                                                    <Trophy size={18} className="text-sandstone" />
                                                    EWS Merit Promotion Scheme
                                                </h3>
                                            </div>
                                            <p className="text-gray-500 mb-8 max-w-2xl mx-auto text-xs text-center font-medium">
                                                Under this scheme, meritorious students who secured positions in the State Merit List were awarded {scholarshipsData.ewsAmount} each.
                                            </p>

                                            <div className="grid lg:grid-cols-3 gap-6">
                                                <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-oxford/5 shadow-md bg-white">
                                                    <table className="w-full text-left text-xs border-collapse">
                                                        <thead className="bg-oxford text-white font-bold">
                                                            <tr>
                                                                <th className="p-4 uppercase tracking-wider text-[10px]">Student Name</th>
                                                                <th className="p-4 uppercase tracking-wider text-[10px]">Class & Stream</th>
                                                                <th className="p-4 uppercase tracking-wider text-[10px]">Percentage</th>
                                                                <th className="p-4 uppercase tracking-wider text-[10px] text-right">Scholarship</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-100 text-gray-700">
                                                            {scholarshipsData.ewsStudents.map((student: any, i: number) => (
                                                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                                    <td className="p-4 font-bold text-oxford flex items-center gap-3">
                                                                        <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden relative border border-gray-200 shrink-0">
                                                                            <img src={student.img} alt={student.name} className="w-full h-full object-cover" />
                                                                        </div>
                                                                        {student.name}
                                                                    </td>
                                                                    <td className="p-4 font-medium">{student.class}</td>
                                                                    <td className="p-4 font-black">{student.percent}</td>
                                                                    <td className="p-4 text-right font-black text-green-600">{student.amount}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="bg-oxford text-white p-6 rounded-2xl flex flex-col justify-center items-center text-center relative overflow-hidden shadow-md">
                                                    <div className="absolute top-0 right-0 w-24 h-24 bg-sandstone/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                                    <Trophy size={48} className="text-sandstone mb-4" />
                                                    <h4 className="text-3xl font-black mb-1">{scholarshipsData.ewsTotalDistributed}</h4>
                                                    <p className="text-white/80 font-medium text-xs">Total Scholarship Distributed</p>
                                                    <div className="mt-4 px-3 py-1 bg-white/10 rounded-lg text-[9px] font-bold uppercase tracking-wider">
                                                        State Level Recognition
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Section 9: Beyond Academics (NCC/Sports/Science) */}
                            {renderAdminSectionWrapper(
                                "beyond-academics",
                                "Beyond Academics Achievements",
                                <section className="py-20 px-6 bg-[#0d2f5c] text-white overflow-hidden">
                                    <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-12">
                                            <span className="text-[#f2c57c] font-black uppercase tracking-[0.35em] text-xs block mb-3">
                                                Holistic Development
                                            </span>
                                            <h2 className="text-3xl md:text-5xl font-black text-white text-center">
                                                Beyond Academics
                                            </h2>
                                            <div className="h-1.5 w-20 bg-[#f2c57c] mx-auto mt-5 rounded-full" />
                                            <p className="text-white/80 max-w-2xl mx-auto text-sm mt-8">
                                                Fostering discipline, leadership, physical fitness, and a scientific temper through NCC, Sports, and Science events.
                                            </p>
                                        </div>

                                        <div className="rounded-[2rem] border border-white/10 bg-[#173f73] p-6 md:p-8 shadow-2xl">
                                            <div className="grid lg:grid-cols-[360px_minmax(0,1fr)] gap-8 items-center">
                                                <div className="text-center flex flex-col items-center justify-center">
                                                    <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white/15 shadow-xl bg-white/10">
                                                        <img
                                                            src={beyondAcademicsData.featuredAchievement.img}
                                                            alt={beyondAcademicsData.featuredAchievement.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <h3 className="mt-8 text-2xl md:text-3xl font-black text-white">
                                                        {beyondAcademicsData.featuredAchievement.name}
                                                    </h3>
                                                    <p className="mt-2 text-[#f2c57c] text-lg font-medium">
                                                        Class: {beyondAcademicsData.featuredAchievement.cls}
                                                    </p>
                                                    <div className="mt-6 inline-flex px-5 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-black uppercase tracking-wider text-sm">
                                                        {beyondAcademicsData.featuredAchievement.badge}
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="flex items-center gap-2 text-2xl md:text-3xl font-black text-white">
                                                        <Trophy className="text-[#f2c57c]" size={32} />
                                                        {beyondAcademicsData.featuredAchievement.title}
                                                    </h3>
                                                    <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-3xl">
                                                        {beyondAcademicsData.featuredAchievement.description}
                                                    </p>

                                                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 mt-6">
                                                        <table className="w-full text-left text-sm text-white/90">
                                                            <thead className="bg-white/10 font-black uppercase tracking-wider text-[#f2c57c] text-xs">
                                                                <tr>
                                                                    <th className="p-4">Camp Name</th>
                                                                    <th className="p-4">Dates</th>
                                                                    <th className="p-4">Location</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-white/10">
                                                                {beyondAcademicsData.nccCamps.map((row: any, i: number) => (
                                                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                                                        <td className="p-4 font-bold">{row.camp}</td>
                                                                        <td className="p-4">{row.date}</td>
                                                                        <td className="p-4 text-[#f2c57c]">{row.loc}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-10 grid sm:grid-cols-3 gap-4 text-sm text-white/80">
                                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                <p className="text-[#f2c57c] font-black uppercase tracking-wider text-[10px] mb-1">NCC</p>
                                                <p className="font-medium">Editable camp history and achievement spotlight.</p>
                                            </div>
                                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                <p className="text-[#f2c57c] font-black uppercase tracking-wider text-[10px] mb-1">Sports</p>
                                                <p className="font-medium">National and state winners remain editable below.</p>
                                            </div>
                                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                <p className="text-[#f2c57c] font-black uppercase tracking-wider text-[10px] mb-1">Science</p>
                                                <p className="font-medium">Projects and exhibitions are still managed in the editor.</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Section 10: Cloudinary Videos (What We Do) */}
                            {renderAdminSectionWrapper(
                                "what-we-do",
                                "Videos (What We Do)",
                                <section className="py-20 px-6 bg-white overflow-hidden">
                                    <div className="max-w-7xl mx-auto">
                                        <div className="text-center mb-12">
                                            <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-xs block mb-4">Our Activities</span>
                                            <h2 className="text-3xl md:text-4xl font-bold text-oxford leading-tight text-center">What We Do</h2>
                                            <div className="h-1.5 w-20 bg-sandstone mx-auto mt-4 rounded-full" />
                                        </div>

                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {whatWeDoData.videos.map((video: any, i: number) => (
                                                <div key={i} className="group overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-md">
                                                    <div className="h-48 overflow-hidden bg-black flex items-center justify-center">
                                                        <span className="text-white text-xs font-bold uppercase tracking-wider opacity-60">Video Placeholder</span>
                                                    </div>
                                                    <div className="p-3 text-center bg-oxford text-white">
                                                        <h4 className="font-bold text-xs">{video.title}</h4>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Section 11: Dedicated Faculty Grid */}
                            {renderAdminSectionWrapper(
                                "faculty-grid",
                                "Faculty Mentors (" + facultyCount + " members)",
                                <section className="pointer-events-none select-none opacity-90">
                                    <FacultyGrid institution="marudhar" title="Marudhar Balika Vidyapeeth Navigators" />
                                </section>
                            )}

                            {/* Section 12: School Uniform & General Instructions */}
                            {renderAdminSectionWrapper(
                                "uniform-instructions",
                                "School Uniform & General Instructions",
                                <section className="py-20 px-6 bg-white border-t border-gray-100 font-sans">
                                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                                        <div className="bg-oxford/5 rounded-3xl p-8 border border-oxford/10 shadow-sm">
                                            <h3 className="text-xl font-bold text-oxford mb-6 flex items-center gap-2">
                                                <Star className="text-sandstone fill-sandstone" size={18} />
                                                SCHOOL UNIFORM
                                            </h3>
                                            <div className="space-y-6 text-xs text-gray-700 leading-relaxed">
                                                <div>
                                                    <h4 className="font-bold text-oxford text-sm mb-2 border-b border-oxford/10 pb-1">Class VI to VIII (Tunic-shirt)</h4>
                                                    <ul className="space-y-2">
                                                        <li className="flex gap-2 items-start">
                                                            <CheckCircle2 size={14} className="text-green-600 mt-0.5 shrink-0" />
                                                            <span>{uniformInstructionsData.class6to8}</span>
                                                        </li>
                                                        <li className="flex gap-2 items-start text-oxford/80 ml-5 italic">
                                                            <span>{uniformInstructionsData.class6to8WedSat}</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h4 className="font-bold text-oxford text-sm mb-2 border-b border-oxford/10 pb-1">Class IX to XII (Salwar-kurta and Dupatta)</h4>
                                                    <ul className="space-y-2">
                                                        <li className="flex gap-2 items-start">
                                                            <CheckCircle2 size={14} className="text-green-600 mt-0.5 shrink-0" />
                                                            <span>{uniformInstructionsData.class9to12}</span>
                                                        </li>
                                                        <li className="flex gap-2 items-start text-oxford/80 ml-5 italic">
                                                            <span>{uniformInstructionsData.class9to12WedSat}</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="pt-3 border-t border-oxford/10">
                                                    <p className="font-bold text-oxford">Winter Code: <span className="font-normal text-gray-600">{uniformInstructionsData.winterCode}</span></p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6 text-sm">
                                            <h2 className="text-2xl font-bold text-oxford">General Instructions</h2>
                                            <div className="grid gap-4">
                                                {uniformInstructionsData.rules.map((rule: any, i: number) => (
                                                    <div key={i} className="flex gap-3 items-start text-xs">
                                                        <div className="w-6 h-6 rounded-full bg-sandstone/10 flex items-center justify-center shrink-0 mt-0.5">
                                                            <span className="text-oxford font-bold text-[10px]">{i + 1}</span>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-oxford text-sm">{rule.title}</h4>
                                                            <p className="text-gray-500 font-medium">{rule.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Section 13: GARGI Award Recipients */}
                            {renderAdminSectionWrapper(
                                "gargi-award",
                                "GARGI Award Recipients",
                                <section className="mt-20 bg-oxford text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-sandstone/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                                    <div className="relative z-10 text-center">
                                        <span className="text-sandstone-light font-bold uppercase tracking-[0.4em] text-xs block mb-4">
                                            {gargiAwardData.eyebrow}
                                        </span>
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
                                </section>
                            )}

                            {/* Section 14: Call To Action (Admissions) */}
                            {renderAdminSectionWrapper(
                                "cta",
                                "Call To Action (CTA)",
                                <section className="py-16 px-6 bg-sandstone select-none pointer-events-none">
                                    <div className="max-w-4xl mx-auto text-center">
                                        <h2 className="text-3xl font-black text-oxford mb-4 uppercase tracking-tight">
                                            {ctaData.title}
                                        </h2>
                                        <p className="text-base text-oxford/80 font-bold mb-8">
                                            {ctaData.description}
                                        </p>
                                        <div className="flex justify-center gap-3 text-xs">
                                            <span className="px-6 py-3 bg-oxford text-white rounded-full font-bold uppercase tracking-wider shadow-md">
                                                Call: {ctaData.phone}
                                            </span>
                                            <span className="px-6 py-3 bg-white text-oxford rounded-full font-bold uppercase tracking-wider shadow-md">
                                                {ctaData.visitText}
                                            </span>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Footer Mockup */}
                            <div className="bg-oxford text-white/50 text-[10px] py-6 text-center select-none opacity-50 border-t border-white/5 uppercase font-bold tracking-widest">
                                &copy; {new Date().getFullYear()} Vidyawadi. All Rights Reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
