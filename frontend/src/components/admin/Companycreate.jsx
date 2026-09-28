import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companyslice';
import { Building2, ArrowLeft, Loader2, Sparkles } from 'lucide-react';

const Companycreate = () => {
  const navigate = useNavigate();
  const [companyname, setCompanyname] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const registerednewcompany = async (e) => {
    if (e) e.preventDefault();
    if (!companyname.trim()) {
      toast.error("Please enter a company name");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/company/register`,
        { companyName: companyname },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message || "Company registered!");
        const companyid = res?.data?.company?._id;
        navigate(`/admin/companies/${companyid}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          onClick={() => navigate("/admin/companies")}
          variant="ghost"
          size="sm"
          className="mb-6 text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Companies
        </Button>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-2xl text-slate-900">Name Your Company</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                What would you like to call your company? You can customize details later.
              </p>
            </div>
          </div>

          <form onSubmit={registerednewcompany} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-xs font-semibold text-slate-700">Company Name</Label>
              <Input
                id="companyName"
                type="text"
                className="rounded-xl h-11"
                placeholder="e.g. Google, Microsoft, Acme Corp"
                value={companyname}
                onChange={(e) => setCompanyname(e.target.value)}
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/admin/companies")}
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
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                  </>
                ) : (
                  "Continue to Setup"
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Companycreate;

