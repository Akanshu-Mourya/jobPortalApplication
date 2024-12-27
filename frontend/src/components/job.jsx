import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate(); // Correct usage of useNavigate
    // const jobId = 'asdfghjdfg
    // hjgfdsadre76rtgf';
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert ms to days
    }
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) <= 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`} </p>
                <Button className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" size="icon">
                    <Avatar>
                        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-500'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-5'>
                <Badge className={'text-[#6A38C2] font-bold'} variant='ghost'>{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant='ghost'>{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant='ghost'>{job?.salary} LPA</Badge>
            </div>
            <div className='flex items-center gap-5 mt-5'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} className='hover:bg-slate-100'>
                    Details
                </Button>
                <Button className='bg-[#6A38C2] text-white hover:bg-black'>
                    Save For Later
                </Button>
            </div>
        </div>
    );
}

export default Job;
