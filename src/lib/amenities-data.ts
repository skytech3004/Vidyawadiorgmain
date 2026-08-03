export type AmenitySeedItem = {
    title: string;
    description: string;
    image: string;
    order: number;
};

export const AMENITY_DEMO_ITEMS: AmenitySeedItem[] = [
    {
        title: "Library",
        description: "Best course books, reference books, and inspirational titles.",
        image: "/lps.jpg",
        order: 0,
    },
    {
        title: "Sports Complex",
        description: "Stadium, athletics track, indoor games, and training spaces.",
        image: "/Hostels.png",
        order: 1,
    },
    {
        title: "Hostel Life",
        description: "Comfortable residential facilities with discipline and care.",
        image: "/hostel.jpg",
        order: 2,
    },
    {
        title: "Transportation",
        description: "Reliable transport for day scholars from nearby areas.",
        image: "/marudhar_balika.jpg",
        order: 3,
    },
    {
        title: "Campus Security",
        description: "CCTV and monitored facilities across the campus.",
        image: "/Hostels_2.png",
        order: 4,
    },
    {
        title: "Food Zone",
        description: "Hygienic mess and canteen services for students.",
        image: "/Cafeteria.png",
        order: 5,
    },
];
