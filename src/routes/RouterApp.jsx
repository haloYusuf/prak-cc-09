import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CompetitionsPage from "../pages/CompetitionsPage";
import GroupManagementPage from "../pages/GroupManagementPage";
import GroupDetailsPage from "../pages/GroupDetailsPage";
import NewCompetitionPage from "../pages/NewCompetitionPage";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import MainLayout from "../components/layout/MainLayout";

function RouterApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<MainLayout />}>
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route path="/groups" element={<GroupManagementPage />} />
          <Route path="/groups/:groupId" element={<GroupDetailsPage />} />
          <Route path="/new-competition" element={<NewCompetitionPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default RouterApp;
