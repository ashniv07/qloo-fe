"use client"

import { useState } from "react"
import { MessageCircle, BookOpen, PenTool, User, LogOut } from "lucide-react"
import { Link } from "react-router-dom"

function AppSidebar() {
  const [isHovered, setIsHovered] = useState(false)

  const menuItems = [
    { title: "Blog", icon: BookOpen, to: "/blogs" },
    { title: "Journal", icon: PenTool, to: "/journal" },
    { title: "Therapy Chat", icon: MessageCircle, to: "/chat" },
  ]

  const bottomItems = [
    { title: "Profile", icon: User, to: "/profile" },
    { title: "Logout", icon: LogOut, to: "/logout" },
  ]

  return (
    <aside
      className={`fixed left-3 top-3 bottom-3 bg-gradient-to-b from-purple-50 to-white shadow-xl transition-all duration-300 ease-in-out z-50 ${
        isHovered ? "w-48" : "w-12"
      } rounded-xl border border-purple-100/50 backdrop-blur-sm flex flex-col`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Header */}
      <div className="p-2 border-b border-purple-100/50 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110 flex-shrink-0">
            <div className="w-3 h-3 bg-white rounded-sm transform rotate-45" />
          </div>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          >
            <h1 className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent whitespace-nowrap">
              My Nakama
            </h1>
          </div>
        </div>
      </div>

      {/* Main Menu Items */}
      <div className="flex-1 py-2 overflow-hidden">
        {isHovered && (
          <nav className="space-y-1 px-1 h-full">
            {menuItems.map((item, index) => (
              <Link
                key={item.title}
                to={item.to}
                className="group flex items-center gap-2 p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:shadow-md hover:scale-105"
                style={{
                  transitionDelay: `${index * 50}ms`,
                  animation: `slideInLeft 0.3s ease-out ${index * 50}ms both`,
                }}
              >
                <item.icon className="h-4 w-4 text-purple-600 transition-colors group-hover:text-purple-700 flex-shrink-0" />
                <span className="font-medium text-sm text-slate-700 group-hover:text-slate-800 transition-all duration-300 whitespace-nowrap">
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Bottom Menu Items */}
      <div className="border-t border-purple-100/50 p-1 flex-shrink-0">
        {isHovered && (
          <nav className="space-y-1">
            {bottomItems.map((item, index) => (
              <Link
                key={item.title}
                to={item.to}
                className="group flex items-center gap-2 p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:shadow-md hover:scale-105"
                style={{
                  transitionDelay: `${(index + 3) * 50}ms`,
                  animation: `slideInLeft 0.3s ease-out ${(index + 3) * 50}ms both`,
                }}
              >
                <item.icon className="h-4 w-4 text-purple-600 transition-colors group-hover:text-purple-700 flex-shrink-0" />
                <span className="font-medium text-sm text-slate-700 group-hover:text-slate-800 transition-all duration-300 whitespace-nowrap">
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </aside>
  )
}

export default AppSidebar
