'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar as CalendarIcon, Clock, MapPin, Bell, ChevronLeft, ChevronRight } from 'lucide-react';

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

export default function AnnouncementPage() {
    const [events, setEvents] = useState<SchoolEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("/api/events?limit=20");
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

    // Calendar Logic
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return day === 0 ? 6 : day - 1; // Adjust to start Monday
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);

    // Previous Month Days (for filling the grid)
    const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const daysInPrevMonth = getDaysInMonth(prevMonthDate);
    const prevMonthDays = [];
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        prevMonthDays.push(daysInPrevMonth - i);
    }

    // Current Month Days
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
        currentMonthDays.push(i);
    }

    // Next Month Days (to fill remaining slots)
    const totalSlots = 42; 
    const usedSlots = prevMonthDays.length + currentMonthDays.length;
    const remainingSlots = totalSlots - usedSlots;
    const nextMonthDays = [];
    for (let i = 1; i <= remainingSlots; i++) {
        nextMonthDays.push(i);
    }

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const getEventsForDay = (day: number) => {
        return events.filter(e => {
            const d = new Date(e.date);
            return d.getDate() === day && d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
        });
    };

    const isRecentlyUploaded = (createdAt: string) => {
        const created = new Date(createdAt).getTime();
        const now = new Date().getTime();
        const diffHours = (now - created) / (1000 * 60 * 60);
        return diffHours < 48;
    };

    return (
        <main className="min-h-screen flex flex-col bg-stone-50">
            <Navbar />

            <section className="relative pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Page Header */}
                    <div className="mb-16 text-center">
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-oxford mb-4">News and Announcement</h1>
                        <div className="w-24 h-1 bg-sandstone mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Left Side: Events List */}
                        <div className="lg:col-span-5">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-oxford">Upcoming Schedule</h2>
                                    <p className="text-gray-500">Stay updated with latest happenings</p>
                                </div>
                                {loading && <div className="h-5 w-5 border-2 border-sandstone border-t-transparent rounded-full animate-spin"></div>}
                            </div>

                            <div className="h-[700px] overflow-hidden relative mask-gradient-b">
                                <div className={`flex flex-col gap-6 ${events.length > 4 ? 'animate-scroll-up' : ''}`} style={{ height: "max-content" }}>
                                    {(events.length > 4 ? [...events, ...events, ...events] : events).map((item, index) => {
                                        const recent = isRecentlyUploaded(item.createdAt);
                                        return (
                                            <div key={`${item._id}-${index}`} className="p-6 rounded-3xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                                                {recent && (
                                                    <div className="absolute top-0 right-0 bg-teal-blue text-white text-[10px] font-black px-3 py-1 rounded-bl-xl flex items-center gap-1 animate-pulse">
                                                        <Bell size={10} /> NEW
                                                    </div>
                                                )}
                                                
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                                                    <p className="text-sm font-bold text-gray-400">
                                                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                </div>

                                                <h3 className="text-xl font-bold text-oxford mb-2 group-hover:text-teal-blue transition-colors">{item.title}</h3>
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                                                <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400">
                                                    {item.time && (
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock size={14} className="text-sandstone" />
                                                            <span>{item.time}</span>
                                                        </div>
                                                    )}
                                                    {item.location && (
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin size={14} className="text-sandstone" />
                                                            <span>{item.location}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    
                                    {!loading && events.length === 0 && (
                                        <div className="p-10 text-center text-gray-400 font-medium bg-white rounded-3xl border border-dashed border-gray-200">
                                            No events scheduled.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Calendar Section */}
                        <div className="lg:col-span-7">
                            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-oxford/5 border border-gray-100 p-8">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-2xl font-black text-oxford uppercase tracking-tight">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                                        <div className="flex items-center gap-1">
                                            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-xl transition-all text-oxford">
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-xl transition-all text-oxford">
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex bg-gray-50 p-1 rounded-xl">
                                        <button className="px-6 py-2 bg-oxford text-white rounded-lg text-sm font-bold shadow-lg shadow-oxford/20">Month View</button>
                                    </div>
                                </div>

                                <div className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                                    <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                            <div key={day} className="py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">{day}</div>
                                        ))}
                                    </div>
                                    
                                    <div className="grid grid-cols-7">
                                        {/* Prev Month Days */}
                                        {prevMonthDays.map((day) => (
                                            <div key={`prev-${day}`} className="h-24 sm:h-32 p-3 bg-gray-50/50 border-r border-b border-gray-100">
                                                <span className="text-xs font-bold text-gray-300">{day}</span>
                                            </div>
                                        ))}

                                        {/* Current Month Days */}
                                        {currentMonthDays.map((day) => {
                                            const dayEvents = getEventsForDay(day);
                                            const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();

                                            return (
                                                <div key={`curr-${day}`} className="h-24 sm:h-32 p-3 bg-white border-r border-b border-gray-100 relative group transition-colors hover:bg-stone-50/50">
                                                    <span className={`text-xs font-bold ${isToday ? 'bg-oxford text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-oxford'}`}>{day}</span>
                                                    
                                                    <div className="mt-2 space-y-1">
                                                        {dayEvents.map(e => (
                                                            <div key={e._id} className="hidden sm:block">
                                                                <div 
                                                                    className="px-2 py-1 rounded text-[10px] font-bold truncate transition-transform hover:scale-105 cursor-pointer"
                                                                    style={{ backgroundColor: e.color + '15', color: e.color, borderLeft: `3px solid ${e.color}` }}
                                                                    title={e.title}
                                                                >
                                                                    {e.title}
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {/* Mobile Dot Indicator */}
                                                        <div className="flex sm:hidden gap-1 mt-1">
                                                            {dayEvents.map(e => (
                                                                <span key={e._id} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: e.color }}></span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Next Month Days */}
                                        {nextMonthDays.map((day) => (
                                            <div key={`next-${day}`} className="h-24 sm:h-32 p-3 bg-gray-50/50 border-r border-b border-gray-100">
                                                <span className="text-xs font-bold text-gray-300">{day}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main >
    );
}
