"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface StudentResult {
    sn: number;
    class: string;
    stream: string | null;
    student_name: string;
    father_name: string;
    percentage: number;
}

const studentResults: StudentResult[] = [
    { "sn": 1, "class": "X", "stream": null, "student_name": "Antra Prajapat", "father_name": "Poonaram Prajapat", "percentage": 93.33 },
    { "sn": 2, "class": "X", "stream": null, "student_name": "Poonam Kanwar", "father_name": "Madan Singh Panwar", "percentage": 92.17 },
    { "sn": 3, "class": "X", "stream": null, "student_name": "Kiran", "father_name": "Kehra Ram", "percentage": 92.00 },
    { "sn": 4, "class": "X", "stream": null, "student_name": "Pragya Dewal", "father_name": "Ompal Singh", "percentage": 90.17 },

    { "sn": 5, "class": "XII", "stream": "Science", "student_name": "Kirtika Kanwar", "father_name": "Dilip Singh", "percentage": 95.80 },
    { "sn": 6, "class": "XII", "stream": "Science", "student_name": "Sanjana", "father_name": "Ashok Kumar", "percentage": 95.00 },
    { "sn": 7, "class": "XII", "stream": "Science", "student_name": "Pooja Bishnoi", "father_name": "Hanumana Ram", "percentage": 94.40 },
    { "sn": 8, "class": "XII", "stream": "Science", "student_name": "Manisha", "father_name": "Ganpat Ram", "percentage": 94.00 },
    { "sn": 9, "class": "XII", "stream": "Science", "student_name": "Dhara Gehlot", "father_name": "Govind Kumar", "percentage": 93.60 },
    { "sn": 10, "class": "XII", "stream": "Science", "student_name": "Vaishali", "father_name": "Pema Ram", "percentage": 92.20 },
    { "sn": 11, "class": "XII", "stream": "Science", "student_name": "Aarti Vishnoi", "father_name": "Chautha Ram", "percentage": 91.60 },
    { "sn": 12, "class": "XII", "stream": "Science", "student_name": "Ritika Sherawat", "father_name": "Panna Ram", "percentage": 91.20 },
    { "sn": 13, "class": "XII", "stream": "Science", "student_name": "Dimpal Kumari", "father_name": "Dhala Ram", "percentage": 91.00 },
    { "sn": 14, "class": "XII", "stream": "Science", "student_name": "Sonu Borana", "father_name": "Maga Ram", "percentage": 91.00 },

    { "sn": 15, "class": "XII", "stream": "Arts", "student_name": "Mahima Surana", "father_name": "Ashok Surana", "percentage": 96.00 },
    { "sn": 16, "class": "XII", "stream": "Arts", "student_name": "Himanshi Kanwar", "father_name": "Bheru Singh", "percentage": 95.40 },
    { "sn": 17, "class": "XII", "stream": "Arts", "student_name": "Harsha Kanwar Chundawat", "father_name": "Mohan Singh", "percentage": 94.80 },
    { "sn": 18, "class": "XII", "stream": "Arts", "student_name": "Mamta", "father_name": "Dhala Ram", "percentage": 94.40 },
    { "sn": 19, "class": "XII", "stream": "Arts", "student_name": "Radhika Rajpurohit", "father_name": "Ashok Kumar", "percentage": 94.40 },
    { "sn": 20, "class": "XII", "stream": "Arts", "student_name": "Vartika", "father_name": "Dilip Kumar", "percentage": 94.40 },
    { "sn": 21, "class": "XII", "stream": "Arts", "student_name": "Pinky Kunwar", "father_name": "Ram Singh", "percentage": 93.80 },
    { "sn": 22, "class": "XII", "stream": "Arts", "student_name": "Dikshita Rathore", "father_name": "Ganpat Singh", "percentage": 92.20 },
    { "sn": 23, "class": "XII", "stream": "Arts", "student_name": "Bhanu Priya", "father_name": "Shivaji Ram", "percentage": 92.00 },
    { "sn": 24, "class": "XII", "stream": "Arts", "student_name": "Khushi Kanwar", "father_name": "Dhan Singh", "percentage": 92.00 },
    { "sn": 25, "class": "XII", "stream": "Arts", "student_name": "Digyasa Singh Rathore", "father_name": "Dindayal Singh", "percentage": 91.20 },
    { "sn": 26, "class": "XII", "stream": "Arts", "student_name": "Jaswant Kunwar", "father_name": "Tej Singh", "percentage": 91.20 },
    { "sn": 27, "class": "XII", "stream": "Arts", "student_name": "Muni Shreya Goswami", "father_name": "Ashok Puri Goswami", "percentage": 91.00 },
    { "sn": 28, "class": "XII", "stream": "Arts", "student_name": "Seema Dewasi", "father_name": "Gaja Ram", "percentage": 91.00 },

    { "sn": 29, "class": "XII", "stream": "Arts", "student_name": "Jinal Ranawat", "father_name": "Puran Singh", "percentage": 90.40 },
    { "sn": 30, "class": "XII", "stream": "Arts", "student_name": "Seema Dewasi", "father_name": "Pukhraj Dewasi", "percentage": 90.40 },
    { "sn": 31, "class": "XII", "stream": "Arts", "student_name": "Anjali Bhati", "father_name": "Narendra Singh Bhati", "percentage": 90.20 },
    { "sn": 32, "class": "XII", "stream": "Arts", "student_name": "Rajshree Karnot", "father_name": "Ishwar Karan Rathore", "percentage": 90.20 },
    { "sn": 33, "class": "XII", "stream": "Arts", "student_name": "Vidhu Kanwar Rathore", "father_name": "Abhay Singh", "percentage": 90.00 },

    { "sn": 34, "class": "XII", "stream": "Commerce", "student_name": "Gudiya Kumari", "father_name": "Jeevraj", "percentage": 90.60 }
];

export default function StudentResultsTable() {
    const [visibleCount, setVisibleCount] = useState(10);

    const showMore = () => {
        setVisibleCount((prev) => Math.min(prev + 10, studentResults.length));
    };

    const visibleResults = studentResults.slice(0, visibleCount);
    const hasMore = visibleCount < studentResults.length;

    return (
        <div className="flex flex-col items-center">
            <div className="overflow-x-auto rounded-3xl border border-oxford/10 shadow-2xl bg-white w-full">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-oxford text-white">
                        <tr>
                            <th className="p-6 font-bold uppercase tracking-wider text-sm">S.No.</th>
                            <th className="p-6 font-bold uppercase tracking-wider text-sm">Student Name</th>
                            <th className="p-6 font-bold uppercase tracking-wider text-sm">Father's Name</th>
                            <th className="p-6 font-bold uppercase tracking-wider text-sm">Class</th>
                            <th className="p-6 font-bold uppercase tracking-wider text-sm">Stream</th>
                            <th className="p-6 font-bold uppercase tracking-wider text-sm text-right">Percentage</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-oxford/10 text-gray-700 font-medium text-sm">
                        {visibleResults.map((student) => (
                            <tr key={student.sn} className="hover:bg-oxford/5 transition-colors group">
                                <td className="p-6 font-bold text-oxford/50 group-hover:text-oxford">{student.sn}</td>
                                <td className="p-6 font-bold text-oxford">{student.student_name}</td>
                                <td className="p-6 text-gray-600">{student.father_name}</td>
                                <td className="p-6">
                                    <span className="bg-sandstone/10 text-oxford font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                                        Class {student.class}
                                    </span>
                                </td>
                                <td className="p-6">
                                    {(student.stream && student.stream !== "-") && (
                                        <span className="bg-oxford/5 text-oxford font-medium px-3 py-1 rounded-full text-xs">
                                            {student.stream}
                                        </span>
                                    )}
                                </td>
                                <td className="p-6 text-right font-black text-oxford text-lg">
                                    {student.percentage.toFixed(2)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {hasMore && (
                <button
                    onClick={showMore}
                    className="mt-8 px-8 py-3 bg-oxford text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-sandstone hover:text-oxford transition-all flex items-center gap-2 shadow-lg"
                >
                    View More
                    <ChevronDown size={16} />
                </button>
            )}
        </div>
    );
}
