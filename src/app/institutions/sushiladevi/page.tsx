import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SPSContent from "./SPSContent";

export const metadata = {
    title: "Sushiladevi Prakashraj Modi Primary School | Vidyawadi",
    description: "A premier primary school for girls in Pali, Rajasthan, focusing on foundational excellence.",
};

export default function Page() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <SPSContent />
            <Footer />
        </main>
    );
}
