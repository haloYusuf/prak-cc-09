import React, { useCallback, useEffect, useState } from "react";
import { Search, Plus, Eye, Check, X, ChevronDown } from "lucide-react";
import {
  fetchAllCompe,
  fetchAllGroupByCompe,
  approveGroup,
  rejectGroup,
} from "../services/compe-api";
import { useNavigate } from "react-router-dom";

const mapGroupStatusToString = (statusInt) => {
  switch (parseInt(statusInt, 10)) {
    case 1:
      return "Approved";
    case 0:
      return "Pending";
    case -1:
      return "Rejected";
    default:
      return "Unknown";
  }
};

const getGroupStatusColor = (statusString) => {
  switch (statusString.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const mapCompetitionStatusToString = (statusInt) => {
  switch (parseInt(statusInt, 10)) {
    case 0:
      return "REGISTRATION";
    case 1:
      return "UPCOMING";
    case 2:
      return "COMPLETED";
    default:
      return "UNKNOWN";
  }
};

const getCompetitionStatusColor = (statusString) => {
  switch (statusString) {
    case "COMPLETED":
      return "bg-green-100 text-green-800";
    case "UPCOMING":
      return "bg-yellow-100 text-yellow-800";
    case "REGISTRATION":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const GroupManagementPage = ({ onGroupSelect }) => {
  const navigate = useNavigate();

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [groupToModify, setGroupToModify] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const [competitions, setCompetitions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  const [isLoadingCompetitions, setIsLoadingCompetitions] = useState(true);
  const [isLoadingGroups, setIsLoadingGroups] = useState(false);
  const [errorCompetitions, setErrorCompetitions] = useState(null);
  const [errorGroups, setErrorGroups] = useState(null);
  const [actionMessage, setActionMessage] = useState("");
  const [showCompetitionDropdown, setShowCompetitionDropdown] = useState(false);
  const [competitionSearchTerm, setCompetitionSearchTerm] = useState("");

  useEffect(() => {
    const loadCompetitionsData = async () => {
      setIsLoadingCompetitions(true);
      setErrorCompetitions(null);
      try {
        const responseData = await fetchAllCompe();
        // Memastikan `competitions` selalu array, menangani berbagai kemungkinan response API
        const data = Array.isArray(responseData)
          ? responseData
          : responseData?.data && Array.isArray(responseData.data)
          ? responseData.data
          : [];
        setCompetitions(data);
      } catch (e) {
        console.error("Error loading competitions:", e);
        setErrorCompetitions(e.message || "Gagal memuat daftar kompetisi.");
        setCompetitions([]);
      } finally {
        setIsLoadingCompetitions(false);
      }
    };
    loadCompetitionsData();
  }, []);

  const loadGroupsData = useCallback(async (compeId) => {
    if (!compeId) {
      setGroups([]);
      return;
    }
    setIsLoadingGroups(true);
    setErrorGroups(null);
    setActionMessage(""); // Reset pesan aksi saat load baru
    try {
      const responseData = await fetchAllGroupByCompe(compeId);
      setGroups(
        responseData?.data && Array.isArray(responseData.data)
          ? responseData.data
          : []
      );
    } catch (e) {
      console.error(`Error loading groups for compeId ${compeId}:`, e);
      setErrorGroups(
        e.response?.data?.message || e.message || "Gagal memuat daftar grup."
      );
      setGroups([]);
    } finally {
      setIsLoadingGroups(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCompetition?.compeId) {
      loadGroupsData(selectedCompetition.compeId);
    } else {
      setGroups([]);
    }
  }, [selectedCompetition, loadGroupsData]);

  const filteredCompetitions = competitions.filter((compe) =>
    (compe.compeName || "")
      .toLowerCase()
      .includes(competitionSearchTerm.toLowerCase())
  );

  const handleCompetitionSelect = (competition) => {
    setSelectedCompetition(competition);
    setShowCompetitionDropdown(false);
    setCompetitionSearchTerm("");
  };

  const clearCompetitionFilter = () => {
    setSelectedCompetition(null);
    setShowCompetitionDropdown(false); // Tutup dropdown setelah clear
  };

  const handleApproveAction = async (groupId) => {
    setActionMessage("");
    try {
      await approveGroup(groupId);
      setActionMessage(`Grup berhasil disetujui.`); // Beri feedback positif
      if (selectedCompetition) {
        loadGroupsData(selectedCompetition.compeId); // Muat ulang data
      }
    } catch (err) {
      console.error("Error approving group:", err);
      setActionMessage(
        `Error: ${
          err.response?.data?.message || err.message || "Gagal menyetujui grup."
        }`
      );
    }
  };

  const handleRejectActionClick = (group) => {
    setGroupToModify(group);
    setRejectReason("");
    setShowRejectModal(true);
  };

  const handleRejectModalConfirm = async () => {
    if (!groupToModify || !rejectReason.trim()) {
      setActionMessage("Alasan penolakan wajib diisi.");
      return;
    }
    setActionMessage("");
    try {
      await rejectGroup(groupToModify.groupId, rejectReason);
      setActionMessage(`Grup "${groupToModify.groupName}" berhasil ditolak.`); // Feedback positif
      if (selectedCompetition) {
        loadGroupsData(selectedCompetition.compeId); // Muat ulang data
      }
    } catch (err) {
      console.error("Error rejecting group:", err);
      setActionMessage(
        `Error: ${
          err.response?.data?.message || err.message || "Gagal menolak grup."
        }`
      );
    } finally {
      setShowRejectModal(false);
      setGroupToModify(null); // Reset state modal
      setRejectReason("");
    }
  };

  const handleRejectModalCancel = () => {
    setShowRejectModal(false);
    setGroupToModify(null);
    setRejectReason("");
  };

  const handleViewGroupDetails = (group) => {
    if (onGroupSelect) {
      onGroupSelect(group);
    } else {
      navigate(`/groups/${group.groupId}`);
    }
  };

  // Helper untuk mendapatkan Inisial Avatar
  const getInitials = (name) =>
    (name || "G")
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2); // Batasi 2 huruf

  const renderGroupTable = () => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Group Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Max Members
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
            {groups.map((group) => {
              const groupStatusString = mapGroupStatusToString(
                group.groupStatus
              );
              return (
                <tr key={group.groupId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 overflow-hidden">
                        {group.groupImg ? (
                          <img
                            src={group.groupImg}
                            alt={getInitials(group.groupName)}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-blue-600 font-medium text-sm">
                            {getInitials(group.groupName)}
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {group.groupName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {group.maxMember} members
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {group.user?.userName || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGroupStatusColor(
                        groupStatusString
                      )}`}
                    >
                      {groupStatusString}
                    </span>
                    {group.groupStatus === -1 && group.rejectedMessage && (
                      <p
                        className="text-xs text-red-500 mt-1 truncate"
                        title={group.rejectedMessage}
                      >
                        Reason: {group.rejectedMessage}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(group.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-1 sm:space-x-2">
                      <button
                        onClick={() => handleViewGroupDetails(group)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {group.groupStatus === 0 && (
                        <>
                          <button
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                            onClick={() => handleApproveAction(group.groupId)}
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                            onClick={() => handleRejectActionClick(group)}
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 px-6 py-3 bg-gray-50 border-t text-sm text-gray-600">
        Showing {groups.length} groups.
      </div>
    </div>
  );

  const renderCompetitionDropdown = () => (
    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search competitions..."
            value={competitionSearchTerm}
            onChange={(e) => setCompetitionSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>
      <div className="max-h-60 overflow-y-auto">
        {isLoadingCompetitions && (
          <div className="px-4 py-3 text-sm text-gray-500">
            Loading competitions...
          </div>
        )}
        {errorCompetitions && (
          <div className="px-4 py-3 text-sm text-red-500">
            {errorCompetitions}
          </div>
        )}
        {!isLoadingCompetitions && !errorCompetitions && (
          <>
            {selectedCompetition && (
              <button
                onClick={clearCompetitionFilter}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 text-sm text-blue-600 font-medium"
              >
                Clear selection
              </button>
            )}
            {filteredCompetitions.length > 0 ? (
              filteredCompetitions.map((competition) => {
                const compStatusString = mapCompetitionStatusToString(
                  competition.compeStatus
                );
                return (
                  <button
                    key={competition.compeId}
                    onClick={() => handleCompetitionSelect(competition)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-lg mr-3">
                          {competition.compeImg ? (
                            <img
                              src={competition.compeImg}
                              alt="c"
                              className="w-6 h-6 rounded-sm object-cover"
                            />
                          ) : (
                            competition.icon || "🏆"
                          )}
                        </span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {competition.compeName || competition.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {competition.category}
                            {new Date(
                              competition.compeDate || competition.date
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getCompetitionStatusColor(
                          compStatusString
                        )}`}
                      >
                        {compStatusString}
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No competitions found
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  const renderRejectModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">
            Reject Group: {groupToModify?.groupName}
          </h3>
          <button
            onClick={handleRejectModalCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <label
            htmlFor="rejectReason"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Reason for Rejection <span className="text-red-500">*</span>
          </label>
          <textarea
            id="rejectReason"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Enter reason..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="4"
          />
        </div>
        <div className="flex items-center justify-end space-x-3 p-4 border-t">
          <button
            onClick={handleRejectModalCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleRejectModalConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Submit Rejection
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header dan Dropdown Kompetisi */}

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Group Management
            </h1>
            <p className="text-gray-600 mb-4">
              Manage competition groups and teams
            </p>
            <div className="relative inline-block text-left w-full max-w-xs sm:max-w-sm md:max-w-md">
              <button
                onClick={() =>
                  setShowCompetitionDropdown(!showCompetitionDropdown)
                }
                className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="flex items-center truncate">
                  {selectedCompetition ? (
                    <>
                      <span className="text-lg mr-2">
                        {selectedCompetition.compeImg ? (
                          <img
                            src={selectedCompetition.compeImg}
                            alt="c"
                            className="w-6 h-6 rounded-sm object-cover"
                          />
                        ) : (
                          selectedCompetition.icon || "🏆"
                        )}
                      </span>
                      <div className="text-left truncate">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {selectedCompetition.compeName ||
                            selectedCompetition.name}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {selectedCompetition.category}
                        </div>
                      </div>
                    </>
                  ) : (
                    <span className="text-gray-500">
                      Select a competition to view groups
                    </span>
                  )}
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </button>
              {showCompetitionDropdown && renderCompetitionDropdown()}
            </div>
          </div>
        </div>
      </div>

      {actionMessage && (
        <div
          className={`p-3 my-4 text-sm rounded-lg ${
            actionMessage.startsWith("Error:")
              ? "text-red-700 bg-red-100"
              : "text-green-700 bg-green-100"
          }`}
          role="alert"
        >
          {actionMessage}
        </div>
      )}

      {selectedCompetition && !isLoadingGroups && !errorGroups && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900">
            Showing groups for:{" "}
            {selectedCompetition.compeName || selectedCompetition.name}
          </h3>
        </div>
      )}

      {isLoadingGroups ? (
        <div className="text-center py-10 text-gray-600">Loading groups...</div>
      ) : errorGroups ? (
        <div className="text-center py-10 text-red-500 bg-white rounded-lg shadow-sm p-6">
          Error loading groups: {errorGroups}
        </div>
      ) : !selectedCompetition ? (
        <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm p-6">
          Please select a competition to view its groups.
        </div>
      ) : groups.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm p-6">
          No groups found for "
          {selectedCompetition.compeName || selectedCompetition.name}".
        </div>
      ) : (
        renderGroupTable() // Panggil fungsi render tabel
      )}

      {showRejectModal && groupToModify && renderRejectModal()}
    </div>
  );
};

export default GroupManagementPage;
