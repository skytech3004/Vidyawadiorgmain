"use client";

import Link from "next/link";
import { LogOut, Layout, FileText, Settings, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
    };

    // We can still keep shortcuts to important pages if we want,
    // but the main goal is to use the dynamic "Manage Pages" link.
    const sections = [
        {
            name: "Page Manager",
            href: "/admin/pages",
            icon: <FileText />,
            desc: "Add, edit, or delete any page on the website. Full control over all sections.",
            color: "bg-blue-50 text-blue-600"
        },
        {
            name: "Admissions",
            href: "/admin/edit/admissions",
            icon: <Settings />,
            desc: "Quick access to admission settings and forms.",
            color: "bg-amber-50 text-amber-600"
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Layout className="text-oxford" />
                    <h1 className="text-xl font-bold text-oxford">Vidyawadi Admin</h1>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                >
                    <LogOut size={16} /> Sign Out
                </button>
            </header>

            <main className="max-w-7xl mx-auto p-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-serif text-oxford mb-2">Dashboard</h2>
                    <p className="text-gray-600">Select a page to edit its content.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sections.map((section) => (
                        <div key={section.href} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 ${section.color} rounded-xl flex items-center justify-center mb-4`}>
                                {section.icon}
                            </div>
                            <h3 className="text-xl font-bold text-oxford mb-2">{section.name}</h3>
                            <p className="text-sm text-gray-500 mb-6">{section.desc}</p>

                            <Link
                                href={section.href}
                                className="inline-block bg-oxford text-white text-center px-8 py-2.5 rounded-lg text-sm font-bold hover:bg-oxford/90 transition-colors"
                            >
                                Open {section.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
