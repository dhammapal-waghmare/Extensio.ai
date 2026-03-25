import React from "react";
import { motion } from "framer-motion";
import img from "../../assets/img.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full min-h-screen bg-white text-black flex items-center pt-24"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Automate Your Business <br />
            With <span className="text-blue-600">Extensio.ai</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-600 mt-6 text-lg"
          >
            AI-powered automation tools to manage tasks, generate content,
            analyze data, and boost productivity — all in one platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex gap-4 mt-8"
          >
            {/* Black Button */}
            <button className="bg-black text-white px-6 py-3 rounded-xl font-semibold transition duration-300 hover:bg-gray-800 hover:scale-105">
              Get Started Free
            </button>

            {/* Outline Button */}
            {/* <button className="border border-gray-300 px-6 py-3 rounded-xl font-semibold transition duration-300 hover:bg-gray-100">
              Watch Demo
            </button> */}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-10 mt-10"
          >
            <div>
              <h2 className="text-2xl font-bold">10K+</h2>
              <p className="text-gray-500 text-sm">Users</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">500+</h2>
              <p className="text-gray-500 text-sm">Businesses</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">99%</h2>
              <p className="text-gray-500 text-sm">Accuracy</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
         <img
  src={img}
  alt="AI Dashboard"
  className="
    w-full 
    max-w-[280px] 
    sm:max-w-[350px] 
    md:max-w-[420px] 
    lg:max-w-[500px] 
    xl:max-w-[550px]
    mx-auto
    transition duration-300 
    hover:scale-105
  "
/>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;