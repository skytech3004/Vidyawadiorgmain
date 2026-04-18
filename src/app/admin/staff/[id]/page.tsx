"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import FacultyForm from "@/components/admin/FacultyForm";
import { ArrowLeft, RefreshCcw, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EditFacultyPage() {
    const { id } = useParams();
    const router = useRouter();
    const [member, setMember] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (id) {
            fetchMember();
        }
    }, [id]);

    const fetchMember = async () => {
        try {
            const res = await fetch(`/api/admin/staff/${id}`);
            const data = await res.json();
            if (data.success) {
                setMember(data.member);
            }
        } catch (error) {
            console.error("Failed to fetch member", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this faculty member?")) return;
        
        setDeleting(true);
        try {
            const res = await fetch(`/api/admin/staff/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                router.back();
            }
        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <RefreshCcw className="animate-spin text-sandstone" size={48} />
            </div>
        );
    }

    if (!member) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-oxford">Member not found</h2>
                <Link href="/admin/institutions" className="text-sandstone font-bold hover:underline mt-4 block">Return to Institutions</Link>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-oxford hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-oxford uppercase tracking-tight">Edit Faculty</h1>
                        <p className="text-sm text-gray-500 font-medium">Update record for {member.name}</p>
                    </div>
                </div>

                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-all"
                >
                    <Trash2 size={18} />
                    {deleting ? "Deleting..." : "Delete Member"}
                </button>
            </div>

            <FacultyForm initialData={member} isEditing={true} />
        </div>
    );
}
