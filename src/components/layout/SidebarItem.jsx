import React from 'react';

const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
          isActive 
            ? 'bg-blue-700 text-white' 
            : 'text-blue-100 hover:bg-blue-700 hover:text-white'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{label}</span>
      </button>
    </li>
  );
};

export default SidebarItem;