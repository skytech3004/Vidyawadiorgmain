import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import LeelaDeviContent from "./LeelaDeviContent";

export const metadata = {
    title: "Leela Devi Parasmal Sancheti Kanya Mahavidyalaya | Vidyawadi",
    description: "A Premier Women’s College in Western Rajasthan. Affiliated to JNVU and NAAC B++ Accredited."
};

export default function LeelaDeviCollege() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <LeelaDeviContent />
            <Footer />
        </main>
    );
}
