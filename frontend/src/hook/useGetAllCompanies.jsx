import { setCompanies } from '@/redux/companyslice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_ORIGIN_URL || '';
        const res = await axios.get(
          `${baseUrl}/api/v1/company/get`,
          { withCredentials: true }
        )
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies))
        }
      } catch (error) {
        console.log(error)
      }
    }
  fetchCompanies()
  }, [])
}

export default useGetAllCompanies
