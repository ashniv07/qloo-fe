import React, { useState } from "react";
import { ArrowLeft, User, Mail, Lock } from "lucide-react";

const SignupForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    answers: {}
  });

  const questions = [
    {
      question: "What's your favorite genre of music?",
      options: ["Pop", "Rock", "Indie", "Lofi"]
    },
    {
      question: "Which season do you vibe with most?",
      options: ["Spring", "Summer", "Autumn", "Winter"]
    },
    {
      question: "Pick a movie night mood:",
      options: ["Comedy", "Romance", "Thriller", "Documentary"]
    },
    {
      question: "What's your go-to comfort activity?",
      options: ["Reading", "Cooking", "Gaming", "Walking"]
    },
    {
      question: "Choose a dream vacation type:",
      options: ["Beach Resort", "Mountain Cabin", "City Adventure", "Cultural Tour"]
    },
    {
      question: "Which pet do you feel spiritually connected to?",
      options: ["Cat", "Dog", "Bird", "Fish"]
    },
    {
      question: "Pick a time of day you love most:",
      options: ["Early Morning", "Afternoon", "Evening", "Late Night"]
    },
    {
      question: "What's your current life theme?",
      options: ["Growth", "Adventure", "Peace", "Creativity"]
    },
    {
      question: "Your favorite way to express yourself:",
      options: ["Art", "Writing", "Music", "Fashion"]
    },
    {
      question: "What inspires you daily?",
      options: ["Nature", "People", "Stories", "Dreams"]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setFormData({
      ...formData,
      answers: { ...formData.answers, [questionIndex]: answer }
    });
  };

  const handleNext = () => {
    if (currentStep === 0) {
      if (!formData.name || !formData.email || !formData.password) {
        alert("Please fill in all fields");
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSkip = () => {
    if (currentStep < 10) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Replace with your actual API endpoint
      // await axios.post("http://localhost:3001/api/signup", { formData });
      console.log("Submitting:", formData);
      alert("Sign up successful! 🎉 Redirecting to chat...");
      // In your actual app, navigate to chat page like login does
      // navigate("/chat");
      console.log("Navigate to /chat");
    } catch (error) {
      alert("Sign up failed. Please try again.");
    }
  };

  const progressPercentage = currentStep > 0 ? ((currentStep - 1) / 9) * 100 : 0;

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

      {/* Header */}
      <header className="flex items-center justify-between w-full p-4 shadow-md bg-transparent z-10">
        <div className="flex items-center pl-8 cursor-pointer" onClick={() => console.log("Navigate to home")}>
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
            <div className="w-3 h-3 bg-white rounded-sm transform rotate-45" />
          </div>
          <h1 className="text-lg font-bold text-slate-800 tracking-wide">my nakama</h1>
        </div>
        <nav className="flex items-center space-x-6 pr-12">
          <button 
            onClick={() => console.log("Navigate to login")}
            className="text-base font-medium text-slate-800 hover:text-slate-900"
          >
            Login
          </button>
          <button 
            onClick={() => console.log("Navigate to blogs")}
            className="text-base font-medium text-slate-600 hover:text-slate-800"
          >
            Blogs
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-8 py-12">
        
        {/* Progress Bar - Only show for steps 1-10 */}
        {currentStep > 0 && (
          <div className="w-full max-w-lg mb-8">
            <div className="flex justify-between text-sm text-purple-600 mb-2 font-medium">
              <span>Getting to know you 😊</span>
              <span>{currentStep}/10</span>
            </div>
            <div className="w-full bg-purple-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Step 0 - Initial Form */}
        {currentStep === 0 && (
          <div className="relative">
            {/* Flowing Animated Border */}
            <div className="absolute inset-0 rounded-3xl p-1 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 animate-pulse">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 opacity-75"></div>
            </div>
            
            <div className="relative bg-white rounded-3xl p-8 max-w-lg w-full shadow-xl">
              <h1 className="text-4xl font-extrabold text-slate-800 mb-2 text-center">
                Welcome!
              </h1>
              <p className="text-center text-slate-600 mb-8 font-medium">
                Let's create your safe space
              </p>
              
              <div className="space-y-6">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                    required
                  />
                </div>
                
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                    required
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full mt-8 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium text-lg"
              >
                Next ✨
              </button>
              
              <p className="text-center text-slate-600 mt-4 font-medium">
                Already have an account?{' '}
                <button
                  onClick={() => console.log("Navigate to login")}
                  className="text-slate-800 hover:text-slate-900 font-medium underline"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Steps 1-10 - Questions */}
        {currentStep > 0 && currentStep <= 10 && (
          <div className="relative w-full max-w-lg">
            {/* Animated Glowing Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl opacity-75">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl animate-pulse"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
            
            <div className="relative bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/50">
              {/* Top Navigation */}
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={handleBack}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-all duration-200 hover:scale-110"
                >
                  <ArrowLeft className="h-5 w-5 text-slate-600" />
                </button>
                
                <button
                  onClick={handleSkip}
                  className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
                >
                  Skip
                </button>
              </div>

              {/* Question */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-extrabold text-slate-800 mb-4">
                  {questions[currentStep - 1]?.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {questions[currentStep - 1]?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleAnswerSelect(currentStep - 1, option);
                      setTimeout(() => {
                        if (currentStep === 10) {
                          handleSubmit();
                        } else {
                          setCurrentStep(currentStep + 1);
                        }
                      }, 200);
                    }}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left font-medium hover:scale-105 hover:shadow-lg ${
                      formData.answers[currentStep - 1] === option
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white/80 text-slate-700 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Submit Button for Last Step */}
              {currentStep === 10 && (
                <button
                  onClick={handleSubmit}
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium text-lg"
                >
                  Create My Safe Space ✨
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SignupForm;