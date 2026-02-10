import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionRenderer from "@/components/SectionRenderer";

export const metadata = {
    title: "Co-Curricular Activities | Vidyawadi",
    description: "Holistic development through Fine Arts, Performing Arts, Sports, and Clubs at Vidyawadi.",
};

// Replicating structure based on typical co-curricular pages (Hero -> Intro -> Alternating Features -> Clubs Grid)
const pageContent = [
    {
        _id: "hero",
        type: "hero",
        isVisible: true,
        content: {
            title: "Co-Curricular Activities",
            subtitle: "Learning Beyond The Classroom",
            image: "/images/ART-LAB.png" // Artistic hero image
        }
    },
    {
        _id: "sports-scattered",
        type: "scattered-grid",
        isVisible: true,
        content: {
            title: "Sports",
            description: "At Vidyawadi, the spirit of discipline, teamwork, and excellence is forged on the field. Through expert coaching in volleyball, basketball, football, handball, athletics, and martial arts, students build resilience and leadership.",
            images: [
                "/images/english school/Pragati sirvi.jpg",
                "/images/english school/Janvee soni.jpg",
                "/images/english school/Renuka bhati.jpg",
                "/images/english school/saniya soni.jpg",
                "/images/english school/Tanisha jain.jpg",
                "/images/english school/Gayatri Rathore.jpg",
                "/images/english school/anju kanwar.jpg",
                "/images/english school/Mumal kanwar.jpg",
                "/images/english school/Rudrakshi.jpg",
                "/images/english school/Sofia khan.jpg",
                "/images/english school/Tanisi choudary.jpg",
                "/images/english school/Yajeshvi.jpg",
                "/images/english school/Yuti Sharma.jpg",
                "/images/english school/bhavya sharma.jpg",
                "/images/english school/sakshi deora.jpg",
                "/images/english school/taruna.jpg",
                "/images/english school/Janvee soni.jpg",
                "/images/english school/Pragati sirvi.jpg",
                "/images/english school/Renuka bhati.jpg",
                "/images/english school/saniya soni.jpg"
            ]
        }
    },
    {
        _id: "ncc-carousel",
        type: "side-by-side",
        isVisible: true,
        content: {
            title: "NCC",
            description: "As part of the 10th Haryana Battalion Senior Wing, our NCC unit instills discipline, leadership, and national pride.",
            secondaryDescription: "Through drills, camps, and training, cadets build resilience, responsibility, and the strength to serve society with confidence.",
            images: [
                "/images/english school/Ankur Kunwar.jpg", // NCC Image 1
                "/images/english school/Himanshi Jain.jpg", // NCC Image 2
                "/images/english school/Niral.jpg" // NCC Image 3
            ],
            reverse: false
        }
    },
    {
        _id: "intro",
        type: "text-content",
        isVisible: true,
        content: {
            title: "Holistic Development",
            content: "At Vidyawadi, education is not confined to textbooks. Our co-curricular program ('Learning to Do') is designed to nurture creativity, leadership, and diverse talents. From the strokes of a paintbrush to the rhythm of dance, every activity is an opportunity for self-expression and growth."
        }
    },
    {
        _id: "fine-arts",
        type: "side-by-side",
        isVisible: true,
        content: {
            title: "Fine Arts & Creativity",
            description: "Our Fine Arts studio is a sanctuary for imagination. Students explore various mediums including sketching, painting, sculpture, and craft.",
            secondaryDescription: "Under the guidance of expert mentors, students learn design thinking and visual literacy, transforming their ideas into tangible masterpieces.",
            image: "/images/ART-LAB.png",
            reverse: false
        }
    },
    {
        _id: "clubs-intro",
        type: "text-content",
        isVisible: true,
        content: {
            title: "Elevate Clubs",
            content: "Our 'Elevate' club program empowers students to lead, innovate, and collaborate. These student-driven clubs foster specialized skills and community engagement."
        }
    },
    {
        _id: "clubs-grid",
        type: "grid-features",
        isVisible: true,
        content: {
            title: "Student Clubs",
            description: "A diverse range of clubs catering to every interest.",
            items: [
                {
                    title: "Eco Club",
                    desc: "Sustainability, gardening, and environmental conservation initiatives.",
                    img: "/images/Biology Laboratory.png"
                },
                {
                    title: "Heritage Club",
                    desc: "Celebrating and preserving our rich cultural traditions and history.",
                    img: "/images/english school/344537e3-f907-4894-b74e-6c120656cc03.jpg" // Placeholder for culture
                },
                {
                    title: "IT & Tech Club",
                    desc: "Coding, robotics, and digital literacy for the future.",
                    img: "/images/RS-CIT IT Computer Center.png"
                },
                {
                    title: "Science Club",
                    desc: "Experiments, innovation, and scientific inquiry.",
                    img: "/images/Physics Laboratory.png"
                },
                {
                    title: "Math Club",
                    desc: "Problem solving, logic puzzles, and mathematical exploration.",
                    img: "/images/english school/03090dd8-389a-44db-aad8-6a289e3e6b4f.jpg" // Placeholder classroom
                },
                {
                    title: "Literary Club",
                    desc: "Debate, creative writing, and public speaking.",
                    img: "/images/english school/1c926537-394f-4233-be78-ed6a3c980eb7.jpg" // Placeholder reading
                }
            ]
        }
    },
    {
        _id: "performing-arts",
        type: "side-by-side",
        isVisible: true,
        content: {
            title: "Creative Expressions",
            description: "The stage is where confidence is built. Our performing arts program includes Classical Dance (Kathak), Folk Dance, Music (Vocal & Instrumental), and Dramatics.",
            secondaryDescription: "Regular performances and competitions allow students to showcase their talents and overcome stage fear.",
            image: "/images/english school/0124dc13-c3db-4b91-b92d-58635864d7fb.jpg", // Placeholder for performance
            reverse: true
        }
    },
    {
        _id: "gastronomy",
        type: "side-by-side",
        isVisible: true,
        content: {
            title: "Culinary Arts & Gastronomy",
            description: "Cooking is both an art and a life skill. Our culinary classes teach students nutrition, meal planning, and the joy of cooking diverse cuisines.",
            secondaryDescription: "From baking to traditional recipes, students learn to appreciate food and healthy eating habits.",
            image: "/images/english school/6d8b41a6-cf4a-4f8f-9530-ea59b75c9377.jpg", // Placeholder for cooking/dining
            reverse: false
        }
    },
    {
        _id: "video-highlight",
        type: "video",
        isVisible: true,
        content: {
            title: "Experience the Vibrancy",
            thumbnail: "/images/english school/93b4f897-0aca-4189-a717-16c13f8372d5.jpg" // Placeholder video thumb
        }
    }
];

export default function Page() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <SectionRenderer sections={pageContent} />
            <Footer />
        </main>
    );
}
