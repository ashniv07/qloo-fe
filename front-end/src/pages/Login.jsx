import React from 'react';
import { Link } from 'react-router-dom';
import FloatingAnimation from './FloatingAnimation.tsx'; // Adjust path if needed

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 60 M 30 0 L 90 60 M 0 30 L 60 90" stroke="#e2d5f7" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path d="M0,200 Q300,150 600,200 T1200,200" stroke="#d8c4f0" strokeWidth="2" fill="none" />
          <path d="M0,400 Q400,350 800,400 T1200,400" stroke="#e8dcf7" strokeWidth="1.5" fill="none" />
          <path d="M200,0 Q250,200 300,400 T400,800" stroke="#e2d5f7" strokeWidth="1" fill="none" />
          <path d="M800,0 Q850,200 900,400 T1000,800" stroke="#d8c4f0" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Top Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6">
        {/* Logo and Title Left */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
            <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-wide">my nakama</span>
        </div>
        <div className="flex-1"></div>
        {/* Removed Nav Links */}
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-120px)]">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 max-w-2xl">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight mb-6">
            <span className="block">The Warmer,</span>
            <span className="block">AI Powered</span>
            <span className="block">Personalized</span>
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Safe Space</span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 font-medium">
            your own personalized safe space
          </p>

          <div className="flex space-x-4 mt-8">
            <Link to="/login" className="bg-black text-white px-6 py-2 rounded-lg text-lg font-playfair hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out">Try now</Link>
            <Link to="/blogs" className="bg-white text-black px-6 py-2 rounded-lg border border-black text-lg font-playfair hover:bg-gray-200 hover:text-black transition duration-300 ease-in-out">Blogs</Link>
          </div>
        </div>

        {/* Right Section - Floating Animation */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-[30rem] h-[30rem] relative">
            <FloatingAnimation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
