"use client";

import React, { useEffect, useState } from "react";
import StaffForm from "@/components/admin/StaffForm";
import { Loader2 } from "lucide-react";

export default function EditStaffPage({ params }: { params: Promise<{ id: string }> }) {
    const [member, setMember] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const { id } = await params;
                const res = await fetch(`/api/admin/staff/${id}`);
                const data = await res.json();
                if (data.success) {
                    setMember(data.member);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMember();
    }, [params]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20">
                <Loader2 className="animate-spin text-sandstone" size={32} />
                <p className="text-sm text-gray-500 mt-4">Loading navigator details...</p>
            </div>
        );
    }

    if (!member) {
        return (
            <div className="text-center p-20">
                <h3 className="text-xl font-bold text-oxford">Member not found</h3>
                <p className="text-gray-500">The faculty member you are trying to edit does not exist.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-oxford uppercase tracking-tight">Edit Navigator</h2>
                <p className="text-sm text-gray-500">Update the details of "{member.name}".</p>
            </div>
            <StaffForm initialData={member} isEditing />
        </div>
    );
}
