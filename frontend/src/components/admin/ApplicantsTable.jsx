import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { setAllApplicants } from '@/redux/applicationSlice'

const shortlistingstatus = ["Accepted", "Rejected"]

const ApplicantsTable = () => {
    const dispatch = useDispatch()
    const { applicants } = useSelector(state => state.application)

    // ✅ Status change handler
    const handleStatusChange = async (id, status) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/application/status/${id}/update`,
                { status },
                { withCredentials: true }
            )
            toast.success(res.data.message || `Marked as ${status}`)

            // update frontend state (replace updated applicant in Redux)
            const updatedApplicants = applicants.map(app =>
                app._id === id ? { ...app, status } : app
            )
            dispatch(setAllApplicants(updatedApplicants))
        } catch (error) {
            console.error(error)
            toast.error("Failed to update status")
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.applicant?.fullname || "N/A"}</TableCell>
                            <TableCell>{item.applicant?.email || "N/A"}</TableCell>
                            <TableCell>{item.applicant?.phoneNumber || "N/A"}</TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a
                                        href={item.applicant.profile.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        View Resume
                                    </a>
                                ) : "N/A"}
                            </TableCell>
                            <TableCell>
                                {new Date(item.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 py-1 rounded text-white text-sm ${
                                        item.status === "Accepted"
                                            ? "bg-green-600"
                                            : item.status === "Rejected"
                                            ? "bg-red-600"
                                            : "bg-gray-400"
                                    }`}
                                >
                                    {item.status || "Pending"}
                                </span>
                            </TableCell>
                            <TableCell className="float-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        {shortlistingstatus.map((status, i) => (
                                            <div
                                                key={i}
                                                onClick={() =>
                                                    handleStatusChange(item._id, status)
                                                }
                                                className="flex w-fit items-center my-2 cursor-pointer hover:text-blue-600"
                                            >
                                                <span>{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable
