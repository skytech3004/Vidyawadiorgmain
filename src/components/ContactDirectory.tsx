"use client";

import React, { useEffect, useState } from "react";
import { Phone, Mail, Loader2 } from "lucide-react";
import { IMPORTANT_CONTACT_DEFAULTS } from "@/lib/important-contacts-data";

interface ContactEntry {
    _id?: string;
    office: string;
    phone?: string;
    email?: string;
}

export default function ContactDirectory() {
    const [contacts, setContacts] = useState<ContactEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch("/api/important-contacts");
                const data = await res.json();
                if (data.success && data.contacts?.length > 0) {
                    setContacts(data.contacts);
                } else {
                    setContacts(IMPORTANT_CONTACT_DEFAULTS);
                }
            } catch {
                setContacts(IMPORTANT_CONTACT_DEFAULTS);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return (
        <section className="py-20 px-6 bg-oxford-dark border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-sandstone mb-4">Important Contacts</h2>
                    <p className="text-white/60">Direct lines to our departments and administration</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 className="animate-spin text-sandstone" size={40} />
                    </div>
                ) : (
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
                                {contacts.map((contact, index) => (
                                    <tr key={contact._id || index} className="hover:bg-white/5 transition-colors">
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
                )}
            </div>
        </section>
    );
}
