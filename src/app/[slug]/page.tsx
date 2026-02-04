import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Page from "@/models/Page";
import Section from "@/models/Section";
import SectionRenderer from "@/components/SectionRenderer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Force dynamic rendering to always show freshest content from CMS
export const dynamic = 'force-dynamic';

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    await dbConnect();

    // 1. Fetch Page
    const page = await Page.findOne({ slug, status: 'published' });
    if (!page) {
        // Check if it's a draft but user is authenticated? 
        // For now, only published pages
        notFound();
    }

    // 2. Fetch Sections
    const sections = await Section.find({ pageId: page._id, isVisible: true }).sort({ order: 1 });

    return (
        <main className="min-h-screen">
            <Navbar />

            <SectionRenderer sections={sections} />

            <Footer />
        </main>
    );
}

// Optional: Generate Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    await dbConnect();
    const page = await Page.findOne({ slug });

    if (!page) return { title: 'Not Found' };

    return {
        title: page.metadata?.metaTitle || page.title,
        description: page.metadata?.metaDescription,
        openGraph: {
            title: page.metadata?.metaTitle || page.title,
            description: page.metadata?.metaDescription,
            images: [page.metadata?.ogImage].filter(Boolean)
        }
    };
}
