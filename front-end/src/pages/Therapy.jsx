import React, { useState } from "react";
import { Send, BookOpen, PenTool, MessageCircle, User, LogOut, ChevronRight } from "lucide-react";
import Pic from "../images/therapy.png";

// Sidebar Component
function AppSidebar() {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { title: "Blogs", icon: BookOpen, href: "/blogs" },
    { title: "Journal", icon: PenTool, href: "/journal" },
    { title: "Therapy Chat", icon: MessageCircle, href: "/therapy" },
  ];
  const bottomItems = [
    { title: "Profile", icon: User, href: "/profile" },
    { title: "Logout", icon: LogOut, href: "/logout" },
  ];

  return (
    <>
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed left-3 top-3 bottom-3 backdrop-blur-sm z-50 flex flex-col rounded-xl border border-purple-100/50 bg-gradient-to-b from-purple-50 to-white shadow-xl transition-all duration-300 ease-in-out ${
          isHovered ? "w-48" : "w-12"
        }`}
      >
        <div className="p-2 border-b border-purple-100/50 flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110">
            <div className="w-3 h-3 bg-white rounded-sm rotate-45"></div>
          </div>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          >
            <h1 className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 whitespace-nowrap">
              My Nakama
            </h1>
          </div>
        </div>
        <div className="flex-1 py-2 overflow-hidden">
          {isHovered && (
            <nav className="space-y-1 px-1 h-full">
              {menuItems.map((i, idx) => (
                <a
                  key={i.title}
                  href={i.href}
                  className="group flex items-center gap-2 p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:scale-105 hover:shadow-md"
                  style={{
                    transitionDelay: `${idx * 50}ms`,
                    animation: `slideInLeft 0.3s ease-out ${idx * 50}ms both`,
                  }}
                >
                  <i.icon className="w-4 h-4 text-purple-600 group-hover:text-purple-700 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-800 whitespace-nowrap">
                    {i.title}
                  </span>
                </a>
              ))}
            </nav>
          )}
        </div>
        <div className="border-t border-purple-100/50 p-1 shrink-0">
          {isHovered && (
            <nav className="space-y-1">
              {bottomItems.map((i, idx) => (
                <a
                  key={i.title}
                  href={i.href}
                  className="group flex items-center gap-2 p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:scale-105 hover:shadow-md"
                  style={{
                    transitionDelay: `${(idx + 3) * 50}ms`,
                    animation: `slideInLeft 0.3s ease-out ${(idx + 3) * 50}ms both`,
                  }}
                >
                  <i.icon className="w-4 h-4 text-purple-600 group-hover:text-purple-700 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-800 whitespace-nowrap">
                    {i.title}
                  </span>
                </a>
              ))}
            </nav>
          )}
          <div className="mt-4 flex justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer group">
              <User className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </aside>

      {!isHovered && (
        <div className="fixed left-16 top-1/2 transform -translate-y-1/2 z-40 pointer-events-none">
          <div className="flex items-center">
            <ChevronRight className="w-9 h-9 text-purple-900 blink-arrow" />
          </div>
        </div>
      )}
    </>
  );
}

// Main Page with Sidebar
export default function TherapyChatPage() {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 relative overflow-hidden flex flex-col pl-16">
      <AppSidebar />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 -z-10">
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

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center flex-1 px-6 lg:px-20 py-10 gap-12">
        {/* Left - Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={Pic}
            alt="Therapy illustration"
            className="max-w-xs md:max-w-sm lg:max-w-md h-auto object-contain transition-transform duration-700 ease-in-out"
          />
        </div>

        {/* Right - Chat Section */}
        <div className="flex-1 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-slate-800 mb-4">
              Hi <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Buddy!
              </span>
            </h1>
            <p className="text-lg text-slate-600 font-medium">
              This is a safe space to express yourself. I'm here to listen without judgment.
            </p>
          </div>

          {/* Prompt Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 border border-purple-100 shadow-sm hover:shadow-md transition duration-300">
              <h3 className="font-bold text-slate-800 mb-2">💜 Secret</h3>
              <p className="text-sm text-slate-600">Your secret is safe here</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 border border-purple-100 shadow-sm hover:shadow-md transition duration-300">
              <h3 className="font-bold text-slate-800 mb-2">🌟 24/7 Support</h3>
              <p className="text-sm text-slate-600">Available whenever you need to talk</p>
            </div>
          </div>

          {/* Chat Input */}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Share what's on your mind..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-5 py-4 text-base bg-white/80 backdrop-blur-sm border border-purple-200 rounded-lg focus:ring-4 focus:ring-purple-100 placeholder:text-slate-400 shadow-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>

          {/* Footer Message */}
          <p className="text-center text-slate-600 text-sm mt-6 font-medium">
            Take your time. Every feeling is valid, and you deserve to be heard.
          </p>
        </div>
      </div>
    </div>
  );
}
