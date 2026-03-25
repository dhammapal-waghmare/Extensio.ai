import React from "react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "Free",
    features: ["Basic AI Tools", "Limited Requests", "Email Support"],
  },
  {
    name: "Pro",
    price: "$19/month",
    features: ["All AI Tools", "Unlimited Requests", "Priority Support"],
    popular: true,
  },
  {
    name: "Business",
    price: "$49/month",
    features: ["Team Access", "API Access", "Analytics Dashboard"],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-black"
        >
          Pricing Plans
        </motion.h2>

        <p className="text-gray-600 mt-4">
          Choose the perfect plan for your business
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className={`bg-white border rounded-2xl p-8 shadow-sm transition duration-300 ${
                plan.popular
                  ? "border-blue-600 shadow-lg"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-semibold text-black">
                {plan.name}
              </h3>

              <h1 className="text-4xl font-bold mt-4 text-black">
                {plan.price}
              </h1>

              <ul className="mt-6 space-y-2 text-gray-600">
                {plan.features.map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>

              <button
                className={`mt-6 w-full py-3 rounded-xl font-semibold transition duration-300 ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;