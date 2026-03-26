import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-dark.png"; 

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 z-50 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">

        {/* ✅ LOGO IMAGE */}
        <img
          src={logo}
          alt="Extensio.ai"
          className="h-10 w-auto object-contain cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-blue-600 font-medium">Home</a>
          <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
          <a href="#aboutus" className="text-gray-600 hover:text-blue-600">About Us</a>
          <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
          <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
        
          {!isLoggedIn ? (
            <div className="flex items-center gap-3 ml-4">

              {/* Login Button */}
              <Link to="/login">
                <button className="px-5 py-2 rounded-xl border border-gray-300 font-semibold text-black hover:bg-gray-100 transition">
                  Login
                </button>
              </Link>

              {/* CTA Button */}
              <button
                onClick={() => navigate("/login")}
                className="bg-black text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                Get Started
              </button>

            </div>
          ) : (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl"
            >
              Dashboard
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;