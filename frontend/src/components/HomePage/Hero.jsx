
import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/img.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="w-full bg-white text-black pt-16 overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-10 items-center">
 
        {/* Left Content */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Build Chrome Extensions 

            Without <span className="text-blue-600">Coding</span>
          </h1>

          <p className="text-gray-600 mt-6 text-lg">
            Extensio.ai lets you create powerful Chrome extensions just by
            describing your idea. Instantly generate complete projects with
            manifest files, scripts, and UI — ready to download and use.
          </p>

          <div className="mt-8">
            <button
              onClick={() => navigate("/login")}
              className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800"
            >
              Generate Extension
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-10">
            <div>
              <h2 className="text-2xl font-bold">5K+</h2>
              <p className="text-gray-500 text-sm">Extensions Generated</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">1K+</h2>
              <p className="text-gray-500 text-sm">Users</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">100%</h2>
              <p className="text-gray-500 text-sm">No-Code</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={img}
            alt="Extension Generator"
            className="w-full max-w-md lg:max-w-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;