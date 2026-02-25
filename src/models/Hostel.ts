import mongoose from "mongoose";

const HostelSchema = new mongoose.Schema({
    amenities: [{
        id: String,
        label: String,
        desc: String,
        image: String,
    }],
    chetnaPrabha: {
        title: String,
        description: String,
        subtitle: String,
        items: [{
            label: String,
            image: String,
        }]
    },
    pillarsOfCare: [{
        id: String,
        label: String,
        desc: String,
        image: String,
    }],
    happinessCouncil: {
        title: String,
        description: String,
        items: [{
            label: String,
            image: String,
        }]
    },
    foodMenu: {
        title: String,
        description: String,
        secondaryDescription: String,
        images: [String],
        weeklyMenu: {
            monday: [String],
            tuesday: [String],
            wednesday: [String],
            thursday: [String],
            friday: [String],
            saturday: [String],
            sunday: [String],
        }
    },
    rules: {
        content: String,
    },
    fees: {
        content: String,
    },
    admission: {
        content: String,
    },
    gallery: [String],
}, { timestamps: true });

export default mongoose.models.Hostel || mongoose.model("Hostel", HostelSchema);
