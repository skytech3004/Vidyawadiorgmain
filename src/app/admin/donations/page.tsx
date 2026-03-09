"use client";

import React, { useState, useEffect } from "react";
import { Heart, Search, Filter, Loader2, IndianRupee, CreditCard, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface Donation {
    _id: string;
    donorName: string;
    email: string;
    phone: string;
    amount: number;
    type: "one-time" | "monthly";
    razorpayOrderId?: string;
    razorpaySubscriptionId?: string;
    razorpayPaymentId?: string;
    status: "pending" | "successful" | "failed";
    createdAt: string;
}

export default function AdminDonationsPage() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchDonations = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/donations");
            const data = await res.json();
            if (data.success) {
                setDonations(data.data);
            } else {
                toast.error(data.error || "Failed to fetch donations");
            }
        } catch (error) {
            toast.error("Error connecting to server");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    const filteredDonations = donations.filter((d) =>
        d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (d.razorpayPaymentId && d.razorpayPaymentId.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Calculate Totals
    const totalCollected = donations
        .filter(d => d.status === "successful")
        .reduce((sum, d) => sum + d.amount, 0);

    const monthlyDonors = donations.filter(d => d.type === "monthly" && d.status === "successful").length;

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                        <Heart size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-oxford">Donations & Subscriptions</h1>
                        <p className="text-gray-500 text-sm">Manage one-time and recurring monthly contributions</p>
                    </div>
                </div>

                <button
                    onClick={fetchDonations}
                    className="flex items-center gap-2 p-3 text-oxford hover:bg-gray-50 rounded-xl border border-gray-200 transition-colors"
                >
                    <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                    Refresh Data
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                        <IndianRupee size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Collected</p>
                        <h3 className="text-2xl font-black text-oxford">₹{totalCollected.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                        <RefreshCw size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Active Monthly Donors</p>
                        <h3 className="text-2xl font-black text-oxford">{monthlyDonors}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Transactions</p>
                        <h3 className="text-2xl font-black text-oxford">{donations.length}</h3>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or Payment ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-oxford/20 outline-none"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
                                <th className="p-4 text-sm font-semibold text-gray-600">Donor Details</th>
                                <th className="p-4 text-sm font-semibold text-gray-600">Amount</th>
                                <th className="p-4 text-sm font-semibold text-gray-600">Type</th>
                                <th className="p-4 text-sm font-semibold text-gray-600">Payment ID</th>
                                <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Loader2 className="animate-spin mb-4" size={32} />
                                            <p>Loading transactions...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredDonations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Heart className="mb-4 opacity-20" size={48} />
                                            <p>No donations found matching your search.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredDonations.map((donation) => (
                                    <tr key={donation._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 text-sm text-gray-500">
                                            {new Date(donation.createdAt).toLocaleDateString()}<br />
                                            <span className="text-xs">{new Date(donation.createdAt).toLocaleTimeString()}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-oxford">{donation.donorName}</div>
                                            <div className="text-sm text-gray-500">{donation.email}</div>
                                            <div className="text-xs text-gray-400">{donation.phone}</div>
                                        </td>
                                        <td className="p-4 font-bold text-oxford">
                                            ₹{donation.amount.toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${donation.type === "monthly" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                                                }`}>
                                                {donation.type === "monthly" ? "Monthly Auto-pay" : "One-Time"}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-xs font-mono text-gray-500">{donation.razorpayPaymentId || "N/A"}</div>
                                            {donation.razorpaySubscriptionId && (
                                                <div className="text-xs font-mono text-purple-600 mt-1">Sub: {donation.razorpaySubscriptionId}</div>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${donation.status === "successful" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                                    donation.status === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                        "bg-red-50 text-red-700 border-red-200"
                                                }`}>
                                                {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
