import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotesPage from "../pages/NotesPage";
import ProtectedRoute from "../pages/ProtectedRoute";

// Fungsi untuk memeriksa status login
const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken"); // Periksa localStorage untuk accessToken
  return token !== null;
};

function RouterApp() {
  return (
    <Router>
      <Routes>
        {/* Jika sudah login, redirect ke /notes */}
        <Route
          path="/"
          element={isAuthenticated() ? <NotesPage /> : <LoginPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default RouterApp;
