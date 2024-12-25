import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "Java Developer",
    "Python Developer",
]

const CategoryCarousel = () => {
    return (
        <div>
            <Carousel className='w-full max-w-xl mx-auto my-20 '>
                <CarouselContent>
                    {
                        category.map((category, index) => {
                            return (
                                <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                                    <Button variant="black" className="rounded-full bg-gray-50 " >
                                        {category}
                                    </Button>
                                </CarouselItem>
                            )
                        })
                    }
                </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
