import React, { useState } from "react";
import {
  Menu,
  X,
  HeartPulse,
  Activity,
  Bell,
  Upload as UploadIcon,
  Settings,
  CircleDot,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button - Visible on all screen sizes */}
      <button
        onClick={toggleSidebar}
        className={`fixed z-50 p-2 rounded-full transition-all ${
          isOpen
            ? "left-64 top-6 bg-gray-700/50"
            : "left-6 top-6 bg-indigo-600"
        }`}
      >
        {isOpen ? (
          <X className="text-white w-5 h-5" />
        ) : (
          <Menu className="text-white w-5 h-5" />
        )}
      </button>

      {/* Sidebar with glassmorphism */}
      <div
        className={`fixed h-screen w-72 bg-white/10 backdrop-blur-lg border-r border-gray-700/20 flex flex-col z-40 transition-all duration-300 ${
          isOpen ? "left-0" : "-left-full"
        }`}
      >
        {/* HealthMate Header */}
        <div className="p-6 border-b border-gray-700/10 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <HeartPulse className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-semibold text-white">HealthMate</h1>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <CircleDot className="w-3 h-3" />
              Online
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 flex flex-col justify-between p-4">
          <div className="space-y-1">
            <p className="text-xs text-gray-400 uppercase tracking-wider px-4 py-2">
              Health Tools
            </p>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
              <Activity className="w-5 h-5" />
              <span>Monitor Health Trends</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span>Health Alerts</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
              <UploadIcon className="w-5 h-5" />
              <span>Upload Medical Reports</span>
            </button>
          </div>

          {/* Settings at Bottom */}
          <div>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay without blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;