import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CompetitionsPage from "../pages/CompetitionsPage";
import GroupManagementPage from "../pages/GroupManagementPage";
import GroupDetailsPage from "../pages/GroupDetailsPage";
import NewCompetitionPage from "../pages/NewCompetitionPage";

import Sidebar from "../components/layout/Sidebar";

function RouterApp() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto">
          <Router>
            <Routes>
              <Route path="/" element={<CompetitionsPage />} />
              <Route path="/competitions" element={<CompetitionsPage />} />
              <Route path="/groups" element={<GroupManagementPage />} />
              <Route path="/groups/:groupId" element={<GroupDetailsPage />} />
              <Route path="/new-competition" element={<NewCompetitionPage />} />
              {/* <Route
              path="/analytics"
              element={<div className="p-6">Analytics Page - Coming Soon</div>}
            />
            <Route
              path="/settings"
              element={<div className="p-6">Settings Page - Coming Soon</div>}
            />
            <Route
              path="/help"
              element={
                <div className="p-6">Help & Support Page - Coming Soon</div>
              }
            /> */}
            </Routes>
          </Router>
        </main>
      </div>
    </div>
  );
}

export default RouterApp;
