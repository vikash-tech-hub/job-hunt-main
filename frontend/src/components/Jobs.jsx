import React, { useEffect, useState } from 'react';
import Filtercard from './Filtercard';
import Job from './Job';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchX, Briefcase } from 'lucide-react';
import usegetallJobs from '@/hook/usegetalljobs';

const Jobs = () => {
  usegetallJobs();
  const { alljobs = [], searchedQuery = "" } = useSelector((store) => store.job);
  const [filterjob, setFilterJobs] = useState(alljobs);

  useEffect(() => {
    if (searchedQuery) {
      const q = searchedQuery.toLowerCase();
      const filteredJobs = alljobs.filter((job) => {
        return (
          job.title?.toLowerCase().includes(q) ||
          job.description?.toLowerCase().includes(q) ||
          job.location?.toLowerCase().includes(q) ||
          job.company?.name?.toLowerCase().includes(q) ||
          String(job.salary).toLowerCase().includes(q) ||
          job.jobtype?.toLowerCase().includes(q)
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(alljobs);
    }
  }, [alljobs, searchedQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar Filter */}
          <aside className="w-full md:w-64 lg:w-72 shrink-0">
            <Filtercard />
          </aside>

          {/* Job Listings Area */}
          <section className="flex-1 w-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  {searchedQuery ? `Results for "${searchedQuery}"` : "All Available Jobs"}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing {filterjob.length} {filterjob.length === 1 ? "job" : "jobs"} available
                </p>
              </div>
            </div>

            {filterjob.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
                <SearchX className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-800">No matching jobs found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your search criteria or resetting filters to see more results.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                <AnimatePresence>
                  {filterjob.map((job, index) => (
                    <motion.div
                      key={job?._id || index}
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
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;

