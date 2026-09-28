import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2, Briefcase, Building2, ArrowLeft } from 'lucide-react';

import { showSuccessAlert, showErrorAlert } from '@/utils/swal';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobtype: "Full Time",
        experience: "",
        position: 1,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies = [] } = useSelector((store) => store.company || {});

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (companyId) => {
        setInput({ ...input, companyId });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.companyId) {
            showErrorAlert("Company Required", "Please select a registered company from the dropdown before posting.");
            toast.error("Please select a registered company first");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/job/post`,
                input,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                showSuccessAlert("Job Published!", `The position "${input.title}" is now live on JobHunt for candidates to apply.`);
                toast.success(res.data.message || "Job posted successfully!");
                navigate("/admin/jobs");
            }
        } catch (error) {
            const errMsg = error.response?.data?.message || "Failed to post job";
            showErrorAlert("Posting Failed", errMsg);
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50">
            <Navbar />
            <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Button
                    onClick={() => navigate("/admin/jobs")}
                    variant="ghost"
                    size="sm"
                    className="mb-6 text-slate-500 hover:text-slate-900"
                >
                    <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Jobs
                </Button>

                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <Briefcase className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="font-extrabold text-2xl text-slate-900">Post a New Job</h1>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Reach thousands of qualified students and job seekers.
                            </p>
                        </div>
                    </div>

                    {companies.length === 0 ? (
                        <div className="p-8 text-center bg-amber-50 rounded-2xl border border-amber-200">
                            <Building2 className="h-10 w-10 text-amber-600 mx-auto mb-2" />
                            <h3 className="font-bold text-amber-900">No Company Registered Yet</h3>
                            <p className="text-xs text-amber-700 mt-1 max-w-sm mx-auto mb-4">
                                You must create at least one company before you can publish a job posting.
                            </p>
                            <Button 
                                onClick={() => navigate("/admin/companies/create")}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
                            >
                                Register Company First
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-slate-700">Job Title / Role</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        value={input.title}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. Senior Frontend Engineer"
                                        className="rounded-xl"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-slate-700">Hiring Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="rounded-xl bg-white border-slate-200">
                                            <SelectValue placeholder="Select a company" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl bg-white">
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem key={company._id} value={company._id}>
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-slate-700">Annual Salary (LPA)</Label>
                                    <Input
                                        type="text"
                                        name="salary"
                                        value={input.salary}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. 12"
                                        className="rounded-xl"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-slate-700">Location / Remote</Label>
                                    <Input
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. Bangalore / Remote"
                                        className="rounded-xl"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-slate-700">Experience Required</Label>
                                    <Input
                                        type="text"
                                        name="experience"
                                        value={input.experience}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. 1 - 3 Years"
                                        className="rounded-xl"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-slate-700">Job Type</Label>
                                    <Input
                                        type="text"
                                        name="jobtype"
                                        value={input.jobtype}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. Full Time, Part Time, Internship"
                                        className="rounded-xl"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5 sm:col-span-2">
                                    <Label className="text-xs font-semibold text-slate-700">Number of Open Positions</Label>
                                    <Input
                                        type="number"
                                        name="position"
                                        value={input.position}
                                        onChange={changeEventHandler}
                                        min="1"
                                        className="rounded-xl"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5 sm:col-span-2">
                                    <Label className="text-xs font-semibold text-slate-700">
                                        Skills & Requirements <span className="text-slate-400 font-normal">(Comma separated)</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        name="requirements"
                                        value={input.requirements}
                                        onChange={changeEventHandler}
                                        placeholder="React, TypeScript, Tailwind CSS, REST APIs"
                                        className="rounded-xl"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5 sm:col-span-2">
                                    <Label className="text-xs font-semibold text-slate-700">Job Description & Responsibilities</Label>
                                    <textarea
                                        name="description"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        rows={4}
                                        placeholder="Detailed description of the role, responsibilities, and perks..."
                                        className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate("/admin/jobs")}
                                    className="rounded-xl"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing...
                                        </>
                                    ) : (
                                        "Publish Job Opening"
                                    )}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PostJob;