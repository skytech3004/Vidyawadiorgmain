import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LPSContent from "./LPSContent";

export const metadata = {
    title: "Leeladevi Parasmal Sancheti English Medium Sr. Sec. School | Vidyawadi",
    description: "A premier residential school for girls in Pali, Rajasthan, affiliated with CBSE.",
};

export default function Page() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <LPSContent />
            <Footer />
        </main>
    );
}
