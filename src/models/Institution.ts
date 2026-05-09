import mongoose from "mongoose";

const FeeClassSchema = new mongoose.Schema({
    section: { type: String, default: "" },
    className: { type: String, required: true },
    totalFee: { type: Number, required: true },
    admissionFee: { type: String, default: "" }
});

const InstitutionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true, // e.g., 'marudhar', 'lps', 'college'
    },
    name: {
        type: String,
        required: true,
    },
    tagline: {
        type: String,
    },
    logo: {
        type: String,
    },
    affiliation: {
        type: String, // e.g., 'RBSE', 'CBSE', 'JNVU'
    },
    principalMessage: {
        message: String,
        quote: String,
        principalName: String,
        principalPhoto: String,
    },
    about: {
        content: String,
    },
    vision: {
        content: String,
    },
    mission: {
        content: String,
    },
    uniform: {
        content: String,
    },
    rules: {
        content: String,
    },
    contact: {
        address: String,
        phone: String,
        email: String,
    },
    socialLinks: {
        facebook: String,
        instagram: String,
        youtube: String,
        twitter: String,
    },
    gallery: [String],
    feeStructure: {
        year: String,
        installments: { type: Number, default: 2 },
        classes: [FeeClassSchema]
    }
}, { timestamps: true });

export default mongoose.models.Institution || mongoose.model("Institution", InstitutionSchema);
