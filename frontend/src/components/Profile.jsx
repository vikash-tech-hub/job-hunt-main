import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Mail, Phone, Pen, FileText, Download, Briefcase, Sparkles, CheckCircle2, User, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import AppliedjobTable from './AppliedjobTable';
import UpdateProfileDialog from './Updateprofiledialog';
import { useSelector } from 'react-redux';
import useGetAppliedJob from '@/hook/useGetAppliedJob';

const Profile = () => {
  useGetAppliedJob();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const hasResume = Boolean(user?.profile?.resume);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Main User Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Header Cover Banner */}
          <div className="h-44 sm:h-52 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
          </div>

          <div className="px-6 sm:px-8 pb-8 relative">
            {/* Top row: Avatar + Name + Edit button */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-20 sm:-mt-24 mb-6 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                <Avatar className="h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-white shadow-lg bg-white ring-2 ring-indigo-100">
                  <AvatarImage src={user?.profile?.profilephoto} alt={user?.fullname} className="object-cover" />
                  <AvatarFallback className="rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-3xl">
                    {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {user?.fullname || "Job Seeker"}
                    </h1>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 
                      {user?.role === "recruiter" ? "Recruiter" : "Candidate"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                    {user?.profile?.bio || "No bio added yet. Click 'Edit Profile' to add your summary and stand out to employers."}
                  </p>
                </div>
              </div>

              <Button 
                onClick={() => setOpen(true)} 
                variant="outline" 
                className="rounded-xl border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all self-start sm:self-end shadow-2xs font-semibold text-xs h-10 px-4"
              >
                <Pen className="h-3.5 w-3.5 mr-2 text-indigo-600" /> Edit Profile
              </Button>
            </div>

            {/* Information Grid: Contact Details & Resume */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t border-slate-100">
              {/* Contact Details */}
              <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-100 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Contact Details</h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[11px] text-slate-400 block font-medium">Email Address</span>
                      <span className="text-slate-800 font-semibold truncate block text-xs sm:text-sm">{user?.email || "N/A"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Phone Number</span>
                      <span className="text-slate-800 font-semibold text-xs sm:text-sm">{user?.phoneNumber || "Not provided"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume & Credentials */}
              <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-100 space-y-3 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Resume Document</h3>
                  {hasResume ? (
                    <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-2xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-xs font-bold text-slate-800 truncate block">
                            {user?.profile?.resumeoriginalname || "Resume.pdf"}
                          </span>
                          <span className="text-[11px] text-emerald-600 font-medium">✓ Uploaded & Active</span>
                        </div>
                      </div>
                      <a
                        href={user?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors shrink-0"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>View</span>
                      </a>
                    </div>
                  ) : (
                    <div className="bg-white p-5 rounded-xl border border-dashed border-slate-200 text-center space-y-2">
                      <FileText className="h-8 w-8 text-slate-300 mx-auto" />
                      <p className="text-xs text-slate-500">No resume uploaded yet.</p>
                      <Button 
                        onClick={() => setOpen(true)}
                        size="sm" 
                        variant="secondary" 
                        className="text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg"
                      >
                        Upload PDF Resume
                      </Button>
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-slate-400">
                  Recruiters will be able to review this document when you apply to jobs.
                </p>
              </div>
            </div>

            {/* Professional Skills */}
            <div className="pt-6 mt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" /> Professional Skills
              </h3>
              {user?.profile?.skills && user.profile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.profile.skills.map((skill, index) => (
                    <Badge 
                      key={index}
                      variant="secondary"
                      className="bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 font-semibold px-3 py-1.5 rounded-lg border border-indigo-100 text-xs transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  No skills listed. Click &apos;Edit Profile&apos; to add skills like React, Node.js, Python, etc.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs History Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-lg text-slate-900">Applied Jobs History</h2>
                <p className="text-xs text-slate-500">Track the status of your submitted job applications</p>
              </div>
            </div>
          </div>
          <AppliedjobTable />
        </div>

      </main>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Profile;
