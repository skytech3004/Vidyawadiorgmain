export type HostelBulletItem = {
    text: string;
};

export type HostelFacilityCard = {
    title: string;
    description: string;
    image: string;
};

export type HostelFeeRow = {
    className: string;
    nonAc: string;
    ac: string;
};

export type HostelRuleItem = {
    title: string;
    content: string;
};

export type HostelScholarshipItem = {
    title: string;
    description: string;
};

export type HostelBankItem = {
    label: string;
    value: string;
};

export type HostelPageContent = {
    hero: {
        eyebrow: string;
        titlePrefix: string;
        titleHighlight: string;
        description: string;
        badgeValue: string;
        badgeLabel: string;
        heroImage: string;
        primaryCtaLabel: string;
        primaryCtaHref: string;
        secondaryCtaLabel: string;
        secondaryCtaHref: string;
    };
    about: {
        eyebrow: string;
        title: string;
        description: string;
        featuredPoints: string[];
        careTitle: string;
        careDescription: string;
        image: string;
    };
    facilities: {
        subtitle: string;
        title: string;
        cards: HostelFacilityCard[];
    };
    fees: {
        subtitle: string;
        title: string;
        rows: HostelFeeRow[];
        shortStayTitle: string;
        shortStayDescription: string;
        shortStayItems: HostelBulletItem[];
        cancellationTitle: string;
        cancellationDescription: string;
        cancellationItems: HostelBulletItem[];
    };
    rules: {
        subtitle: string;
        title: string;
        items: HostelRuleItem[];
    };
    scholarships: {
        subtitle: string;
        title: string;
        items: HostelScholarshipItem[];
    };
    banking: {
        subtitle: string;
        title: string;
        items: HostelBankItem[];
        primaryActionLabel: string;
        secondaryActionLabel: string;
    };
};

export const DEFAULT_HOSTEL_PAGE_CONTENT: HostelPageContent = {
    hero: {
        eyebrow: "Education with Sanskar",
        titlePrefix: "Hostel",
        titleHighlight: "Life",
        description: "Students can experience a home away from home where traditional values meet modern excellence.",
        badgeValue: "800+",
        badgeLabel: "Student Capacity",
        heroImage: "/hostel.jpg",
        primaryCtaLabel: "Download Prospectus",
        primaryCtaHref: "/brochures/prospectus.pdf",
        secondaryCtaLabel: "Apply Now",
        secondaryCtaHref: "/apply/hostel"
    },
    about: {
        eyebrow: "About The Hostel",
        title: "Your Second Home for Holistic Growth.",
        description: "Spread across a lush campus, Vidyawadi offers a secure and nurturing residential environment with structured care for students from school through college.",
        featuredPoints: [
            "Safe Campus Environment",
            "International Sports Facilities",
            "Class-wise Accommodation",
            "Warden & Maid Support"
        ],
        careTitle: "Professional Caretaking",
        careDescription: "Each hostel is managed with dedicated wardens and support staff to ensure constant supervision, hygiene, and a caring atmosphere.",
        image: "/f837631c-4bc9-4494-b8f1-fff9b07554d8.jpg"
    },
    facilities: {
        subtitle: "World-Class Amenities",
        title: "Hostel Facilities",
        cards: [
            { title: "Safety & CCTV", description: "Round-the-clock security with full CCTV coverage.", image: "/uploads/mess/security.jpg" },
            { title: "Pure Jain Food", description: "Nutritious satvik meals with 5 servings per day.", image: "/images/jain_meals.png" },
            { title: "RO Drinking Water", description: "Pure and safe RO purified drinking water available 24/7.", image: "/uploads/mess/RO.jpg" },
            { title: "Hot Water", description: "Constant supply of hot water during winter months.", image: "/uploads/mess/HOT.jpg" },
            { title: "Digital Library", description: "24/7 access to educational resources and quiet study space.", image: "/uploads/mess/aa.jpg" },
            { title: "Yoga & Meditation", description: "Daily morning sessions for physical and mental well-being.", image: "/uploads/mess/yoga.jpeg" },
            { title: "Sports Facilities", description: "International standard stadium and sports ground.", image: "/uploads/mess/sport.jpg" },
            { title: "Health Care 24x7", description: "On-campus medical assistance and annual checkups.", image: "/uploads/mess/Health.jpg" },
            { title: "AC / Air Cooled", description: "Well-ventilated rooms with central cooling options.", image: "/uploads/mess/ac.jpg" },
            { title: "Laundry Services", description: "Professional and hassle-free laundry services for all students.", image: "/uploads/mess/laundry.jpg" },
            { title: "Tuck Shop", description: "On-campus tuck shop for all daily essentials and stationery.", image: "/uploads/mess/tuck.jpg" }
        ]
    },
    fees: {
        subtitle: "2026 - 27 Session",
        title: "Hostel Fee Structure",
        rows: [
            { className: "Nursery to Class 5", nonAc: "₹87,500", ac: "₹1,20,500" },
            { className: "Class 6", nonAc: "₹87,500", ac: "₹1,22,500" },
            { className: "Class 7 to 9", nonAc: "₹90,500", ac: "₹1,22,500" },
            { className: "Class 10 to XII", nonAc: "₹95,500", ac: "₹1,22,500" },
            { className: "College (UG/PG)", nonAc: "₹95,500", ac: "₹1,22,500" },
            { className: "B.Ed (1st & 2nd Year)", nonAc: "₹95,500", ac: "-" },
            { className: "B.Ed 3rd Year", nonAc: "₹61,500", ac: "-" },
            { className: "B.Ed 4th Year", nonAc: "₹56,500", ac: "-" }
        ],
        shortStayTitle: "Short Duration Stay",
        shortStayDescription: "The institution offers short-term accommodation facilities as per the following tariff:",
        shortStayItems: [
            { text: "Non-AC: ₹10,000 / month" },
            { text: "AC: ₹12,000 / month" },
            { text: "Minimum duration of stay: 3 months" }
        ],
        cancellationTitle: "Cancellation Policy",
        cancellationDescription: "In the event of cancellation after the payment of the deposit, a deduction of ₹10,000 shall be applicable.",
        cancellationItems: [
            { text: "School cancellation deadline: August 15" },
            { text: "College cancellation deadline: October 30" }
        ]
    },
    rules: {
        subtitle: "Nurturing Discipline",
        title: "Rules & Policies",
        items: [
            {
                title: "Entry Policy",
                content: "An Entry Pass is required for all visitors, which must be signed by the Hostel Incharge and Chief Resident Officer. Parents are welcome to meet their children only on Sundays between 9:30 AM and 6:00 PM."
            },
            {
                title: "Exit Policy",
                content: "Students are permitted to exit the campus only with approved relatives. An Exit Pass is mandatory and requires official approvals from the administration."
            },
            {
                title: "Discipline Rules",
                content: "We maintain a focused environment: mobiles are not allowed for school students. Dress code prohibits shorts, sleeveless clothing, cosmetics, jewellery, cameras, and large sums of currency."
            },
            {
                title: "Holidays & Breaks",
                content: "The hostel follows a specific holiday calendar including Diwali, Winter Break, and Summer Break. Board exam students may be required to stay during winter breaks for preparation."
            }
        ]
    },
    scholarships: {
        subtitle: "Scholarships & Discounts",
        title: "Supportive Fee Benefits",
        items: [
            { title: "Merit Scholarship", description: "10% discount for students securing 95% and above." },
            { title: "Sports Excellence", description: "Special scholarships for national-level sports players." },
            { title: "Sibling Support", description: "10% sibling discount applicable for the third child." }
        ]
    },
    banking: {
        subtitle: "Banking Details",
        title: "Fee Payment Information",
        items: [
            { label: "Account Name", value: "Marudhar Mahila Shikshan Sangh" },
            { label: "Bank & Branch", value: "ICICI Bank - Rani Branch" },
            { label: "A/c Number", value: "684605601184" },
            { label: "IFSC Code", value: "ICIC0006846" }
        ],
        primaryActionLabel: "Call Now",
        secondaryActionLabel: "Bank Card"
    }
};

function asArray<T>(value: unknown): T[] {
    return Array.isArray(value) ? (value as T[]) : [];
}

export function normalizeHostelPageContent(content: any): HostelPageContent {
    const hero = content?.hero ?? {};
    const about = content?.about ?? {};
    const facilities = content?.facilities ?? {};
    const fees = content?.fees ?? {};
    const rules = content?.rules ?? {};
    const scholarships = content?.scholarships ?? {};
    const banking = content?.banking ?? {};

    return {
        hero: {
            ...DEFAULT_HOSTEL_PAGE_CONTENT.hero,
            ...hero
        },
        about: {
            ...DEFAULT_HOSTEL_PAGE_CONTENT.about,
            ...about,
            featuredPoints: asArray<string>(about.featuredPoints).length > 0 ? asArray<string>(about.featuredPoints) : DEFAULT_HOSTEL_PAGE_CONTENT.about.featuredPoints
        },
        facilities: {
            ...DEFAULT_HOSTEL_PAGE_CONTENT.facilities,
            ...facilities,
            cards: asArray<HostelFacilityCard>(facilities.cards).length > 0 ? asArray<HostelFacilityCard>(facilities.cards) : DEFAULT_HOSTEL_PAGE_CONTENT.facilities.cards
        },
        fees: {
            ...DEFAULT_HOSTEL_PAGE_CONTENT.fees,
            ...fees,
            rows: asArray<HostelFeeRow>(fees.rows).length > 0 ? asArray<HostelFeeRow>(fees.rows) : DEFAULT_HOSTEL_PAGE_CONTENT.fees.rows,
            shortStayItems: asArray<HostelBulletItem>(fees.shortStayItems).length > 0 ? asArray<HostelBulletItem>(fees.shortStayItems) : DEFAULT_HOSTEL_PAGE_CONTENT.fees.shortStayItems,
            cancellationItems: asArray<HostelBulletItem>(fees.cancellationItems).length > 0 ? asArray<HostelBulletItem>(fees.cancellationItems) : DEFAULT_HOSTEL_PAGE_CONTENT.fees.cancellationItems
        },
        rules: {
            ...DEFAULT_HOSTEL_PAGE_CONTENT.rules,
            ...rules,
            items: asArray<HostelRuleItem>(rules.items).length > 0 ? asArray<HostelRuleItem>(rules.items) : DEFAULT_HOSTEL_PAGE_CONTENT.rules.items
        },
        scholarships: {
            ...DEFAULT_HOSTEL_PAGE_CONTENT.scholarships,
            ...scholarships,
            items: asArray<HostelScholarshipItem>(scholarships.items).length > 0 ? asArray<HostelScholarshipItem>(scholarships.items) : DEFAULT_HOSTEL_PAGE_CONTENT.scholarships.items
        },
        banking: {
            ...DEFAULT_HOSTEL_PAGE_CONTENT.banking,
            ...banking,
            items: asArray<HostelBankItem>(banking.items).length > 0 ? asArray<HostelBankItem>(banking.items) : DEFAULT_HOSTEL_PAGE_CONTENT.banking.items
        }
    };
}

