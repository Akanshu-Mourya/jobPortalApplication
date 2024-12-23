import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyjob = async (req, resp) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return resp.status(400).json({
                message: "Job id is required.",
                success: false
            })
        }

        // check if the user has already applied for the job

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return resp.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }
        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return resp.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        //create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });
        job.applications.push(newApplication._id);
        await job.save();
        return resp.status(201).json({
            message: "Job applied successfully",
            success: true
        });
    } catch (error) {
        console.log(error);

    }
};
export const getAppliedJobs = async (req, resp) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });
        if (!application) {
            return resp.status(404).json({
                message: "No Applications",
                success: false
            });
        }
        return resp.status(200).json({
            application,
            success: true
        });
    } catch (error) {
        console.log(error);

    }
}
// admin dekhega kitne users ne apply kiya hai
export const getApplicants = async (req, resp) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        if (!job) {
            return resp.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        return resp.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, resp) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return resp.status(400).json({
                message: 'status is requires',
                success: false
            });
        }
        //find the application by application id
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return resp.status(404).json({
                message: "Applaction not found",
                success: false
            });
        }
        // update the status

        application.status = status.toLowerCase();
        await application.save();
        return resp.status(200).json({
            message: "Status updated successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}