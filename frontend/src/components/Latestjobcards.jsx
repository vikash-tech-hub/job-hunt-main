import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { MapPin, Briefcase, IndianRupee, Sparkles } from 'lucide-react';

const Latestjobcards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job?._id}`)} 
            className="group p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
        >
            <div>
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

                <div>
                    <h2 className="font-bold text-slate-900 text-base mb-1.5 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {job?.title}
                    </h2>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {job?.description}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-4 border-t border-slate-100">
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
        </div>
    );
};

export default Latestjobcards;

