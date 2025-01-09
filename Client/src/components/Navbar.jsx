import { useState } from "react";
import heartsvg from "../assets/hearsvg.svg";
import cartsvg from "../assets/cartsvg.svg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(1); // Example count
  const [likedCount, setLikedCount] = useState(2); // Example count

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          <a href="#">eStore</a>
        </div>

        {/* Search Bar */}
        <div className="md:flex flex-1 justify-center">
          <input
            type="text"
            placeholder="What are you looking for ?"
            className="px-4 py-2 w-2/3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Notification Button */}
        <button
          type="button"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View Notification</span>
          <svg
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        {/* Liked Button */}
        <button
          type="button"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-4"
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View Liked Items</span>
          <img className="h-5 w-5 " src={heartsvg} />
          {likedCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {likedCount}
            </span>
          )}
        </button>

        {/* Cart Button */}
        <button
          type="button"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-4"
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View CartItems</span>
          <img className="h-7 w-6 " src={cartsvg} />

          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            0
          </span>
        </button>

        {/* Avatar Button */}
        {/* <div>
          <div>
            <button
              type="button"
              className="w-auto border border-white rounded-2xl flex  ml-10"
            >
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  className="rounded-full h-[30px] w-[40px] "
                >
                  <circle cx="50" cy="50" r="50" fill="#4A90E2" />
                  <text
                    x="50%"
                    y="50%"
                    fill="white"
                    fontSize="40"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontFamily="Arial, sans-serif"
                  >
                    A
                  </text>
                </svg>
              </div>
              <div className="ml-2 mr-2 flex justify-center items-center">
                <span className="font-semibold text-white flex items-center justify-center">
                  Tanishq Khandelwal
                  <div className="ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 100 100"
                    >
                      <path
                        d="M20,30 L50,70 L80,30"
                        fill="none"
                        stroke="white"
                        strokeWidth="6"
                      />
                    </svg>
                  </div>
                </span>
              </div>
            </button>
          </div>
        </div> */}

        <div className="flex items-center space-x-4 justify-end ml-8">
          <button className="text-lg px-4 py-2 border rounded-full hover:bg-gray-200 text-white hover:text-black">
            Login
          </button>
          <button className="text-lg px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            Sign Up
          </button>
        </div>

        {/* Burger Menu (visible on mobile) */}
        {/* <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
