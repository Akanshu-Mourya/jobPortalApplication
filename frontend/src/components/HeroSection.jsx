import { Search } from 'lucide-react'
import React from 'react'

const HeroSection = () => {
  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>

        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span> </h1>
        <p>"Job Hunt: Unlock your potential, discover your dream job, and take the next step towards a successful career!"</p>
        <div className='flex w-[30%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto h-10'>
          <input
            type="text"
            placeholder='Find Your dream jobs'
            className='outline-none border-none w-full h-full'
          />
          <button
            aria-label="Search"
            className="p-2 rounded-r-full hover:bg-[#8759d8] bg-[#6A38C2] text-white flex items-center justify-center h-full"
          >
            <Search className="h-10 w-6 text-white " />
          </button>
        </div>

      </div>
    </div>
  )
}

export default HeroSection