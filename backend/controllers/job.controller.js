import Job from '../models/job.model.js';

// Admin posts a job
export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobtype,
            experience,
            position,
            companyId
        } = req.body;

        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobtype || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        const newJob = await Job.create({
            title,
            description,
            requirements: requirements.split(',').map(r => r.trim()), // array of strings
            salary: Number(salary),
            location,
            jobtype,
            experiencelevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully",
            success: true,
            job: newJob
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || req.query.keywords || null;

        let query = {};

        if (keyword) {
            query = {
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } }
                ]
            };
        }

        const jobs = await Job.find(query)
            .populate({ path: 'company' })
            .sort({ createdAt: -1 });

        // agar keyword diya gaya hai but koi job nahi mila
        if (keyword && jobs.length === 0) {
            return res.status(200).json({
                message: "No jobs found for given keyword",
                success: true,
                jobs: []
            });
        }

        return res.status(200).json({
            message: "Jobs found",
            success: true,
            jobs
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const foundJob = await Job.findById(jobId).populate({
            path: "applications"
        });

        if (!foundJob) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Job found",
            success: true,
            job: foundJob
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        })

        if (!jobs.length) {
            return res.status(404).json({
                message: "No jobs found for this admin",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Jobs found for this admin",
            success: true,
            jobs
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
