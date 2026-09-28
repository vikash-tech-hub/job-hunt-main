import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2, Building2, Globe, MapPin, AlignLeft, Image as ImageIcon } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hook/useGetCompanyById';

import { showSuccessAlert, showErrorAlert } from '@/utils/swal';

const Companysetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const { singleCompany } = useSelector((store) => store.company ?? { singleCompany: null });

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.name || !input.description || !input.website || !input.location) {
      toast.error('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (file) formData.append('file', file);

    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/company/update/${params.id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        showSuccessAlert("Company Profile Updated!", "Your company profile is active and ready for job postings.");
        toast.success(res.data.message || "Company updated!");
        navigate('/admin/companies');
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || 'Something went wrong';
      showErrorAlert("Update Failed", errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || '',
        description: singleCompany.description || '',
        website: singleCompany.website || '',
        location: singleCompany.location || '',
      });
      setFile(null);
    }
  }, [singleCompany]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Button
          onClick={() => navigate('/admin/companies')}
          variant="ghost"
          size="sm"
          className="mb-6 text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Companies
        </Button>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-2xl text-slate-900">Company Details Setup</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Complete your company profile to start posting job openings.
              </p>
            </div>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Company Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="rounded-xl"
                  placeholder="Company Name"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Official Website</Label>
                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  className="rounded-xl"
                  placeholder="https://company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-700">Headquarters / Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="rounded-xl"
                placeholder="e.g. Bangalore, India"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-700">Company Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="rounded-xl"
                placeholder="Briefly describe what your company does..."
              />
            </div>

            <div className="space-y-2 pt-2">
              <Label className="text-xs font-semibold text-slate-700">Company Brand Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="rounded-xl cursor-pointer file:rounded-lg file:bg-indigo-50 file:text-indigo-700 file:border-0 file:font-semibold file:text-xs"
              />
              
              <div className="flex items-center gap-4 mt-3">
                {file ? (
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Logo Preview"
                      className="h-12 w-12 object-contain rounded-lg bg-white border"
                    />
                    <span className="text-xs text-slate-500 font-medium">New Logo Selected</span>
                  </div>
                ) : singleCompany?.logo ? (
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <img
                      src={singleCompany.logo}
                      alt="Current Logo"
                      className="h-12 w-12 object-contain rounded-lg bg-white border"
                    />
                    <span className="text-xs text-slate-500 font-medium">Current Logo</span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/companies')}
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
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                  </>
                ) : (
                  "Save & Update Company"
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

export default Companysetup;

