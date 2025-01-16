import React, { useState } from "react";
import {useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.svg"
import {logout, useLogoutMutation} from "../redux/slices/authSlice.js"
import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";



const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [logoutCookie, { isLoading, isError, error }] = useLogoutMutation();
  const res =  localStorage.getItem("user");
  const user = res ? JSON.parse(res).data: null; 
  const dispatch = useDispatch();
  const navigate = useNavigate();


//   console.log(res)
  const handleLogout = () => {
    dispatch(logout());
    logoutCookie();
    toast.success("User Logged Out Successfully");
    navigate("/");
  };

  if(!user) return null;

  return (
    <div className="relative border-2 border-white rounded-full ml-9 px-4 py-2  ">
      {/* Avatar Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          src={user?.avatar || avatar}
          alt="User Avatar"
          className="w-7 h-7 rounded-full object-cover "
        />


        <span className="text-white font-medium">{user?.first_name+" "+user?.last_name || "User !"}</span>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-5 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-30">
          <ul className="py-2">
            <li>
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
