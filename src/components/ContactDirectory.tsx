"use client";

import React from "react";
import { Phone, Mail } from "lucide-react";

interface ContactEntry {
    office: string;
    phone?: string;
    email?: string;
}

const contactData: ContactEntry[] = [
    { office: "Secretary - MMSS", email: "kailashkaveria@yahoo.com" },
    { office: "CEO", phone: "6377204201", email: "ceo@vidyawadi.org" },
    { office: "Principal College", phone: "6377204203", email: "principal.college@vidyawadi.org" },
    { office: "Principal Hindi School", phone: "6377204205", email: "priya.sangeeta@vidyawadi.org" },
    { office: "Principal English School", phone: "6377203204", email: "principal_lps@vidyawadi.org" },
    { office: "Chief Resident Officer", phone: "6377204202", email: "alka.choudhary@vidyawadi.org" },
    { office: "Hostel Assistant", phone: "6377204218" },
    { office: "Accounts Department", phone: "6377204209", email: "brajmohan.agarawal@vidyawadi.org" },
    { office: "Admin Department", phone: "6377204206", email: "administration.manager@vidyawadi.org" },
    { office: "College Office", phone: "6377204208", email: "deepak.sisodiya@vidyawadi.org" },
    { office: "Hindi School Office", phone: "6377204207", email: "himmatsingh.rathore@vidyawadi.org" },
    { office: "English School Office", phone: "6377204212", email: "niranjan.gehlot@vidyawadi.org" },
];

export default function ContactDirectory() {
    return (
        <section className="py-20 px-6 bg-oxford-dark border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-sandstone mb-4">Important Contacts</h2>
                    <p className="text-white/60">Direct lines to our departments and administration</p>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/10 text-sandstone uppercase text-sm tracking-widest border-b border-white/10">
                                <th className="p-6 font-bold">Name of Office</th>
                                <th className="p-6 font-bold">Phone No.</th>
                                <th className="p-6 font-bold">Email</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-white/80">
                            {contactData.map((contact, index) => (
                                <tr key={index} className="hover:bg-white/5 transition-colors">
                                    <td className="p-6 font-medium text-white">{contact.office}</td>
                                    <td className="p-6 whitespace-nowrap">
                                        {contact.phone ? (
                                            <a href={`tel:+91${contact.phone}`} className="flex items-center gap-2 hover:text-sandstone transition-colors group">
                                                <Phone size={16} className="text-white/40 group-hover:text-sandstone" />
                                                <span>{contact.phone}</span>
                                            </a>
                                        ) : (
                                            <span className="text-white/20">-</span>
                                        )}
                                    </td>
                                    <td className="p-6">
                                        {contact.email ? (
                                            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-sandstone transition-colors group break-all md:break-normal">
                                                <Mail size={16} className="text-white/40 group-hover:text-sandstone shrink-0" />
                                                <span>{contact.email}</span>
                                            </a>
                                        ) : (
                                            <span className="text-white/20">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
