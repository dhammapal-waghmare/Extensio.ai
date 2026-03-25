import React from "react";
import { motion } from "framer-motion";
import { Bot, FileText, BarChart3, Zap, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: <Bot size={28} />,
    title: "AI Assistant",
    desc: "Smart AI assistant to help you write, analyze and automate tasks.",
  },
  {
    icon: <FileText size={28} />,
    title: "Resume Analyzer",
    desc: "Analyze resumes and get AI suggestions to improve them.",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Analytics Dashboard",
    desc: "Track performance, usage and productivity with analytics.",
  },
  {
    icon: <Zap size={28} />,
    title: "Task Automation",
    desc: "Automate repetitive work and save hours every day.",
  },
  {
    icon: <Shield size={28} />,
    title: "Secure Platform",
    desc: "Your data is encrypted and protected with top security.",
  },
  {
    icon: <Globe size={28} />,
    title: "Cloud Access",
    desc: "Access your tools from anywhere anytime.",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-black"
        >
          Powerful Features of <span className="text-blue-600">Extensio.ai</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
        >
          Everything you need to automate, analyze and grow your business with AI.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 p-6 rounded-2xl text-left hover:shadow-lg transition duration-300"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-black">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;