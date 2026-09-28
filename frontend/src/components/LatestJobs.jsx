import React from 'react';
import Latestjobcards from './Latestjobcards';
import { useSelector } from 'react-redux';
import usegetallJobs from '@/hook/usegetalljobs';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LatestJobs = () => {
  usegetallJobs();

  const { alljobs = [] } = useSelector(store => store.job);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Featured Opportunities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Latest & Top <span className="text-indigo-600">Job Openings</span>
          </h2>
        </div>
        <Link 
          to="/jobs" 
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group"
        >
          View all jobs <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {alljobs.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-800">No jobs posted yet</h3>
            <p className="text-sm text-slate-500 mt-1">Check back soon for new opportunities!</p>
          </div>
        ) : (
          <AnimatePresence>
            {alljobs.slice(0, 6).map((job, index) => (
              <motion.div
                key={job._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.08,
                }}
              >
                <Latestjobcards job={job} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;


