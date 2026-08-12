"use client";

import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import ResultManagerPage from "./ResultManagerClient";

export default function ResultsPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center p-20">
                <Loader2 className="animate-spin text-sandstone" size={32} />
                <p className="text-sm text-gray-500 mt-4">Loading results...</p>
            </div>
        }>
            <ResultManagerPage />
        </Suspense>
    );
}
