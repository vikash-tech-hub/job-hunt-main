import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authslice";
import axios from "axios";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logouthandler = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_ORIGIN_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-6">
        {/* Left Side Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#f83002]">hunt</span>
          </h1>
        </div>

        {/* Right Side Menu */}
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-8">

            {
              user && user.role === 'recruiter' ? (
                <>
                  <li className="cursor-pointer hover:text-[#f83002]">
                    <Link to="/admin/companies">Companies</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#f83002]">
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="cursor-pointer hover:text-[#f83002]">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#f83002]">
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#f83002]">
                    <Link to="/browse">Browse</Link>
                  </li>
                </>
              )
            }

          </ul>

          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b06ee]">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilephoto} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilephoto} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.fullname || "User"}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col text-gray-800">

                  {

                    user&&user.role==='student'&&(
                      <Button variant="link" className="flex items-center gap-2 w-fit">
                    <User2 className="h-4 w-4" />
                    <Link to="/profile">View Profile</Link>
                  </Button>
                    )
                  }
                  

                  <Button
                    onClick={logouthandler}
                    variant="link"
                    className="flex items-center gap-2 w-fit"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
