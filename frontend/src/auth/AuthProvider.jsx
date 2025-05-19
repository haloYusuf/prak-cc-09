import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../api/axiosInstance.js";
import PropTypes from "prop-types";
import { BASE_URL } from "../utils/utils.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    // Cek jika ada accessToken di localStorage saat aplikasi dimuat
    return localStorage.getItem("accessToken") || null;
  });

  const [uId, setUId] = useState(() => {
    // Cek jika ada accessToken di localStorage saat aplikasi dimuat
    return localStorage.getItem("uId") || null;
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    // Cek jika ada accessToken di localStorage saat aplikasi dimuat
    return localStorage.getItem("refreshToken") || null;
  });

  useEffect(() => {
    // Simpan accessToken ke localStorage setiap kali state berubah
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  useEffect(() => {
    // Simpan accessToken ke localStorage setiap kali state berubah
    if (uId) {
      localStorage.setItem("uId", uId);
    } else {
      localStorage.removeItem("uId");
    }
  }, [uId]);

  useEffect(() => {
    // Simpan accessToken ke localStorage setiap kali state berubah
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    } else {
      localStorage.removeItem("refreshToken");
    }
  }, [refreshToken]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password });
      const token = res.data.accessToken;
      const id = res.data.uId;
      const refresh = res.data.refreshToken;
      console.log(token, id);
      setAccessToken(token);
      setUId(id);
      setRefreshToken(refresh);

      // Cookies.set("uId", res.data.uId, {
      //   secure: true,
      //   sameSite: "Strict",
      // });

      // Cookies.set("refreshToken", res.data.refreshToken, {
      //   secure: false,
      //   sameSite: "Strict",
      //   expires: 5,
      // });

      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logout = () => {
    setAccessToken(null);
    Cookies.remove("refreshToken");
    Cookies.remove("uId");
    localStorage.removeItem("uId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    return Promise.resolve();
  };

  const refreshAccessToken = async () => {
    try {
      const token = localStorage.getItem("refreshToken");
      const res = await axios.post(`${BASE_URL}/token`, { token });
      const newAccessToken = res.data.accessToken;
      setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (err) {
      console.error("Token refresh failed:", err);
      logout();
      return "kosong";
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuthContext = () => useContext(AuthContext);
