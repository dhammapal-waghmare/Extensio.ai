import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/signin.jpeg";
import signupImg from "../assets/signup.jpeg";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-100 via-gray-200 to-gray-300">

      {/* MAIN CARD */}
      <div className="w-[90%] max-w-5xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl flex overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-linear-to-br from-gray-50 to-gray-200 p-4 relative">

          <img
            src={isSignup ? signupImg : loginImg}
            alt="auth"
            className="w-[95%] max-h-130 object-contain transition-all duration-500 scale-105"
          />

          {/* soft glow */}
          <div className="absolute w-40 h-40 bg-black/5 rounded-full blur-3xl top-10 left-10"></div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">

          <form onSubmit={handleSubmit} className="w-full max-w-sm">

            {/* Title */}
            <h2 className="text-3xl font-semibold text-black text-center">
              {isSignup ? "Sign up" : "Sign in"}
            </h2>

            <p className="text-gray-500 text-center mt-2 text-sm">
              {isSignup
                ? "Create your account"
                : "Welcome back! Please sign in to continue"}
            </p>

            {/* Inputs */}
            <div className="mt-6 space-y-4">

              {isSignup && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                  required
                />
              )}

              <input
                type="email"
                placeholder="Email"
                className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                required
              />

              {isSignup && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                  required
                />
              )}
            </div>

            {/* Options */}
            {!isSignup && (
              <div className="flex justify-between mt-3 text-xs text-gray-500">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>
                <span className="cursor-pointer hover:underline">
                  Forgot password?
                </span>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              className="w-full h-11 mt-6 bg-black text-white rounded-lg text-sm hover:opacity-90"
            >
              {isSignup ? "Sign up" : "Login"}
            </button>

            {/* Toggle */}
            <p className="text-center text-gray-500 mt-4 text-sm">
              {isSignup
                ? "Already have an account?"
                : "Don’t have an account?"}

              <span
                onClick={() => setIsSignup(!isSignup)}
                className="ml-1 text-black font-medium cursor-pointer hover:underline"
              >
                {isSignup ? "Sign in" : "Sign up"}
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}