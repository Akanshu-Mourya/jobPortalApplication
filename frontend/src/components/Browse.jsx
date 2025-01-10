
import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>
                    Search Results ({allJobs.length > 0 ? allJobs.length : "No"} Jobs Found)
                </h1>

                {/* Job Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        allJobs.length <= 0 ? (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
                                <span>No jobs available based on your search criteria.</span>
                            </div>
                        ) : (
                            allJobs.map((job) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3 }}
                                    key={job._id}
                                >
                                    <Job job={job} />
                                </motion.div>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Browse;
