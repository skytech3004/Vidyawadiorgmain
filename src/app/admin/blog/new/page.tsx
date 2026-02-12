"use client";

import React from "react";
import BlogForm from "@/components/admin/BlogForm";

export default function NewPostPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-oxford uppercase tracking-tight">Create New Post</h2>
                <p className="text-sm text-gray-500">Share a new story or announcement with the school community.</p>
            </div>
            <BlogForm />
        </div>
    );
}
