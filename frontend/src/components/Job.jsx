import React, { useState } from 'react';
import { Button } from './ui/button';
import { Bookmark, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return "Recently";
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        const days = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
        if (days === 0) return "Today";
        if (days === 1) return "Yesterday";
        return `${days}d ago`;
    };

    const handleSaveJob = (e) => {
        e.stopPropagation();
        setIsSaved(!isSaved);
        toast.success(!isSaved ? "Job saved to bookmarks!" : "Job removed from bookmarks");
    };

    return (
        <div className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between h-full">
            <div>
                {/* Top bar: Posted time & bookmark */}
                <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                        <Clock className="h-3 w-3" />
                        {daysAgoFunction(job?.createdAt)}
                    </span>
                    <Button 
                        onClick={handleSaveJob} 
                        variant="ghost" 
                        size="icon" 
                        className={`h-8 w-8 rounded-full ${isSaved ? "text-indigo-600 bg-indigo-50" : "text-slate-400 hover:text-indigo-600 hover:bg-slate-50"}`}
                    >
                        <Bookmark className={`h-4 w-4 ${isSaved ? "fill-indigo-600" : ""}`} />
                    </Button>
                </div>

                {/* Company info */}
                <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-11 w-11 rounded-xl border border-slate-100 bg-slate-50">
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                        <AvatarFallback className="rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm">
                            {job?.company?.name?.charAt(0)?.toUpperCase() || "C"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                        <h3 className="font-semibold text-slate-800 text-sm truncate group-hover:text-indigo-600 transition-colors">
                            {job?.company?.name || "Company"}
                        </h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3 text-slate-400" /> {job?.location || "India"}
                        </p>
                    </div>
                </div>

                {/* Job Title & Description */}
                <div>
                    <h2 className="font-bold text-slate-900 text-base mb-1.5 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {job?.title}
                    </h2>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {job?.description}
                    </p>
                </div>
            </div>

            {/* Tags & Action Buttons */}
            <div className="pt-4 mt-4 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    <Badge variant="secondary" className="text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-none">
                        {job?.position || 1} Positions
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-semibold bg-amber-50 text-amber-700 hover:bg-amber-100 border-none">
                        {job?.jobtype || "Full Time"}
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-none">
                        {job?.salary} LPA
                    </Badge>
                </div>

                <div className="flex items-center gap-2">
                    <Button 
                        onClick={() => navigate(`/description/${job?._id}`)} 
                        className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs shadow-indigo-600/20"
                    >
                        View Details <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                    <Button 
                        onClick={handleSaveJob} 
                        variant="outline" 
                        className="rounded-xl text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                        {isSaved ? "Saved" : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Job;

