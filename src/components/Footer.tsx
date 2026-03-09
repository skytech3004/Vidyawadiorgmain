"use client";

import React from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer data-theme="dark" className="bg-oxford-dark text-white py-20 px-6 border-t border-white/5">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
                    <div className="md:col-span-2 lg:col-span-4 space-y-6 flex flex-col md:block items-center text-center md:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <img src="/white-logo.png" alt="Logo" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
                            <h3 className="text-xl sm:text-2xl font-bold text-sandstone leading-tight">Marudhar Mahila Shikshan Sangh<br className="hidden sm:block" /> Vidyawadi</h3>
                        </div>
                        <p className="text-white/60 leading-relaxed max-w-sm mx-auto md:mx-0">
                            Excellence in education since 1956. Nurturing the next generation of leaders with values and vision.
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <a href="https://www.facebook.com/profile.php?id=61583590541462" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sandstone hover:text-oxford transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="https://www.instagram.com/vidyawadiofficial" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sandstone hover:text-oxford transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="https://www.linkedin.com/company/111560973/admin/page-posts/published/" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sandstone hover:text-oxford transition-all">
                                <Linkedin size={18} />
                            </a>
                            <a href="https://www.youtube.com/@Vidyawadi-MMSS" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sandstone hover:text-oxford transition-all">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest">Quick Links</h4>
                        <ul className="space-y-4">
                            {["About Us", "Admissions", "Facilities", "Online Donation", "Contact"].map((link) => (
                                <li key={link}>
                                    <a
                                        href={link === "Online Donation" ? "/donate" : `/#${link.toLowerCase().replace(" ", "-")}`}
                                        className="text-white/60 hover:text-sandstone transition-colors font-medium"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest">Contact Info</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-4 text-white/60">
                                <MapPin className="text-sandstone shrink-0" size={20} />
                                <span className="text-sm">
                                    VIDYAWADI<br />

                                    Post - Vidyawadi, Khimel, St. Rani,<br />
                                    Tehsil- Bali, Dist. Pali,<br />
                                    State - Rajasthan (India)<br />
                                    PIN – 306115
                                </span>
                            </li>
                            <li className="flex gap-4 text-white/60">
                                <Phone className="text-sandstone shrink-0" size={20} />
                                <span className="text-sm">+91 6377204218</span>
                            </li>
                            <li className="flex gap-4 text-white/60">
                                <Mail className="text-sandstone shrink-0" size={20} />
                                <span className="text-sm">marudharmahila@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest">Newsletter</h4>
                        <p className="text-white/60 mb-6 text-sm">Stay updated with our latest news and events.</p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-sandstone"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-sandstone font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
                    <p>&copy; 2026 Vidyawadi. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
