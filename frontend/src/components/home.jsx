import React, {  useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hook/usegetalljobs'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'
const home = () => {
  useGetAllJobs()
  const user=useSelector(store=>store.auth)
  const navigate=useNavigate()


  useEffect(()=>{
      if (user?.user?.role==='recruiter'){
        navigate("/admin/companies")
      }
  },[]);
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>

      
    </div>
  )
}

export default home
