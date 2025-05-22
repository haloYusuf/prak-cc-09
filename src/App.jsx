import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import CompetitionsPage from './pages/CompetitionsPage';
import GroupManagementPage from './pages/GroupManagementPage';
import GroupDetailsPage from './pages/GroupDetailsPage';
import NewCompetitionPage from './pages/NewCompetitionPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import HelpSupportPage from './pages/HelpSupportPage';

function App() {
  const [activeTab, setActiveTab] = useState('competitions');
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setActiveTab('group-details');
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
    setActiveTab('groups');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'competitions':
        return <CompetitionsPage />;
      case 'groups':
        return <GroupManagementPage onGroupSelect={handleGroupSelect} />;
      case 'group-details':
        return <GroupDetailsPage onNavigateBack={handleBackToGroups} />;
      case 'new-competition':
        return <NewCompetitionPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'help':
        return <HelpSupportPage />;
      default:
        return <CompetitionsPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;