import { setAllAppliedJob } from "@/redux/jobslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const useGetAppliedJob=()=>{
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchAppliedJobs=async()=>{
            try {
                const res=await axios.get(`${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/application/get`,{withCredentials:true})
                
                if (res.data.success){
                    dispatch(setAllAppliedJob(res.data.application))
                    
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAppliedJobs()
    },[])
}

export default useGetAppliedJob