import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobslice'
const category = [
    "frontend Developer",
    "Backend Developer",

    "FullStack Developer",
    "Data Scientist",
    "Data Analyst",
    "Graphics Designer"
]
const CategoryCarousel = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const searchJobhandler=(query)=>{
            dispatch(setSearchedQuery(query))
            navigate("/browse")
        }
    return (
        <div>
            <Carousel className='w-full max-w-xl mx-auto my-10'>
                <CarouselContent >
                    {
                        category.map((cat, index) => (
                            <CarouselItem className='md:basis-1/2 lg-basis-1/3'>
                                <Button onClick={()=>searchJobhandler(cat)} variant='outline' className='rounded-full'>{cat}</Button>
                            </CarouselItem>
                       ) )
                    }

                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
