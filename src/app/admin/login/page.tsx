"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            router.push("/admin/dashboard");
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen bg-oxford/10 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-oxford/5 rounded-full flex items-center justify-center mx-auto mb-4 text-oxford">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-serif text-oxford font-bold">Admin Login</h1>
                    <p className="text-gray-500 text-sm">Sign in to manage website content</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-oxford focus:ring-2 focus:ring-oxford/20 outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-oxford focus:ring-2 focus:ring-oxford/20 outline-none transition-all"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-oxford text-white py-3 rounded-xl font-bold hover:bg-oxford/90 transition-colors shadow-lg shadow-oxford/20"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
