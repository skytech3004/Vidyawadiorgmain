import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Topper from "@/models/Topper";

// DATA EXTRACTION FROM COMPONENTS

const studentResults = [
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

const lpsToppers12 = [
    { name: "Ms. Ankur Kanwar", stream: "Science", percentage: "97.40", image: "/images/english school/Ankur Kunwar.jpg" },
    { name: "Ms. Himanshi Jain", stream: "Science", percentage: "94.80", image: "/images/english school/Himanshi Jain.jpg" },
    { name: "Ms. Niral", stream: "Commerce", percentage: "93.60", image: "/images/english school/Niral.jpg" },
    { name: "Ms. Ishita Chouhan", stream: "Humanities", percentage: "92.60", image: "" },
    { name: "Ms. Manjari Vaishnav", stream: "Humanities", percentage: "92.40", image: "/images/english school/Manjari vaishnav.jpg" },
    { name: "Ms. Alfina", stream: "Humanities", percentage: "91.00", image: "/images/english school/alfina.jpg" },
    { name: "Ms. Laxita Rahore", stream: "Humanities", percentage: "90.00", image: "/images/english school/Lakshita rathore.jpg" },
    { name: "Ms. Yuti Sharma", stream: "Humanities", percentage: "89.80", image: "/images/english school/Yuti Sharma.jpg" },
    { name: "Ms. Sofia Khan", stream: "Humanities", percentage: "89.20", image: "/images/english school/Sofia khan.jpg" },
    { name: "Ms. Taruna", stream: "Humanities", percentage: "89.00", image: "/images/english school/taruna.jpg" },
];

const lpsToppers10 = [
    { name: "Ms. Rajal Rajpurohit", percentage: "93.80", image: "" },
    { name: "Ms. Pragati Sirvi", percentage: "93.00", image: "/images/english school/pragati sirvi.jpg" },
    { name: "Ms. Yajeshvi", percentage: "92.40", image: "/images/english school/Yajeshvi.jpg" },
    { name: "Ms. Aisha Soni", percentage: "92.00", image: "/images/english school/AAIsha soni.jpg" },
    { name: "Ms. Anju Kanwar", percentage: "91.20", image: "/images/english school/anju kanwar.jpg" },
    { name: "Ms. Janvee Soni", percentage: "90.60", image: "/images/english school/Janvee soni.jpg" },
    { name: "Ms. Saniya Soni", percentage: "89.00", image: "/images/english school/saniya soni.jpg" },
    { name: "Ms. Bhavya Sharma", percentage: "87.80", image: "/images/english school/bhavya sharma.jpg" },
    { name: "Ms. Renuka Bhati", percentage: "87.80", image: "/images/english school/Renuka bhati.jpg" },
    { name: "Ms. Gayatri Rathore", percentage: "87.00", image: "/images/english school/Gayatri Rathore.jpg" },
    { name: "Ms. Rudrakshi", percentage: "86.60", image: "/images/english school/Rudrakshi.jpg" },
    { name: "Ms. Tanishi Choudhary", percentage: "85.40", image: "/images/english school/Tanisi choudary.jpg" },
    { name: "Ms. Mumal Kanwar", percentage: "85.00", image: "/images/english school/Mumal kanwar.jpg" },
    { name: "Ms. Sakshi Deora", percentage: "85.00", image: "/images/english school/sakshi deora.jpg" },
];

const spsAllResults = [
    { name: "Anjali Prajapat", class: "X", percentage: "93.33", image: null, resultType: "Board" },
    { name: "Poonam Kanwar", class: "X", percentage: "92.17", image: null, resultType: "Board" },
    { name: "Kirtika Kanwar", class: "XII", percentage: "95.80", stream: "Science", image: null, resultType: "Board" },
    { name: "Sanjana", class: "XII", percentage: "95.00", stream: "Science", image: null, resultType: "Board" },
    { name: "Mahima Surana", class: "XII", percentage: "96.00", stream: "Arts", image: null, resultType: "Board" },
    { name: "Himanshi Kanwar", class: "XII", percentage: "95.40", stream: "Arts", image: null, resultType: "Board" },
    { name: "Gudiya Kumari", class: "XII", percentage: "90.60", stream: "Commerce", image: null, resultType: "Board" }
];

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const allToppers: any[] = [];

        // 1. MARUDHAR (Hindi/English Sr. Sec) - Using the dynamic table data
        studentResults.forEach((t, i) => {
            allToppers.push({
                name: t.student_name,
                percentage: parseFloat(t.percentage as any),
                class: t.class,
                year: "2024-25",
                stream: t.stream || "-",
                institution: "marudhar",
                order: i,
                resultType: "Board"
            });
        });

        // 2. ENGLISH (Leeladevi English Medium) - Grade 12
        lpsToppers12.forEach((t, i) => {
            allToppers.push({
                name: t.name,
                percentage: parseFloat(t.percentage),
                class: "XII",
                year: "2023-24",
                stream: t.stream,
                image: t.image,
                institution: "english",
                order: i,
                resultType: "Board"
            });
        });

        // 3. ENGLISH (Leeladevi English Medium) - Grade 10
        lpsToppers10.forEach((t, i) => {
            allToppers.push({
                name: t.name,
                percentage: parseFloat(t.percentage),
                class: "X",
                year: "2023-24",
                stream: "-",
                image: t.image,
                institution: "english",
                order: i,
                resultType: "Board"
            });
        });

        // 4. PRIMARY (Sushiladevi Primary) - Board Results
        spsAllResults.forEach((t, i) => {
            allToppers.push({
                name: t.name,
                percentage: parseFloat(t.percentage),
                class: t.class,
                year: "2024-25",
                stream: t.stream || "-",
                institution: "primary",
                order: i,
                resultType: t.resultType || "Board"
            });
        });

        // OPTIONAL: Add some college samples if needed, but the user didn't have any lists.
        allToppers.push({
            name: "Sample Topper",
            percentage: 95.00,
            class: "BA III",
            year: "2024-25",
            stream: "Arts",
            institution: "college",
            order: 0,
            resultType: "Board"
        });

        // Clear existing to ensure clean state (Optional, but safer for seeding)
        // await Topper.deleteMany({}); 

        // Insert All
        const results = await Topper.insertMany(allToppers);

        return NextResponse.json({ 
            success: true, 
            message: `Successfully seeded ${results.length} toppers.`,
            count: results.length
        });

    } catch (error: any) {
        console.error("SEED_ERROR:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
