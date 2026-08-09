"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import {
    Bold, Italic, Strikethrough, Underline as UnderlineIcon,
    Heading1, Heading2, Heading3,
    List, ListOrdered, Quote, Undo, Redo,
    Link as LinkIcon, Unlink, Image as ImageIcon,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

const MenuBar = ({ editor }: { editor: any }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    if (!editor) return null;

    const btnClass = (isActive: boolean) => cn(
        "p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed",
        isActive && "bg-slate-200 text-oxford shadow-inner"
    );

    const addLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            alert("Image size must be less than 10MB");
            return;
        }

        setUploading(true);
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("folder", "editor");

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: uploadData
            });
            const data = await res.json();

            if (data.success) {
                editor.chain().focus().setImage({ src: data.url }).run();
            } else {
                alert(data.error || "Upload failed");
            }
        } catch (err) {
            console.error("Upload error:", err);
            alert("Network error occurred during upload.");
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-gray-200 rounded-t-xl sticky top-0 z-10">
            {/* Formatting */}
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }} disabled={!editor.can().chain().focus().toggleBold().run()} className={btnClass(editor.isActive("bold"))} title="Bold">
                <Bold size={16} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }} disabled={!editor.can().chain().focus().toggleItalic().run()} className={btnClass(editor.isActive("italic"))} title="Italic">
                <Italic size={16} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleUnderline().run(); }} disabled={!editor.can().chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive("underline"))} title="Underline">
                <UnderlineIcon size={16} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleStrike().run(); }} disabled={!editor.can().chain().focus().toggleStrike().run()} className={btnClass(editor.isActive("strike"))} title="Strikethrough">
                <Strikethrough size={16} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Alignment */}
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('left').run(); }} className={btnClass(editor.isActive({ textAlign: 'left' }))} title="Align Left">
                <AlignLeft size={16} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('center').run(); }} className={btnClass(editor.isActive({ textAlign: 'center' }))} title="Align Center">
                <AlignCenter size={16} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('right').run(); }} className={btnClass(editor.isActive({ textAlign: 'right' }))} title="Align Right">
                <AlignRight size={16} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('justify').run(); }} className={btnClass(editor.isActive({ textAlign: 'justify' }))} title="Justify">
                <AlignJustify size={16} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Headings */}
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run(); }} className={btnClass(editor.isActive("heading", { level: 1 }))} title="Heading 1">
                <Heading1 size={16} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run(); }} className={btnClass(editor.isActive("heading", { level: 2 }))} title="Heading 2">
                <Heading2 size={16} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run(); }} className={btnClass(editor.isActive("heading", { level: 3 }))} title="Heading 3">
                <Heading3 size={16} />
            </button>
            
            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Lists & Quotes */}
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }} className={btnClass(editor.isActive("bulletList"))} title="Bullet List">
                <List size={16} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); }} className={btnClass(editor.isActive("orderedList"))} title="Ordered List">
                <ListOrdered size={16} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run(); }} className={btnClass(editor.isActive("blockquote"))} title="Blockquote">
                <Quote size={16} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Links */}
            <button onClick={(e) => { e.preventDefault(); addLink(); }} className={btnClass(editor.isActive("link"))} title="Insert Link">
                <LinkIcon size={16} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().unsetLink().run(); }} disabled={!editor.isActive('link')} className={btnClass(false)} title="Remove Link">
                <Unlink size={16} />
            </button>

            {/* Image Upload */}
            <button onClick={(e) => { e.preventDefault(); fileInputRef.current?.click(); }} disabled={uploading} className={btnClass(false)} title="Upload Image">
                {uploading ? <Loader2 size={16} className="animate-spin text-[#C8A45D]" /> : <ImageIcon size={16} />}
            </button>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
            />

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* History */}
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().undo().run(); }} disabled={!editor.can().chain().focus().undo().run()} className={btnClass(false)} title="Undo">
                <Undo size={16} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().redo().run(); }} disabled={!editor.can().chain().focus().redo().run()} className={btnClass(false)} title="Redo">
                <Redo size={16} />
            </button>
        </div>
    );
};

interface TiptapEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeightClass?: string;
}

export default function TiptapEditor({
    value,
    onChange,
    placeholder,
    minHeightClass = "min-h-[250px]",
}: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-xl max-w-full h-auto shadow-md my-6 mx-auto block',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline hover:text-blue-800 transition-colors cursor-pointer',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify'],
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: `prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none p-6 ${minHeightClass} max-w-none text-slate-700`,
            },
        },
    });

    // Sync external value changes (like initial load) if they differ
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    return (
        <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col relative focus-within:ring-2 focus-within:ring-[#C8A45D]/30 focus-within:border-[#C8A45D] transition-all">
            <MenuBar editor={editor} />
            <div className="flex-1 bg-white cursor-text" onClick={() => editor?.commands.focus()}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
