import React from 'react';
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from './ui/table';
import { useSelector } from 'react-redux';
import { Clock, CheckCircle2, XCircle, Building2, Calendar, FileQuestion, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppliedjobTable = () => {
  const { allAppliedJob = [] } = useSelector((store) => store.job);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-100 hover:bg-transparent">
            <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400">Date Applied</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400">Job Role</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400">Company</TableHead>
            <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-400 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJob.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-12 text-slate-400">
                <div className="max-w-sm mx-auto space-y-3">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                    <FileQuestion className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">You haven&apos;t applied to any jobs yet</p>
                    <p className="text-xs text-slate-400 mt-0.5">Explore open positions from top companies and apply directly.</p>
                  </div>
                  <Link 
                    to="/jobs" 
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs transition-colors"
                  >
                    <span>Browse Available Jobs</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJob.map((appliedjob) => {
              const status = appliedjob?.status?.toLowerCase() || "pending";
              return (
                <TableRow key={appliedjob?._id} className="border-slate-100 hover:bg-slate-50/60 transition-colors">
                  <TableCell className="text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {appliedjob.createdAt ? appliedjob.createdAt.split("T")[0] : "Recently"}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900 text-sm">
                    {appliedjob?.job?.title || "Role Title"}
                  </TableCell>
                  <TableCell className="text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-indigo-500" />
                      {appliedjob?.job?.company?.name || "Company"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
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
                        <Clock className="h-3.5 w-3.5" /> In Review
                      </span>
                    )}
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

export default AppliedjobTable;
