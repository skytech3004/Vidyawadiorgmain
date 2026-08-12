/**
 * Shared Marudhar CMS section defaults + parsers.
 * Admin saves section data into Institution schema fields as JSON strings;
 * public page must use the same mapping to display updates.
 */

export const MARUDHAR_DEFAULTS = {
    hero: {
        name: "Marudhar Balika Vidyapeeth",
        tagline: "Empowering Girls Through Education, Excellence & Values",
        affiliation: "Hindi & English Medium Senior Secondary School (RBSE)",
        logo: "/marudhar_balika.jpg",
        address: "Khimel, Station Rani – 306115, District Pali (Rajasthan)",
        phone: "6377204205, 6377204207",
        email: "info@vidyawadi.org",
        webUrl: "www.vidyawadi.org",
    },
    principal: {
        name: "Ms. Priya Sangeeta",
        photo: "/hindi-principal.png",
        quote:
            "“Education is the most powerful weapon which you can use to change the world.” – Nelson Mandela",
        message:
            "Dear Students, Parents and Well-Wishers,\n\nIt gives me immense pleasure to welcome you to Marudhar Balika Vidyapeeth (Sr. Sec.) School, Vidyawadi. Our institution stands as a symbol of dedication, discipline and excellence in girls’ education. We believe that education is not merely the acquisition of knowledge, but the development of character, confidence and compassion.\n\nOur aim is to provide a safe, supportive and inspiring environment where every child can discover her potential and grow into a responsible and capable individual. We focus on academic excellence along with moral values, leadership qualities and life skills. With the support of qualified and committed teachers, we strive to nurture creativity, critical thinking and a spirit of inquiry among our students.\n\nIn this rapidly changing world, we continuously update our teaching methods and integrate digital learning to prepare our students for future challenges. We encourage participation in co-curricular and extracurricular activities to ensure the holistic development of every learner.\n\nI am confident that with the cooperation of parents and the dedication of our staff, we will continue to scale new heights of success and bring pride to our institution.\n\nLet us work together to empower our daughters with knowledge, confidence and strong values so that they may shine brightly in every sphere of life.",
        coreValues: [
            { title: "Discover Yourself", desc: "Explore unique talents and interests." },
            { title: "Be Your Own Light", desc: "Lead with integrity and wisdom." },
            { title: "Make Your Own Path", desc: "Inspire independent thinking and courage." },
        ],
    },
    whyChooseUs: {
        title: "Shaping Bright Futures",
        description:
            "Marudhar Balika Vidyapeeth is a premier girls’ senior secondary school dedicated to academic excellence, character building, and all-round development. Managed by Marudhar Mahila Shikshan Sangh, Vidyawadi, our institution provides quality education in Hindi & English Medium under RBSE.",
        quote: "We believe that educated girls build stronger families, communities, and the nation.",
        bullets: [
            "100% Board Results",
            "Experienced & Dedicated Faculty",
            "Focus on Girls’ Empowerment",
            "Strong Academic & Co-curricular Balance",
            "Safe & Supportive Environment",
            "Proven Record of State & National Achievements",
        ],
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
        perfectScoresDesc: "Multiple students achieved 100/100 marks in subjects",
    },
    scholarships: {
        ewsAmount: "₹15,000",
        ewsTotalDistributed: "₹45,000",
        ewsStudents: [
            {
                name: "Mahima Surana",
                class: "XII Arts",
                percent: "96.00%",
                amount: "₹15,000",
                img: "/images/mahima_surana.png",
            },
            {
                name: "Kirtika Kanwar",
                class: "XII Science",
                percent: "95.80%",
                amount: "₹15,000",
                img: "/images/kitika_kuwar.png",
            },
            {
                name: "Himanshi Kanwar",
                class: "XII Arts",
                percent: "95.40%",
                amount: "₹15,000",
                img: "/images/himanshi_kanwar.png",
            },
        ],
    },
    beyondAcademics: {
        nccCamps: [
            { camp: "ATC", date: "17 May 2026 – 27 Session May 2025", loc: "Jodhpur" },
            { camp: "Pre TSC – I", date: "04 July 2025 – 13 July 2025", loc: "Jodhpur" },
            { camp: "Pre TSC – II", date: "21 July 2025 – 30 July 2025", loc: "Sri Ganganagar" },
            { camp: "IG SC TSC", date: "02 Aug 2025 – 11 Aug 2025", loc: "Udaipur" },
        ],
        sportsNational: [
            { name: "Kanchan Kanwar", cls: "IX A", sport: "Volleyball", img: "/images/kanchan_kawar.png" },
            { name: "Umrao Kanwar", cls: "X B", sport: "Volleyball", img: "/images/kamraw_kawar.png" },
            { name: "Durvisha Solanki", cls: "XII B", sport: "Rifle Shooting", img: "/images/duvisha_solanki.png" },
            { name: "Hemu Kanwar", cls: "XI B", sport: "Wrestling", img: "/images/hemu_kawar.png" },
        ],
        sportsState: [
            { name: "Kanchan Kanwar", cls: "IX A", sport: "Athletics (Shot Put)", img: "/images/kanchan_kawar.png" },
        ],
        scienceDistrict: [
            { name: "Prithvi Charan", cls: "VIII A", ach: "Quiz Competition", img: "/images/puthvi_charn.png" },
            { name: "Vedika Sharma", cls: "XII A", ach: "Smart Fire Safety Device", img: "/images/devika_sharma.png" },
            {
                name: "Garima Kanwar",
                cls: "VIII A",
                ach: "Smart Fire Safety Device Model",
                img: "/images/garima_kawar.png",
            },
            { name: "Heena Kanwar", cls: "VII B", ach: "Geometrical Park Model", img: "/images/hina_kawar.png" },
        ],
    },
    whatWeDo: {
        videos: [
            {
                url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773142123/WhatsApp_Video_2026-03-10_at_12.21.30_r1zahz.mp4",
                title: "Campus Activity",
            },
            {
                url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126080/WhatsApp_Video_2026-03-10_at_12.13.55_1_nmxdbj.mp4",
                title: "Student Life",
            },
            {
                url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126079/WhatsApp_Video_2026-03-10_at_12.13.55_hbh5uh.mp4",
                title: "Learning & Growth",
            },
            {
                url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126078/WhatsApp_Video_2026-03-10_at_12.13.54_zzosza.mp4",
                title: "Extracurriculars",
            },
            {
                url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126078/WhatsApp_Video_2026-03-10_at_12.13.46_tlxxqk.mp4",
                title: "Special Events",
            },
            {
                url: "https://res.cloudinary.com/dmzmfjkgy/video/upload/v1773126078/WhatsApp_Video_2026-03-10_at_12.13.55_2_zjupvk.mp4",
                title: "Sports & Fitness",
            },
        ],
    },
    uniformInstructions: {
        class6to8:
            "Maroon checked shirt and grey tunic, black ribbon or hair band, black shoes and grey socks.",
        class6to8WedSat:
            "Two days a week (Wednesday & Saturday): White skirt and white shirt, white ribbon, black shoes and white socks.",
        class9to12:
            "Maroon checked kurta, white salwar and white dupatta, black ribbon, black shoes and grey socks.",
        class9to12WedSat:
            "Two days a week (Wednesday & Saturday): White salwar Kurta and maroon dupatta, white ribbon, black shoes and white socks.",
        winterCode: "Class VI to XII: Navy Blue Blazer",
        rules: [
            { title: "Regularity", desc: "Minimum 75% attendance is mandatory." },
            { title: "Mobile Phones", desc: "Strictly prohibited on campus." },
            { title: "Bullying", desc: "Zero tolerance policy for any form of harassment." },
            { title: "Hygiene", desc: "Nails trimmed, clean uniform, no makeup/jewellery." },
        ],
    },
    cta: {
        title: "Admissions Open",
        description:
            "Give your daughter the opportunity to grow into a confident, educated, and successful individual.",
        phone: "6377204205",
        visitText: "Visit Campus",
    },
    gargiAward: {
        eyebrow: "Academic Brilliance",
        title: "GARGI Award Recipients",
        description:
            "We are proud to announce that 115 students from our institution have been honored under the GARGI AWARD Scheme for their academic excellence.",
        class10Amount: "₹6,000",
        class12Amount: "₹5,000",
        eligibility: "Eligibility: Students scoring 75% or more marks in board exams.",
    },
} as const;

export type MarudharSectionId =
    | "hero"
    | "principal"
    | "why-choose-us"
    | "results-stats"
    | "scholarships"
    | "beyond-academics"
    | "what-we-do"
    | "uniform-instructions"
    | "gargi-award"
    | "cta";

export function parseJSONField(str: string | undefined | null, subKey: string | null, fallback: any) {
    if (!str) return fallback;
    try {
        const parsed = JSON.parse(str);
        if (subKey) return parsed[subKey] !== undefined ? parsed[subKey] : fallback;
        return parsed;
    } catch {
        return fallback;
    }
}

/** Map Institution document fields → section view models (same as admin editor). */
export function getMarudharSectionData(formData: any, sectionId: MarudharSectionId, defaultData: any) {
    if (!formData) return defaultData;

    if (sectionId === "hero") {
        return {
            name: formData.name || defaultData.name,
            tagline: formData.tagline || defaultData.tagline,
            logo: formData.logo || defaultData.logo,
            affiliation: formData.affiliation || defaultData.affiliation,
            address: formData.contact?.address || defaultData.address,
            phone: formData.contact?.phone || defaultData.phone,
            email: formData.contact?.email || defaultData.email,
            webUrl: formData.contact?.webUrl || defaultData.webUrl,
        };
    }

    if (sectionId === "principal") {
        const parsedAbout = parseJSONField(formData.about?.content, null, {});
        return {
            name: formData.principalMessage?.principalName || defaultData.name,
            photo: formData.principalMessage?.principalPhoto || defaultData.photo,
            quote: formData.principalMessage?.quote || defaultData.quote,
            message: formData.principalMessage?.message || defaultData.message,
            coreValues: parsedAbout.coreValues || defaultData.coreValues,
        };
    }

    if (sectionId === "why-choose-us") {
        const parsed = parseJSONField(formData.about?.content, null, {});
        return {
            title: parsed.whyChooseUsTitle || defaultData.title,
            description: parsed.whyChooseUsDescription || defaultData.description,
            quote: parsed.whyChooseUsQuote || defaultData.quote,
            bullets: parsed.whyChooseUsBullets || defaultData.bullets,
        };
    }

    if (sectionId === "results-stats") {
        const parsed = parseJSONField(formData.mission?.content, null, {});
        return {
            stats: parsed.stats || defaultData.stats,
            students90Count: parsed.students90Count || defaultData.students90Count,
            students90Year: parsed.students90Year || defaultData.students90Year,
            perfectScoresDesc: parsed.perfectScoresDesc || defaultData.perfectScoresDesc,
        };
    }

    if (sectionId === "scholarships") {
        const parsed = parseJSONField(formData.mission?.content, null, {});
        return {
            ewsAmount: parsed.ewsAmount || defaultData.ewsAmount,
            ewsTotalDistributed: parsed.ewsTotalDistributed || defaultData.ewsTotalDistributed,
            ewsStudents: parsed.ewsStudents || defaultData.ewsStudents,
        };
    }

    if (sectionId === "beyond-academics") {
        const parsed = parseJSONField(formData.vision?.content, null, {});
        return {
            nccCamps: parsed.nccCamps || defaultData.nccCamps,
            sportsNational: parsed.sportsNational || defaultData.sportsNational,
            sportsState: parsed.sportsState || defaultData.sportsState,
            scienceDistrict: parsed.scienceDistrict || defaultData.scienceDistrict,
        };
    }

    if (sectionId === "what-we-do") {
        const parsed = parseJSONField(formData.vision?.content, null, {});
        return {
            videos: parsed.videos || defaultData.videos,
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
            rules: parsedRules.rules || defaultData.rules,
        };
    }

    if (sectionId === "cta") {
        const parsed = parseJSONField(formData.rules?.content, null, {});
        return {
            title: parsed.ctaTitle || defaultData.title,
            description: parsed.ctaDescription || defaultData.description,
            phone: parsed.ctaPhone || defaultData.phone,
            visitText: parsed.ctaVisitText || defaultData.visitText,
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
            eligibility: parsed.gargiAward?.eligibility || defaultData.eligibility,
        };
    }

    return defaultData;
}

export function getAllMarudharSections(formData: any) {
    return {
        hero: getMarudharSectionData(formData, "hero", MARUDHAR_DEFAULTS.hero),
        principal: getMarudharSectionData(formData, "principal", MARUDHAR_DEFAULTS.principal),
        whyChooseUs: getMarudharSectionData(formData, "why-choose-us", MARUDHAR_DEFAULTS.whyChooseUs),
        resultsStats: getMarudharSectionData(formData, "results-stats", MARUDHAR_DEFAULTS.resultsStats),
        scholarships: getMarudharSectionData(formData, "scholarships", MARUDHAR_DEFAULTS.scholarships),
        beyondAcademics: getMarudharSectionData(formData, "beyond-academics", MARUDHAR_DEFAULTS.beyondAcademics),
        whatWeDo: getMarudharSectionData(formData, "what-we-do", MARUDHAR_DEFAULTS.whatWeDo),
        uniformInstructions: getMarudharSectionData(
            formData,
            "uniform-instructions",
            MARUDHAR_DEFAULTS.uniformInstructions
        ),
        gargiAward: getMarudharSectionData(formData, "gargi-award", MARUDHAR_DEFAULTS.gargiAward),
        cta: getMarudharSectionData(formData, "cta", MARUDHAR_DEFAULTS.cta),
    };
}
