import React, { useEffect, useState } from 'react'
import Filtercard from './Filtercard'
import Job from './Job'
import Navbar from './shared/Navbar'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
const Jobs = () => {
  const { alljobs, searchedQuery } = useSelector(store => store.job);
  const [filterjob, setFilterJobs] = useState(alljobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = alljobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          String(job.salary).toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(alljobs);
    }
  }, [alljobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/5">
            <Filtercard />
          </div>

          {filterjob.length === 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                <AnimatePresence>
                  {filterjob.map((job, index) => (
                    <motion.div
                      key={job?._id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.2, // yahan se ek ek karke aayega
                      }}
                      className="shadow-lg rounded-xl p-4 bg-white"
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
