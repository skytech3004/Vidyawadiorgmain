"use client";

import React, { useState, useEffect } from "react";
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
    ChevronRight,
    School,
    Bed,
    Settings,
    Heart,
    Menu,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Admissions", href: "/admin/admissions", icon: FileText },
    { name: "Institutions", href: "/admin/institutions", icon: School },
    { name: "Blog Manager", href: "/admin/blog", icon: FileText },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Handle body scroll
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    if (pathname === "/admin/login") return <>{children}</>;

    return (
        <div className="flex min-h-screen bg-gray-50/50 selection:bg-sandstone/30">
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-oxford/40 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 w-72 bg-gradient-to-b from-oxford to-oxford-dark text-white h-full z-50 flex flex-col border-r border-white/5 shadow-2xl lg:shadow-none transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                <div className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-sandstone to-sandstone-dark rounded-xl flex items-center justify-center shadow-lg ring-1 ring-white/20">
                            <span className="text-oxford font-black text-xl drop-shadow-sm">V</span>
                        </div>
                        <div>
                            <h2 className="font-black text-sm uppercase tracking-widest text-white drop-shadow-md">Admin Panel</h2>
                            <p className="text-[10px] text-sandstone font-bold uppercase tracking-wider">Vidyawadi School</p>
                        </div>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 pb-6 no-scrollbar">
                    <nav className="space-y-2">
                        {sidebarItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all group overflow-hidden ${isActive
                                        ? "text-oxford font-bold shadow-lg"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="sidebar-active"
                                            className="absolute inset-0 bg-gradient-to-r from-sandstone to-sandstone-dark"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <div className="relative z-10 flex items-center gap-3 w-full">
                                        <item.icon size={20} className={isActive ? "text-oxford drop-shadow-sm" : "group-hover:text-sandstone transition-colors"} />
                                        <span className="text-sm tracking-wide">{item.name}</span>
                                        {isActive && <ChevronRight size={16} className="ml-auto opacity-70" />}
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-6 border-t border-white/5 bg-oxford-dark/50 backdrop-blur-md">
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:bg-red-500/10 hover:text-red-400 w-full transition-all group">
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold tracking-wide">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 min-h-screen relative flex flex-col w-full max-w-[100vw]">
                {/* Header (Sticky Mobile & Desktop) */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 lg:px-10 py-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-oxford hover:bg-gray-100 transition-colors border border-gray-100 shadow-sm"
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <h1 className="text-xl lg:text-2xl font-black text-oxford uppercase tracking-tight drop-shadow-sm">
                                {sidebarItems.find(item => pathname.startsWith(item.href))?.name || "Dashboard"}
                            </h1>
                            <p className="text-xs lg:text-sm text-gray-500/80 font-medium hidden sm:block">Welcome back, Administrator</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-sandstone/20 to-sandstone/5 border border-sandstone flex items-center justify-center text-oxford font-black shadow-inner ring-2 ring-white cursor-pointer hover:scale-105 transition-transform">
                            A
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-4 sm:p-6 lg:p-10 w-full mx-auto pb-24 overflow-x-hidden">
                    {children}
                </div>
            </main>
        </div>
    );
}
