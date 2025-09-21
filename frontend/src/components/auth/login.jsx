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
import { setLoading, setUser } from "@/redux/authslice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const { loading,user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const changeEventHandler = (e) => {
    setInput({
      ...input, // pehle pura input object spread karo
      [e.target.name]: e.target.value, // fir specific field ko update karo
    });
  };

  const submithandler = async (e) => {
    e.preventDefault();


    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/user/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    } finally {
      dispatch(setLoading(false))
    }
  }
  useEffect(()=>{
    if(user){
      navigate("/")
    }

  },[])



  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submithandler} className="w-1/2 border border-gray-300 rounded-md p-6 my-10 shadow-sm">
          <h1 className="font-bold text-2xl mb-5 text-center">Login</h1>



          {/* Email */}
          <div className="my-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="example@mail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler} />
          </div>


          {/* Password */}
          <div className="my-3">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="********"
              value={input.password}
              name="password"
              onChange={changeEventHandler} />
          </div>

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


          {
            loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" />please wait</Button> : <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          }

          {/* Submit Button */}

          <span>Don't have an account ? <Link to="/signup" className="text-blue-600">Sign up</Link> </span>
        </form>
      </div>

    </div>
  );
};

export default Login;
