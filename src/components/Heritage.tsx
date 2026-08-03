"use client";

import React, { useEffect, useState } from "react";
import TimelineSVG from "./TimelineSVG";
import { useTimelineAnimation } from "@/hooks/useTimelineAnimation";
import { HERITAGE_DEMO_ITEMS } from "@/lib/heritage-data";

interface HeritageEvent {
    _id?: string;
    year: string;
    title: string;
    description: string;
    side: "left" | "right";
    order: number;
}

const fallbackTimelineEvents: HeritageEvent[] = HERITAGE_DEMO_ITEMS;

export default function Heritage() {
    const { pathRef } = useTimelineAnimation();
    const [timelineEvents, setTimelineEvents] = useState<HeritageEvent[]>(fallbackTimelineEvents);

    useEffect(() => {
        const controller = new AbortController();

        const loadHeritage = async () => {
            try {
                const res = await fetch("/api/heritage", { signal: controller.signal });
                const data = await res.json();

                if (data.success && Array.isArray(data.heritage) && data.heritage.length > 0) {
                    setTimelineEvents(data.heritage);
                }
            } catch (error) {
                if ((error as Error).name !== "AbortError") {
                    console.error("Error loading heritage timeline:", error);
                }
            }
        };

        loadHeritage();

        return () => controller.abort();
    }, []);

    const displayEvents = [...timelineEvents].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

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
                    {displayEvents.map((event) => (
                        <div
                            key={event._id || `${event.year}-${event.title}`}
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
