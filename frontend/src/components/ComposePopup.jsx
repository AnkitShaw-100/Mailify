import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDelete, MdAttachFile, MdFormatBold, MdFormatItalic } from "react-icons/md";
import { BiSend } from "react-icons/bi";

const ComposePopup = ({ onClose, onSend }) => {
  const [form, setForm] = useState({ to: "", subject: "", body: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/emails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send email");
      onSend();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-4 sm:bottom-6 sm:right-8 z-50 w-full sm:w-auto">
      <div className="bg-white w-full sm:w-[500px] md:w-[550px] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-gray-200 relative flex flex-col max-h-[80vh] sm:max-h-[600px]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-t-2xl border-b border-gray-700">
          <span className="font-medium text-white text-base">New Message</span>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <IoMdClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          {/* To Field */}
          <div className="flex items-center border-b border-gray-200 px-5 py-3 hover:bg-gray-50 transition-colors">
            <label className="text-sm text-gray-600 w-16">To</label>
            <input
              name="to"
              value={form.to}
              onChange={handleChange}
              placeholder="Recipients"
              className="flex-1 bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          {/* Subject Field */}
          <div className="flex items-center border-b border-gray-200 px-5 py-3 hover:bg-gray-50 transition-colors">
            <label className="text-sm text-gray-600 w-16">Subject</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="flex-1 bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          {/* Body Field */}
          <div className="flex-1 px-5 py-4 overflow-y-auto">
            <textarea
              name="body"
              value={form.body}
              onChange={handleChange}
              placeholder="Compose your message..."
              className="w-full h-full bg-transparent focus:outline-none resize-none text-sm text-gray-800 placeholder-gray-400 leading-relaxed"
              rows={8}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-5 mb-3 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-start gap-2">
              <span className="font-medium">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Footer with Actions */}
          <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white px-6 py-2.5 rounded-lg font-medium text-sm shadow-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <BiSend size={18} />
              {loading ? "Sending..." : "Send"}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
                title="Format"
              >
                <MdFormatBold size={20} />
              </button>
              <button
                type="button"
                className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
                title="Attach file"
              >
                <MdAttachFile size={20} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
                title="Delete draft"
              >
                <MdDelete size={20} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComposePopup;
