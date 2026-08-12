"use client";

import React from "react";
import ResultForm from "@/components/admin/ResultForm";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function NewResultPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-oxford uppercase tracking-tight">Add Result</h2>
                <p className="text-sm text-gray-500">Add a board exam topper or perfect score achiever.</p>
            </div>
            <Suspense fallback={
                <div className="flex flex-col items-center justify-center p-20">
                    <Loader2 className="animate-spin text-sandstone" size={32} />
                    <p className="text-sm text-gray-500 mt-4">Loading form...</p>
                </div>
            }>
                <ResultForm />
            </Suspense>
        </div>
    );
}
