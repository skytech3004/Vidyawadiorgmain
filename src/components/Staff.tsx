"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, GraduationCap, Briefcase, Calendar, X, ExternalLink } from "lucide-react";
import Image from "next/image";

interface StaffMember {
    id: number;
    name: string;
    role: string;
    email: string;
    image: string;
    education: string;
    experience: string;
    dob: string;
    previousWork: string;
    bio: string;
}

const staffData: StaffMember[] = [
    {
        id: 1,
        name: "Dr. Arthur Sterling",
        role: "Principal",
        email: "principal@vidyawadi.org",
        image: "/images/hemu_kawar.png",
        education: "Ph.D. in Educational Leadership, Oxford University",
        experience: "25+ Years in Education Management",
        dob: "May 12, 1970",
        previousWork: "St. Xavier's International, Head of Academics",
        bio: "Dr. Sterling is dedicated to fostering a culture of academic excellence and character development at Vidyawadi."
    },
    {
        id: 2,
        name: "Mrs. Elena Gilbert",
        role: "Head of Science",
        email: "elena.g@vidyawadi.org",
        image: "/images/hina_kawar.png",
        education: "M.Sc. in Physics, Stanford University",
        experience: "15 Years Teaching Excellence",
        dob: "August 24, 1985",
        previousWork: "Global Research Institute, Senior Researcher",
        bio: "Mrs. Gilbert brings a practical, research-oriented approach to our science department, inspiring students to innovate."
    },
    {
        id: 3,
        name: "Mr. David Miller",
        role: "Sports Director",
        email: "d.miller@vidyawadi.org",
        image: "/images/kamraw_kawar.png",
        education: "Masters in Sports Science, Loughborough University",
        experience: "10 Years Professional Coaching",
        dob: "November 10, 1992",
        previousWork: "National Athletics Academy, Lead Coach",
        bio: "Mr. Miller believes in the power of sports to build discipline and teamwork among our students."
    }
];

export default function Staff() {
    const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

    return (
        <section id="staff" data-theme="light" className="py-32 px-6 bg-[#fcf9f2] scroll-mt-24">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-sandstone-dark font-bold uppercase tracking-[0.4em] text-sm">Our Educators</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-oxford mt-4">Meet Our Faculty</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {staffData.map((staff, i) => (
                        <motion.div
                            key={staff.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedStaff(staff)}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 shadow-2xl">
                                <Image
                                    src={staff.image}
                                    alt={staff.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-oxford/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                    <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest">
                                        <span>View Profile</span>
                                        <ExternalLink size={16} />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-oxford mb-1">{staff.name}</h3>
                                <p className="text-sandstone-dark font-semibold uppercase tracking-widest text-xs mb-3">{staff.role}</p>
                                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                                    <Mail size={14} />
                                    <span>{staff.email}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Backdrop */}
            <AnimatePresence>
                {selectedStaff && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedStaff(null)}
                            className="fixed inset-0 bg-oxford/90 backdrop-blur-md z-[60] cursor-pointer"
                        />
                        <motion.div
                            layoutId={selectedStaff.id.toString()}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[900px] md:h-[600px] bg-white rounded-[2rem] md:rounded-[3rem] z-[70] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        >
                            <button
                                onClick={() => setSelectedStaff(null)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-white/80 md:bg-white/20 hover:bg-white/40 text-oxford rounded-full backdrop-blur-md z-[80] transition-colors shadow-lg md:shadow-none"
                                title="Close"
                            >
                                <X size={20} className="md:w-6 md:h-6" />
                            </button>

                            {/* Image Side */}
                            <div className="w-full md:w-2/5 h-64 md:h-full relative">
                                <Image
                                    src={selectedStaff.image}
                                    alt={selectedStaff.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-oxford/60 to-transparent md:bg-gradient-to-r" />
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
                                <div className="mb-8">
                                    <span className="text-sandstone-dark font-bold uppercase tracking-widest text-xs">{selectedStaff.role}</span>
                                    <h3 className="text-4xl font-bold text-oxford mt-2">{selectedStaff.name}</h3>
                                </div>

                                <div className="grid gap-8">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-sandstone-light flex items-center justify-center shrink-0">
                                            <GraduationCap className="text-oxford" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-oxford text-sm uppercase tracking-widest mb-1">Education</h4>
                                            <p className="text-gray-600 text-sm">{selectedStaff.education}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-teal-blue/10 flex items-center justify-center shrink-0">
                                            <Briefcase className="text-oxford" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-oxford text-sm uppercase tracking-widest mb-1">Previous Work</h4>
                                            <p className="text-gray-600 text-sm">{selectedStaff.previousWork}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-sandstone-light flex items-center justify-center shrink-0">
                                            <Calendar className="text-oxford" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-oxford text-sm uppercase tracking-widest mb-1">Date of Birth</h4>
                                            <p className="text-gray-600 text-sm">{selectedStaff.dob}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 pt-8 border-t border-oxford">
                                    <p className="text-gray-600 leading-relaxed italic">
                                        "{selectedStaff.bio}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
