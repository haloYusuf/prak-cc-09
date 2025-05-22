import React from 'react';
import { ArrowLeft, Mail, Trash2 } from 'lucide-react';

const GroupDetailsPage = ({ onNavigateBack }) => {
  const groupData = {
    name: "Data Alchemists",
    status: "APPROVED",
    created: "Sep 15, 2023",
    competition: "AI Hackathon",
    submissionStatus: "Submitted",
    leader: {
      name: "Emily Chen",
      email: "emily@example.com",
      phone: "+1 (555) 123-4567",
      initials: "EC"
    },
    members: [
      {
        id: 1,
        name: "Emily Chen",
        email: "emily@example.com",
        role: "Team Leader, Data Scientist",
        initials: "EC",
        bgColor: "bg-blue-500"
      },
      {
        id: 2,
        name: "Ryan Kim",
        email: "ryan@example.com",
        role: "ML Engineer",
        initials: "RK",
        bgColor: "bg-green-500"
      },
      {
        id: 3,
        name: "Jessica Patel",
        email: "jessica@example.com",
        role: "Frontend Developer",
        initials: "JP",
        bgColor: "bg-purple-500"
      },
      {
        id: 4,
        name: "Thomas Nguyen",
        email: "thomas@example.com",
        role: "Backend Developer",
        initials: "TN",
        bgColor: "bg-yellow-500"
      },
      {
        id: 5,
        name: "Lisa Wong",
        email: "lisa@example.com",
        role: "UX/UI Designer",
        initials: "LW",
        bgColor: "bg-red-500"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <button 
          onClick={onNavigateBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Groups
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Group Details</h1>
            <p className="text-gray-600">AI Hackathon - Machine Learning</p>
          </div>
          
          
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Group Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Group Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-blue-600">DA</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{groupData.name}</h2>
              <span className="inline-flex px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                {groupData.status}
              </span>
            </div>

            {/* Group Details */}
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="text-sm font-medium text-gray-900">{groupData.created}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Competition</p>
                <p className="text-sm font-medium text-gray-900">{groupData.competition}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Submission Status</p>
                <p className="text-sm font-medium text-gray-900">{groupData.submissionStatus}</p>
              </div>
            </div>

            {/* Group Leader */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Leader</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{groupData.leader.initials}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{groupData.leader.name}</p>
                  <p className="text-sm text-gray-600">{groupData.leader.email}</p>
                  <p className="text-sm text-gray-600">{groupData.leader.phone}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column - Team Members */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button className="py-4 px-1 border-b-2 border-blue-500 font-medium text-blue-600 text-sm">
                  Team Members
                </button>
              </nav>
            </div>

            {/* Members List */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <span className="text-sm text-gray-500">Total: {groupData.members.length} members</span>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-4">Name</div>
                <div className="col-span-4">Email</div>
                <div className="col-span-4">Role</div>
              </div>

              {/* Team Members */}
              <div className="divide-y divide-gray-200">
                {groupData.members.map((member) => (
                  <div key={member.id} className="grid grid-cols-12 gap-4 py-4 items-center">
                    <div className="col-span-4 flex items-center space-x-3">
                      <div className={`w-8 h-8 ${member.bgColor} rounded-full flex items-center justify-center`}>
                        <span className="text-white text-sm font-medium">{member.initials}</span>
                      </div>
                      <span className="font-medium text-gray-900">{member.name}</span>
                    </div>
                    <div className="col-span-4 text-gray-600">{member.email}</div>
                    <div className="col-span-4 text-gray-600">{member.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailsPage;