import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/utils.js";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok");
      return;
    }
    console.log(userName);

    try {
      const response = await axios.post(`${BASE_URL}/auth/register/admin`, {
        userName,
        email,
        password,
        confirmPassword,
        phoneNumber,
      });
      console.log(response);
      if (response) {
        navigate("/");
      }
    } catch (e) {
      console.log("Gagal mendaftar. Silakan coba lagi!", e); // Menampilkan error jika registrasi gagal
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-4">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              <path
                d="M12 7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                fill="rgba(255,255,255,0.8)"
              />
            </svg>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm">
            Join us and start your journey
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all text-gray-600 hover:text-gray-800"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all bg-white text-purple-600 shadow-sm">
            Register
          </button>
        </div>

        {/* Register Form */}
        <div className="space-y-4">
          {/* Username Field */}
          <div>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400"
            />
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400"
            />
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <input
              type="tel"
              placeholder="No Telp"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-400"
            />
          </div>

          {/* Register Button */}
          <button
            type="button"
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Account
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm">
            Already have an account?{" "}
          </span>
          <button
            className="text-purple-600 hover:text-purple-700 font-medium text-sm"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
