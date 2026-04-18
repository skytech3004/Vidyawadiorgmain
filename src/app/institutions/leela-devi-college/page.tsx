import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import LeelaDeviContent from "./LeelaDeviContent";

export const metadata = {
    title: "Leela Devi Parasmal Sancheti Kanya Mahavidyalaya | Vidyawadi",
    description: "A Premier Women’s College in Western Rajasthan. Affiliated to JNVU and NAAC B++ Accredited."
};

export const revalidate = 3600; // Cache the fetched data for 1 hour

export default async function LeelaDeviCollege() {
    let collegeFaculty = [];
    try {
        // Fetch from internal institutional database
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/staff?institution=college`, {
            next: { revalidate: 3600 }
        });
        if (res.ok) {
            const data = await res.json();
            collegeFaculty = data.faculty || [];
        } else {
            console.error("Failed to fetch college faculty, status:", res.status);
        }
    } catch (err) {
        console.error("Error fetching college faculty:", err);
    }

    return (
        <main className="min-h-screen">
            <Navbar />
            <LeelaDeviContent initialCollegeFaculty={collegeFaculty} />
            <Footer />
        </main>
    );
}
