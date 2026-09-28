import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authslice";
import { Loader2, Mail, Lock, Phone, User, Eye, EyeOff, UserCheck, Briefcase, UploadCloud } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0] || null,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.fullname || !input.email || !input.phoneNumber || !input.password) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/user/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Registration failed");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-indigo-950/5 p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <UserCheck className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create an Account</h1>
            <p className="text-xs text-slate-500 mt-1">
              Join thousands of job seekers & companies on JobHunt.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            {/* Role Selection Tabs */}
            <div className="p-1 bg-slate-100 rounded-xl flex gap-1">
              <button
                type="button"
                onClick={() => setInput({ ...input, role: "student" })}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  input.role === "student"
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <UserCheck className="h-3.5 w-3.5" /> Candidate / Student
              </button>
              <button
                type="button"
                onClick={() => setInput({ ...input, role: "recruiter" })}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  input.role === "recruiter"
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Briefcase className="h-3.5 w-3.5" /> Employer / Recruiter
              </button>
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="fullname" className="text-xs font-semibold text-slate-700">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="fullname"
                  type="text"
                  placeholder="John Doe"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  className="pl-10 rounded-xl"
                  required
                />
              </div>
            </div>

            {/* Email & Phone grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-slate-700">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    className="pl-10 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phoneNumber" className="text-xs font-semibold text-slate-700">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="phoneNumber"
                    type="text"
                    placeholder="9876543210"
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={changeEventHandler}
                    className="pl-10 rounded-xl"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold text-slate-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  className="pl-10 pr-10 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Profile Avatar Upload */}
            <div className="space-y-1.5 pt-1">
              <Label htmlFor="profile" className="text-xs font-semibold text-slate-700">Profile Photo (Optional)</Label>
              <Input
                id="profile"
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="rounded-xl cursor-pointer file:rounded-lg file:bg-indigo-50 file:text-indigo-700 file:border-0 file:font-semibold file:text-xs"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-600/20 transition-all mt-3"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            {/* Bottom link */}
            <p className="text-center text-xs text-slate-500 pt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;

