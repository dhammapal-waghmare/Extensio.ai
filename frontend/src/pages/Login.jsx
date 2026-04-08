import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/signin.png";
import signupImg from "../assets/signup.png";
import { apiRequest } from "../lib/api";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignup && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const path = isSignup ? "/auth/signup" : "/auth/login";
      const payload = isSignup
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const data = await apiRequest(path, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
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
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                  required
                />
              )}

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                required
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                required
              />

              {isSignup && (
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                  required
                />
              )}
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600">{error}</p>
            )}

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
              disabled={loading}
              className="w-full h-11 mt-6 bg-black text-white rounded-lg text-sm hover:opacity-90"
            >
              {loading ? "Please wait..." : isSignup ? "Sign up" : "Login"}
            </button>

            {/* Toggle */}
            <p className="text-center text-gray-500 mt-4 text-sm">
              {isSignup
                ? "Already have an account?"
                : "Don’t have an account?"}

              <span
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError("");
                }}
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