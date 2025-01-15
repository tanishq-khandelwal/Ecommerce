import React, { useState } from "react";
import { useSignupMutation } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import hidepass from "../assets/hidpass.svg";
import showpass from "../assets/showpass.svg"; 

const Signup = () => {
  const navigate = useNavigate();
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true); // Added state for email validation
  const [emailError, setEmailError] = useState("");

  // Using the auto-generated hook for mutation
  const [signupUser, { isLoading, isError, data, error }] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      address: address,
      password: password,
    };

    try {
      const result = await signupUser(user).unwrap(); // unwrap to handle errors easily
      toast.success("User Registered Successfully !");
      navigate("/login");
      console.log("Signup successful!", result);
    } catch (err) {
      toast.error(err?.data?.message);
      console.error("Error during signup:", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#1F2937]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="flex gap-4">
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="first_name"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="last_name"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(e.target.value)) {
                  setIsEmailValid(false);
                  setEmailError("Please enter a valid email address.");
                } else {
                  setIsEmailValid(true);
                  setEmailError(""); // Clear error if valid
                }
              }}
              className={`mt-2 w-full px-4 py-2 border ${
                isEmailValid ? "border-gray-300" : "border-red-500"
              } rounded-md focus:ring-2 ${
                isEmailValid ? "focus:ring-blue-500" : "focus:ring-red-500"
              } focus:outline-none`}
              required
            />
            {!isEmailValid && (
              <p className="text-red-500 text-sm mt-2">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative mb-4">
          <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 mt-4 "
            >
              {showPassword ? (
                <img src={showpass} className="w-5 h-5" />
              ) : (
                <img src={hidepass} className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4 flex justify-center items-center">
            <button
              type="submit"
              className="w-auto px-8 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>

          {/* Error Message */}
          {isError && (
            <div className="text-red-500 text-sm">{error?.message}</div>
          )}

          {/* Success Message */}
          {data && (
            <div className="text-green-500 text-sm">
              Registration Successfull
            </div>
          )}
        </form>
        <div className="flex">
          <span className="mr-2">Already have an Account ?</span>
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
