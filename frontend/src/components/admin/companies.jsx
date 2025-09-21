import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hook/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setsearchcompanybytext } from '@/redux/companyslice'

const companies = () => {
    useGetAllCompanies()
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
                    <Button onClick={()=>navigate("/admin/companies/create")}>New company</Button>
                </div>
                <CompanyTable/>

            </div>
        </>

    )
}

export default companies
