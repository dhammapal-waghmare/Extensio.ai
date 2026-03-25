import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-black"
        >
          Contact Us
        </motion.h2>

        <p className="text-gray-600 mt-4">
          Have questions? Get in touch with us.
        </p>

        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-10 space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 rounded-xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-4 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full p-4 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button className="bg-black text-white px-6 py-3 rounded-xl w-full font-semibold transition duration-300 hover:bg-gray-800">
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;