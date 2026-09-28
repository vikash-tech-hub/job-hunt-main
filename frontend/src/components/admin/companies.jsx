import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompanyTable from './CompanyTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hook/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setsearchcompanybytext } from '@/redux/companyslice';
import { Building2, Plus, Search } from 'lucide-react';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setsearchcompanybytext(input));
    }, [input, dispatch]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50">
            <Navbar />
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div>
                        <div className="flex items-center gap-2">
                            <Building2 className="h-6 w-6 text-indigo-600" />
                            <h1 className="text-xl font-bold text-slate-900">Registered Companies</h1>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                            Manage your company profiles and post jobs on their behalf.
                        </p>
                    </div>
                    <Button 
                        onClick={() => navigate("/admin/companies/create")}
                        className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs"
                    >
                        <Plus className="h-4 w-4 mr-1.5" /> Add New Company
                    </Button>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                    <div className="relative max-w-xs">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            className="pl-10 rounded-xl bg-slate-50/50"
                            placeholder="Filter by company name..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <CompanyTable />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Companies;

