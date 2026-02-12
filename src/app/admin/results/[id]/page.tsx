"use client";

import React, { useEffect, useState } from "react";
import ResultForm from "@/components/admin/ResultForm";
import { Loader2 } from "lucide-react";

export default function EditResultPage({ params }: { params: Promise<{ id: string }> }) {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const { id } = await params;
                const res = await fetch(`/api/admin/results/${id}`);
                const data = await res.json();
                if (data.success) {
                    setResult(data.topper);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchResult();
    }, [params]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20">
                <Loader2 className="animate-spin text-sandstone" size={32} />
                <p className="text-sm text-gray-500 mt-4">Loading result details...</p>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="text-center p-20">
                <h3 className="text-xl font-bold text-oxford">Result not found</h3>
                <p className="text-gray-500">The result record you are trying to edit does not exist.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-oxford uppercase tracking-tight">Edit board Result</h2>
                <p className="text-sm text-gray-500">Update the details of "{result.name}".</p>
            </div>
            <ResultForm initialData={result} isEditing />
        </div>
    );
}
