import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import { setsinglejob } from '@/redux/jobslice'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { toast } from 'sonner'
import Navbar from './shared/Navbar'

const Jobdescription = () => {


  const { singlejob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)

  
  const isintiallyapplied = singlejob?.applications?.some(application => application.applicant === user?._id) || false;
 const [isapplied ,setApplied]=useState(isintiallyapplied)
  const { id } = useParams();   // ✅ Correct way
  
  const dispatch = useDispatch()

  const applyhandler = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/application/apply/${id}`, 
      { withCredentials: true }
    )
    console.log(res.data)   // ab yaha JSON aayega
    if (res.data.success) {
      setApplied(true)//updatee local state
      const updatesinglejob={...singlejob,applications:[...singlejob.applications,{applicant:user?._id}]}
      dispatch(setsinglejob(updatesinglejob))
      toast.success(res.data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.response?.data?.message || "Something went wrong")
  }
}

//  8:35 tk.....................
// ....................
  useEffect(() => {
    const fetchsinglejob = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/job/get/${id}`, {
          withCredentials: true,
        })
        if (res.data.success) {
          dispatch(setsinglejob(res.data.job))
          setApplied(res.data.job.applications.some(application=>application.applicant===user?._id))
        }
      } catch (error) {
        console.error("Error fetching job:", error)
      }
    }
    if (id) fetchsinglejob();   // ✅ only call API when id is available
  }, [id, dispatch, user?._id]);

  return (
    <>
    <Navbar/>
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl'>{singlejob?.title}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-blue-700 font-bold' variant='ghost'>{singlejob?.position}</Badge>
            <Badge className='text-[#f83002] font-bold' variant='ghost'>{singlejob?.jobtype}</Badge>
            <Badge className='text-[#7209b7] font-bold' variant='ghost'>{singlejob?.salary} LPA</Badge>
          </div>
        </div>

        <Button onClick={isapplied ? null : applyhandler}
          variant="outline"
          className={`rounded-lg ${isapplied ? "bg-gray-600 cursor-not-allowed" : "text-[#7209b7]"}`}
        >
          {isapplied ? "Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>
        Job Description
      </h1>

      <div className='my-4'>
        <h1 className='font-bold my-1'>Role:
          <span className='pl-4 font-normal text-gray-800'>{singlejob?.title}</span>
        </h1>
        <h1 className='font-bold my-1'>Location:
          <span className='pl-4 font-normal text-gray-800'>{singlejob?.location}</span>
        </h1>
        <h1 className='font-bold my-1'>Description:
          <span className='pl-4 font-normal text-gray-800'>{singlejob?.description}</span>
        </h1>
        <h1 className='font-bold my-1'>Experience:
          <span className='pl-4 font-normal text-gray-800'>{singlejob?.experiencelevel}</span>
        </h1>
        <h1 className='font-bold my-1'>Salary:
          <span className='pl-4 font-normal text-gray-800'>{singlejob?.salary} LPA</span>
        </h1>
        <h1 className='font-bold my-1'>Total applicant:
          <span className='pl-4 font-normal text-gray-800'>{singlejob?.applications?.length}</span>
        </h1>
        <h1 className='font-bold my-1'>Posted date:
          <span className='pl-4 font-normal text-gray-800'>
            {singlejob?.createdAt ? singlejob.createdAt.split('T')[0] : "N/A"}
          </span>

        </h1>
      </div>
    </div>
    </>
    
    
  )
}

export default Jobdescription
