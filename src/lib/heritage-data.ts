export type HeritageSeedItem = {
    year: string;
    title: string;
    description: string;
    side: "left" | "right";
    order: number;
};

export const HERITAGE_DEMO_ITEMS: HeritageSeedItem[] = [
    {
        year: "1956",
        title: "The Foundation",
        description: "Vidyawadi School was established with 5 students, and Subhadra ma'am was the only teacher in the beginning, in a small building.",
        side: "left",
        order: 0,
    },
    {
        year: "1975",
        title: "Campus Expansion",
        description: "New academic block and science laboratories inaugurated by the Governor.",
        side: "right",
        order: 1,
    },
    {
        year: "1985",
        title: "NCC Introduction",
        description: "NCC unit established, promoting discipline, patriotism, and leadership.",
        side: "left",
        order: 2,
    },
    {
        year: "1995",
        title: "Equestrian Center",
        description: "First school in the region to introduce a dedicated horse riding program.",
        side: "right",
        order: 3,
    },
    {
        year: "2010",
        title: "Digital Revolution",
        description: "Integration of smart classes and a comprehensive digital learning system.",
        side: "left",
        order: 4,
    },
    {
        year: "2026",
        title: "70 Years of Excellence",
        description: "Celebrating our platinum jubilee with over 5,000 alumni worldwide.",
        side: "right",
        order: 5,
    },
];
