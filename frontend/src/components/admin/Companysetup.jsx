import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hook/useGetCompanyById'

const Companysetup = () => {
  const params = useParams()
  useGetCompanyById(params.id)

  const { singleCompany } = useSelector(store => store.company ?? { singleCompany: null })

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
  })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // Handle text input changes
  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  // Handle file input changes
  const changeFileHandler = e => {
    const selectedFile = e.target.files?.[0]
    setFile(selectedFile || null)
  }

  // Form submission
  const submitHandler = async e => {
    e.preventDefault()

    // Basic validation
    if (!input.name || !input.description || !input.website || !input.location) {
      toast.error('Please fill all required fields')
      return
    }

    const formData = new FormData()
    formData.append('name', input.name)
    formData.append('description', input.description)
    formData.append('website', input.website)
    formData.append('location', input.location)
    if (file) formData.append('file', file)

    try {
      setLoading(true)
      const res = await axios.put(`${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/company/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })

      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/companies')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // Initialize form with company data
  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || '',
        description: singleCompany.description || '',
        website: singleCompany.website || '',
        location: singleCompany.location || '',
      })
      setFile(null)
    }
  }, [singleCompany])

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate('/admin/companies')}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company name</Label>
              <Input type="text" name="name" value={input.name} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Description</Label>
              <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Website</Label>
              <Input type="text" name="website" value={input.website} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Location</Label>
              <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Logo</Label>
              <Input type="file" accept="image/*" onChange={changeFileHandler} />
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Logo Preview"
                  className="mt-2 h-20 w-20 object-contain border rounded"
                />
              )}
            </div>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />}
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Companysetup
