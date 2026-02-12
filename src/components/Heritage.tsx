"use client";

import React from "react";
import TimelineSVG from "./TimelineSVG";
import { useTimelineAnimation } from "@/hooks/useTimelineAnimation";

const timelineEvents = [
    {
        year: "1956",
        title: "The Foundation",
        description: "Vidyawadi School established with 50 students and 5 teachers in a small building.",
        side: "left"
    },
    {
        year: "1975",
        title: "Campus Expansion",
        description: "New academic block and science laboratories inaugurated by the Governor.",
        side: "right"
    },
    {
        year: "1985",
        title: "NCC Introduction",
        description: "NCC unit established, promoting discipline, patriotism, and leadership.",
        side: "left"
    },
    {
        year: "1995",
        title: "Equestrian Center",
        description: "First school in the region to introduce a dedicated horse riding program.",
        side: "right"
    },
    {
        year: "2010",
        title: "Digital Revolution",
        description: "Integration of smart classes and a comprehensive digital learning system.",
        side: "left"
    },
    {
        year: "2025",
        title: "65 Years of Excellence",
        description: "Celebrating our diamond jubilee with over 5,000 alumni worldwide.",
        side: "right"
    }
];

export default function Heritage() {
    const { pathRef } = useTimelineAnimation();

    return (
        <section id="heritage" className="py-32 bg-white relative scroll-mt-24 overflow-hidden">
            {/* SVG Timeline Background */}
            <TimelineSVG ref={pathRef} />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <span className="text-teal-blue font-black uppercase tracking-[0.4em] text-sm mb-4 block">
                        Our Journey
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-oxford">Heritage & Legacy</h2>
                </div>

                <div className="relative space-y-32">
                    {timelineEvents.map((event, i) => (
                        <div
                            key={event.year}
                            className={`flex flex-col md:flex-row items-center gap-12 ${event.side === 'right' ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Content Card */}
                            <div className="w-full md:w-1/2">
                                <div className={`
                                    p-10 rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(12,44,85,0.08)] 
                                    border border-oxford/5 relative group hover:shadow-[0_30px_60px_rgba(12,44,85,0.12)] 
                                    transition-all duration-500
                                `}>
                                    <span className="text-6xl font-black text-oxford/5 absolute top-6 right-8">
                                        {event.year}
                                    </span>
                                    <div className="relative z-10">
                                        <span className="text-sm font-black uppercase tracking-[0.2em] text-teal-blue mb-2 block">
                                            {event.year}
                                        </span>
                                        <h3 className="text-2xl font-black text-oxford mb-4">{event.title}</h3>
                                        <p className="text-oxford/70 leading-relaxed text-lg">{event.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Center Point Indicator */}
                            <div className="relative z-20 hidden md:flex items-center justify-center w-8 h-8">
                                <div className="w-4 h-4 rounded-full bg-teal-blue ring-4 ring-white shadow-lg border-2 border-white" />
                            </div>

                            {/* Spacer for alignment */}
                            <div className="md:w-1/2 hidden md:block" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
