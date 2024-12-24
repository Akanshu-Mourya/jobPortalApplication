import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = () => {
    const navigate = useNavigate(); // Correct usage of useNavigate
    const jobId = 'asdfghjdfghjgfdsadre76rtgf';
    
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <Button className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" size="icon">
                    <Avatar>
                        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>Company Name</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Title</h1>
                <p className='text-sm text-gray-500'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore in sunt eaque ratione accusamus iure non, sed error unde perferendis vero deleniti reprehenderit rem exercitationem culpa consequuntur repudiandae delectus natus.
                </p>
            </div>
            <div className='flex items-center gap-2 mt-5'>
                <Badge className={'text-[#6A38C2] font-bold'} variant='ghost'>12 Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant='ghost'>Part Time</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant='ghost'>12LPA</Badge>
            </div>
            <div className='flex items-center gap-5 mt-5'>
                <Button onClick={() => navigate(`/description/${jobId}`)} className='hover:bg-slate-100'>
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
