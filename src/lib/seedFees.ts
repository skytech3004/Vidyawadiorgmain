import dbConnect from "./mongodb";
import Institution from "../models/Institution";

const seedData = [
    {
        id: "primary",
        name: "Sushiladevi Primary School",
        feeStructure: {
            year: "2026-27",
            installments: 2,
            classes: [
                { section: "", className: "Nursery to V", totalFee: 17700, admissionFee: "₹2,500" },
                { section: "", className: "VI to VIII", totalFee: 21500, admissionFee: "₹5,000" },
                { section: "", className: "IX to X", totalFee: 27400, admissionFee: "₹5,000" }
            ]
        }
    },
    {
        id: "english",
        name: "Leeladevi English Medium",
        feeStructure: {
            year: "2026-27",
            installments: 2,
            classes: [
                { section: "", className: "Science (PCM)", totalFee: 54600, admissionFee: "₹5,000" },
                { section: "", className: "Science (PCB)", totalFee: 57400, admissionFee: "₹5,000" },
                { section: "", className: "Commerce (General)", totalFee: 45300, admissionFee: "₹5,000" },
                { section: "", className: "Commerce (Comp Sci)", totalFee: 46600, admissionFee: "₹5,000" },
                { section: "", className: "Arts (General)", totalFee: 45600, admissionFee: "₹5,000" },
                { section: "", className: "Arts (Music/Geo/Comp)", totalFee: 48000, admissionFee: "₹5,000" }
            ]
        }
    },
    {
        id: "marudhar",
        name: "Marudhar Balika Vidyapeeth",
        feeStructure: {
            year: "2026-27",
            installments: 2,
            classes: [
                { section: "RBSE Hindi Medium", className: "VI – VIII", totalFee: 19000, admissionFee: "₹2,000" },
                { section: "RBSE Hindi Medium", className: "IX – X", totalFee: 25200, admissionFee: "₹4,000" },
                { section: "RBSE Hindi Medium", className: "XI – XII Arts", totalFee: 26800, admissionFee: "₹4,000" },
                { section: "RBSE Hindi Medium", className: "XI – XII Commerce", totalFee: 26800, admissionFee: "₹4,000" },
                { section: "RBSE Hindi Medium", className: "XI – XII Science", totalFee: 33000, admissionFee: "₹4,000" },
                { section: "RBSE English Medium", className: "VI – VIII", totalFee: 20400, admissionFee: "₹2,000" },
                { section: "RBSE English Medium", className: "IX – X", totalFee: 27000, admissionFee: "₹4,000" },
                { section: "RBSE English Medium", className: "XI – XII Arts", totalFee: 28800, admissionFee: "₹4,000" },
                { section: "RBSE English Medium", className: "XI – XII Commerce", totalFee: 28800, admissionFee: "₹4,000" },
                { section: "RBSE English Medium", className: "XI – XII Science", totalFee: 35400, admissionFee: "₹4,000" }
            ]
        }
    },
    {
        id: "college",
        name: "Leela Devi College",
        feeStructure: {
            year: "2026-27",
            installments: 2,
            classes: [
                { section: "UG Courses", className: "B.A.", totalFee: 24600, admissionFee: "₹3,500" },
                { section: "UG Courses", className: "B.Com.", totalFee: 23800, admissionFee: "₹3,500" },
                { section: "UG Courses", className: "B.Sc. (Biology)", totalFee: 34100, admissionFee: "₹3,500" },
                { section: "UG Courses", className: "B.Sc. (Maths)", totalFee: 33100, admissionFee: "₹3,500" },
                { section: "PG Courses", className: "M.Sc. Chemistry", totalFee: 31200, admissionFee: "" },
                { section: "PG Courses", className: "M.Sc. Mathematics", totalFee: 25000, admissionFee: "" },
                { section: "PG Courses", className: "M.A. Hindi", totalFee: 15000, admissionFee: "" },
                { section: "PG Courses", className: "M.A. English", totalFee: 15000, admissionFee: "" },
                { section: "PG Courses", className: "M.A. History", totalFee: 15000, admissionFee: "" },
                { section: "PG Courses", className: "M.A. Political Science", totalFee: 15000, admissionFee: "" },
                { section: "PG Courses", className: "M.A. Geography", totalFee: 17000, admissionFee: "" },
                { section: "PG Courses", className: "M.Com. (Business Admin.)", totalFee: 15000, admissionFee: "" }
            ]
        }
    }
];

export async function seedFees() {
    await dbConnect();
    console.log("Seeding fee structures...");

    for (const data of seedData) {
        await Institution.findOneAndUpdate(
            { id: data.id },
            { $set: { feeStructure: data.feeStructure, name: data.name } },
            { upsert: true, new: true }
        );
        console.log(`Seeded ${data.id}`);
    }

    console.log("Seeding complete.");
}
