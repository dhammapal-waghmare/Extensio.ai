import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/about.png"
<div className="" />

const About = () => {
  return (
    <section id="aboutus" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-black">
            About <span className="text-blue-600">Extensio.ai</span>
          </h2>

          <p className="text-gray-600 mt-6 leading-relaxed">
            <strong>Extensio.ai</strong> is a no-code AI platform that allows users 
            to create fully functional Chrome extensions just by describing their idea in plain text.
            It removes the need for programming knowledge and automates the entire development process.
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Users can simply type requirements like 
            <span className="font-medium text-black"> "Block all images on a website"</span>, 
            and the system will generate all required files such as 
            <span className="text-blue-600"> manifest.json</span>, 
            <span className="text-blue-600"> content.js</span>, and 
            <span className="text-blue-600"> popup.html</span>, package them, 
            and provide a ready-to-download extension.
          </p>

          <div className="mt-6 space-y-3 text-gray-700">
            <p>🚀 Auto-generates complete Chrome Extension code</p>
            <p>📦 Converts files into ready-to-use ZIP instantly</p>
            <p>🧠 Smart AI prompt system ensures valid output</p>
            <p>🔐 Project saving & basic version control</p>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-8">
            <div>
              <h3 className="text-3xl font-bold text-black">100+</h3>
              <p className="text-gray-500">Extensions Generated</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-black">50+</h3>
              <p className="text-gray-500">Active Users</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-black">99%</h3>
              <p className="text-gray-500">Automation Accuracy</p>
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.img
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          src={image}
          alt="Extensio AI Platform"
          className="w-full rounded-2xl shadow-lg object-cover"
        />
      </div>
    </section>
  );
};

export default About;