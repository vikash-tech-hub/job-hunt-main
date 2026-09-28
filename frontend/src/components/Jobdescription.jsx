import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import { setsinglejob } from '@/redux/jobslice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Building2, 
  MapPin, 
  IndianRupee, 
  Briefcase, 
  Calendar, 
  Users, 
  CheckCircle2, 
  ArrowLeft,
  Loader2,
  Sparkles
} from 'lucide-react';

import { showConfirmAlert, showSuccessAlert, showErrorAlert } from '@/utils/swal';

const Jobdescription = () => {
  const { singlejob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const isInitiallyApplied = singlejob?.applications?.some(
    (application) => application.applicant === user?._id || application.applicant?._id === user?._id
  ) || false;
  
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyHandler = async () => {
    if (!user) {
      toast.error("Please login to apply for this job");
      navigate("/login");
      return;
    }

    if (user.role === "recruiter") {
      showErrorAlert("Recruiter Role", "Employers/Recruiters cannot apply to jobs. Please switch to a Student/Candidate account.");
      return;
    }

    const isConfirmed = await showConfirmAlert({
      title: "Submit Application?",
      text: `Are you sure you want to apply for the "${singlejob?.title}" position at ${singlejob?.company?.name || "this company"}?`,
      confirmButtonText: "Yes, Apply Now",
      cancelButtonText: "Cancel",
      icon: "question",
    });

    if (!isConfirmed) return;

    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_BASE_ORIGIN_URL || '';
      const res = await axios.get(
        `${baseUrl}/api/v1/application/apply/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singlejob,
          applications: [...(singlejob?.applications || []), { applicant: user?._id }],
        };
        dispatch(setsinglejob(updatedSingleJob));
        showSuccessAlert("Application Submitted!", "Your profile and resume have been sent to the hiring team.");
        toast.success(res.data.message || "Applied successfully!");
      }
    } catch (error) {
      console.log(error);
      const errMsg = error.response?.data?.message || "Failed to submit application";
      showErrorAlert("Application Error", errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_ORIGIN_URL || '';
        const res = await axios.get(
          `${baseUrl}/api/v1/job/get/${id}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setsinglejob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (application) => application.applicant === user?._id || application.applicant?._id === user?._id
            )
          );
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    if (id) fetchSingleJob();
  }, [id, dispatch, user?._id]);

  const requirementsList = Array.isArray(singlejob?.requirements)
    ? singlejob.requirements
    : singlejob?.requirements?.split(',').map((r) => r.trim()).filter(Boolean) || [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          size="sm"
          className="mb-6 text-slate-500 hover:text-slate-900 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Jobs
        </Button>

        {/* Hero Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 rounded-2xl border border-slate-100 shadow-xs">
                <AvatarImage src={singlejob?.company?.logo} alt={singlejob?.company?.name} />
                <AvatarFallback className="rounded-2xl bg-indigo-50 text-indigo-700 font-bold text-xl">
                  {singlejob?.company?.name?.charAt(0)?.toUpperCase() || "C"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {singlejob?.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mt-1.5">
                  <span className="font-semibold text-slate-700 flex items-center gap-1">
                    <Building2 className="h-4 w-4 text-indigo-500" />
                    {singlejob?.company?.name || "Company"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    {singlejob?.location || "India"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    {singlejob?.createdAt ? singlejob.createdAt.split('T')[0] : "Recently"}
                  </span>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div>
              {isApplied ? (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-sm border border-emerald-200">
                  <CheckCircle2 className="h-4 w-4" /> Already Applied
                </div>
              ) : (
                <Button
                  onClick={applyHandler}
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-600/20 transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Apply Now"
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-100">
            <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-400 block font-medium">Offered Salary</span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-0.5 mt-0.5">
                <IndianRupee className="h-3.5 w-3.5 text-emerald-600" />
                {singlejob?.salary} LPA
              </span>
            </div>
            <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-400 block font-medium">Experience Level</span>
              <span className="text-sm font-bold text-slate-800 mt-0.5 block">
                {singlejob?.experiencelevel || "Fresher / 1+ Yrs"}
              </span>
            </div>
            <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-400 block font-medium">Employment Type</span>
              <span className="text-sm font-bold text-slate-800 mt-0.5 block">
                {singlejob?.jobtype || "Full Time"}
              </span>
            </div>
            <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-400 block font-medium">Total Applicants</span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Users className="h-3.5 w-3.5 text-indigo-500" />
                {singlejob?.applications?.length || 0} applied
              </span>
            </div>
          </div>
        </div>

        {/* Details Content Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-8">
          {/* Job Overview */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-indigo-600" /> Job Description
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {singlejob?.description}
            </p>
          </div>

          {/* Key Requirements */}
          {requirementsList.length > 0 && (
            <div className="pt-6 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600" /> Key Skills & Requirements
              </h2>
              <div className="flex flex-wrap gap-2">
                {requirementsList.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-indigo-50/80 text-indigo-700 text-xs sm:text-sm font-semibold border border-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Company Summary */}
          {singlejob?.company && (
            <div className="pt-6 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-indigo-600" /> About {singlejob?.company?.name}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {singlejob?.company?.description || "A leading company hiring top talent."}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobdescription;

