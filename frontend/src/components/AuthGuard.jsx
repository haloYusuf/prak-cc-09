import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"; // Gunakan Navigate
import { checkAuth } from "../services/auth-api"; // Untuk cek token dari API backend

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkUserAuth = async () => {
      // Cek apakah ada token di cookie dan valid
      const token = document.cookie.includes("refreshToken");
      if (token) {
        const isValid = await checkAuth();
        setIsAuthenticated(isValid);
      } else {
        setIsAuthenticated(false); // Jika tidak ada token, redirect ke login
      }
    };

    checkUserAuth();
  }, []);

  // Jika isAuthenticated masih null, tunggu sampai statusnya diketahui
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === false) {
    return <Navigate to="/" />; // Ganti Redirect dengan Navigate
  }

  return children; // Jika valid, tampilkan konten yang dibungkus di AuthGuard
};

export default AuthGuard;
