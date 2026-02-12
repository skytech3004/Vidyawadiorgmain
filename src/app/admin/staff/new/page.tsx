"use client";

import React from "react";
import StaffForm from "@/components/admin/StaffForm";

export default function NewStaffPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-oxford uppercase tracking-tight">Add New Navigator</h2>
                <p className="text-sm text-gray-500">Register a new faculty or staff member to the institution.</p>
            </div>
            <StaffForm />
        </div>
    );
}
