import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/userSlice";
import LoginImg from "../images/LoginImg.png";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleClick = () => {
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });

      const { userId } = response.data;

      if (userId) {
        dispatch(setUserId(userId));
        setSuccessMessage("Login successful!");
        setErrorMessage("");
        navigate("/chat");
      } else {
        setErrorMessage("Login failed, userId not received");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Invalid email or password");
      setSuccessMessage("");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between w-full p-4 shadow-md bg-transparent z-10">
        <div className="flex items-center pl-8 cursor-pointer" onClick={handleClick}>
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
            <div className="w-3 h-3 bg-white rounded-sm transform rotate-45" />
          </div>
          <h1 className="text-lg font-bold text-slate-800 tracking-wide">my nakama</h1>
        </div>
        <nav className="flex items-center space-x-6 pr-12">
          <Link to="/signup" className="text-base font-medium text-slate-800 hover:text-slate-900">
            Sign Up
          </Link>
          <Link to="/blogs" className="text-base font-medium text-slate-600 hover:text-slate-800">
            Blogs
          </Link>
        </nav>
      </header>

      {/* Main */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Login Form Section */}
        <div className="w-1/2 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-6">
            <h1 className="text-4xl font-extrabold text-slate-800 mb-4 font-playfair">Login</h1>
            <p className="text-slate-600 mb-4 text-base font-medium">Welcome back, it’s good to see you again</p>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="block text-slate-700 font-semibold mb-1 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="password" className="block text-slate-700 font-semibold mb-1 text-sm">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-md text-sm hover:from-purple-700 hover:to-blue-700 transition"
              >
                Login
              </button>
            </form>

            {errorMessage && (
              <p className="mt-3 text-center text-red-500 text-sm">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="mt-3 text-center text-green-500 text-sm">{successMessage}</p>
            )}

            <p className="mt-4 text-center text-slate-700 text-sm">
              Don’t have an account?{" "}
              <button onClick={handleSignup} className="text-purple-600 hover:underline">
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <img
            src={LoginImg}
            alt="Login illustration"
            className="w-full max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
