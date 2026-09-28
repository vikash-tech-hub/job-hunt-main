import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobslice';
import { Code, Server, Layers, BarChart, Database, Palette, Cpu, Globe } from 'lucide-react';

const categories = [
    { name: "Frontend Developer", icon: Code },
    { name: "Backend Developer", icon: Server },
    { name: "FullStack Developer", icon: Layers },
    { name: "Data Scientist", icon: BarChart },
    { name: "Data Analyst", icon: Database },
    { name: "Graphic Designer", icon: Palette },
    { name: "DevOps Engineer", icon: Cpu },
    { name: "Remote Jobs", icon: Globe }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="max-w-4xl mx-auto px-4 my-8">
            <div className="text-center mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Popular Categories</h2>
            </div>
            <Carousel className="w-full relative">
                <CarouselContent className="-ml-2 md:-ml-3">
                    {categories.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                            <CarouselItem key={index} className="pl-2 md:pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4">
                                <Button
                                    onClick={() => searchJobHandler(cat.name)}
                                    variant="outline"
                                    className="w-full h-12 rounded-xl bg-white hover:bg-indigo-50 border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 font-medium flex items-center justify-center gap-2 shadow-xs transition-all"
                                >
                                    <Icon className="h-4 w-4 text-indigo-500 shrink-0" />
                                    <span className="truncate text-xs sm:text-sm">{cat.name}</span>
                                </Button>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious className="-left-4 md:-left-6 bg-white border-slate-200 shadow-sm hover:bg-indigo-50" />
                <CarouselNext className="-right-4 md:-right-6 bg-white border-slate-200 shadow-sm hover:bg-indigo-50" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;

