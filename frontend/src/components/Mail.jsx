import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMore, IoMdArrowBack } from "react-icons/io";
import {
  MdDeleteOutline,
  MdOutlineReport,
  MdOutlineMarkEmailUnread,
  MdOutlineWatchLater,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
  MdOutlinePrint,
  MdOutlineOpenInNew,
} from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";
import Avatar from "react-avatar";

const Mail = ({ mail }) => {
  const navigate = useNavigate();
  
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex-1 bg-white mx-4 sm:mx-6 lg:mx-8 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      {/* Action Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
            title="Back to inbox"
          >
            <IoMdArrowBack size={"20px"} className="text-gray-600" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors hidden sm:block"
            title="Archive"
          >
            <BiArchiveIn size={"20px"} className="text-gray-600" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors hidden sm:block"
            title="Report spam"
          >
            <MdOutlineReport size={"20px"} className="text-gray-600" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
            title="Delete"
          >
            <MdDeleteOutline size={"20px"} className="text-gray-600" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1 hidden md:block"></div>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors hidden md:block"
            title="Mark as unread"
          >
            <MdOutlineMarkEmailUnread size={"20px"} className="text-gray-600" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors hidden md:block"
            title="Snooze"
          >
            <MdOutlineWatchLater size={"20px"} className="text-gray-600" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors hidden lg:block"
            title="Add to tasks"
          >
            <MdOutlineAddTask size={"20px"} className="text-gray-600" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors hidden lg:block"
            title="Move to"
          >
            <MdOutlineDriveFileMove size={"20px"} className="text-gray-600" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
            title="More"
          >
            <IoMdMore size={"20px"} className="text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors hidden sm:block"
            title="Print"
          >
            <MdOutlinePrint size={"20px"} className="text-gray-600" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors hidden sm:block"
            title="Open in new window"
          >
            <MdOutlineOpenInNew size={"20px"} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Email Content */}
      <div className="h-[calc(100vh-180px)] overflow-y-auto">
        <div className="p-4 sm:p-6 md:p-8">
          {/* Subject */}
          <h1 className="text-xl sm:text-2xl font-normal text-gray-900 mb-6 leading-tight">
            {mail?.subject || "No Subject"}
          </h1>

          {/* Sender Info */}
          <div className="flex items-start gap-3 sm:gap-4 mb-6 pb-6 border-b border-gray-200">
            <Avatar 
              name={mail?.to || "User"} 
              size="40" 
              round={true}
              className="flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {mail?.to || "Unknown Sender"}
                  </p>
                  <p className="text-xs text-gray-600">
                    to <span className="text-gray-900">me</span>
                  </p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {formatDate(mail?.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Message Body */}
          <div className="prose prose-sm sm:prose max-w-none">
            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
              {mail?.message || "No message content"}
            </div>
          </div>

          {/* Reply Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium text-sm transition-colors">
                Reply
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium text-sm transition-colors">
                Forward
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mail;
