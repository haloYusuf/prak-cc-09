import React, { useEffect, useState } from "react";
import { Search, PlusCircle, Edit, Trash2, Lock, Unlock } from "lucide-react";

import {
  fetchAllCompe,
  deleteCompe,
  changeStatusCompe,
} from "../services/compe-api";
import { useNavigate } from "react-router-dom";

const CompetitionsPage = () => {
  const [competitions, setCompetitions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAllCompe();
  }, []);

  const loadAllCompe = async () => {
    const data = await fetchAllCompe();
    setCompetitions(data);
  };

  const handleNewCompe = async () => {
    navigate("/new-competition");
  };

  const handleDeleteCompe = async (id, compeName) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus kompetisi "${compeName}"? Aksi ini tidak dapat dibatalkan.`
      )
    ) {
      const res = await deleteCompe(id);
      if (res) {
        await loadAllCompe();
      }
    }
  };

  const handleChangeStatusCompe = async (id, status, compeName) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin ${
          status === 0 ? "menutup" : "membuka"
        } pendaftaran "${compeName}"?`
      )
    ) {
      const res = await changeStatusCompe(id);
      if (res) {
        await loadAllCompe();
      }
    }
  };

  const handleEditCompe = async (id) => {
    navigate(`/edit-competition/${id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "bg-green-100 text-green-800";
      case 0:
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold">Competitions</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">All Competitions</h3>
            <p className="text-sm text-gray-500">
              Manage your competition events
            </p>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={handleNewCompe}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            New Competition
          </button>
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
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {competitions.map((comp) => (
                <tr key={comp.compeId}>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
                        <img
                          key={comp.compeImg}
                          src={comp.compeImg}
                          alt={comp.compeName.substring(0, 1)}
                          className="h-full w-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {comp.compeName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                    {comp.compeDate}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                    {comp.maxParticipant}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        comp.compeStatus
                      )}`}
                    >
                      {comp.compeStatus === 0 ? "Open" : "Close"}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                        title="Edit"
                        onClick={() => handleEditCompe(comp.compeId)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete"
                        onClick={() =>
                          handleDeleteCompe(comp.compeId, comp.compeName)
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        className={`p-1 rounded transition-colors ${
                          comp.compStatus === 0
                            ? "text-red-600 hover:text-red-900 hover:bg-red-50"
                            : "text-green-600 hover:text-green-900 hover:bg-green-50"
                        }`}
                        title="Change Status"
                        onClick={() =>
                          handleChangeStatusCompe(
                            comp.compeId,
                            comp.compeStatus,
                            comp.compeName
                          )
                        }
                      >
                        {comp.compeStatus == 0 ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Unlock className="w-4 h-4" />
                        )}
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
