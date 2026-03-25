import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="aboutus" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-4xl font-bold text-black">
            About <span className="text-blue-600">Extensio.ai</span>
          </h2>

          <p className="text-gray-600 mt-6">
            Extensio.ai is an AI-powered automation platform that helps
            businesses automate tasks, generate content, analyze resumes,
            and improve productivity using artificial intelligence.
          </p>

          <p className="text-gray-600 mt-4">
            Our mission is to simplify work using AI so that individuals
            and businesses can focus on what really matters.
          </p>

          <div className="flex gap-10 mt-8">
            <div>
              <h3 className="text-3xl font-bold text-black">10K+</h3>
              <p className="text-gray-500">Users</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-black">500+</h3>
              <p className="text-gray-500">Companies</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-black">4.9★</h3>
              <p className="text-gray-500">Rating</p>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.img
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          src="https://assets.prebuiltui.com/images/ai/ai-team.png"
          alt="About"
          className="w-full rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default About;