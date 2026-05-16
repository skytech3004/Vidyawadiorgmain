"use client";

import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, MapPin, ChevronLeft, ChevronRight, Bell } from "lucide-react";
import Link from "next/link";

interface SchoolEvent {
    _id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    type: 'event' | 'news';
    institution: string;
    link: string;
    color: string;
    createdAt: string;
}

export default function HomeNewsEvents() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<SchoolEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("/api/events?limit=10");
                const data = await res.json();
                if (data.success) {
                    setEvents(data.events);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Calendar Logic (Simplified)
    const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const getEventsForDay = (day: number) => {
        return events.filter(e => {
            const d = new Date(e.date);
            return d.getDate() === day &&
                d.getMonth() === currentDate.getMonth() &&
                d.getFullYear() === currentDate.getFullYear();
        });
    };

    // Check if uploaded within last 48 hours
    const isRecentlyUploaded = (createdAt: string) => {
        const created = new Date(createdAt).getTime();
        const now = new Date().getTime();
        const diffHours = (now - created) / (1000 * 60 * 60);
        return diffHours < 48;
    };

    const calendarGrid = [];
    // Empty slots for prev month
    for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
        calendarGrid.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }
    // Days
    for (let i = 1; i <= daysInMonth; i++) {
        const isToday = i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
        const dayEvents = getEventsForDay(i);

        calendarGrid.push(
            <div key={`day-${i}`} className="h-10 w-10 flex flex-col items-center justify-center relative cursor-pointer hover:bg-gray-100 rounded-full transition-colors group">
                <span className={`text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full ${isToday ? "bg-oxford text-white" : "text-gray-700"}`}>
                    {i}
                </span>
                <div className="flex gap-0.5 mt-0.5">
                    {dayEvents.slice(0, 3).map((e, idx) => (
                        <span key={idx} className="h-1 w-1 rounded-full" style={{ backgroundColor: e.color }}></span>
                    ))}
                </div>
                {/* Tooltip on hover if multiple events */}
                {dayEvents.length > 0 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 bg-white shadow-xl border border-gray-100 rounded-lg p-2 w-max max-w-[200px]">
                        {dayEvents.map(e => (
                            <div key={e._id} className="text-[10px] font-bold text-oxford mb-1 last:mb-0 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: e.color }}></span>
                                <span className="truncate">{e.title}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <section className="py-20 bg-stone-50">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN: EVENTS LIST */}
                    <div className="lg:col-span-7 xl:col-span-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-playfair font-bold text-oxford">Upcoming Events & News</h2>
                            {loading && <div className="h-4 w-4 border-2 border-sandstone border-t-transparent rounded-full animate-spin"></div>}
                        </div>

                        {/* Wrapper for Animation */}
                        <div className="h-[500px] overflow-hidden relative mask-gradient-b">
                            {/* Gradient Masks */}
                            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-stone-50 to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-50 to-transparent z-10 pointer-events-none"></div>

                            <div
                                className={`flex flex-col gap-4 ${events.length > 3 ? 'animate-scroll-up' : ''}`}
                                style={{ height: "max-content" }}
                            >
                                {/* Duplication for smooth loop if enough items */}
                                {(events.length > 3 ? [...events, ...events, ...events] : events).map((event, idx) => {
                                    const recent = isRecentlyUploaded(event.createdAt);
                                    return (
                                        <div key={`${event._id}-${idx}`} className="group p-6 bg-white border border-oxford/10 rounded-2xl flex flex-col sm:flex-row gap-6 items-start sm:items-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-oxford/30 transition-all duration-300 relative overflow-hidden">
                                            {/* Recent Tag */}
                                            {recent && (
                                                <div className="absolute top-0 right-0 bg-teal-blue text-white text-[10px] font-black px-3 py-1 rounded-bl-xl flex items-center gap-1 animate-pulse">
                                                    <Bell size={10} /> NEW
                                                </div>
                                            )}

                                            {/* Avatar / Icon */}
                                            <div 
                                                className="h-14 w-14 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0 transition-transform group-hover:scale-110 shadow-sm"
                                                style={{ backgroundColor: event.color + '15', color: event.color }}
                                            >
                                                {event.type === 'news' ? 'N' : 'E'}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md" style={{ backgroundColor: event.color + '10', color: event.color }}>
                                                        {event.type}
                                                    </span>
                                                    {event.institution !== 'all' && (
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                            {event.institution}
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-lg font-bold text-oxford group-hover:text-teal-blue transition-colors leading-tight">{event.title}</h3>
                                                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500 font-medium">
                                                    <div className="flex items-center gap-1.5">
                                                        <CalendarIcon size={14} className="text-sandstone" />
                                                        <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                                    </div>
                                                    {event.location && (
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin size={14} className="text-sandstone" />
                                                            <span>{event.location}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {event.link && (
                                                <Link href={event.link} className="shrink-0 max-sm:w-full">
                                                    <button className="px-4 py-2 border border-oxford/20 rounded-xl text-xs font-bold text-oxford hover:bg-oxford hover:text-white transition-all w-full">
                                                        Details
                                                    </button>
                                                </Link>
                                            )}
                                        </div>
                                    );
                                })}
                                
                                {!loading && events.length === 0 && (
                                    <div className="p-10 text-center text-gray-400 font-medium bg-white rounded-2xl border border-dashed border-gray-200">
                                        No upcoming events or news at the moment.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: CALENDAR */}
                    <div className="lg:col-span-5 xl:col-span-4">
                        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] p-8 border border-oxford/5">
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-8">
                                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                                    <ChevronLeft size={20} />
                                </button>
                                <h3 className="text-lg font-black text-oxford uppercase tracking-tight">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            {/* Days Header */}
                            <div className="grid grid-cols-7 mb-4">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                    <div key={i} className="h-10 w-10 flex items-center justify-center text-[10px] font-black text-gray-300">
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
                                <button className="w-full py-4 bg-oxford text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-oxford/20 hover:bg-teal-blue hover:shadow-teal-blue/20 hover:-translate-y-0.5 transition-all duration-300">
                                    View Detailed Calendar
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
}
