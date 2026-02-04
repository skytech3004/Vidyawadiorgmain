"use client";

import React from "react";
import Link from "next/link";
import { LogOut, Layout } from "lucide-react";
import Image from "next/image";

export default function AdminNavbar() {
    return (
        <nav className="fixed top-0 w-full z-[100] bg-white border-b border-gray-200 h-20 shadow-sm">
            <div className="max-w-[1600px] mx-auto h-full px-6 flex justify-between items-center">
                {/* Logo & Brand */}
                <Link href="/admin/pages" className="flex items-center gap-3">
                    <div className="relative h-12 w-12">
                        <Image
                            src="/111rrrdd.png"
                            alt="Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="font-black text-oxford tracking-wider text-xl">ADMIN PANEL</h1>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vidyawadi CMS</p>
                    </div>
                </Link>

                {/* Simplified Menu */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/admin/pages"
                        className="text-sm font-bold text-gray-500 hover:text-oxford flex items-center gap-2 transition-colors"
                    >
                        <Layout size={18} />
                        All Pages
                    </Link>

                    {/* Logout Button */}
                    <button
                        onClick={() => {
                            // Basic logout logic - clear storage and redirect
                            localStorage.removeItem("adminToken");
                            window.location.href = "/admin/login";
                        }}
                        className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
