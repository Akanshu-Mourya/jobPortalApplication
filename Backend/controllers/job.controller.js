import { Job } from "../models/job.model.js";

// admin post karega jobs
export const postJob = async (req, resp) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return resp.status(400).json({
                message: "Something is missing",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary: Number(salary),
            location,
            jobType,
            exprienceLevel: experience,
            position,
            company: companyId,
            created_by: userId,
        });
        return resp.status(201).json({
            message: "New job created successfully..",
            job,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}
// student ke liye
export const getAlljobs = async (req, resp) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { discription: { $regex: keyword, $options: "i" } },

            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        // console.log(jobs);

        if (!jobs) {
            return resp.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return resp.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
//student
export const getJobById = async (req, resp) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
        });
        if (!job) {
            return resp.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return resp.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAdminJobs = async (req, resp) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company",
            createdAt: -1
        })

        if (!jobs) {
            return resp.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return resp.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}
export const getJobsByCompanyById = async (req, resp) => {
    try {
        const companyId = req.params.id;
        // console.log(companyId);

        const jobs = await Job.find({ company: companyId });

        if (!jobs || jobs.length === 0) {
            return resp.status(404).json({
                message: "Jobs not found for the given company",
                success: false,
            });
        }

        return resp.status(200).json({
            jobs,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return resp.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};
