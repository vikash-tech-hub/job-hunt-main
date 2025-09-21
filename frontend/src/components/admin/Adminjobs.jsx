import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setsearchcompanybytext } from '@/redux/companyslice'
import AdminjobsTable from './AdminjobsTable'
import useGetAllAdminjobs from '@/hook/useGetAllAdminJobs'

const Adminjobs = () => {
    useGetAllAdminjobs()
    const [input,setInput]=useState("")
    const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(setsearchcompanybytext(input))
    },[input])
    return (
        <>
            <Navbar />
            <div className='  max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className='w-fit'
                        placeholder='Filter by name'
                        onChange={(e)=>setInput(e.target.value)} />
                    <Button onClick={()=>navigate("/admin/jobs/create")}>New Jobs</Button>
                </div>
                <AdminjobsTable/>
            </div>
        </>

    )
}

export default Adminjobs
