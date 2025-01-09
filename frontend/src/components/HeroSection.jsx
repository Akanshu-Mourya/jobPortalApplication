import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="text-center bg-gray-50 py-1 px-1">
      <div className="flex flex-col gap-5 my-10 max-w-4xl mx-auto">
        {/* Tagline */}
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm md:text-base">
          No. 1 Job Hunt Website
        </span>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold leading-snug">
          Search, Apply & <br /> Get Your{' '}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Unlock your potential, discover your dream job, and take the next step towards a successful career!
        </p>

        {/* Search Input */}
        <div className="flex w-full max-w-xl shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto h-12">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full h-full text-sm md:text-base"
            aria-label="Search for jobs"
          />
          <Button
            onClick={searchJobHandler}
            className="p-2 rounded-r-full hover:bg-[#8759d8] bg-[#6A38C2] text-white flex items-center justify-center h-full"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
