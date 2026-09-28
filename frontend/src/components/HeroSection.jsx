import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search, Sparkles, TrendingUp, MapPin, Briefcase } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobslice';
import { useNavigate } from 'react-router-dom';

const popularKeywords = ['Frontend', 'Backend', 'FullStack', 'React', 'Node.js', 'Remote', 'Designer'];

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (e) => {
        if (e) e.preventDefault();
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    const handleQuickSearch = (keyword) => {
        dispatch(setSearchedQuery(keyword));
        navigate("/browse");
    };

    return (
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
            {/* Background subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs sm:text-sm font-semibold mb-6 shadow-xs animate-fade-in">
                    <Sparkles className="h-4 w-4 text-indigo-600" />
                    <span>#1 Trusted Job & Internship Portal</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
                    Discover, Apply & Land <br className="hidden sm:inline" />
                    Your <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Dream Job</span> Today
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Connect with thousands of verified employers, top tech companies, and exciting startups offering high-impact roles.
                </p>

                {/* Search Bar */}
                <form 
                    onSubmit={searchJobHandler}
                    className="max-w-2xl mx-auto bg-white p-2 rounded-2xl sm:rounded-full shadow-lg shadow-indigo-900/5 border border-slate-200/90 flex flex-col sm:flex-row items-center gap-2 focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-500 transition-all"
                >
                    <div className="flex items-center gap-3 px-4 w-full">
                        <Search className="h-5 w-5 text-slate-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Job title, keywords, or company..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full py-2.5 text-sm sm:text-base text-slate-800 placeholder:text-slate-400 bg-transparent outline-none"
                        />
                    </div>
                    <Button 
                        type="submit" 
                        className="w-full sm:w-auto px-8 py-3 rounded-xl sm:rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-600/20 transition-all"
                    >
                        Search Jobs
                    </Button>
                </form>

                {/* Quick Search Tags */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5 text-indigo-500" /> Popular:
                    </span>
                    {popularKeywords.map((item) => (
                        <button
                            key={item}
                            onClick={() => handleQuickSearch(item)}
                            className="text-xs font-medium px-3 py-1 rounded-full bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 transition-colors shadow-2xs"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

