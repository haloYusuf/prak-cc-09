import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import CompetitionsPage from "../pages/CompetitionsPage";
import GroupManagementPage from "../pages/GroupManagementPage";
import GroupDetailsPage from "../pages/GroupDetailsPage";
import NewCompetitionPage from "../pages/NewCompetitionPage";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../pages/ProtectedRoute";
import EditCompetitionPage from "../pages/EditCompetitionPage";

const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return token !== null;
};

function RouterApp() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/competitions" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route
            path="/edit-competition/:compeId"
            element={<EditCompetitionPage />}
          />
          <Route path="/groups" element={<GroupManagementPage />} />
          <Route path="/groups/:groupId" element={<GroupDetailsPage />} />
          <Route path="/new-competition" element={<NewCompetitionPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default RouterApp;
