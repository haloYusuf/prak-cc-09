import React, { useState } from 'react';
import { Bell, Search, Trophy, Users, PlusCircle, BarChart2, Settings, HelpCircle, LogOut, Edit, Trash2 } from 'lucide-react';

const CompetitionsPage = () => {
  const [competitions] = useState([
    {
      id: 1,
      name: "Summer Code Challenge",
      category: "Web Development",
      date: "Aug 15, 2023",
      participants: "24 / 30",
      winner: "Team Innovators",
      status: "COMPLETED",
      icon: "💻"
    },
    {
      id: 2,
      name: "AI Hackathon",
      category: "Machine Learning",
      date: "Oct 10, 2023",
      participants: "18 / 25",
      winner: "-",
      status: "UPCOMING",
      icon: "🧠"
    },
    {
      id: 3,
      name: "UX Design Challenge",
      category: "User Experience",
      date: "Sep 5, 2023",
      participants: "12 / 20",
      winner: "-",
      status: "REGISTRATION",
      icon: "🎨"
    },
    {
      id: 4,
      name: "Mobile App Innovation",
      category: "Mobile Development",
      date: "Nov 20, 2023",
      participants: "8 / 15",
      winner: "-",
      status: "REGISTRATION",
      icon: "📱"
    },
       {
      id: 5,
      name: "Data Science Challenge",
      category: "Data Analytics",
      date: "Dec 1, 2023",
      participants: "15 / 20",
      winner: "-",
      status: "UPCOMING",
      icon: "📊"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'UPCOMING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REGISTRATION':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold">Competitions</h2>
          <div className="flex items-center">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="border rounded-lg py-2 px-4 pl-10 w-60"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">All Competitions</h3>
            <p className="text-sm text-gray-500">Manage your competition events</p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Competition
          </button>
        </div>
        
        {/* Filters */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <select className="border rounded-lg py-2 px-4 pr-8 appearance-none bg-white">
                <option>Registration</option>
                <option>All</option>
                <option>Completed</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="relative">
              <select className="border rounded-lg py-2 px-4 pr-8 appearance-none bg-white">
                <option>Upcoming</option>
                <option>All</option>
                <option>Past</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Competition
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Winner
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {competitions.map((comp) => (
                <tr key={comp.id}>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
                        {comp.icon}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{comp.name}</div>
                        <div className="text-sm text-gray-500">{comp.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                    {comp.date}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                    {comp.participants}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                    {comp.winner}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(comp.status)}`}>
                      {comp.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
{/* Summary Footer */}
            <div className="py-3 px-6 bg-gray-50 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Total: {competitions.length} competitions
              </div>
            </div>
          </div>
        </main>
      </div>

  );
};

export default CompetitionsPage;