import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Eye, MoreHorizontal, Building2, Calendar, Briefcase, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { setAllAdminJobs } from '@/redux/jobslice';
import axios from 'axios';
import { toast } from 'sonner';
import { showConfirmAlert, showToast } from '@/utils/swal';

const AdminjobsTable = () => {
  const { searchcompanybytext = "" } = useSelector(
    (store) => store.company || {}
  );
  const { alladminjobs = [] } = useSelector((store) => store.job);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterjobs, setFilterjobs] = useState([]);

  useEffect(() => {
    const filtered =
      alladminjobs.length > 0
        ? alladminjobs.filter((job) => {
            if (!searchcompanybytext) return true;
            const q = searchcompanybytext.toLowerCase();
            return (
              job.company?.name?.toLowerCase().includes(q) ||
              job.title?.toLowerCase().includes(q)
            );
          })
        : [];

    setFilterjobs(filtered);
  }, [alladminjobs, searchcompanybytext]);

  const deleteJobHandler = async (jobId, jobTitle) => {
    const isConfirmed = await showConfirmAlert({
      title: "Delete Job Posting?",
      text: `Are you sure you want to delete "${jobTitle}"? Candidates will no longer be able to apply.`,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      icon: "warning",
    });

    if (!isConfirmed) return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        showToast("Job deleted successfully", "success");
        toast.success(res.data.message || "Job deleted successfully");
        const updatedJobs = alladminjobs.filter((job) => job._id !== jobId);
        dispatch(setAllAdminJobs(updatedJobs));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-100 hover:bg-transparent">
            <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400">Company</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400">Job Role</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400">Posted Date</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterjobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10 text-slate-400">
                <Briefcase className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-600">No jobs posted yet.</p>
                <p className="text-xs text-slate-400 mt-0.5">Click &quot;Post New Job&quot; to publish an opening.</p>
              </TableCell>
            </TableRow>
          ) : (
            filterjobs.map((job) => (
              <TableRow key={job._id} className="border-slate-100 hover:bg-slate-50/60 transition-colors">
                <TableCell className="font-semibold text-slate-800 text-sm">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-indigo-500" />
                    {job.company?.name || "Company"}
                  </span>
                </TableCell>
                <TableCell className="font-semibold text-slate-900 text-sm">
                  {job.title}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">{job.location}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-emerald-600 font-semibold">{job.salary} LPA</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 rounded-lg">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-44 p-1 rounded-xl shadow-lg border-slate-200">
                      <button
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors text-left"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>View Applicants</span>
                      </button>
                      <button
                        onClick={() => deleteJobHandler(job._id, job.title)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-left"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete Job</span>
                      </button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminjobsTable;

