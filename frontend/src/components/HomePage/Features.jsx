import React from "react";
import { motion } from "framer-motion";
import { Bot, FileCode, Package, Zap, Shield, Folder } from "lucide-react";

const features = [
  {
    icon: <Bot size={28} />,
    title: "Text-to-Extension AI",
    desc: "Simply describe your idea in plain English and the AI will generate a complete Chrome extension.",
  },
  {
    icon: <FileCode size={28} />,
    title: "Auto Code Generation",
    desc: "Automatically creates all required files like manifest.json, content.js, and popup.html.",
  },
  {
    icon: <Package size={28} />,
    title: "Instant ZIP Packaging",
    desc: "All generated files are packaged into a ready-to-download ZIP file instantly.",
  },
  {
    icon: <Zap size={28} />,
    title: "Smart Prompt Engine",
    desc: "Advanced prompt system ensures accurate, structured and valid Chrome Extension output.",
  },
  {
    icon: <Folder size={28} />,
    title: "Project Management",
    desc: "Save, manage and update your extension projects with basic version control.",
  },
  {
    icon: <Shield size={28} />,
    title: "Secure Processing",
    desc: "Your generated files and data are handled securely with temporary storage systems.",
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
          Build Chrome extensions without coding. Just describe, generate, and download instantly.
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