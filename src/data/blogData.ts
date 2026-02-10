export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    image: string;
    content: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: "annual-sports-day-2024",
        title: "Vidyawadi Annual Sports Day 2024",
        excerpt: "A day filled with energy, sportsmanship, and incredible talent as students competed across multiple disciplines.",
        date: "2024-02-05",
        author: "Principal's Office",
        image: "/images/english school/Janvee soni.jpg",
        content: `
            Our Annual Sports Day was a grand success this year. The event started with a magnificent march past by the four houses. 
            The spirit of competition was high as students participated in track and field events, basketball, volleyball, and martial arts.
            
            We were honored to have distinguished guests who inspired our young athletes. The day concluded with the trophy presentation to the winning house, 
            celebrating not just the winners but every participant who showed grit and determination.
        `
    },
    {
        slug: "excellence-in-ncc-training",
        title: "Excellence in NCC Training",
        excerpt: "Our cadets continue to show dedication and leadership during the recent regional NCC camp.",
        date: "2024-01-20",
        author: "NCC Coordinator",
        image: "/images/english school/Ankur Kunwar.jpg",
        content: `
            The recent NCC camp was a transformative experience for our senior wing cadets. Under the guidance of the 10th Haryana Battalion, 
            our students excelled in drills, navigation, and community service activities.
            
            Two of our cadets were specially recognized for their leadership qualities and discipline. This training continues to be a 
            cornerstone of building character and national pride at Vidyawadi.
        `
    },
    {
        slug: "science-exhibition-2023",
        title: "Innovations at the Science Exhibition",
        excerpt: "Students transformed our labs into hubs of innovation during the annual science fair.",
        date: "2024-01-10",
        author: "Science Department",
        image: "/images/Biology Laboratory.png",
        content: `
            The Science Exhibition titled 'Innova 2023' showcased the creative and analytical minds of our students. 
            From sustainable energy models to complex robotics, the variety of projects was astounding.
            
            The Biology lab featured fascinating exhibits on plant physiology, while the Physics lab demonstrated principles of electromagnetism through 
            interactive models. It was heartening to see students explain complex scientific concepts with such clarity and enthusiasm.
        `
    }
];
