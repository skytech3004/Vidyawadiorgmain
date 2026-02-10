import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionRenderer from "@/components/SectionRenderer";

export const metadata = {
    title: "Hostel & Residential Life | Vidyawadi",
    description: "Your home away from home — a safe, caring, and structured environment for girls.",
};

const pageContent = [
    {
        _id: "h-hero",
        type: "hero",
        isVisible: true,
        content: {
            title: "Your Home Away From Home",
            subtitle: "Safe, Caring, and Structured",
            image: "/hostel.jpg"
        }
    },
    {
        _id: "h-intro",
        type: "text-content",
        isVisible: true,
        content: {
            variant: "orange",
            content: "At Vidyawadi, over 300 girls from across India live in a safe, caring, and structured environment — fostering growth, independence, and lifelong friendships."
        }
    },
    {
        _id: "h-amenities",
        type: "tabbed-features",
        isVisible: true,
        content: {
            title: "Amenities",
            description: "Explore thoughtfully designed spaces and services that ensure comfort, safety, and well-being, making our boarding experience truly exceptional.",
            items: [
                {
                    id: "ac",
                    label: "Central AC with Cooling & Heating",
                    desc: "Spacious, well-ventilated gurukul hostel buildings equipped with central cooling and heating ensure year-round comfort.",
                    image: "/images/Hostel-AC-Units.png"
                },
                {
                    id: "wifi",
                    label: "Dormitories with Wi-Fi",
                    desc: "Modern dormitories providing a perfect balance of privacy and community living, with high-speed internet access.",
                    image: "/hostel.jpg"
                },
                {
                    id: "safety",
                    label: "Safety Surveillance",
                    desc: "Round-the-clock security and CCTV monitoring to ensure the safest environment for our girls.",
                    image: "/images/RS-CIT IT Computer Center.png"
                },
                {
                    id: "laundry",
                    label: "Dedicated Laundry Facilities",
                    desc: "Professional laundry services to ensure hygiene and convenience for all residents.",
                    image: "/hostel.jpg"
                },
                {
                    id: "phone",
                    label: "Phone Access Points",
                    desc: "Scheduled access to supervised communication points to stay connected with family.",
                    image: "/images/RS-CIT IT Computer Center.png"
                }
            ]
        }
    },
    {
        _id: "h-chetna",
        type: "card-grid",
        isVisible: true,
        content: {
            title: "Chetna Prabha",
            description: "Our signature initiative dedicated to empowering young minds through holistic development and self-awareness.",
            subtitle: "At The Heart",
            items: [
                {
                    label: "Emotional Well-being",
                    image: "/images/english school/63680e76-2f23-4f80-a9ee-96a18fdd6348.jpg"
                },
                {
                    label: "Social Well-being",
                    image: "/images/english school/a40160d0-ce25-4bad-818d-e2e729dc47f4.jpg"
                },
                {
                    label: "Cognitive Well-being",
                    image: "/images/english school/9bd3aa78-5651-4fab-b2c0-c30cde54fb2b.jpg"
                },
                {
                    label: "Ethics & Integrity",
                    image: "/images/english school/9e95aa2a-d491-4f6a-ab87-97894a9529f0.jpg"
                }
            ]
        }
    },
    {
        _id: "h-pillars",
        type: "tabbed-features",
        isVisible: true,
        content: {
            title: "Pillars of Care",
            description: "From daily care to guided learning and weekend fun, we support your child's growth — both inside and outside the classroom.",
            items: [
                {
                    id: "sanrakshika",
                    label: "Sanrakshika",
                    desc: "Compassionate protectors, our Sanrakshikas are dedicated female caretakers who ensure safety, structure, and discipline — offering protective care.",
                    image: "/images/english school/principle.jpg" // Representative of staff
                },
                {
                    id: "samposhini",
                    label: "Samposhini",
                    desc: "Dedicated mentors focused on nurturing character and personality development through personalized attention.",
                    image: "/images/english school/Manjari vaishnav.jpg"
                },
                {
                    id: "marg-darshini",
                    label: "Marg Darshini",
                    desc: "Experienced counselors guiding students through academic and personal challenges with empathy.",
                    image: "/images/english school/8082040d-2b0f-4663-8929-06d95c671d6d.jpg"
                },
                {
                    id: "tutoring",
                    label: "Tutoring",
                    desc: "Supervised evening study hours with faculty assistance to ensure academic excellence.",
                    image: "/images/english school/03090dd8-389a-44db-aad8-6a289e3e6b4f.jpg"
                },
                {
                    id: "leisure",
                    label: "Weekend Leisure",
                    desc: "A rich array of weekend activities including movies, outings, and workshops for holistic relaxation.",
                    image: "/images/english school/f72554e5-5522-4ba1-b864-8ba789ad417a.jpg"
                }
            ]
        }
    },
    {
        _id: "h-happiness",
        type: "card-grid",
        isVisible: true,
        content: {
            title: "Happiness Council",
            description: "Rooted in kindness and led by students, the Happiness Council helps make hostel life joyful, caring, and full of connection.",
            items: [
                {
                    label: "Health Committee",
                    image: "/images/english school/0ac13476-81c8-4eae-8395-d344f3d98053.jpg"
                },
                {
                    label: "Discipline Committee",
                    image: "/images/english school/c6a0bd22-14dd-407d-b513-807cd2bf7d0b.jpg"
                },
                {
                    label: "Fun Committee",
                    image: "/images/english school/92cf25c5-cac9-4f4d-82c9-33460563e46f.jpg"
                },
                {
                    label: "Mess Committee",
                    image: "/images/english school/6d8b41a6-cf4a-4f8f-9530-ea59b75c9377.jpg"
                }
            ]
        }
    },
    {
        _id: "h-food",
        type: "side-by-side",
        isVisible: true,
        content: {
            title: "Nutritious Satvik Food",
            description: "Fresh, farm-to-plate meals grown on campus nourish the body and mind. Dining together on the floor fosters humility, gratitude, and a strong sense of community.",
            secondaryDescription: "Meals align with the lunar calendar, with a specially curated menu on Poornima, Ekadashi, and Amavasya.",
            variant: "gray",
            images: [
                "/images/english school/6d8b41a6-cf4a-4f8f-9530-ea59b75c9377.jpg", // Mess
                "/hostel.jpg"
            ],
            reverse: false
        }
    },
    {
        _id: "h-cta",
        type: "cta-section",
        isVisible: true,
        content: {
            title: "Experience the Vidyawadi Life",
            description: "Join a community that feels like home and prepares you for the world.",
            primaryLabel: "Inquire Now",
            secondaryLabel: "Visit Campus"
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
