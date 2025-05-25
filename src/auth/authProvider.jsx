import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../api/axiosInstance.js";
import PropTypes from "prop-types";
import { BASE_URL } from "../utils/utils.js";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });

  const [user, setUser] = useState(null);

  const loadUserFromToken = (token) => {
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const decoded = jwtDecode(token); // Decode token
      setUser({
        email: decoded.email,
        userName: decoded.userName,
      });
    } catch (error) {
      console.error("Failed to decode token or token invalid:", error);
      setUser(null);
      // Mungkin panggil logout jika token tidak valid
    }
  };

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
        `${BASE_URL}/auth/login/admin`,
        { data: email, password },
        {
          withCredentials: true,
        }
      );
      const token = res.data.accessToken;
      // const uid = res.data.uId;
      // const id = res.data.uId;
      const refresh = res.data.refreshToken;
      // console.log(token, id);
      setAccessToken(token);
      console.log(refresh);
      loadUserFromToken(token);

      // Cookies.set("uId", uid, {
      //   secure: true,
      //   sameSite: "Strict",
      // });

      Cookies.set("refreshToken", refresh, {
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
    await axios.delete(`${BASE_URL}/auth/logout`, {
      withCredentials: true,
    });
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    setUser(null);

    return Promise.resolve();
  };

  const refreshAccessToken = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/token`);
      setAccessToken(res.data.accessToken);
      loadUserFromToken(res.data.accessToken);
      return res.data.accessToken;
    } catch (err) {
      console.error("Token refresh failed:", err);
      logout();
      return "kosong";
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, login, user, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuthContext = () => useContext(AuthContext);
