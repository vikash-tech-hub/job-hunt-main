import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Heart } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md">
                <Briefcase className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Job<span className="text-indigo-400">Hunt</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier platform connecting ambitious students and candidates with high-growth companies and recruiters worldwide.
            </p>
          </div>

          {/* Candidates */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">For Candidates</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/jobs" className="hover:text-indigo-400 transition-colors">
                  Explore All Jobs
                </Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-indigo-400 transition-colors">
                  Browse by Category
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-indigo-400 transition-colors">
                  Candidate Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">For Employers</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/admin/companies" className="hover:text-indigo-400 transition-colors">
                  Manage Companies
                </Link>
              </li>
              <li>
                <Link to="/admin/jobs/create" className="hover:text-indigo-400 transition-colors">
                  Post New Opening
                </Link>
              </li>
              <li>
                <Link to="/admin/jobs" className="hover:text-indigo-400 transition-colors">
                  Review Applicants
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Connect</h3>
            <p className="text-xs text-slate-400 mb-3">Follow us for career tips and job market updates.</p>
            <div className="flex space-x-3 text-lg text-slate-400">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                <FaGithub />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} JobHunt. Built for students and recruiters.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Designed with</span> <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> <span>for career growth</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
