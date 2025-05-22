import React, { useState } from 'react';
import { Search, Plus, Filter, Eye, Check, X, ChevronDown } from 'lucide-react';

const GroupManagementPage = ({ onGroupSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  
  // Competition selection states
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [showCompetitionDropdown, setShowCompetitionDropdown] = useState(false);
  const [competitionSearchTerm, setCompetitionSearchTerm] = useState('');

  // Competition data from CompetitionsPage.jsx
  const competitions = [
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
  ];

  const groups = [
    {
      id: 1,
      name: "Data Alchemists",
      competition: "AI Hackathon",
      members: 5,
      leader: "Emily Chen",
      status: "Approved",
      created: "2023-09-15",
      submission: "Submitted"
    },
    {
      id: 2,
      name: "Code Warriors",
      competition: "Web Dev Challenge",
      members: 4,
      leader: "Mike Johnson",
      status: "Pending",
      created: "2023-09-18",
      submission: "Not Submitted"
    },
    {
      id: 3,
      name: "Neural Network",
      competition: "ML Competition",
      members: 6,
      leader: "Sarah Kim",
      status: "Approved",
      created: "2023-09-20",
      submission: "Submitted"
    },
    {
      id: 4,
      name: "Pixel Pioneers",
      competition: "Design Contest",
      members: 3,
      leader: "Alex Chen",
      status: "Rejected",
      created: "2023-09-22",
      submission: "Not Submitted"
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompetitionStatusColor = (status) => {
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

  // Filter competitions based on search term
  const filteredCompetitions = competitions.filter(competition =>
    competition.name.toLowerCase().includes(competitionSearchTerm.toLowerCase()) ||
    competition.category.toLowerCase().includes(competitionSearchTerm.toLowerCase())
  );

  // Filter groups based on selected competition and other filters
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.competition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || group.status.toLowerCase() === statusFilter;
    const matchesCompetition = !selectedCompetition || group.competition === selectedCompetition.name;
    return matchesSearch && matchesStatus && matchesCompetition;
  });

  const handleCompetitionSelect = (competition) => {
    setSelectedCompetition(competition);
    setShowCompetitionDropdown(false);
    setCompetitionSearchTerm('');
  };

  const clearCompetitionFilter = () => {
    setSelectedCompetition(null);
  };

  const handleRejectClick = (group) => {
    setSelectedGroup(group);
    setShowRejectModal(true);
  };

  const handleRejectConfirm = () => {
    // Handle reject logic here
    console.log(`Rejecting group ${selectedGroup.name} with reason: ${rejectReason}`);
    setShowRejectModal(false);
    setRejectReason('');
    setSelectedGroup(null);
  };

  const handleRejectCancel = () => {
    setShowRejectModal(false);
    setRejectReason('');
    setSelectedGroup(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Group Management</h1>
            <p className="text-gray-600 mb-4">Manage competition groups and teams</p>
            
            {/* Competition Selection Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCompetitionDropdown(!showCompetitionDropdown)}
                className="flex items-center justify-between w-80 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <div className="flex items-center">
                  {selectedCompetition ? (
                    <>
                      <span className="text-lg mr-2">{selectedCompetition.icon}</span>
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">{selectedCompetition.name}</div>
                        <div className="text-xs text-gray-500">{selectedCompetition.category}</div>
                      </div>
                    </>
                  ) : (
                    <span className="text-gray-500">Select a competition</span>
                  )}
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>

              {showCompetitionDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {/* Search within dropdown */}
                  <div className="p-3 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search competitions..."
                        value={competitionSearchTerm}
                        onChange={(e) => setCompetitionSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Competition options */}
                  <div className="max-h-60 overflow-y-auto">
                    {selectedCompetition && (
                      <button
                        onClick={clearCompetitionFilter}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 text-sm text-gray-600"
                      >
                        Clear filter (Show all competitions)
                      </button>
                    )}
                    
                    {filteredCompetitions.map((competition) => (
                      <button
                        key={competition.id}
                        onClick={() => handleCompetitionSelect(competition)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-lg mr-3">{competition.icon}</span>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{competition.name}</div>
                              <div className="text-xs text-gray-500">{competition.category} • {competition.date}</div>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCompetitionStatusColor(competition.status)}`}>
                            {competition.status}
                          </span>
                        </div>
                      </button>
                    ))}
                    
                    {filteredCompetitions.length === 0 && (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        No competitions found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          

        </div>
      </div>

      {/* Selected Competition Info */}
      {selectedCompetition && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3">{selectedCompetition.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">{selectedCompetition.name}</h3>
                <p className="text-sm text-blue-700">
                  {selectedCompetition.category} • {selectedCompetition.date} • {selectedCompetition.participants} participants
                </p>
              </div>
            </div>
            <button
              onClick={clearCompetitionFilter}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Show all competitions
            </button>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search groups, leaders, or competitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add Group
          </button>
        </div>
      </div>

      {/* Groups Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Competition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leader
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGroups.map((group) => (
                <tr key={group.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-medium text-sm">
                          {group.name.split(' ').map(word => word[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{group.name}</div>
                        <div className="text-sm text-gray-500">{group.submission}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {group.competition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {group.members} members
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {group.leader}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(group.status)}`}>
                      {group.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(group.created).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => onGroupSelect && onGroupSelect(group)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50" title="Approve">
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleRejectClick(group)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50" 
                        title="Reject"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">No groups found matching your criteria</div>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {filteredGroups.length} of {groups.length} groups
          {selectedCompetition && ` for ${selectedCompetition.name}`}
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Reject Request</h3>
              <button
                onClick={handleRejectCancel}
                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Please provide a reason for rejecting the request
              </p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="4"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
              <button
                onClick={handleRejectCancel}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectConfirm}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupManagementPage;