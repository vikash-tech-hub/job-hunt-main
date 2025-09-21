import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authslice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: null
  });
  const {loading,user}=useSelector(store=>store.auth)
  const dispatch=useDispatch();
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0]
    });
  };

 const navigate = useNavigate();

const submithandler = async (e) => {
  e.preventDefault();
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
    dispatch(setLoading(true))
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/user/register`, // check this endpoint carefully
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (res.data.success) {
      toast.success(res.data.message);
      navigate("/login");
    }
  } catch (error) {
    console.error(error);

    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message || "Something went wrong");
    }
  }
  finally{
    dispatch(setLoading(true))
  }
};
 useEffect(()=>{
    if(user){
      navigate("/")
    }

  },[])


  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submithandler}
          className="w-1/2 border border-gray-300 rounded-md p-6 my-10 shadow-sm"
        >
          <h1 className="font-bold text-2xl mb-5 text-center">Sign Up</h1>

          {/* Full Name */}
          <div className="my-3">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="John Doe"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
            />
          </div>

          {/* Email */}
          <div className="my-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>

          {/* phone no */}
          <div className="my-3">
            <Label htmlFor="phoneNumber">Phone no</Label>
            <Input
              id="phoneNumber"
              type="text"
              placeholder="8956232363"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
            />
          </div>

          {/* Password */}
          <div className="my-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>

          {/* Radio Buttons */}
          <div className="flex  items-center justify-between">
            <RadioGroup
              value={input.role}
              className="flex items-center gap-4 my-5"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  id="role-student"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="role-student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  id="role-recruiter"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="role-recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* File Upload */}
          <div className="flex items-center gap-2">
            <Label htmlFor="profile">Profile</Label>
            <input
              id="profile"
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          {
  loading?<Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>please wait</Button>:<Button type="submit" className="w-full mt-4">
            signup
          </Button>
}

          <span>
            Already have an account ?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
