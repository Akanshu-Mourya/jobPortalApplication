import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import Navbar from "./shared/Navbar";
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const JobList = () => {
    const navigate = useNavigate();

    const { companyId } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search); // Fix: access query params from location.search
    const companyName = queryParams.get('name');
    const companyLogo = queryParams.get('logo');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/getJobByCompany/${companyId}`);
                setJobs(response.data.jobs);
            } catch (err) {
                // setError("Failed to load jobs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [companyId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <div className="flex items-center gap-4 mb-6">
                    {companyLogo && (
                        <img
                            src={companyLogo}
                            alt={`${companyName} logo`}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    )}
                    <h1 className="text-3xl font-bold"> {companyName}</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <div key={job._id} className="bg-white border p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>

                                <div className="flex gap-3 mb-4">
                                    <Badge className="bg-[#6A38C2] text-white hover:bg-[#7209b7]">{job.jobType}</Badge>
                                    <Badge className="bg-[#F83002] text-white hover:bg-[#F83002]">{job.exprienceLevel} years</Badge>
                                    <Badge className="bg-[#7209b7] text-white hover:bg-[#7209b7]">{job.salary} LPA</Badge>
                                </div>

                                <p className="text-gray-700 mb-4">{job.description}</p>
                                <p className="text-sm text-gray-500">Location: {job.location}</p>

                                <div className='flex items-center gap-5 mt-5'>
                                    <Button onClick={() => navigate(`/description/${job?._id}`)} className='hover:bg-slate-100'>
                                        Details
                                    </Button>
                                    <Button className='bg-[#6A38C2] text-white hover:bg-black'>
                                        Save For Later
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center">No jobs available for this company at the moment.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobList;
