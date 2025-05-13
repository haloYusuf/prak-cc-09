import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import untuk routing
import LoginPage from "../pages/LoginPage"; // Halaman login
import RegisterPage from "../pages/RegisterPage";
import NotesPage from "../pages/NotesPage";
import ProtectedRoute from "../pages/ProtectedRoute";

// Fungsi untuk memeriksa status login
const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken"); // Ganti sesuai dengan cara kamu menyimpan token
  return token !== null; // Mengembalikan true jika token ada (artinya user sudah login)
};

function RouterApp() {
  return (
    <Router>
      <Routes>
        {/* Jika sudah login, redirect ke /notes */}
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/notes" /> : <LoginPage />}
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
