import { notFound } from "next/navigation";
import { getPublishedPostBySlug } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPublishedPostBySlug(slug);
    if (!post) return { title: "Post Not Found | Vidyawadi" };
    return {
        title: `${post.title} | Vidyawadi Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPublishedPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white pb-24">
            <Navbar />

            <section id="home" data-theme="light" className="pt-32 pb-16 px-6 bg-slate-50 border-b border-black/5">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sandstone font-bold mb-8 hover:-translate-x-1 transition-transform"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>

                    <div>
                        <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-sandstone" />
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-sandstone" />
                                {post.author}
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl text-oxford mb-8 leading-tight">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    {post.image && (
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 aspect-video">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div
                        className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed prose-headings:text-oxford prose-a:text-sandstone prose-img:rounded-xl"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </section>

            <Footer />
        </main>
    );
}
