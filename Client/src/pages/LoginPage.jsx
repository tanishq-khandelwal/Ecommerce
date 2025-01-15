import React, { useState } from "react";
import { setCredentials, useLoginMutation } from "../redux/slices/authSlice";
import hidepass from "../assets/hidpass.svg";
import showpass from "../assets/showpass.svg"; 
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";


const Login = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

      if(isLoading){
        toast.loading("Loading....");
      }
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials({user:response}))
      console.log("Login successful:", response);

      toast.success("Login Successful");
      navigate('/');

      console.log("Cookie is :", document.cookie);
    } catch (err) {
      console.error("Login failed:", err);
      // alert(err?.data?.message || "Login failed. Please try again.");

      toast.error(err?.data?.message || "Login failed. Please try again")
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1F2937]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <img src={showpass} className="w-5 h-5"/>
                ) : (
                  <img src={hidepass} className="w-5 h-5"/>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-auto bg-blue-600 text-white py-2 px-10 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex  py-4">
          <span className="mr-2">Don't have an account?</span>
          <a href="/signup" className="text-blue-600 hover:underline">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;


