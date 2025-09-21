import React from 'react'
import Latestjobcards from './Latestjobcards'
import { useSelector } from 'react-redux'
import usegetallJobs from '@/hook/usegetalljobs' // assuming you placed it in hooks folder
import { AnimatePresence,motion } from 'framer-motion'

const LatestJobs = () => {
  usegetallJobs(); // fetch jobs on mount

  const { alljobs } = useSelector(store => store.job)

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'>
        <span className='text-[#6A38C2]'>Latest & Top </span>Job Openings
      </h1>

     <div className="grid grid-cols-3 gap-4 my-5">
  {alljobs.length === 0 ? (
    <span>No jobs available</span>
  ) : (
    <AnimatePresence>
      {alljobs.slice(0, 9).map((job, index) => (
        <motion.div
          key={job._id}
          initial={{ opacity: 0, y: 50 }}   // neeche se aaye
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}     // exit par upar chale jaaye
          transition={{
            duration: 0.4,
            delay: index * 0.15,            // ek ek karke aaye
          }}
          className="shadow-lg rounded-xl p-4 bg-white"
        >
          <Latestjobcards job={job} />
        </motion.div>
      ))}
    </AnimatePresence>
  )}
</div>
    </div>
  )
}

export default LatestJobs

