import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        
        {/* Company */}
        <div>
          <h2 className="text-2xl font-bold">
            Extensio<span className="text-blue-500">.ai</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm">
            AI-powered automation platform that helps businesses automate tasks,
            generate content, analyze resumes, and improve productivity.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#home" className="hover:text-white">Home</a></li>
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#aboutus" className="hover:text-white">About</a></li>
            <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Features</h3>
          <ul className="space-y-2 text-gray-400">
            <li>AI Content Generator</li>
            <li>Resume Analyzer</li>
            <li>Cover Letter Generator</li>
            <li>AI Chat Assistant</li>
            <li>Automation Tools</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <FaFacebook className="cursor-pointer hover:text-blue-500" />
            <FaTwitter className="cursor-pointer hover:text-blue-400" />
            <FaLinkedin className="cursor-pointer hover:text-blue-600" />
            <FaInstagram className="cursor-pointer hover:text-pink-500" />
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Extensio.ai. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;