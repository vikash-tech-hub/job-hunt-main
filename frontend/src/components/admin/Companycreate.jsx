import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companyslice'

const Companycreate = () => {
  const navigate = useNavigate()
  const [companyname, setCompanyname] = useState("")
  const dispatch = useDispatch()
  const registerednewcompany = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/company/register`, { companyName: companyname  }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        const companyid = res?.data?.company?._id
        navigate(`/admin/companies/${companyid}`)
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto'>

        <div className='my-10'>
          <h1 className='font-bold text-2xl'>Your Company name</h1>
          <p className='text-gray-500'>what would you like to give your company name? you can change this later</p>
        </div>

        <Label>Company name</Label>
        <Input
          type='text'
          className='my-2'
          placeholder='jobhunt microsoft etc'
          onChange={(e) => setCompanyname(e.target.value)}

        />
        <div className='flex items-center gap-2 my-10'>
          <Button variant='outline' onClick={() => navigate("/admin/companies")}>Cancel</Button>
          <Button onClick={() => registerednewcompany()}>Continue</Button>

        </div>

      </div>
    </div>
  )
}

export default Companycreate
