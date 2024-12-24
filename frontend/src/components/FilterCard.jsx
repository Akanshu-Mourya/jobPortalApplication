import { Radio } from 'lucide-react';
import React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Indore'],
  },
  {
    filterType: 'Industry',
    array: [
      'Frontend Developer',
      'Backend Developer',
      'Data Science',
      'Graphic Designer',
      'FullStack Developer',
      'Java Developer',
      'Python Developer',
    ],
  },
  {
    filterType: 'Salary',
    array: ['0-40k', '42-1lakh', '1lakh to 5lakh'],
  },
];

const FilterCard = () => {
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="text-lg font-bold">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup >
        {
          filterData.map((data, index) => (
            <div>
              <h2 className='font-bold text-lg'>{data.filterType}</h2>
              <div>
                {data.array.map((item, itemIndex) => (

                  <div className='flex items-center space-x-2 my-2'> 
                    <RadioGroupItem id={item} value={item} />
                    <Label htmlFor={item}>{item}</Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
