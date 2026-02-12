import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    designation: {
        type: String,
        required: [true, "Please provide a designation"],
    },
    image: {
        type: String,
    },
    institution: {
        type: String,
        enum: ["LPS", "Marudhar", "College", "Hostel"],
        required: [true, "Please provide an institution"],
    },
    order: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

export default mongoose.models.Faculty || mongoose.model("Faculty", FacultySchema);
