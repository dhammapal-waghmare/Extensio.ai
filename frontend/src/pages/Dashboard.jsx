import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  User,
  Wand2,
  LayoutTemplate,
  Sparkles,
  Download,
  Sun,
  Moon,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import logoDark from "../assets/logo-dark.png";
import logoLight from "../assets/logo-light.png";

// Sidebar Item
const SidebarItem = ({ icon, label, active, onClick, dark }) => {
  const isActive = active === label;

  return (
    <div
      onClick={() => onClick(label)}
      className={`flex items-center gap-3 px-3 py-2 mt-2 rounded-lg cursor-pointer transition-all
        ${
          isActive
            ? dark
              ? "bg-gray-800 text-white"
              : "bg-gray-300 text-black"
            : dark
            ? "hover:bg-gray-800"
            : "hover:bg-gray-200"
        }`}
    >
      {icon}
      <span className="text-sm sm:text-base">{label}</span>
    </div>
  );
};

//Dashboard 
const Dashboard = () => {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const profileRef = useRef();
  const inputRef = useRef();

  const [prompt, setPrompt] = useState("");
  const [activeTab, setActiveTab] = useState("manifest.json");
  const [showMore, setShowMore] = useState(false);

  const [output, setOutput] = useState({});
  const [allFiles, setAllFiles] = useState({});
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.className = dark
      ? "bg-black text-white"
      : "bg-white text-black";
  }, [dark]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //Handlers 
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setShowProfile(false);
    setSidebarOpen(false);

    if (menu === "Home") navigate("/");
    if (menu === "Generate Extension") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    const files = {
      "manifest.json": `{ "manifest_version": 3 }`,
      "content.js": `console.log("Content loaded");`,
      "popup.html": `<h2>Hello Extension 🚀</h2>`,
      "popup.js": `console.log("Popup JS");`,
      "background.js": `console.log("Background running");`,
      "styles.css": `body { font-family: Arial; }`,
    };

    setOutput(files);
    setAllFiles(files);
    setActiveTab("manifest.json");
    setPrompt("");
  };

  const handleDownload = async () => {
    const zip = new JSZip();
    Object.keys(allFiles).forEach((file) => {
      zip.file(file, allFiles[file]);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "extension.zip");
  };

  const mainTabs = ["manifest.json", "content.js", "popup.html"];
  const extraTabs = ["popup.js", "background.js", "styles.css"];

  // UI
  return (
    <div className="flex flex-col h-screen">
      {/* NAVBAR */}
      <nav className="w-full px-4 sm:px-6 py-3 shadow flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <button
            className="sm:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>

          <img
            src={dark ? logoLight : logoDark}
            alt="logo"
            className="h-8 sm:h-10"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {dark ? <Moon size={18} /> : <Sun size={18} />}
          <span className="hidden sm:block">
            {dark ? "Dark" : "Light"}
          </span>

          <button
            onClick={() => setDark(!dark)}
            className={`w-12 h-6 flex items-center rounded-full p-1 ${
              dark ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition ${
                dark ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <div
          className={`fixed sm:relative z-40 top-0 left-0 h-full w-64 p-4 flex flex-col justify-between transform transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0
          ${dark ? "bg-black text-white" : "bg-gray-100"}
        `}
        >
          <div>
            <SidebarItem icon={<Home size={18} />} label="Home" active={activeMenu} onClick={handleMenuClick} dark={dark} />
            <SidebarItem icon={<Wand2 size={18} />} label="Generate Extension" active={activeMenu} onClick={handleMenuClick} dark={dark} />
            <SidebarItem icon={<LayoutTemplate size={18} />} label="Extension Library" active={activeMenu} onClick={handleMenuClick} dark={dark} />
          </div>

          {/* PROFILE */}
          <div className="relative" ref={profileRef}>
            <div
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <User size={18} />
              Profile
            </div>

            {showProfile && (
              <div className="absolute bottom-14 left-0 w-44 z-50">
                <div className="rounded-xl shadow-lg p-3 bg-white dark:bg-gray-900">
                  <p className="font-medium">Username</p>
                  <button
                    onClick={() => navigate("/")}
                    className="text-red-500 mt-2 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-4 sm:p-6 overflow-auto w-full">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Welcome to Dashboard 👋
          </h1>

          {/* INPUT */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 border-2 border-blue-900 rounded-xl px-4 py-3 bg-white">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter extension idea..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 outline-none text-black"
            />

            <button
              onClick={handleGenerate}
              className="bg-black text-white px-5 py-2 rounded-lg flex items-center justify-center gap-2"
            >
              Generate <Sparkles size={16} />
            </button>
          </div>

          {/* OUTPUT */}
          {output["manifest.json"] && (
            <div className="mt-6 border-2 border-blue-900 rounded-xl bg-white text-black">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-3 p-2 border-b">
                
                {/* Tabs */}
                <div className="flex flex-wrap gap-2">
                  {mainTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 rounded text-sm ${
                        activeTab === tab
                          ? "bg-black text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}

                  {showMore &&
                    extraTabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="px-3 py-1 bg-gray-200 rounded text-sm"
                      >
                        {tab}
                      </button>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="px-3 py-1 bg-gray-300 rounded text-sm"
                  >
                    {showMore ? "Less" : "More..."}
                  </button>

                  <button
                    onClick={handleDownload}
                    className="bg-black text-white px-4 py-1 rounded flex items-center gap-2"
                  >
                    Download ZIP <Download size={16} />
                  </button>
                </div>
              </div>

              <div className="p-4 overflow-auto">
                <pre className="whitespace-pre-wrap wrap-break-word text-sm">
                  {output[activeTab]}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;