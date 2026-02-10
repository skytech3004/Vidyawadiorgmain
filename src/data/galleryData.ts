export interface GalleryAlbum {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    date: string;
    images: string[];
}

export const galleryAlbums: GalleryAlbum[] = [
    {
        id: "campus-life",
        title: "Campus Life",
        description: "Explore our state-of-the-art facilities and vibrant campus atmosphere.",
        coverImage: "/images/ART-LAB.png",
        date: "2024-02-10",
        images: [
            "/images/ART-LAB.png",
            "/images/Biology Laboratory.png",
            "/images/Chemistry Laboratory.png",
            "/images/Geography Laboratory.png",
            "/images/Physics Laboratory.png",
            "/images/RS-CIT IT Computer Center.png",
        ]
    },
    {
        id: "sports-achievements",
        title: "Sports & Athletics",
        description: "Highlights from our various sporting events and student achievements on the field.",
        coverImage: "/images/english school/Janvee soni.jpg",
        date: "2024-01-25",
        images: [
            "/images/english school/Janvee soni.jpg",
            "/images/english school/Renuka bhati.jpg",
            "/images/english school/saniya soni.jpg",
            "/images/english school/Tanisha jain.jpg",
            "/images/english school/Gayatri Rathore.jpg",
            "/images/english school/Anju kanwar.jpg",
            "/images/english school/Mumal kanwar.jpg",
            "/images/english school/pragati sirvi.jpg",
            "/images/english school/sakshi deora.jpg",
        ]
    },
    {
        id: "cultural-events",
        title: "Cultural Events",
        description: "Celebrating diversity and talent through our annual cultural programs and festivals.",
        coverImage: "/images/english school/Ankur Kunwar.jpg",
        date: "2023-12-15",
        images: [
            "/images/english school/Ankur Kunwar.jpg",
            "/images/english school/Himanshi Jain.jpg",
            "/images/english school/Manjari vaishnav.jpg",
            "/images/english school/Rudrakshi.jpg",
            "/images/english school/Sofia khan.jpg",
            "/images/english school/Tanisi choudary.jpg",
            "/images/english school/Yajeshvi.jpg",
            "/images/english school/Yuti Sharma.jpg",
        ]
    }
];
