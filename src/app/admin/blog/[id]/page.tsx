"use client";

import React, { useEffect, useState } from "react";
import BlogForm from "@/components/admin/BlogForm";
import { Loader2 } from "lucide-react";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { id } = await params;
                const res = await fetch(`/api/admin/blog/${id}`);
                const data = await res.json();
                if (data.success) {
                    setPost(data.post);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [params]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20">
                <Loader2 className="animate-spin text-sandstone" size={32} />
                <p className="text-sm text-gray-500 mt-4">Loading post details...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="text-center p-20">
                <h3 className="text-xl font-bold text-oxford">Post not found</h3>
                <p className="text-gray-500">The post you are trying to edit does not exist.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-oxford uppercase tracking-tight">Edit Post</h2>
                <p className="text-sm text-gray-500">Update the details of "{post.title}".</p>
            </div>
            <BlogForm initialData={post} isEditing />
        </div>
    );
}
