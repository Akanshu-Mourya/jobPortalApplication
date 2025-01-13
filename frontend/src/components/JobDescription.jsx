
import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { user } = useSelector(store => store.auth)
    const { singleJob } = useSelector(store => store.job);

    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant == user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            console.log(res.data);

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id])

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-5'>
                {/* Job Details */}
                <div className='flex flex-col md:flex-1'>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-5'>
                        <Badge className={'text-[#6A38C2] font-bold'} variant='ghost'>{singleJob?.position} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant='ghost'>{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant='ghost'>{singleJob?.salary}LPA</Badge>
                    </div>
                </div>

                {/* Apply Button */}
                <div className='mt-5 md:mt-0'>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`px-5 py-3 rounded-md text-sm cursor-pointer text-white ${isApplied ? 'bg-gray-600 cursor-not-allowed hover:bg-black' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
            </div>

            <h1 className='border-b-2 border-b-gray-300 font-medium py-4 mt-8'>Job Description</h1>
            <div className='my-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.exprienceLevel} yrs</span></h1>
                </div>

                <div>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                </div>
            </div>
        </div>
    )
}

export default JobDescription;
