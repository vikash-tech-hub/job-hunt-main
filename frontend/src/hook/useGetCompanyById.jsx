import { setSingleCompany } from '@/redux/companyslice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_ORIGIN_URL || '';
        const res = await axios.get(
          `${baseUrl}/api/v1/company/get/${companyId}`,
          { withCredentials: true }
        )
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company))
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (companyId) fetchSingleCompany()
  }, [companyId, dispatch])
}

export default useGetCompanyById
