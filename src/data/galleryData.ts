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
        id: "student-leaders",
        title: "Student Leaders",
        description: "Meet our exceptional student council and leaders who inspire excellence every day.",
        coverImage: "https://lnmubed.ac.in/home/images/user.jpg",
        date: "2024-02-10",
        images: [
            "https://lnmubed.ac.in/home/images/user.jpg",
            "https://lnmubed.ac.in/home/images/user.jpg",
            "https://lnmubed.ac.in/home/images/user.jpg",
            "https://lnmubed.ac.in/home/images/user.jpg",
            "https://lnmubed.ac.in/home/images/user.jpg",
        ]
    },
    {
        id: "academic-achievers",
        title: "Academic Achievers",
        description: "Celebrating our top performers who have demonstrated outstanding academic brilliant.",
        coverImage: "https://lnmubed.ac.in/home/images/user.jpg",
        date: "2024-01-25",
        images: [
            "https://lnmubed.ac.in/home/images/user.jpg",
            "https://lnmubed.ac.in/home/images/user.jpg",
            "https://lnmubed.ac.in/home/images/user.jpg",
            "https://lnmubed.ac.in/home/images/user.jpg",
        ]
    },
    {
        id: "creative-minds",
        title: "Creative Minds",
        description: "Showcasing the artistic talents and creative expressions of our gifted students.",
        coverImage: "https://lnmubed.ac.in/home/images/user.jpg",
        date: "2023-12-15",
        images: [
            "https://lnmubed.ac.in/home/images/user.jpg",
            "https://lnmubed.ac.in/home/images/user.jpg",
            "https://lnmubed.ac.in/home/images/user.jpg",
            "https://lnmubed.ac.in/home/images/user.jpg",
        ]
    }
];
