import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User2, Briefcase, Building2, Layers, Sparkles, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authslice";
import axios from "axios";
import { toast } from "sonner";
import { showConfirmAlert } from "@/utils/swal";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logouthandler = async () => {
    const isConfirmed = await showConfirmAlert({
      title: "Log out of JobHunt?",
      text: "You will need to sign in again to access your saved jobs and applications.",
      confirmButtonText: "Yes, Log Out",
      cancelButtonText: "Stay Logged In",
      icon: "question",
    });

    if (!isConfirmed) return;

    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message || "Logged out successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8">
        {/* Left Side Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Briefcase className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Job<span className="text-indigo-600">Hunt</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav>
            <ul className="flex font-medium items-center gap-1 lg:gap-3 text-sm">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link
                      to="/admin/companies"
                      className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                        isActive("/admin/companies")
                          ? "text-indigo-600 bg-indigo-50 font-semibold"
                          : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                      }`}
                    >
                      <Building2 className="h-4 w-4" />
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/jobs"
                      className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                        isActive("/admin/jobs")
                          ? "text-indigo-600 bg-indigo-50 font-semibold"
                          : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                      }`}
                    >
                      <Layers className="h-4 w-4" />
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/"
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        isActive("/")
                          ? "text-indigo-600 bg-indigo-50 font-semibold"
                          : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobs"
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        isActive("/jobs")
                          ? "text-indigo-600 bg-indigo-50 font-semibold"
                          : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                      }`}
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/browse"
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        isActive("/browse")
                          ? "text-indigo-600 bg-indigo-50 font-semibold"
                          : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                      }`}
                    >
                      Browse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-slate-700 hover:text-indigo-600 font-medium">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm shadow-indigo-600/30 transition-all">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:ring-2 hover:ring-indigo-100 transition-all">
                  <Avatar className="h-9 w-9 border border-indigo-200">
                    <AvatarImage src={user?.profile?.profilephoto} alt={user?.fullname} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold">
                      {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4 shadow-xl border-slate-200/80 rounded-2xl">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <Avatar className="h-11 w-11 border border-indigo-200">
                    <AvatarImage src={user?.profile?.profilephoto} alt={user?.fullname} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">
                      {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden">
                    <h4 className="font-semibold text-slate-900 truncate">{user?.fullname || "User"}</h4>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full capitalize bg-indigo-50 text-indigo-700">
                      <Sparkles className="h-3 w-3" />
                      {user?.role}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 pt-3">
                  {user && user.role === "student" && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 rounded-lg transition-colors"
                    >
                      <User2 className="h-4 w-4 text-slate-500" />
                      View Profile
                    </Link>
                  )}

                  {user && user.role === "recruiter" && (
                    <Link
                      to="/admin/companies"
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 rounded-lg transition-colors"
                    >
                      <Building2 className="h-4 w-4 text-slate-500" />
                      Recruiter Dashboard
                    </Link>
                  )}

                  <button
                    onClick={logouthandler}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 text-rose-500" />
                    Log Out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile menu button and User Avatar */}
        <div className="flex md:hidden items-center gap-3">
          {user && (
            <Link to={user.role === "recruiter" ? "/admin/companies" : "/profile"}>
              <Avatar className="h-8 w-8 border border-indigo-200">
                <AvatarImage src={user?.profile?.profilephoto} alt={user?.fullname} />
                <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold text-xs">
                  {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-lg">
          <nav className="space-y-1">
            {user && user.role === "recruiter" ? (
              <>
                <Link
                  to="/admin/companies"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive("/admin/companies")
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Building2 className="h-4 w-4" /> Companies
                </Link>
                <Link
                  to="/admin/jobs"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive("/admin/jobs")
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Layers className="h-4 w-4" /> Job Openings
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive("/")
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/jobs"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive("/jobs")
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Find Jobs
                </Link>
                <Link
                  to="/browse"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive("/browse")
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Browse Categories
                </Link>
                {user && (
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive("/profile")
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <User2 className="h-4 w-4" /> My Profile
                  </Link>
                )}
              </>
            )}
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {!user ? (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-xl text-xs font-semibold">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-indigo-600 text-white rounded-xl text-xs font-semibold">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logouthandler();
                }}
                className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left"
              >
                <LogOut className="h-4 w-4 text-rose-500" /> Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
