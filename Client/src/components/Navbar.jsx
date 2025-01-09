import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

        {/* Cart Button */}
        <button
          type="button"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View Cart</span>
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
        </button>
        

        {/* Avatar Button */}

        <div>
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
        </div>

        {/* Burger Menu (visible on mobile) */}
        <div className="md:hidden flex items-center">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
