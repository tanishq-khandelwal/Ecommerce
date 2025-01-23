import React, { useState } from "react";
import Footer from "../components/Footer";
import Layout from "../Layout";
import avatar from "../assets/avatar.svg"
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("tsk@gmail.com");
  const [profilePicture, setProfilePicture] = useState(
    avatar
  );

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  const first_name=useSelector((state)=>state.auth.user.data.first_name);
  const last_name=useSelector((state)=>state.auth.user.data.last_name);
  const mobile=useSelector((state)=>state.auth.user.data.phone);
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-xl mt-4 border-2 border-[#8d8c8c]">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          User Profile
        </h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-indigo-600 shadow-xl"
            />
            <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer">
              <label htmlFor="profile-pic" className="text-indigo-600 font-semibold">
                <i className="fas fa-camera"></i>
              </label>
              <input
                id="profile-pic"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Name</label>
          {isEditing ? (
            <input
              type="text"
              value={first_name + last_name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
            />
          ) : (
            <p className="text-xl text-gray-800">{first_name}  {last_name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Email</label>
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
            />
          ) : (
            <p className="text-xl text-gray-800">{email}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Phone No.</label>
          {isEditing ? (
            <input
              type="phone"
              value={mobile}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
            />
          ) : (
            <p className="text-xl text-gray-800">{mobile}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveChanges}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-8 py-3 bg-gray-400 text-white rounded-lg shadow-lg hover:bg-gray-500 focus:outline-none"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

    </Layout>
  );
};

export default UserProfile;
