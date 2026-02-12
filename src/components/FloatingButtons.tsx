"use client";

import React from "react";
import { Info } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingButtons() {
    const whatsappNumber = "+916377204218";
    const whatsappMessage = "Hello Vidyawadi, I would like to inquire about admissions.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const scrollToContact = () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* WhatsApp Floating Button */}
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                className="fixed bottom-6 right-6 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-2xl transition-all hover:bg-[#20ba5a] flex items-center justify-center w-14 h-14"
                title="Chat with us on WhatsApp"
            >
                <i className="fa-brands fa-whatsapp text-3xl" />
            </motion.a>

            {/* Inquire Now Sticky Button (Left Side) */}
            <motion.button
                onClick={scrollToContact}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ x: 5 }}
                className="fixed left-0 top-1/2 -translate-y-1/2 z-[90] bg-oxford text-white px-4 py-8 rounded-r-2xl shadow-2xl flex flex-col items-center gap-4 group transition-all hover:bg-sandstone hover:text-oxford"
            >
                <Info size={24} className="group-hover:rotate-12 transition-transform" />
                <span className="[writing-mode:vertical-lr] rotate-180 font-black uppercase tracking-[0.2em] text-sm">
                    Inquire Now
                </span>
            </motion.button>
        </>
    );
}
