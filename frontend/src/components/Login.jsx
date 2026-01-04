import React, { useState } from "react";

const googleFont = {
  fontFamily: "Roboto, Arial, sans-serif",
};

const Login = ({ onLogin, onSignup }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-[#f3f5f7] px-4 py-4 sm:py-8"
      style={googleFont}
    >

              <div className="items-center ">
          
        </div>
      <div className="w-full sm:w-[90%] md:w-[500px] lg:w-[450px] max-w-[500px]">

        {/* Form Card */}
        <div className="bg-white rounded-lg border border-[#dadce0] p-6 sm:p-8 md:p-10 mt-6 shadow-lg">
        {/* Branding */}
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
            alt="Google"
            className="h-6 sm:h-7 md:h-8 mb-2"
          />
          <p className="text-xl sm:text-2xl font-semibold text-center text-[#5f6368] mb-1">
            Log in
          </p>
          <p className="text-sm sm:text-base text-[#5f6368] text-center">
            to continue to Gmail
          </p>
        </div>
          {error && (
            <div className="mb-6 p-3 bg-[#fce8e6] border border-[#e8453c] rounded text-sm text-[#c5221f] flex items-start">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email Input */}
            <div>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder=" "
                  type="email"
                  className="w-full px-4 py-3.5 border border-[#dadce0] rounded text-base text-[#202124] focus:outline-none focus:border-[#1a73e8] focus:border-2 peer transition-all"
                  required
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 transition-all pointer-events-none ${form.email || focusedField === "email"
                    ? "-top-2 text-xs bg-white px-1 text-[#1a73e8]"
                    : "top-3.5 text-base text-[#5f6368]"
                    }`}
                >
                  Email
                </label>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder=" "
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3.5 border border-[#dadce0] rounded text-base text-[#202124] focus:outline-none focus:border-[#1a73e8] focus:border-2 peer transition-all"
                  required
                />
                <label
                  htmlFor="password"
                  className={`absolute left-4 transition-all pointer-events-none ${form.password || focusedField === "password"
                    ? "-top-2 text-xs bg-white px-1 text-[#1a73e8]"
                    : "top-3.5 text-base text-[#5f6368]"
                    }`}
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm font-medium text-[#1a73e8]"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                onClick={onSignup}
                className="text-sm font-medium text-[#1a73e8] hover:bg-[#f1f3f4] px-6 py-2 rounded transition-colors"
              >
                Create account
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#1a73e8] hover:bg-[#1765cc] text-white font-medium text-sm px-6 py-2.5 rounded shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Loging in..." : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
