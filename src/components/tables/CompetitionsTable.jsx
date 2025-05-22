import { Trophy, User, Settings, X } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const CompetitionsTable = ({ competitions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-3">Competition</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Participants</th>
            <th className="px-6 py-3">Winner</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {competitions.map((comp) => (
            <tr key={comp.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center text-blue-500">
                    <Trophy size={16} />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{comp.name}</div>
                    <div className="text-sm text-gray-500">{comp.category}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{comp.date}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{comp.participants}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{comp.winner}</td>
              <td className="px-6 py-4">
                <StatusBadge status={comp.status} />
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-blue-500">
                    <User size={16} />
                  </button>
                  <button className="text-gray-500 hover:text-blue-500">
                    <Settings size={16} />
                  </button>
                  <button className="text-gray-500 hover:text-red-500">
                    <X size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitionsTable;