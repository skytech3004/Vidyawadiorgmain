'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AnnouncementPage() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    // Calendar Logic
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
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
    const totalSlots = 42; // 6 rows * 7 columns
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

    const toggleDropdown = (id: string) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    // Events Data (Mock Data - ideally filtered by date)
    const events = [
        { id: '1', title: 'Meeting with friends', desc: 'Travel Destination Discussion', time: '10:00 - 11:00', date: 'Jan 10, 2024', day: 3, month: 0, year: 2024, type: 'oxford', dotClass: 'bg-oxford', textClass: 'hover:text-oxford' },
        { id: '2', title: 'Visiting online course', desc: 'Checks updates for design course', time: '05:40 - 13:00', date: 'Jan 10, 2024', day: 7, month: 0, year: 2024, type: 'teal-blue', dotClass: 'bg-teal-blue', textClass: 'hover:text-teal-blue' },
        { id: '3', title: 'Development meet', desc: 'Discussion with developer', time: '10:00 - 11:00', date: 'Jan 14, 2024', day: 19, month: 0, year: 2024, type: 'sandstone', dotClass: 'bg-sandstone', textClass: 'hover:text-sandstone-dark' }
    ];

    const getEventForDay = (day: number) => {
        // Simple check for demo purposes (year/month ignoring for simplicity in this specific recurring calendar view)
        // In a real app, you'd match year and month too.
        // For this demo, let's just match the day if it's the current month (or any month for persistent demo events)
        // But better to check month.
        return events.find(e => e.day === day && e.month === currentDate.getMonth() && e.year === currentDate.getFullYear());
    };

    // Styling constants for brand colors
    const colors = {
        oxford: { bg: 'bg-oxford', text: 'text-oxford', lightBg: 'bg-oxford/10' },
        'teal-blue': { bg: 'bg-teal-blue', text: 'text-teal-blue', lightBg: 'bg-teal-blue/10' },
        sandstone: { bg: 'bg-sandstone', text: 'text-oxford', lightBg: 'bg-sandstone/20' } // sandstone text might be hard to read, using oxford for contrast or custom
    };

    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />

            <section className="relative bg-oxford flex-grow pt-32 pb-12">
                {/* Background Decor */}
                <div className="bg-teal-blue w-full sm:w-40 h-40 rounded-full absolute top-1 opacity-20 max-sm:right-0 sm:left-56 z-0"></div>
                <div className="bg-sandstone w-full sm:w-40 h-24 absolute top-0 -left-0 opacity-10 z-0"></div>
                <div className="bg-white w-full sm:w-40 h-24 absolute top-40 -left-0 opacity-5 z-0"></div>

                <div className="w-full relative z-10 backdrop-blur-3xl">
                    <div className="w-full max-w-7xl mx-auto px-2 lg:px-8">
                        {/* Page Header */}
                        <div className="mb-12 text-center">
                            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">News and Announcement</h1>
                            <div className="w-24 h-1 bg-sandstone mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-12 gap-8 max-w-4xl mx-auto xl:max-w-full">

                            {/* Left Side: Events List */}
                            <div className="col-span-12 xl:col-span-5">
                                <h2 className="font-manrope text-3xl leading-tight text-white mb-1.5 font-bold">Upcoming Events</h2>
                                <p className="text-lg font-normal text-white/80 mb-8">Don’t miss schedule</p>
                                {/* Scrollable Container */}
                                <div className="h-[600px] overflow-hidden relative mask-gradient-b">
                                    {/* Gradient Masks for smooth fade in/out */}
                                    {/* <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-oxford to-transparent z-10 pointer-events-none"></div> */}
                                    {/* <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-oxford to-transparent z-10 pointer-events-none"></div> */}

                                    <div
                                        className="flex flex-col gap-5 animate-scroll-up"
                                        style={{ height: "max-content" }}
                                    >
                                        {/* Duplicating events for seamless loop */}
                                        {[...events, ...events, ...events].map((item, index) => (
                                            <div key={`${item.id}-${index}`} className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 shrink-0">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <span className={`w-2.5 h-2.5 rounded-full ${item.dotClass}`}></span>
                                                        <p className="text-base font-medium text-gray-900">{item.date} - {item.time}</p>
                                                    </div>
                                                    <div className="dropdown relative inline-flex">
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleDropdown(`${item.id}-${index}`)} // Ensure unique ID for dropdown toggle
                                                            className={`dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 ${item.textClass}`}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="4" viewBox="0 0 12 4" fill="none">
                                                                <path d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"></path>
                                                            </svg>
                                                        </button>
                                                        {openDropdown === `${item.id}-${index}` && (
                                                            <div className="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full -left-10 w-max mt-2 z-20">
                                                                <ul className="py-2">
                                                                    <li>
                                                                        <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="#">
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="#">
                                                                            Remove
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <h6 className="text-xl leading-8 font-bold text-oxford mb-1">{item.title}</h6>
                                                <p className="text-base font-normal text-gray-600">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Calendar Section */}
                            <div className="col-span-12 xl:col-span-7 px-2.5 py-5 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1 shadow-sm border border-white/50">
                                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
                                    <div className="flex items-center gap-4">
                                        <h5 className="text-xl leading-8 font-bold text-oxford">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h5>
                                        <div className="flex items-center">
                                            <button onClick={prevMonth} className="text-oxford p-1 rounded transition-all duration-300 hover:text-white hover:bg-oxford">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M10.0002 11.9999L6 7.99971L10.0025 3.99719" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </button>
                                            <button onClick={nextMonth} className="text-oxford p-1 rounded transition-all duration-300 hover:text-white hover:bg-oxford">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M6.00236 3.99707L10.0025 7.99723L6 11.9998" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center rounded-md p-1 bg-gray-50 gap-px">
                                        <button className="py-2.5 px-5 rounded-lg bg-gray-50 text-oxford text-sm font-medium transition-all duration-300 hover:bg-oxford hover:text-white">Day</button>
                                        <button className="py-2.5 px-5 rounded-lg bg-oxford text-white text-sm font-medium transition-all duration-300 hover:bg-oxford hover:text-white">Week</button>
                                        <button className="py-2.5 px-5 rounded-lg bg-gray-50 text-oxford text-sm font-medium transition-all duration-300 hover:bg-oxford hover:text-white">Month</button>
                                    </div>
                                </div>
                                <div className="border border-indigo-100 rounded-xl">
                                    <div className="grid grid-cols-7 rounded-t-3xl border-b border-indigo-100">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                                            <div key={day} className={`py-3.5 ${idx < 6 ? 'border-r' : ''} ${idx === 0 ? 'rounded-tl-xl' : ''} ${idx === 6 ? 'rounded-tr-xl' : ''} border-indigo-100 bg-gray-50 flex items-center justify-center text-sm font-medium text-oxford`}>{day}</div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 rounded-b-xl">

                                        {/* Prev Month Days */}
                                        {prevMonthDays.map((day) => (
                                            <div key={`prev-${day}`} className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-100 transition-all duration-300 hover:bg-indigo-50">
                                                <span className="text-xs font-semibold text-gray-400">{day}</span>
                                            </div>
                                        ))}

                                        {/* Current Month Days */}
                                        {currentMonthDays.map((day) => {
                                            const event = getEventForDay(day);
                                            const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();

                                            // Determine branding colors for event if it exists
                                            let bgClass = "bg-white";
                                            let textClass = "text-oxford";

                                            return (
                                                <div key={`curr-${day}`} className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white relative border-r border-b border-indigo-100 transition-all duration-300 hover:bg-indigo-50 cursor-pointer">
                                                    <span className={`text-xs font-semibold ${isToday ? 'bg-oxford text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-gray-900'}`}>{day}</span>

                                                    {event && (
                                                        <div className={`absolute top-9 bottom-1 left-3.5 right-1 p-1.5 xl:px-2.5 h-max rounded ${colors[event.type as keyof typeof colors].lightBg} `}>
                                                            <p className={`hidden xl:block text-xs font-bold mb-px whitespace-nowrap truncate ${colors[event.type as keyof typeof colors].text}`}>{event.title}</p>
                                                            <span className={`hidden xl:block text-[10px] font-normal whitespace-nowrap ${colors[event.type as keyof typeof colors].text}`}>{event.time}</span>
                                                            <p className={`xl:hidden w-2 h-2 rounded-full ${colors[event.type as keyof typeof colors].bg}`}></p>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}

                                        {/* Next Month Days */}
                                        {nextMonthDays.map((day) => (
                                            <div key={`next-${day}`} className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-100 transition-all duration-300 hover:bg-indigo-50 cursor-pointer">
                                                <span className="text-xs font-semibold text-gray-400">{day}</span>
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
