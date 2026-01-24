import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ContactDirectory from "@/components/ContactDirectory";
import React from "react";

export const metadata = {
    title: "Contact Us | Vidyawadi School",
    description: "Get in touch with Vidyawadi School. Find our address, phone numbers, email, and directions to reach our campus."
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-oxford text-white">
            <Navbar />
            {/* Spacer for fixed navbar if necessary, though Navbar seems static or sticky. 
          Adding padding top to ensure content isn't hidden if navbar is fixed. 
          However, usually standard page flow handles it. 
          Given the home page doesn't have extra padding, I'll follow suit but wrap in min-h-screen.
      */}
            <div className="pt-24">
                <ContactForm />
                <ContactDirectory />
            </div>
            <Footer />
        </main>
    );
}
