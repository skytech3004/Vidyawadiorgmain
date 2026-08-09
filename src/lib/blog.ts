import { unstable_noStore as noStore } from "next/cache";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export type PublicBlogPost = {
    _id: string;
    title: string;
    slug: string;
    content: string;
    category: string;
    image: string;
    author: string;
    excerpt: string;
    date: string;
};

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function toExcerpt(content: string, max = 180): string {
    const text = stripHtml(content || "");
    if (text.length <= max) return text;
    return `${text.slice(0, max).trim()}…`;
}

function mapPost(post: any): PublicBlogPost {
    return {
        _id: String(post._id),
        title: post.title,
        slug: post.slug,
        content: post.content || "",
        category: post.category || "General",
        image: post.image || "/images/english school/Janvee soni.jpg",
        author: post.author || "Admin",
        excerpt: toExcerpt(post.content || ""),
        date: post.createdAt
            ? new Date(post.createdAt).toISOString()
            : new Date().toISOString(),
    };
}

export async function getPublishedPosts(): Promise<PublicBlogPost[]> {
    try {
        noStore();
        await dbConnect();
        const posts = await Post.find({ published: true }).sort({ createdAt: -1 }).lean();
        return posts.map(mapPost);
    } catch (error) {
        console.error("Error loading blog posts:", error);
        return [];
    }
}

export async function getPublishedPostBySlug(slug: string): Promise<PublicBlogPost | null> {
    try {
        noStore();
        await dbConnect();
        const post = await Post.findOne({ slug, published: true }).lean();
        if (!post) return null;
        return mapPost(post);
    } catch (error) {
        console.error("Error loading blog post:", error);
        return null;
    }
}
