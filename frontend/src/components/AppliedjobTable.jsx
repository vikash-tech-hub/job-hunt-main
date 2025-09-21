import React from 'react'
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedjobTable = () => {
  const { allAppliedJob } = useSelector(store => store.job)

  return (
    <div>
      <Table>
        <TableCaption>
          List of applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className='text-right'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(allAppliedJob?.length ?? 0) === 0 ? (
  <TableRow>
    <TableCell colSpan={4} className="text-center text-gray-500">
      You have not applied for any job yet
    </TableCell>
  </TableRow>
) : (
  allAppliedJob?.map((appliedjob) => (
    <TableRow key={appliedjob?._id}>
      <TableCell>{appliedjob.createdAt?.split("T")[0]}</TableCell>
      <TableCell>{appliedjob?.job?.title}</TableCell>
      <TableCell>{appliedjob?.job?.company?.name}</TableCell>
     <TableCell className="text-right">
  <Badge
    className={
      appliedjob?.status === "accepted"
        ? "bg-green-500 text-white"
        : appliedjob?.status === "rejected"
        ? "bg-red-500 text-white"
        : "bg-gray-500 text-white"
    }
  >
    {appliedjob?.status}
  </Badge>
</TableCell>

    </TableRow>
  ))
)}

        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedjobTable
