"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Quote, RefreshCcw } from "lucide-react";

export default function PrincipalMessagePage() {
    const [message, setMessage] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const res = await fetch("/api/messages"); 
                const data = await res.json();
                if (data.success) {
                    const found = data.messages.find((m: any) => m.role === "secretary");
                    setMessage(found);
                }
            } catch (err) {
                console.error("Error fetching message", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMessage();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <RefreshCcw className="animate-spin text-sandstone" size={48} />
            </div>
        );
    }

    if (!message) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <h2 className="text-2xl font-bold text-oxford">Message Not Found</h2>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white font-devanagari">
            <Navbar />
             <div className="relative pt-40 pb-20 bg-oxford overflow-hidden">
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sandstone/20 via-transparent to-transparent" />
                            </div>
            
                            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sandstone font-black uppercase tracking-[0.4em] text-sm mb-4 block"
                                >
                                  A MESSAGE FROM THE PRINCIPAL
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-5xl md:text-7xl font-black text-white"
                                >
PRINCIPAL'S MESSAGE                                </motion.h1>
                            </div>
                        </div>
            
            <section className="pt-40 pb-24 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
                        {/* Photo Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl relative group">
                                {message.photo ? (
                                    <img 
                                        src={message.photo} 
                                        alt={message.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-oxford/80 via-transparent to-transparent opacity-80" />
                                
                                <div className="absolute bottom-10 left-10 text-white">
                                    <h3 className="text-3xl font-black mb-1">{message.title.replace("'s Message", "")}</h3>
                                    <p className="text-sandstone font-bold uppercase tracking-widest text-sm">Vidyawadi Leadership</p>
                                </div>
                            </div>
                            
                            {/* Decorative element */}
                            <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-sandstone/10 rounded-full blur-3xl" />
                        </motion.div>

                        {/* Content Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <Quote size={80} className="text-sandstone/20 absolute -top-10 -left-10 transform -scale-x-100" />
                            
                            <h1 className="text-5xl md:text-7xl font-black text-oxford mb-10 leading-tight relative z-10">
                                {message.title}
                            </h1>
                            
                            <div 
                                className="space-y-6 text-lg text-gray-600 leading-relaxed font-light whitespace-pre-wrap relative z-10 prose prose-lg prose-sandstone max-w-none"
                                dangerouslySetInnerHTML={{ __html: message.content }}
                            />

                            {message.name && (
                                <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-end relative z-10">
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-[#0C2C55]">{message.name}</p>
                                        <p className="text-[#0C2C55]/70 font-bold uppercase tracking-widest text-sm mt-1">
                                            {message.title.replace("'s Message", "")}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
            
            <Footer />
        </main>
    );
}
