import mongoose from "mongoose";

const HostelSchema = new mongoose.Schema({
    prospectus: { type: String, default: "" },
    about: {
        title: { type: String, default: "Your Second Home for Holistic Growth." },
        description: { type: String, default: "Spread across a lush 65-acre campus..." },
        stats: [{
            value: String,
            label: String,
        }],
        features: [{
            icon: String,
            text: String,
        }]
    },
    gallery: [{
        src: String,
        title: String,
    }],
    facilities: [{
        image: String,
        title: String,
        desc: String,
    }],
    fees: {
        table: [{
            className: String,
            nonAc: String,
            ac: String,
        }],
        shortDuration: {
            nonAc: { type: String, default: "₹10,000" },
            ac: { type: String, default: "₹12,000" },
        },
        cancellation: {
            penalty: { type: String, default: "₹10,000" },
            schoolDate: { type: String, default: "August 15" },
            collegeDate: { type: String, default: "October 30" },
        }
    },
    rules: [{
        id: String,
        title: String,
        content: String,
        icon: String,
    }],
    scholarships: [{
        title: String,
        desc: String,
    }],
    banking: {
        accountName: { type: String, default: "Marudhar Mahila Shikshan Sangh" },
        bankAndBranch: { type: String, default: "ICICI Bank – Rani Branch" },
        accountNumber: { type: String, default: "684605601184" },
        ifscCode: { type: String, default: "ICIC0006846" },
    }
}, { timestamps: true });

export default mongoose.models.Hostel || mongoose.model("Hostel", HostelSchema);
