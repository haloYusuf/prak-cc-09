import React, { useState, useRef, useEffect } from 'react';
import { 
  Trophy, 
  Users, 
  Plus, 
  BarChart3, 
  Settings, 
  HelpCircle,
  User,
  LogOut,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import SidebarItem from './SidebarItem';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const menuItems = [
    { id: 'competitions', label: 'Competitions', icon: Trophy },
    { id: 'groups', label: 'Group Management', icon: Users },
    { id: 'new-competition', label: 'New Competition', icon: Plus },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // For now, just redirect to a blank page since login page isn't ready
    // Later this will handle proper logout logic
    window.location.href = 'about:blank';
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <div className="w-64 bg-blue-600 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-blue-500">
        <h1 className="text-xl font-bold">CompAdmin</h1>
        <p className="text-blue-200 text-sm">Competition Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-blue-500 relative" ref={dropdownRef}>
        {/* Profile Dropdown */}
        {showProfileDropdown && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        )}

        {/* Profile Button */}
        <button
          onClick={toggleProfileDropdown}
          className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-blue-200 truncate">Admin</p>
          </div>
          {showProfileDropdown ? (
            <ChevronUp className="w-4 h-4 text-blue-200" />
          ) : (
            <ChevronDown className="w-4 h-4 text-blue-200" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;