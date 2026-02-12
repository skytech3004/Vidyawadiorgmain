"use client";

import React from "react";
import ResultForm from "@/components/admin/ResultForm";

export default function NewResultPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-oxford uppercase tracking-tight">Add board Result</h2>
                <p className="text-sm text-gray-500">Add a new board exam topper or result highlight.</p>
            </div>
            <ResultForm />
        </div>
    );
}
