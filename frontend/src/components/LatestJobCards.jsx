import { Badge } from './ui/badge'
import React from 'react'

const LatestJobCards = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white  border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>Company Name</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Job Title</h1>
                <p className='text-sm text-gray-600 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, voluptate reiciendis nisi quidem praesentium eaque consequuntur corporis quasi, aspernatur molestias impedit perferendis libero sed nostrum et iure quam repudiandae vero.</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-[#6A38C2] font-bold'} variant='ghost'>12 Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant='ghost'>Part Time</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant='ghost'>12LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards