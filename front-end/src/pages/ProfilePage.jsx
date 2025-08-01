import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Edit3, Save, User, Mail, MapPin, Calendar, Phone, Heart, FileText } from "lucide-react";
import axios from "axios";
import AppSidebar from "./Sidebar.tsx";
import ProfileIllustration from "../images/profile-page-illustration.png";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
    gender: "",
    location: "",
    concerns: "",
    treatment_history: "",
    emergency_contact: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3001/api/profile/${userId}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
    fetchProfile();
  }, [userId, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/profile/${userId}`, formData);
      alert("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Profile update failed. Please try again.");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const FormField = ({ icon: Icon, label, name, type = "text", required = false, textarea = false }) => (
    <div className="mb-5 group">
      <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2 text-sm tracking-wide">
        <Icon className="w-4 h-4 text-purple-600" />
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 bg-white/70 backdrop-blur-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none ${
            isEditing
              ? 'border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              : 'border-gray-200 bg-gray-100/50'
          } ${!isEditing ? 'cursor-not-allowed' : ''}`}
          disabled={!isEditing}
          required={required}
          rows="4"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 bg-white/70 backdrop-blur-sm text-slate-800 placeholder-slate-400 focus:outline-none ${
            isEditing
              ? 'border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              : 'border-gray-200 bg-gray-100/50'
          } ${!isEditing ? 'cursor-not-allowed' : ''}`}
          disabled={!isEditing}
          required={required}
        />
      )}
    </div>
  );

  return (
    <div className="h-screen w-full bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden">
      <div className="flex h-full relative">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static md:w-64 bg-gradient-to-br from-purple-50 to-blue-50 border-r border-white/50`}
        >
          <AppSidebar toggleSidebar={toggleSidebar} />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleSidebar} />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Sidebar Toggle Button */}
          <button
            className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-purple-500 text-white"
            onClick={toggleSidebar}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <main className="flex-1 flex relative p-4 sm:p-6 md:p-8 overflow-hidden">
            {/* Left side - Profile Form */}
            <div
              className={`w-full lg:w-1/2 flex flex-col justify-center p-4 sm:p-6 lg:p-8 lg:ml-[-2rem] transition-all duration-700 ${
                showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="max-w-md mx-auto w-full">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                    <div>
                      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 mb-3 drop-shadow-md">
                        Hello {formData.username || "User"},
                      </h1>
                      <p className="text-slate-600 text-base">
                        Update your profile details below
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>
                </div>

                {/* Form */}
                <div className="bg-white/50 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/30 max-h-[calc(100vh-14rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
                  <form onSubmit={handleSubmit} className="space-y-2">
                    <FormField icon={User} label="Username" name="username" required />
                    <FormField icon={Mail} label="Email" name="email" type="email" required />
                    <FormField icon={Calendar} label="Age" name="age" required />
                    <FormField icon={MapPin} label="Location" name="location" required />
                    <FormField icon={Heart} label="Mental Health Concerns (Optional)" name="concerns" textarea />
                    <FormField icon={FileText} label="Treatment History (Optional)" name="treatment_history" textarea />
                    <FormField icon={Phone} label="Emergency Contact" name="emergency_contact" required />
                    <button
                      type="submit"
                      className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                        isEditing
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md hover:shadow-lg hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!isEditing}
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Right side - Illustration */}
            <div
              className={`hidden lg:flex lg:w-1/2 items-center justify-center p-8 transition-all duration-700 delay-300 ${
                showContent ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-3xl transform scale-150"></div>
                <img
                  src={ProfileIllustration}
                  alt="Profile illustration"
                  className="relative w-full max-w-md rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
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
          .max-w-md {
            max-width: 100%;
          }
        }
        html, body {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;