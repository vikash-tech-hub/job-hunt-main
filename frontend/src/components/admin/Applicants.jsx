import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { Users, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { applicants = [] } = useSelector((store) => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/application/${params.id}/applicants`,
                    { withCredentials: true }
                );
                if (res.data?.success && res.data?.job?.applications) {
                    dispatch(setAllApplicants(res.data.job.applications));
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (params.id) fetchAllApplicants();
    }, [params.id, dispatch]);

    const count = Array.isArray(applicants) ? applicants.length : 0;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                <Button
                    onClick={() => navigate("/admin/jobs")}
                    variant="ghost"
                    size="sm"
                    className="text-slate-500 hover:text-slate-900 -ml-2"
                >
                    <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Jobs
                </Button>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Candidate Applications</h1>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Review student resumes, contact info, and update application status.
                            </p>
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 self-start sm:self-center">
                        Total Candidates: <span className="font-bold">{count}</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                    <ApplicantsTable />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Applicants;

