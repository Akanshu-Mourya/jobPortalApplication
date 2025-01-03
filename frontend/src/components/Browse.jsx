import React from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';

const randomJobs = [1, 2, 3];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search Results ({randomJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4 mt-5'>
          {
            randomJobs.map((item, index) => {
              return (
                <Job key={index} />
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Browse;

