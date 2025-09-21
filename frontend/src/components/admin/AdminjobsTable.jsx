import React, { useEffect, useState } from 'react'
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminjobsTable = () => {
  const { searchcompanybytext = "" } = useSelector(
    (store) => store.company || {}
  )
  const { alladminjobs = [] } = useSelector((store) => store.job)

  const navigate = useNavigate()
  const [filterjobs, setFilterjobs] = useState([]) // ✅ start empty

  useEffect(() => {
    const filtered =
      alladminjobs.length > 0
        ? alladminjobs.filter((job) => {
            if (!searchcompanybytext) return true
            return job.company?.name
              ?.toLowerCase()
              .includes(searchcompanybytext.toLowerCase())
          })
        : []

    setFilterjobs(filtered)
  }, [alladminjobs, searchcompanybytext])

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>

        {/* ✅ Table Header */}
        <TableHeader>
          <TableRow>
            <TableHead>Company name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        {/* ✅ Table Body */}
        <TableBody>
          {filterjobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven&apos;t posted any job yet
              </TableCell>
            </TableRow>
          ) : (
            filterjobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.company?.name || "N/A"}</TableCell>
               
                <TableCell>{job.title || "N/A"}</TableCell>
                <TableCell>
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                        <Eye className="w-4"/>
                        <span>Applicant</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminjobsTable
