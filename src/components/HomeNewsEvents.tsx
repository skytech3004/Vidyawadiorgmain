"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, MapPin, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export default function HomeNewsEvents() {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Calendar Logic (Simplified)
    const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const calendarGrid = [];
    // Empty slots for prev month
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarGrid.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }
    // Days
    for (let i = 1; i <= daysInMonth; i++) {
        const isToday = i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
        calendarGrid.push(
            <div key={`day-${i}`} className="h-10 w-10 flex items-center justify-center text-sm font-medium relative cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
                <span className={isToday ? "bg-oxford text-white h-8 w-8 flex items-center justify-center rounded-full" : "text-gray-700"}>{i}</span>
            </div>
        );
    }

    // Mock Events Data
    const events = [
        { id: 1, title: "Annual Sports Meet", date: "January 10th, 2026 at 5:00 PM", location: "School Ground", image: "/events/sports.jpg", avatarFn: "S" },
        { id: 2, title: "Science Exhibition", date: "January 12th, 2026 at 3:00 PM", location: "Auditorium", image: "/events/science.jpg", avatarFn: "M" },
        { id: 3, title: "Parent Teacher Meeting", date: "January 14th, 2026 at 10:00 AM", location: "Main Hall", image: "/events/ptm.jpg", avatarFn: "D" },
        { id: 4, title: "Cultural Fest", date: "January 20th, 2026 at 5:00 PM", location: "Open Air Theatre", image: "/events/cultural.jpg", avatarFn: "L" },
        { id: 5, title: "Alumni Meet", date: "February 5th, 2026 at 12:00 PM", location: "Conference Hall", image: "/events/alumni.jpg", avatarFn: "C" },
    ];

    return (
        <section className="py-20 bg-stone-50">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN: EVENTS LIST */}
                    <div className="lg:col-span-7 xl:col-span-8">
                        <h2 className="text-3xl font-playfair font-bold text-oxford mb-8">Upcoming Events & News</h2>

                        {/* Wrapper for Animation */}
                        <div className="h-[500px] overflow-hidden relative mask-gradient-b">
                            {/* Gradient Masks */}
                            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-stone-50 to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-50 to-transparent z-10 pointer-events-none"></div>

                            <div
                                className="flex flex-col gap-0 animate-scroll-up"
                                style={{ height: "max-content" }}
                            >
                                {/* Triple Duplication for smooth loop */}
                                {[...events, ...events, ...events].map((event, idx) => (
                                    <div key={`${event.id}-${idx}`} className="group py-6 border-b border-gray-100 dark:border-gray-700/50 flex flex-col sm:flex-row gap-6 items-start sm:items-center hover:bg-white hover:shadow-sm hover:px-4 hover:rounded-xl transition-all duration-300">
                                        {/* Avatar / Image Placeholder */}
                                        <div className="h-12 w-12 rounded-full bg-sandstone/20 text-oxford flex items-center justify-center font-bold text-xl shrink-0">
                                            {event.avatarFn}
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-oxford group-hover:text-teal-blue transition-colors">{event.title}</h3>
                                            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                                                <div className="flex items-center gap-1.5">
                                                    <CalendarIcon size={14} className="text-sandstone" />
                                                    <span>{event.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin size={14} className="text-sandstone" />
                                                    <span>{event.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="text-gray-400 hover:text-oxford transition-colors p-2">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: CALENDAR */}
                    <div className="lg:col-span-5 xl:col-span-4">
                        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-100">
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-8">
                                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                                    <ChevronLeft size={20} />
                                </button>
                                <h3 className="text-lg font-bold text-oxford">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            {/* Days Header */}
                            <div className="grid grid-cols-7 mb-4">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                    <div key={i} className="h-10 w-10 flex items-center justify-center text-xs font-bold text-gray-400">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-y-2 mb-8">
                                {calendarGrid}
                            </div>

                            {/* Add Event Action */}
                            <Link href="/news/announcement" className="block w-full">
                                <button className="w-full py-3.5 bg-oxford text-white font-bold rounded-xl shadow-lg shadow-oxford/20 hover:bg-oxford/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                                    View All Events
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
}
