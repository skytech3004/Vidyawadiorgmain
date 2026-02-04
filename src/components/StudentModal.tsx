"use client";

import React, { useEffect } from "react";
import { X, Award, User, BookOpen, Trophy } from "lucide-react";

interface StudentProps {
    name: string;
    class?: string;
    img?: string;
    achievement?: string;
    description?: string;
    marks?: string;
    percentage?: string;
    amount?: string;
    sport?: string;
    subject?: string;
}

interface StudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: StudentProps | null;
}

export default function StudentModal({ isOpen, onClose, student }: StudentModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen || !student) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all" onClick={onClose}>
            <div
                className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors"
                >
                    <X size={20} className="text-black" />
                </button>

                <div className="relative h-64 bg-gray-100">
                    {student.img ? (
                        <div className="absolute inset-0">
                            <img
                                src={student.img}
                                alt={student.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-oxford text-white">
                            <User size={80} className="opacity-50" />
                        </div>
                    )}
                    <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-3xl font-bold">{student.name}</h3>
                        {student.class && <p className="text-white/90 font-medium text-lg opacity-90">{student.class}</p>}
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    {/* Achievement / Sport / Subject */}
                    {(student.achievement || student.sport || student.subject) && (
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-sandstone/10 flex items-center justify-center shrink-0">
                                <Trophy className="text-sandstone" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Achievement</p>
                                <p className="text-xl font-bold text-oxford">
                                    {student.achievement || student.sport || `Top Scorer in ${student.subject}`}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Marks / Percentage */}
                    {(student.marks || student.percentage) && (
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <Award className="text-green-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Score</p>
                                <p className="text-xl font-bold text-oxford">
                                    {student.marks || student.percentage}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Scholarship Amount */}
                    {student.amount && (
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                                <StarIcon className="text-yellow-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Scholarship</p>
                                <p className="text-xl font-bold text-oxford">{student.amount}</p>
                            </div>
                        </div>
                    )}

                    {/* Description if any */}
                    {student.description && (
                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-gray-600 italic">"{student.description}"</p>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-oxford text-white rounded-lg font-bold hover:bg-oxford/90 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

// Icon helper
function StarIcon({ className, size }: { className?: string; size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    );
}
