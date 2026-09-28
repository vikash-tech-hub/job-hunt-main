import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hook/usegetalljobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, Users, Building, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Feature Highlights Strip */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 my-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">10k+ Candidates</h4>
                <p className="text-xs text-slate-400">Actively hiring</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Building className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">500+ Companies</h4>
                <p className="text-xs text-slate-400">Verified employers</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Instant Apply</h4>
                <p className="text-xs text-slate-400">1-click submission</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Verified Roles</h4>
                <p className="text-xs text-slate-400">100% genuine</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Carousel */}
        <CategoryCarousel />

        {/* Latest Job Openings */}
        <LatestJobs />

        {/* Call to Action Banner for Recruiters / Job Seekers */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 my-16">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Are You An Employer?</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Hire Top Talent in Days, Not Weeks</h3>
              <p className="text-indigo-200 text-xs sm:text-sm">
                Post your job openings and connect with thousands of pre-screened student candidates and experienced professionals.
              </p>
            </div>
            <div className="z-10 shrink-0">
              <Link to="/signup">
                <Button className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold px-6 py-3 rounded-xl shadow-md transition-all">
                  Post a Job Now <ArrowUpRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
            </div>
            {/* Ambient Background Circles */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
