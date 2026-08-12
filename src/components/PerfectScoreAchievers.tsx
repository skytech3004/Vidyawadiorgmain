"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Medal, Trophy } from "lucide-react";

interface PerfectTopper {
    _id: string;
    name: string;
    percentage: number;
    class: string;
    year: string;
    stream?: string;
    subject?: string;
    image?: string;
}

interface Props {
    institution?: string;
    onSelect?: (student: {
        name: string;
        class: string;
        subject?: string;
        marks: string;
        img?: string;
        description: string;
    }) => void;
}

export default function PerfectScoreAchievers({ institution = "marudhar", onSelect }: Props) {
    const [results, setResults] = useState<PerfectTopper[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/results?institution=${institution}&resultType=Perfect`,
                    { cache: "no-store" }
                );
                const data = await res.json();
                if (data.success) {
                    setResults(data.results || []);
                }
            } catch (error) {
                console.error("Failed to fetch perfect scores", error);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [institution]);

    const sorted = useMemo(() => {
        return [...results].sort((a, b) => {
            const pctDiff = Number(b.percentage) - Number(a.percentage);
            if (pctDiff !== 0) return pctDiff;
            return (a.name || "").localeCompare(b.name || "");
        });
    }, [results]);

    if (loading) {
        return (
            <div className="flex flex-col items-center py-16 gap-4">
                <div className="w-12 h-12 border-4 border-sandstone border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Perfect Scores...</p>
            </div>
        );
    }

    if (sorted.length === 0) {
        return (
            <div className="text-center py-16 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                <Medal size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-500 font-medium">No perfect score achievers listed yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Highest score highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sorted.slice(0, 4).map((student) => (
                    <button
                        key={student._id}
                        type="button"
                        onClick={() =>
                            onSelect?.({
                                name: student.name,
                                class: `Class ${student.class}${student.stream && student.stream !== "-" ? ` ${student.stream}` : ""}`,
                                subject: student.subject,
                                marks: "100/100",
                                img: student.image,
                                description: "Achieved 100/100 Perfect Score",
                            })
                        }
                        className="bg-gray-50 p-6 rounded-3xl border border-transparent hover:border-sandstone/30 hover:shadow-xl transition-all text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-white mx-auto mb-4 overflow-hidden border-2 border-sandstone shadow-md">
                            <img
                                src={student.image || "https://cdn-icons-png.flaticon.com/512/4288/4288270.png"}
                                alt={student.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="font-black text-oxford text-sm mb-1 truncate">{student.name}</h4>
                        <p className="text-[10px] font-bold text-sandstone uppercase mb-2">
                            {student.subject || "Subject"}
                        </p>
                        <div className="text-xl font-black text-green-600">100/100</div>
                    </button>
                ))}
            </div>

            <div className="overflow-x-auto rounded-3xl border border-oxford/10 shadow-lg bg-white">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead className="bg-oxford text-white">
                        <tr>
                            <th className="p-6 font-bold uppercase tracking-wider text-sm">Student Name</th>
                            <th className="p-6 font-bold uppercase tracking-wider text-sm">Class & Stream</th>
                            <th className="p-6 font-bold uppercase tracking-wider text-sm">Subject</th>
                            <th className="p-6 font-bold uppercase tracking-wider text-sm text-right">Marks</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-oxford/10 text-gray-700 font-medium">
                        {sorted.map((student) => (
                            <tr
                                key={student._id}
                                className="hover:bg-oxford/5 transition-colors cursor-pointer"
                                onClick={() =>
                                    onSelect?.({
                                        name: student.name,
                                        class: `Class ${student.class}${student.stream && student.stream !== "-" ? ` ${student.stream}` : ""}`,
                                        subject: student.subject,
                                        marks: "100/100",
                                        img: student.image,
                                        description: "Achieved 100/100 Perfect Score",
                                    })
                                }
                            >
                                <td className="p-6 font-bold text-oxford">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                                            <img
                                                src={student.image || "https://cdn-icons-png.flaticon.com/512/4288/4288270.png"}
                                                alt={student.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {student.name}
                                    </div>
                                </td>
                                <td className="p-6">
                                    Class {student.class}
                                    {student.stream && student.stream !== "-" ? ` ${student.stream}` : ""}
                                </td>
                                <td className="p-6">{student.subject || "—"}</td>
                                <td className="p-6 text-right font-black text-green-600">100/100</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="text-center text-gray-500 max-w-2xl mx-auto text-sm flex items-center justify-center gap-2">
                <Trophy size={14} className="text-sandstone" />
                Listed highest score first — students who scored full marks in their subjects.
            </p>
        </div>
    );
}
