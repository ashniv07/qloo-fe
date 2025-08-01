import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppSidebar from "../Sidebar.tsx";

const Journal = () => {
  const userId = useSelector((state) => state.user.userId);
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const backgroundGenerator = () => {
    return `linear-gradient(${Math.random() * 360}deg, hsl(${
      Math.random() * 360
    }, 70%, 80%), hsl(${Math.random() * 360}, 70%, 80%))`;
  };

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3001/api/journals/${userId}`)
        .then((response) => setEntries(response.data))
        .catch((error) => console.error(error));
    }
  }, [userId]);

  const openModal = (entry = null) => {
    if (entry) {
      setTitle(entry.title);
      setEntry(entry.content);
      setEditingIndex(entries.findIndex((e) => e.id === entry.id));
    } else {
      setTitle("");
      setEntry("");
      setEditingIndex(null);
    }
    document.getElementById("journal_modal").showModal();
  };

  const closeModal = () => {
    document.getElementById("journal_modal").close();
  };

  const handleSave = () => {
    if (title && entry) {
      if (editingIndex !== null) {
        const updatedEntry = {
          ...entries[editingIndex],
          userId,
          title,
          content: entry,
        };
        axios
          .put(
            `http://localhost:3001/api/journals/${updatedEntry.id}`,
            updatedEntry
          )
          .then((response) => {
            const updatedEntries = [...entries];
            updatedEntries[editingIndex] = response.data;
            setEntries(updatedEntries);
          })
          .catch((error) => console.error(error));
      } else {
        const newEntry = { userId, title, content: entry };
        axios
          .post("http://localhost:3001/api/journals", newEntry)
          .then((response) => setEntries([...entries, response.data[0]]))
          .catch((error) => console.error(error));
      }
      setTitle("");
      setEntry("");
      closeModal();
    }
  };

  const handleDelete = (index) => {
    const entryToDelete = entries[index];
    axios
      .delete(`http://localhost:3001/api/journals/${entryToDelete.id}`)
      .then(() => setEntries(entries.filter((_, i) => i !== index)))
      .catch((error) => console.error(error));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="flex min-h-screen">
        {/* Use the same sidebar pattern as ProfilePage */}
        <AppSidebar />
        
        {/* Main Content - with proper spacing for sidebar */}
        <div className="flex-1 pl-16 flex flex-col">
          <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
            {/* Centered container for all content */}
            <div className="min-h-full flex flex-col items-center justify-start px-6 py-8">
              
              {/* Title */}
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 italic mt-6 mb-8 text-center">
                Journal
              </h2>
              
              {/* Quote */}
              <div className="relative font-libre-baskerville tracking-wide italic text-xl text-slate-700 mb-10 pl-8 max-w-2xl text-center">
                <span className="absolute left-0 top-0 text-6xl text-purple-300">“</span>
                <span className="inline-block pl-6 pr-6">
                  As there are a thousand thoughts lying within a man that he does not know till he takes up the pen to write.
                </span>
                <span className="absolute right-0 bottom-0 text-6xl text-purple-300">”</span>
              </div>

              {/* Add Journal Button */}
              <div className="flex justify-center mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 120"
                  width="150"
                  height="150"
                  className="mx-auto cursor-pointer text-purple-500 hover:text-purple-600 transition-colors duration-300"
                  onClick={() => openModal()}
                >
                  <rect
                    x="10"
                    y="10"
                    width="80"
                    height="100"
                    rx="5"
                    ry="5"
                    fill="rgba(255, 255, 255, 0.3)"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="40"
                    y1="60"
                    x2="60"
                    y2="60"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="70"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              </div>

              {/* Journal Entries Grid - Centered */}
              <div className="w-full max-w-6xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                  {entries
                    .filter((entry) => entry !== null && entry !== undefined)
                    .map((entry) => (
                      <div
                        key={entry.id}
                        className="w-full max-w-sm bg-white/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
                        style={{
                          background: backgroundGenerator(),
                        }}
                        onClick={() => openModal(entry)}
                      >
                        <div className="p-6 text-center">
                          <h3 className="text-lg font-semibold text-slate-800 mb-3">{entry.title}</h3>
                          <div className="flex justify-end">
                            <button
                              className="btn bg-purple-500 text-white hover:bg-purple-600 text-sm font-medium px-4 py-2 rounded-lg mt-4 transition-all duration-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(
                                  entries.findIndex((e) => e.id === entry.id)
                                );
                              }}
                            >
                              Delete
                            </button>
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

      {/* Modal */}
      <dialog id="journal_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full bg-white/50 backdrop-blur-sm max-w-4xl border border-white/30 rounded-xl">
          <h3 className="font-bold font-libre-baskerville italic text-center text-lg text-slate-800">
            Write Your Journal
          </h3>
          <div className="join join-vertical w-full rounded-lg mt-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full join-item px-4 py-3 text-xl italic border border-purple-300 focus:outline-none focus:border-purple-500 bg-white/70 backdrop-blur-sm rounded-t-lg"
            />
            <textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="w-full h-64 px-4 py-6 join-item focus:outline-none border border-purple-300 bg-white/70 backdrop-blur-sm rounded-b-lg text-slate-800 placeholder-slate-400"
              placeholder="Write down your thoughts..."
            ></textarea>
          </div>
          <div className="modal-action flex justify-center gap-4 mt-6">
            <button
              className="btn bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg transition-all duration-300 px-6 py-2 rounded-lg"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="btn bg-gray-300 text-slate-800 hover:bg-gray-400 transition-all duration-300 px-6 py-2 rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>

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

export default Journal;