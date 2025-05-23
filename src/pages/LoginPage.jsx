import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password, rememberMe });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              <path d="M12 7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="rgba(255,255,255,0.8)"/>
            </svg>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-gray-500 text-sm">Sign in to continue your journey</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all bg-white text-purple-600 shadow-sm"
          >
            Login
          </button>
          <button
            className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all text-gray-600 hover:text-gray-800"
            onClick={onSwitchToRegister}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          {/* Username Field */}
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
            >
              {showPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm">Don't have an account? </span>
          <button
            className="text-purple-600 hover:text-purple-700 font-medium text-sm"
            onClick={onSwitchToRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;