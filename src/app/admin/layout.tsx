"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Image as ImageIcon,
    Users,
    Trophy,
    MessageSquare,
    LogOut,
    ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const sidebarItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon },
    { name: "Blog Manager", href: "/admin/blog", icon: FileText },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Faculty / Staff", href: "/admin/staff", icon: Users },
    { name: "Result Highlights", href: "/admin/results", icon: Trophy },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    if (pathname === "/admin/login") return <>{children}</>;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-72 bg-oxford text-white fixed h-full z-20 hidden lg:block overflow-hidden">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-sandstone rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-oxford font-black text-xl">V</span>
                        </div>
                        <div>
                            <h2 className="font-black text-sm uppercase tracking-widest">Admin Panel</h2>
                            <p className="text-[10px] text-white/40 font-bold uppercase">Vidyawadi School</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {sidebarItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                                        ? "bg-sandstone text-oxford font-bold shadow-lg"
                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <item.icon size={20} className={isActive ? "text-oxford" : "group-hover:text-sandstone transition-colors"} />
                                    <span className="text-sm">{item.name}</span>
                                    {isActive && <motion.div layoutId="sidebar-active" className="ml-auto"><ChevronRight size={14} /></motion.div>}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="absolute bottom-8 left-0 w-full px-8">
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:bg-red-500/10 hover:text-red-400 w-full transition-all group">
                        <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                        <span className="text-sm font-bold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 min-h-screen relative p-8">
                <header className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-2xl font-black text-oxford uppercase tracking-tight">
                            {sidebarItems.find(item => pathname.startsWith(item.href))?.name || "Dashboard"}
                        </h1>
                        <p className="text-sm text-gray-500">Welcome back, Administrator</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-sandstone/10 border border-sandstone flex items-center justify-center text-sandstone font-black">
                            A
                        </div>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}
