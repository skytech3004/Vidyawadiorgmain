"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatItemProps {
    target: number;
    label: string;
    suffix?: string;
}

const StatItem = ({ target, label, suffix = "" }: StatItemProps) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            let startTime: number | null = null;
            const duration = 2000; // 2 seconds

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                setCount(Math.floor(progress * target));
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [isInView, target]);

    return (
        <div ref={ref} className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-5xl md:text-7xl font-bold text-sandstone mb-2">
                {count}{suffix}
            </div>
            <p className="text-white/70 text-lg md:text-xl font-medium uppercase tracking-wider">{label}</p>
        </div>
    );
};

export default function Stats() {
    const stats = [
        { target: 2500, label: "Students", suffix: "+" },
        { target: 45, label: "Acres Campus", suffix: "A" },
        { target: 65, label: "Years Legacy", suffix: "+" },
        { target: 5000, label: "Alumni", suffix: "+" },
    ];

    return (
        <section id="about" data-theme="dark" className="py-32 bg-oxford relative overflow-hidden scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-sandstone mb-6">Our Legacy in Numbers</h2>
                    <div className="w-24 h-1 bg-sandstone mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <StatItem {...stat} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Graphic */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        </section>
    );
}
