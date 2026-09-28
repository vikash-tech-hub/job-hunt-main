import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, FileText, CheckCircle2, XCircle, Clock, Mail, Phone, ExternalLink, Users } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setAllApplicants } from '@/redux/applicationSlice';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { showConfirmAlert, showToast } from '@/utils/swal';

const shortlistingstatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const dispatch = useDispatch();
    const { applicants = [] } = useSelector(state => state.application);

    const handleStatusChange = async (id, status, candidateName = "this candidate") => {
        const isConfirmed = await showConfirmAlert({
            title: `Mark as ${status}?`,
            text: `Are you sure you want to update ${candidateName}'s application status to ${status}?`,
            confirmButtonText: `Yes, ${status}`,
            cancelButtonText: "Cancel",
            icon: status === "Accepted" ? "question" : "warning",
        });

        if (!isConfirmed) return;

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/application/status/${id}/update`,
                { status },
                { withCredentials: true }
            );
            showToast(`Candidate marked as ${status}`, "success");
            toast.success(res.data?.message || `Candidate marked as ${status}`);

            const updatedApplicants = applicants.map(app =>
                app._id === id ? { ...app, status } : app
            );
            dispatch(setAllApplicants(updatedApplicants));
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="border-slate-100 hover:bg-transparent">
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400">Candidate</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400">Contact</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400">Resume</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400">Applied Date</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400">Status</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-12 text-slate-400">
                                <Users className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                                <p className="text-sm font-medium text-slate-600">No applications received yet.</p>
                                <p className="text-xs text-slate-400 mt-0.5">When candidates apply, their resumes will show here.</p>
                            </TableCell>
                        </TableRow>
                    ) : (
                        applicants.map((item, index) => {
                            const status = item.status?.toLowerCase() || "pending";
                            return (
                                <TableRow key={item._id || index} className="border-slate-100 hover:bg-slate-50/60 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 rounded-xl border border-slate-100 bg-slate-50">
                                                <AvatarImage src={item.applicant?.profile?.profilephoto} alt={item.applicant?.fullname} />
                                                <AvatarFallback className="rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs">
                                                    {item.applicant?.fullname?.charAt(0)?.toUpperCase() || "A"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <span className="font-semibold text-slate-900 text-sm block">
                                                    {item.applicant?.fullname || "Candidate"}
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    {item.applicant?.profile?.skills?.slice(0, 3).join(", ") || "Applicant"}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="space-y-0.5 text-xs text-slate-600">
                                            <div className="flex items-center gap-1.5 truncate">
                                                <Mail className="h-3 w-3 text-slate-400 shrink-0" />
                                                <span className="truncate">{item.applicant?.email || "N/A"}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <Phone className="h-3 w-3 text-slate-400 shrink-0" />
                                                <span>{item.applicant?.phoneNumber || "N/A"}</span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {item.applicant?.profile?.resume ? (
                                            <a
                                                href={item.applicant.profile.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                                            >
                                                <FileText className="h-3.5 w-3.5" />
                                                <span>View Resume</span>
                                                <ExternalLink className="h-3 w-3 text-indigo-400" />
                                            </a>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">No resume</span>
                                        )}
                                    </TableCell>

                                    <TableCell className="text-xs text-slate-500 font-medium">
                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recently"}
                                    </TableCell>

                                    <TableCell>
                                        {status === "accepted" ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                <CheckCircle2 className="h-3.5 w-3.5" /> Accepted
                                            </span>
                                        ) : status === "rejected" ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                                                <XCircle className="h-3.5 w-3.5" /> Rejected
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                                                <Clock className="h-3.5 w-3.5" /> Pending
                                            </span>
                                        )}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 rounded-lg">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-36 p-1 rounded-xl shadow-lg border-slate-200">
                                                {shortlistingstatus.map((statusOption, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleStatusChange(item._id, statusOption, item.applicant?.fullname)}
                                                        className={`flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold rounded-lg transition-colors text-left ${
                                                            statusOption === "Accepted" 
                                                                ? "text-emerald-700 hover:bg-emerald-50" 
                                                                : "text-rose-700 hover:bg-rose-50"
                                                        }`}
                                                    >
                                                        {statusOption === "Accepted" ? (
                                                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                                        ) : (
                                                            <XCircle className="h-3.5 w-3.5 text-rose-600" />
                                                        )}
                                                        <span>Mark as {statusOption}</span>
                                                    </button>
                                                ))}
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;

