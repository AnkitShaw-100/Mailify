import React, { useState } from "react";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { FaRegQuestionCircle } from "react-icons/fa";
import { PiDotsNineBold } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import Avatar from "react-avatar";

const Navbar = ({ onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-25 h-16 relative bg-white border-b border-gray-200">
      {/* Left side: Hamburger + Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          className="p-2 sm:p-3 rounded-full hover:bg-gray-100 cursor-pointer"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Open menu"
        >
          <RxHamburgerMenu size={"20px"} />
        </button>
        <img
          className="w-7 sm:w-8"
          src={"https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png"}
          alt="Gmail Logo"
        />
        <h1
          className={`text-xl sm:text-2xl text-gray-500 font-medium hidden sm:block transition-opacity duration-200 
          ${
            mobileSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          Gmail
        </h1>
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl xl:max-w-3xl mx-4 lg:mx-6">
        <div className="flex items-center bg-[#EAF1FB] px-3 py-2.5 sm:py-3 rounded-full w-full">
          <IoIosSearch size="24px" className="text-gray-700 flex-shrink-0" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search mail"
            className="rounded-full w-full bg-transparent outline-none px-2"
          />
        </div>
      </div>

      {/* Desktop Right Icons */}
      <div className="hidden md:flex items-center">
        <div className="flex items-center gap-1 lg:gap-2">
          {/* Help Dropdown */}
          <div className="relative group">
            <div className="p-2 lg:p-3 rounded-full hover:bg-gray-100 cursor-pointer">
              <FaRegQuestionCircle size={"20px"} />
            </div>
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Help Center
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Send Feedback
              </button>
            </div>
          </div>
          {/* Settings Dropdown - Minimal UI to match Help Dropdown */}
          <div className="relative group">
            <div className="p-2 lg:p-3 rounded-full hover:bg-gray-100 cursor-pointer">
              <IoSettingsOutline size={"20px"} />
            </div>
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                See all settings
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Themes
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Inbox type
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Density
              </button>
            </div>
          </div>
          <div className="p-2 lg:p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <PiDotsNineBold size={"20px"} />
          </div>
          {/* Updated Logout Button */}
          <button
            className="ml-2 lg:ml-4 flex items-center gap-2 px-4 lg:px-5 py-2 bg-gray-100 
                       hover:bg-gray-200 text-gray-700 font-medium text-sm
                       rounded-lg border border-gray-300 transition-all duration-200 ease-in-out"
            onClick={() => {
              localStorage.removeItem("token");
              if (onLogout) onLogout();
            }}
          >
            <IoLogOutOutline size={18} />
            <span className="whitespace-nowrap">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Right Side */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => setMobileSearchOpen((prev) => !prev)}
          aria-label="Open search"
        >
          <IoIosSearch size="22px" className="text-gray-700" />
        </button>
        {/* Updated Mobile Logout */}
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 
                     hover:bg-gray-200 text-gray-700 font-medium text-sm
                     rounded-lg border border-gray-300 transition-all duration-200 ease-in-out"
          onClick={() => {
            localStorage.removeItem("token");
            if (onLogout) onLogout();
          }}
        >
          <IoLogOutOutline size={16} />
          <span className="whitespace-nowrap">Logout</span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-50 flex flex-col md:hidden animate-fade-in border-b border-gray-200">
          <button className="flex items-center gap-3 px-4 sm:px-6 py-3 hover:bg-gray-100 text-left">
            <FaRegQuestionCircle size={"20px"} />
            <span className="text-sm">Help</span>
          </button>
          <button className="flex items-center gap-3 px-4 sm:px-6 py-3 hover:bg-gray-100 text-left">
            <IoSettingsOutline size={"20px"} />
            <span className="text-sm">Settings</span>
          </button>
          <button className="flex items-center gap-3 px-4 sm:px-6 py-3 hover:bg-gray-100 text-left">
            <PiDotsNineBold size={"20px"} />
            <span className="text-sm">More</span>
          </button>
        </div>
      )}

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div className="fixed left-0 top-16 w-full bg-white shadow-lg z-[60] flex items-center px-4 sm:px-6 py-3 md:hidden animate-fade-in border-b border-gray-200">
          <IoIosSearch size="22px" className="text-gray-700 mr-2 flex-shrink-0" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search mail"
            className="rounded-full w-full bg-transparent outline-none px-1 text-sm sm:text-base"
            autoFocus
          />
          <button
            className="ml-2 text-gray-600 hover:text-gray-800 font-medium text-sm"
            onClick={() => setMobileSearchOpen(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
