export type HomeFacilitySeedItem = {
    title: string;
    description: string;
    icon: string;
    theme: string;
    features: string[];
    image: string;
    order: number;
};

export type HomeAwardSeedItem = {
    title: string;
    organization: string;
    year: string;
    images: string[];
    order: number;
};

export const HOME_FACILITY_DEMO_ITEMS: HomeFacilitySeedItem[] = [
    {
        title: "NCC Training Camp",
        description: "Discipline-based military training including rifle shooting, teamwork, and leadership development under expert supervision.",
        icon: "NC",
        image: "/images/uploads/vidywadi_main/shooting.jpeg",
        theme: "bg-oxford",
        features: ["Rifle Shooting", "Discipline & Leadership", "Field Training"],
        order: 0,
    },
    {
        title: "NCC Training",
        description: "Building discipline and leadership through Army and Navy wings.",
        icon: "NT",
        image: "/images/english school/a9fa45d8-e14b-4e5f-b4c0-64cc9c49e22f.jpg",
        theme: "bg-sandstone",
        features: ["Army Wing", "Navy Wing"],
        order: 1,
    },
    {
        title: "Science Labs",
        description: "Advanced physics, chemistry, and biology labs for practical excellence.",
        icon: "SL",
        image: "/Chemistry Laboratory.jpg",
        theme: "bg-teal-blue",
        features: ["Physics", "Chemistry", "Biology"],
        order: 2,
    },
    {
        title: "Digital Library",
        description: "10,000+ books and global digital resources for research.",
        icon: "DL",
        image: "/uploads/mess/aa.jpg",
        theme: "bg-oxford-dark",
        features: ["Digital Access", "Offline Study"],
        order: 3,
    },
    {
        title: "Skill Center",
        description: "Life skills training including Baking, Culinary, and Grooming.",
        icon: "SC",
        image: "/skill.jpg",
        theme: "bg-sandstone-dark",
        features: ["Baking", "Culinary", "Grooming"],
        order: 4,
    },
    {
        title: "Arts & Culture",
        description: "Creative spaces for music, dance, and fine arts excellence.",
        icon: "AC",
        image: "/Music Laboratory.jpg",
        theme: "bg-oxford",
        features: ["Music", "Dance", "Art"],
        order: 5,
    },
    {
        title: "Self Defense",
        description: "Empowering girls with Karate and advanced self-defense techniques.",
        icon: "SD",
        image: "/karate.png",
        theme: "bg-teal-blue",
        features: ["Karate", "Safety Drills"],
        order: 6,
    },
    {
        title: "Hostel Life",
        description: "Safe and nurturing environment with 24/7 care and security.",
        icon: "HL",
        image: "/hostel.jpg",
        theme: "bg-sandstone",
        features: ["24/7 Care", "Security"],
        order: 7,
    },
    {
        title: "NSS",
        description: "National Service Scheme for community service and leadership development.",
        icon: "NS",
        image: "/NSS.jpg",
        theme: "bg-sandstone",
        features: ["Community Service", "Leadership"],
        order: 8,
    },
];

export const HOME_AWARD_DEMO_ITEMS: HomeAwardSeedItem[] = [
    {
        title: "Awarded by Marwad Ratna",
        organization: "Excellence in Education",
        year: "2025",
        images: ["/award1.jpg", "/award.jpg", "/award3.jpg"],
        order: 0,
    },
];
