import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobslice';
import usegetallJobs from '@/hook/usegetalljobs';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SearchX } from 'lucide-react';

const Browse = () => {
  usegetallJobs();
  const { alljobs = [], searchedQuery = "" } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  const filteredJobs = alljobs.filter((job) => {
    if (!searchedQuery) return true;
    const q = searchedQuery.toLowerCase();
    return (
      job.title?.toLowerCase().includes(q) ||
      job.description?.toLowerCase().includes(q) ||
      job.location?.toLowerCase().includes(q) ||
      job.company?.name?.toLowerCase().includes(q) ||
      String(job.salary).toLowerCase().includes(q) ||
      job.jobtype?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Browse Opportunities
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Found <span className="font-semibold text-indigo-600">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'position' : 'positions'} {searchedQuery && `matching "${searchedQuery}"`}
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by keyword, location..."
              value={searchedQuery}
              onChange={(e) => dispatch(setSearchedQuery(e.target.value))}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
            />
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-xs">
            <SearchX className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800">No jobs match your search</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try searching with different keywords or browse all jobs without search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id || index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.05,
                  }}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Browse;

