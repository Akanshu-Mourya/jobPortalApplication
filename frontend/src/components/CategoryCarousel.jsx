import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "Java Developer",
    "Python Developer",
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="relative">
            <Carousel className="w-full max-w-4xl mx-auto my-20">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="flex justify-center items-center md:basis-1/2 lg:basis-1/3 p-1">
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="black"
                                className="w-full md:w-auto rounded-full bg-gray-50 text-gray-800 font-semibold py-2 px-4 hover:bg-[#6A38C2] hover:text-white transition-colors duration-300">
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Buttons */}
                <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 transform -translate-y-1/2">
                    <CarouselPrevious className="text-gray-800 hover:text-[#6A38C2] transition-colors duration-300" />
                    <CarouselNext className="text-gray-800 hover:text-[#6A38C2] transition-colors duration-300" />
                </div>
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
