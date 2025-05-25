import React, { useEffect, useState } from "react";
import { ArrowLeft, Mail, Trash2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllMember } from "../services/group-api";

const GroupDetailsPage = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [member, setMember] = useState([]);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    const data = await fetchAllMember(groupId);
    setGroup(data.group);
    setMember(data.members);
  };

  function initial(input) {
    const kata = input.trim().split(/\s+/);

    let hasil = "";
    for (let i = 0; i < Math.min(2, kata.length); i++) {
      hasil += kata[i][0].toUpperCase();
    }

    return hasil;
  }

  const handleBack = () => {
    navigate(-1);
  };

  if (!group || member.length === 0) {
    return <div>Loading group details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Groups
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Group Details</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <img
                  key={group.groupImg}
                  src={group.groupImg}
                  alt={group.compeName.substring(0, 1)}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {group.groupName}
              </h2>
              <span className="inline-flex px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                {group.groupStatus === 0
                  ? "Pending"
                  : group.groupStatus === 1
                  ? "Approved"
                  : "Rejected"}
              </span>
            </div>

            {/* Group Details */}
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Max members</p>
                <p className="text-sm font-medium text-gray-900">
                  {group.maxMember}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(group.groupCreatedAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Competition</p>
                <p className="text-sm font-medium text-gray-900">
                  {group.compeName}
                </p>
              </div>
            </div>

            {/* Group Leader */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Group Leader
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {initial(group.leader.userName)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {group.leader.userName}
                  </p>
                  <p className="text-sm text-gray-600">{group.leader.email}</p>
                  <p className="text-sm text-gray-600">
                    {group.leader.phoneNumber}
                  </p>
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
                <h3 className="text-lg font-semibold text-gray-900">
                  Team Members
                </h3>
                <span className="text-sm text-gray-500">
                  Total: {member.length} members
                </span>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-4">Name</div>
                <div className="col-span-4">Email</div>
                <div className="col-span-4">Role</div>
              </div>

              {/* Team Members */}
              <div className="divide-y divide-gray-200">
                {member.map((member) => (
                  <div
                    key={member.id}
                    className="grid grid-cols-12 gap-4 py-4 items-center"
                  >
                    <div className="col-span-4 flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center`}
                      >
                        <span className="text-white text-sm font-medium">
                          {initial(member.userName)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {member.userName}
                      </span>
                    </div>
                    <div className="col-span-4 text-gray-600">
                      {member.email}
                    </div>
                    <div className="col-span-4 text-gray-600">
                      {member.uid === group.leader.uid ? "Leader" : "Member"}
                    </div>
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
