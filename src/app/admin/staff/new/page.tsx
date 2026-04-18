"use client";

import React from "react";
import FacultyForm from "@/components/admin/FacultyForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewFacultyPage() {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/institutions"
                    className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-oxford hover:bg-gray-50 transition-colors shadow-sm"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-oxford uppercase tracking-tight">Add New Faculty</h1>
                    <p className="text-sm text-gray-500 font-medium">Create a new staff record for the institution.</p>
                </div>
            </div>

            <FacultyForm />
        </div>
    );
}
