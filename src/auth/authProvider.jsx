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

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      const token = res.data.accessToken;
      const uid = res.data.uId;
      // const id = res.data.uId;
      // const refresh = res.data.refreshToken;
      // console.log(token, id);
      setAccessToken(token);

      Cookies.set("uId", uid, {
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set("refreshToken", res.data.refreshToken, {
        secure: false,
        sameSite: "Strict",
        expires: 5,
      });

      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logout = async () => {
    await axios.delete(`${BASE_URL}/logout`, {
      withCredentials: true,
    });
    setAccessToken(null);
    Cookies.remove("refreshToken");
    Cookies.remove("uId");
    // localStorage.removeItem("uId");
    localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");

    return Promise.resolve();
  };

  const refreshAccessToken = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/token`);
      setAccessToken(res.data.accessToken);
      return res.data.accessToken;
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
