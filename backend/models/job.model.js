import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }], // Changed to array of strings
    salary: { type: Number, required: true }, // Changed to Number
    location: { type: String, required: true },
    jobtype: { type: String, required: true },
    experiencelevel: { type: Number, required: true },
    position: { type: Number, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }]
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
