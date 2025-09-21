import React, { use, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import App from '@/App'
import AppliedjobTable from './AppliedjobTable'
import Updateprofiledialog from './Updateprofiledialog'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetAppliedJob from '@/hook/useGetAppliedJob'
// const skill = ['JavaScript', 'React', 'CSS', 'HTML']
const Profile = () => {
  useGetAppliedJob()
  const [open,setOpen]=useState(false)
  const { user } = useSelector(store => store.auth);

  const isresume = true
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex  items-center gap-4'>
            <Avatar className='h-24 w-24'>
              <AvatarImage src={user?.profile?.profilephoto}
              />
            </Avatar>
            <div>
              <h1 className='font-medium'>{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)}className='text-right' variant="outline"><Pen /></Button>
        </div>
        <div className='my-5'>

          <div className='flex items-centergap-3 my-2'>
            <Mail />
            <span>{user?.email}</span>
          </div>

          <div className='flex items-centergap-3 my-2'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
          <div>
            <h1 className="font-semibold mb-2">Skills</h1>
            {user?.profile?.skills.length !== 0 ? (
              <div className="flex flex-wrap gap-2">
                {user?.profile?.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))}
              </div>
            ) : (
              <span className="text-gray-500 text-sm">Na</span>
            )}
          </div>
          <div className='grid max-wsm items-center gap-1.5'>
            <Label className='text-md font-bold'>Resume</Label>
            {
              isresume ? (
                <a
                  href={user?.profile?.resume}
                  download={user?.profile?.resumeoriginalname || "resume.pdf"}
                  className='text-blue-500 w-full hover:underline cursor-pointer'
                >
                  {user?.profile?.resumeoriginalname}
                </a>
              ) : <span>Na</span>
            }
          </div>

        </div>

      </div>
      <div className='max-w-7xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>
          Applied jobs
        </h1>
        {/* application table */}
        <AppliedjobTable />


      </div>
      <Updateprofiledialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile
