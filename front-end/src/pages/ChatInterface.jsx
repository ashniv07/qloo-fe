"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, BookOpen, PenTool, User, LogOut, Send } from "lucide-react"
import { Link } from "react-router-dom"

// Mock image
const ListenerImg =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjY0IiBmaWxsPSIjZjNmNGY2Ii8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNTAiIHI9IjIwIiBmaWxsPSIjOGI1Y2Y2Ii8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iOTAiIHI9IjMwIiBmaWxsPSIjNjM2NmYxIi8+Cjwvc3ZnPg=="

// Sidebar Component with updated Link paths
function AppSidebar() {
  const [isHovered, setIsHovered] = useState(false)

  const menuItems = [
    { title: "Blogs", icon: BookOpen, href: "/blogs" }, // updated
    { title: "Journal", icon: PenTool, href: "/journal" },
    { title: "Therapy Chat", icon: MessageCircle, href: "/chat" },
  ]

  const bottomItems = [
    { title: "Profile", icon: User, href: "/profile" },
    { title: "Logout", icon: LogOut, href: "/logout" },
  ]

  return (
    <aside
      className={`fixed left-3 top-3 bottom-3 bg-gradient-to-b from-purple-50 to-white shadow-xl transition-all duration-300 ease-in-out z-50 ${
        isHovered ? "w-48" : "w-12"
      } rounded-xl border border-purple-100/50 backdrop-blur-sm flex flex-col`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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

      <div className="flex-1 py-2 overflow-hidden">
        {isHovered && (
          <nav className="space-y-1 px-1 h-full">
            {menuItems.map((item, index) => (
              <Link
                key={item.title}
                to={item.href}
                className="group flex items-center gap-2 p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:shadow-md hover:scale-105"
                style={{
                  transitionDelay: `${index * 50}ms`,
                  animation: `slideInLeft 0.3s ease-out ${index * 50}ms both`,
                }}
              >
                <item.icon className="h-4 w-4 text-purple-600 group-hover:text-purple-700 flex-shrink-0" />
                <span className="font-medium text-sm text-slate-700 group-hover:text-slate-800 whitespace-nowrap">
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>
        )}
      </div>

      <div className="border-t border-purple-100/50 p-1 flex-shrink-0">
        {isHovered && (
          <nav className="space-y-1">
            {bottomItems.map((item, index) => (
              <Link
                key={item.title}
                to={item.href}
                className="group flex items-center gap-2 p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:shadow-md hover:scale-105"
                style={{
                  transitionDelay: `${(index + 3) * 50}ms`,
                  animation: `slideInLeft 0.3s ease-out ${(index + 3) * 50}ms both`,
                }}
              >
                <item.icon className="h-4 w-4 text-purple-600 group-hover:text-purple-700 flex-shrink-0" />
                <span className="font-medium text-sm text-slate-700 group-hover:text-slate-800 whitespace-nowrap">
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

// ChatInterface Component (same as before, unchanged paths)
function ChatInterface() {
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const chatContainerRef = useRef(null)
  const inputRef = useRef(null)
  const sparkleBurstRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      createSparkleBurst()
      setShowContent(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const createSparkleBurst = () => {
    if (!sparkleBurstRef.current) return
    const container = sparkleBurstRef.current
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    for (let i = 0; i < 15; i++) {
      const sparkle = document.createElement("div")
      sparkle.className = "sparkle"
      const angle = (i / 15) * 2 * Math.PI
      const distance = 60 + Math.random() * 40
      const dx = Math.cos(angle) * distance
      const dy = Math.sin(angle) * distance
      sparkle.style.left = centerX + "px"
      sparkle.style.top = centerY + "px"
      sparkle.style.setProperty("--dx", dx + "px")
      sparkle.style.setProperty("--dy", dy + "px")
      sparkle.style.animationDelay = Math.random() * 0.5 + "s"
      container.appendChild(sparkle)
    }
    setTimeout(() => {
      if (container) container.innerHTML = ""
    }, 2500)
  }

  const sendMessage = async () => {
    if (!message.trim()) return
    const userMessage = { text: message, isUser: true }
    setChatMessages((prevMessages) => [...prevMessages, userMessage])
    setLoading(true)

    try {
      // Mock API call for demo
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const therapistMessage = { text: "I understand. How does that make you feel?", isUser: false }
      setChatMessages((prevMessages) => [...prevMessages, therapistMessage])
    } catch (error) {
      console.error("Error sending message:", error)
    }

    setLoading(false)
    setMessage("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      sendMessage()
    }
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [chatMessages])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [chatMessages])

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative">
      <div ref={sparkleBurstRef} className="fixed inset-0 pointer-events-none z-20"></div>

      <div className="flex-1 flex flex-col relative z-30 px-3 py-4">
        {chatMessages.length === 0 && showContent && (
          <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
            <div className="text-center mb-8">
              <div className="mb-6">
                <img
                  src={ListenerImg || "/placeholder.svg"}
                  alt="Listener"
                  className="w-20 h-20 mx-auto rounded-full shadow-xl transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h1 className="text-3xl font-semibold text-slate-800 mb-4">
                Hey, You're heard! ✨
              </h1>
              <p className="text-lg text-slate-600 font-light max-w-xl mx-auto">
                How can I help you today?
              </p>
            </div>
          </div>
        )}

        {chatMessages.length > 0 && (
          <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto scrollbar-hide space-y-3 py-4"
              style={{ maxHeight: "calc(100vh - 140px)" }}
            >
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-3 py-2 rounded-xl ${
                      msg.isUser
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                        : "bg-white/90 text-slate-800 border border-white/50"
                    } text-sm shadow-md`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/90 px-3 py-2 rounded-xl shadow-md border border-white/50">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-400"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="relative z-40 p-3 bg-gradient-to-t from-white/60 to-transparent backdrop-blur-sm">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl flex items-center px-4 py-2 shadow-lg bg-white border border-gray-200">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 text-sm text-slate-800 placeholder-slate-400 bg-transparent border-none outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="ml-3 px-3 py-2 rounded-lg flex items-center text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105"
            >
              <Send className="w-4 h-4 mr-1" />
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

// Main App component
export default function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1 ml-16 flex flex-col">
          <ChatInterface />
        </div>
      </div>
    </div>
  )
}
