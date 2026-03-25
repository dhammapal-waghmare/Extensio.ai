import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Features", id: "features" },
    { name: "About Us", id: "aboutus" },
    { name: "Pricing", id: "pricing" },
    { name: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const yOffset = -70;
    const y =
      section.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });

    setActiveSection(id);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;

      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (!section) return;

        if (
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(link.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 text-black">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-black cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          Extensio<span className="text-blue-600">.ai</span>
        </motion.h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center ">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-medium ${
                activeSection === link.id
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {link.name}
            </button>
          ))}

          {!isLoggedIn ? (
            <div className="flex gap-3">
              <Link to="/login">
                <button className="border border-gray-300 px-6 py-3 rounded-xl font-semibold transition duration-300 hover:bg-gray-100">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-black text-white px-6 py-3 rounded-xl font-semibold transition duration-300 hover:bg-gray-800 hover:scale-105">
                  Get Started
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl  hover:shadow-lg hover:-translate-y-0.5 transition duration-300"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500  text-white px-4 py-2 rounded-xl  hover:shadow-lg hover:-translate-y-0.5 transition duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden bg-black text-white px-4 py-2 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition duration-300"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden"
        />
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-72 h-screen bg-white border-l border-gray-200 md:hidden z-50"
          >
            <div className="flex flex-col p-6 gap-5 mt-16">

              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-lg text-gray-700 hover:text-blue-600"
                >
                  {link.name}
                </button>
              ))}

              <div className="border-t border-black-200 pt-5 flex flex-col gap-3">
                {!isLoggedIn ? (
                  <>
                    <Link to="/login">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-full border border-black-300 py-3 rounded-xl  hover:shadow-lg hover:-translate-y-0.5 transition duration-300 font-semibold"
                      >
                        Login
                      </button>
                    </Link>

                    <Link to="/register">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-white-600 text-black border py-3 rounded-xl  hover:shadow-lg hover:-translate-y-0.5 transition duration-300 font-semibold"
                      >
                        Get Started
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        setIsOpen(false);
                      }}
                      className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full bg-black-600 text-white py-3 rounded-xl font-semibold"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;