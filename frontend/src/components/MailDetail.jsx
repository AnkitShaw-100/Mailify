import React, { useState, useEffect } from "react";
import { IoMdArrowBack, IoMdMore, IoMdStar, IoMdStarOutline } from "react-icons/io";
import { MdDeleteOutline, MdOutlineReport, MdOutlineMarkEmailUnread, MdOutlinePrint, MdOutlineOpenInNew } from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";
import Avatar from "react-avatar";

const MailDetail = ({ email, onClose }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [mailData, setMailData] = useState(email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [starred, setStarred] = useState(false);

  // Fetch latest email with replies
  const fetchMail = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/emails/${email._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setMailData(data);
      }
    } catch (err) {
      console.error("Failed to fetch mail:", err);
    }
  };

  useEffect(() => {
    setMailData(email);
  }, [email]);

  // Send reply and update conversation
  const handleReplySend = async () => {
    if (!replyText.trim()) return;
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/emails/${email._id}/reply`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ body: replyText }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to send reply");
        setLoading(false);
        return;
      }
      setReplyText("");
      setShowReply(false);
      setSuccess("Mail sent!");
      setTimeout(() => setSuccess(""), 2500);
      await fetchMail();
    } catch {
      setError("Failed to send reply");
    }
    setLoading(false);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-1">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Back to inbox"
          >
            <IoMdArrowBack size={20} className="text-gray-600" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden sm:block"
            title="Archive"
          >
            <BiArchiveIn size={20} className="text-gray-600" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden sm:block"
            title="Report spam"
          >
            <MdOutlineReport size={20} className="text-gray-600" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Delete"
          >
            <MdDeleteOutline size={20} className="text-gray-600" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1 hidden md:block"></div>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden md:block"
            title="Mark as unread"
          >
            <MdOutlineMarkEmailUnread size={20} className="text-gray-600" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="More"
          >
            <IoMdMore size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden sm:block"
            title="Print"
          >
            <MdOutlinePrint size={20} className="text-gray-600" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden sm:block"
            title="Open in new window"
          >
            <MdOutlineOpenInNew size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Subject */}
        <div className="px-4 sm:px-6 md:px-8 pt-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-normal text-gray-900 leading-tight flex-1">
              {email.subject || "No Subject"}
            </h2>
            <button
              onClick={() => setStarred(!starred)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              title={starred ? "Unstar" : "Star"}
            >
              {starred ? (
                <IoMdStar size={20} className="text-yellow-500" />
              ) : (
                <IoMdStarOutline size={20} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Sender Info */}
        <div className="flex items-start gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 pb-6 border-b border-gray-200">
          <Avatar 
            name={email.from || "User"} 
            size="40" 
            round={true}
            className="flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">
                  {email.from}
                </p>
                <p className="text-xs text-gray-600">
                  to <span className="text-gray-900">{email.to}</span>
                </p>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {formatDate(email.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Message Body - Original + Replies */}
        <div className="px-4 sm:px-6 md:px-8 py-6">
          {/* Original message */}
          <div className="mb-8">
            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
              {mailData.body || "No message content"}
            </div>
          </div>

          {/* Replies */}
          {mailData.replies && mailData.replies.length > 0 && (
            <div className="space-y-6">
              {mailData.replies.map((reply, idx) => (
                <div key={idx} className="border-l-4 border-blue-400 pl-4 sm:pl-6 py-2">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar 
                      name={reply.from || "User"} 
                      size="32" 
                      round={true}
                      className="flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-blue-700 text-sm">{reply.from}</p>
                      <p className="text-xs text-gray-500">{formatDate(reply.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-gray-800 text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
                    {reply.body}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reply Section */}
      <div className="border-t border-gray-200 px-4 sm:px-6 md:px-8 py-4 bg-gray-50">
        {success && (
          <div className="mb-3 px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
            <span className="font-medium">✓</span>
            <span>{success}</span>
          </div>
        )}
        {error && (
          <div className="mb-3 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
            <span className="font-medium">⚠</span>
            <span>{error}</span>
          </div>
        )}
        {!showReply ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowReply(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium text-sm transition-colors"
            >
              Reply
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium text-sm transition-colors"
            >
              Forward
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              className="w-full h-32 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
              disabled={loading}
              autoFocus
            />
            <div className="mt-3 flex gap-2">
              <button
                className="px-5 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleReplySend}
                disabled={loading || !replyText.trim()}
              >
                {loading ? "Sending..." : "Send"}
              </button>
              <button
                onClick={() => {
                  setShowReply(false);
                  setReplyText("");
                }}
                className="px-5 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg text-sm font-medium transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MailDetail;
