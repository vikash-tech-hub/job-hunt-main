import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery} from '@/redux/jobslice'
import usegetallJobs from '@/hook/usegetalljobs'
import { AnimatePresence, motion } from 'framer-motion'
const randomjobs=[1,2,3]

const Browse = () => {
  usegetallJobs()
  const {alljobs}=useSelector(store=>store.job)
  const dispatch=useDispatch()
  useEffect(()=>{
    return()=>{
      dispatch(setSearchedQuery(""))
    }
  },[])
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10'>

        <h1 className='font-bold  text-lg my-10'>Search Engine ({alljobs.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
           <AnimatePresence>
      {alljobs.map((job, index) => (
        <motion.div
          key={job._id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{
            duration: 0.4,
            delay: index * 0.2, // ek ek karke aaye
          }}
          className="shadow-lg rounded-xl p-4 bg-white"
        >
          <Job job={job} />
        </motion.div>
      ))}
    </AnimatePresence>
        </div>
        
      </div>
    </div>
  )
}

export default Browse
