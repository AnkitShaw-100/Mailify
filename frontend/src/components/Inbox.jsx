import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IoMdRefresh, IoMdMore } from "react-icons/io";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdInbox,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";
import { GoTag } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import Messages from "./Messages";

const mailType = [
  {
    icon: <MdInbox size={"20px"} />,
    text: "Primary",
  },
  {
    icon: <GoTag size={"20px"} />,
    text: "Promotions",
  },
  {
    icon: <FaUserFriends size={"20px"} />,
    text: "Social",
  },
];

const Inbox = () => {
  const { refreshKey, emails } = useOutletContext();
  const [mailTypeSelected, setMailTypeSelected] = useState(0);
  
  return (
    <div className="flex-1 bg-white mx-4 sm:mx-6 lg:mx-8 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-1 sm:gap-2">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
            title="Select"
          >
            <MdCheckBoxOutlineBlank size={"20px"} className="text-gray-600" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
            title="Refresh"
          >
            <IoMdRefresh size={"20px"} className="text-gray-600" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
            title="More"
          >
            <IoMdMore size={"20px"} className="text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            <span className="hidden sm:inline">1-50 of </span>
            {emails?.length || 0}
          </p>
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              disabled={false}
              className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Newer"
            >
              <MdKeyboardArrowLeft size={"20px"} className="text-gray-600" />
            </button>
            <button
              disabled={false}
              className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Older"
            >
              <MdKeyboardArrowRight size={"20px"} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mail Type Tabs */}
      <div className="flex items-center border-b border-gray-200 bg-white overflow-x-auto scrollbar-hide">
        {mailType.map((item, index) => (
          <button
            key={index}
            className={`flex items-center gap-3 px-4 sm:px-6 py-3 transition-all duration-200 whitespace-nowrap ${
              mailTypeSelected === index
                ? "border-b-2 border-b-[#1a73e8] text-[#1a73e8] bg-blue-50"
                : "border-b-2 border-b-transparent text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => {
              setMailTypeSelected(index);
            }}
          >
            <span className={mailTypeSelected === index ? "text-[#1a73e8]" : "text-gray-600"}>
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.text}</span>
          </button>
        ))}
      </div>

      {/* Messages List */}
      <div className="h-[calc(100vh-200px)] sm:h-[calc(100vh-180px)] overflow-y-auto bg-white">
        <Messages refreshKey={refreshKey} />
      </div>
    </div>
  );
};

export default Inbox;
