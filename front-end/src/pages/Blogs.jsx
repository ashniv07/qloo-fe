import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppSidebar from "./Sidebar.tsx";

const Blogs = () => {
  const [content, setContent] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/blogs");
        setContent(response.data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="flex min-h-screen">
        {/* Use the same sidebar pattern as other pages */}
        <AppSidebar />
        
        {/* Main Content - with proper spacing for sidebar */}
        <div className="flex-1 pl-16 flex flex-col">
          <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
            {/* Centered container for all content */}
            <div className="min-h-full flex flex-col items-center justify-start px-6 py-8">
              
              {/* Title - Centered */}
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 italic mt-6 mb-8 text-center">
                Blogs
              </h2>
              
              {/* Quote - Center Aligned */}
              <div className="relative font-libre-baskerville tracking-wide italic text-xl text-slate-700 mb-10 pl-8 max-w-2xl text-center">
                <span className="absolute left-0 top-0 text-6xl text-purple-300">“</span>
                <span className="inline-block pl-6 pr-6">
                  Your story is unique, and so is your journey to wellness.<br />
                  Every story matters.
                </span>
                <span className="absolute right-0 bottom-0 text-6xl text-purple-300">”</span>
              </div>

              {/* Blog Cards Grid - Centered */}
              <div className="w-full max-w-6xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                  {content.map((item) => (
                    <div
                      key={item.url}
                      className="w-full max-w-sm bg-white/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/30 hover:shadow-xl transition-all duration-300"
                    >
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-t-xl p-4 pb-0"
                        />
                      </a>
                      <div className="p-6 text-justify">
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">{item.title}</h3>
                        <p className="text-slate-600 text-sm mb-3">{item.description}</p>
                        <div className="text-center">
                          <span className="text-purple-500 text-sm font-medium">
                            {item.type === 'video' ? 'Video' : 'Article'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #d8b4fe transparent;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #d8b4fe;
          border-radius: 20px;
          border: 3px solid transparent;
        }
        @media (max-width: 768px) {
          .max-w-2xl {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Blogs;