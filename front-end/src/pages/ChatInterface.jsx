"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, BookOpen, PenTool, User, LogOut, Send, ChevronRight } from "lucide-react"


// Placeholder image (you can replace with your actual asset)
const ListenerImg =
  "data:image/svg+xml;base64,..."

// Sidebar Component
function AppSidebar() {
  const [isHovered, setIsHovered] = useState(false)

  const menuItems = [
    { title: "Blogs", icon: BookOpen, href: "/blogs" },
    { title: "Journal", icon: PenTool, href: "/journal" },
    { title: "Therapy Chat", icon: MessageCircle, href: "/therapy" },
  ]
  const bottomItems = [
    { title: "Profile", icon: User, href: "/profile" },
    { title: "Logout", icon: LogOut, href: "/logout" },
  ]

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
          <div className={`transition-all duration-300 overflow-hidden ${isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>
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
                  style={{ transitionDelay: `${idx * 50}ms`, animation: `slideInLeft 0.3s ease-out ${idx * 50}ms both` }}
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
                  style={{ transitionDelay: `${(idx + 3) * 50}ms`, animation: `slideInLeft 0.3s ease-out ${(idx + 3) * 50}ms both` }}
                >
                  <i.icon className="w-4 h-4 text-purple-600 group-hover:text-purple-700 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-800 whitespace-nowrap">
                    {i.title}
                  </span>
                </a>
              ))}
            </nav>
          )}
          
          {/* User Login Icon - Always Visible */}
          <div className="mt-4 flex justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer group">
              <User className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
             
            </div>
          </div>
        </div>
      </aside>
      
      {/* Hover Indicator Arrow */}
      {!isHovered && (
        <div className="fixed left-16 top-1/2 transform -translate-y-1/2 z-40 pointer-events-none">
          <div className="flex items-center">
            <ChevronRight className="w-9 h-9 text-purple-900 blink-arrow" />
         
          </div>
        </div>
      )}
    </>
  )
}

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

  function createSparkleBurst() {
    const container = sparkleBurstRef.current
    if (!container) return
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2
    for (let i = 0; i < 15; i++) {
      const d = document.createElement("div")
      d.className = "sparkle"
      const a = (i / 15) * 2 * Math.PI, r = 60 + Math.random() * 40
      d.style.left = cx + "px"
      d.style.top = cy + "px"
      d.style.setProperty("--dx", Math.cos(a) * r + "px")
      d.style.setProperty("--dy", Math.sin(a) * r + "px")
      d.style.animationDelay = `${Math.random() * 0.5}s`
      container.appendChild(d)
    }
    setTimeout(() => container.innerHTML = "", 2500)
  }

  const sendMessage = async () => {
    if (!message.trim()) return
    setChatMessages((prev) => [...prev, { text: message, isUser: true }])
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setChatMessages((prev) => [...prev, { text: "I understand. How does that make you feel?", isUser: false }])
    setLoading(false)
    setMessage("")
  }

  const handleKeyDown = (e) => { if (e.key === "Enter") { e.preventDefault(); sendMessage() } }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [chatMessages])

  useEffect(() => { inputRef.current?.focus() }, [chatMessages])

  const AmbientSparkle = ({ delay, duration, left }) => (
    <div
      className="absolute w-0.5 h-0.5 bg-purple-400 rounded-full opacity-60 ambient-particle"
      style={{ left: `${left}%`, animation: `ambientFloat ${duration}s linear infinite`, animationDelay: `${delay}s` }}
    />
  )

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative">
      {/* Background Waves */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <svg className="absolute top-16 left-20 wave-animation" width="150" height="75" viewBox="0 0 150 75">
          <path d="M0,37.5 Q37.5,15 75,37.5 T150,37.5" stroke="url(#gradient1)" strokeWidth="1.5" fill="none" opacity="0.3"/>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#a78bfa"}}/>
              <stop offset="100%" style={{ stopColor: "#60a5fa"}}/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute bottom-32 right-16 wave-animation-delayed" width="180" height="90" viewBox="0 0 180 90">
          <path d="M0,45 Q45,22.5 90,45 T180,45" stroke="url(#gradient2)" strokeWidth="1.5" fill="none" opacity="0.25"/>
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#c084fc"}}/>
              <stop offset="100%" style={{ stopColor: "#93c5fd"}}/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Ambient Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <AmbientSparkle delay={0} duration={8} left={15}/>
        <AmbientSparkle delay={-2} duration={10} left={25}/>
        <AmbientSparkle delay={-4} duration={9} left={70}/>
        <AmbientSparkle delay={-1} duration={7} left={85}/>
        <AmbientSparkle delay={-3} duration={11} left={50}/>
      </div>

      {/* Burst */}
      <div ref={sparkleBurstRef} className="fixed inset-0 pointer-events-none z-20"></div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col relative z-30 px-3 py-4">
        {chatMessages.length === 0 && showContent ? (
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
            <img src={ListenerImg} alt="Listener" className="w-20 h-20 rounded-full shadow-xl mb-6 transition-transform duration-500 hover:scale-110"/>
            <h1 className="text-4xl font-semibold text-slate-800 mb-4">Hey, You're heard! ✨</h1>
            <p className="text-lg text-slate-600 max-w-xl text-center">How can I help you today?</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col w-full max-w-2xl mx-auto">
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-3 py-4" style={{ maxHeight: "calc(100vh - 140px)" }}>
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`${m.isUser ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" : "bg-white/90 backdrop-blur-sm text-slate-800 border border-white/50"} px-3 py-2 rounded-xl max-w-xs text-sm shadow-md transition-shadow hover:shadow-lg`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-md border border-white/50">
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

      {/* Input */}
      <div className="relative z-40 p-3 bg-gradient-to-t from-white/60 to-transparent backdrop-blur-sm">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-lg">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 text-sm text-slate-800 placeholder-slate-400 bg-transparent border-none outline-none"
            />
            <button onClick={sendMessage} className="ml-3 flex items-center text-white bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-2 rounded-lg hover:scale-105 transition-transform">
              <Send className="w-4 h-4 mr-1"/> Send
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

// Main App
export default function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-15px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes sparkleFloat {
          0% { transform: scale(0); opacity: 1;}
          50% { transform: scale(1); opacity: 1;}
          100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0;}
        }
        @keyframes ambientFloat {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0;}
          10%, 90% { opacity:1;}
          100% { transform: translateY(-80px) rotate(360deg); opacity: 0;}
        }
        @keyframes blinkArrow {
          0%, 50% { opacity: 1; transform: translateX(0); }
          25% { opacity: 0.5; transform: translateX(2px); }
          75% { opacity: 0.7; transform: translateX(-1px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .wave-animation { animation: waveFloat 6s ease-in-out infinite; }
        .wave-animation-delayed { animation: waveFloat 6s ease-in-out infinite; animation-delay: -2s; }
        @keyframes waveFloat { 0%,100%{transform:translateY(0) rotate(0);}50%{transform:translateY(-8px) rotate(1deg);} }
        .typing-indicator { animation: pulse 1.5s ease-in-out infinite; }
        @keyframes pulse {0%,100%{opacity:0.5;}50%{opacity:1;}}
        .ambient-particle { box-shadow:0 0 4px rgba(139,92,246,0.5); mix-blend-mode:screen; }
        .blink-arrow { animation: blinkArrow 2s ease-in-out infinite; }
      `}</style>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1 ml-16 flex flex-col">
          <ChatInterface />
        </div>
      </div>
    </div>
  )
}