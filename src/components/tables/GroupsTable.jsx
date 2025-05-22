import { Check, X, RefreshCw } from 'lucide-react';

const GroupsTable = ({ groups }) => {
  const getColorClass = (abbr) => {
    switch (abbr) {
      case 'DA': return 'bg-blue-100 text-blue-600';
      case 'ML': return 'bg-purple-100 text-purple-600';
      case 'AI': return 'bg-green-100 text-green-600'; 
      case 'NN': return 'bg-red-100 text-red-600';
      default: return 'bg-yellow-100 text-yellow-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'text-green-600';
      case 'PENDING': return 'text-yellow-600';
      case 'DECLINED': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-3">Group</th>
            <th className="px-6 py-3">Created</th>
            <th className="px-6 py-3">Leader</th>
            <th className="px-6 py-3">Members</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {groups.map((group) => (
            <tr key={group.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full ${getColorClass(group.abbr)} flex items-center justify-center font-medium`}>
                    {group.abbr}
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{group.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{group.created}</td>
              <td className="px-6 py-4 text-sm">
                <div>
                  <div className="text-gray-900">{group.leader.name}</div>
                  <div className="text-gray-500">{group.leader.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{group.members}</td>
              <td className="px-6 py-4">
                <span className={`text-xs font-medium ${getStatusColor(group.status)}`}>
                  {group.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex space-x-3">
                  {group.status === 'PENDING' && (
                    <>
                      <button className="text-green-500 hover:text-green-700">
                        <Check size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <X size={18} />
                      </button>
                    </>
                  )}
                  {group.status === 'DECLINED' && (
                    <button className="text-gray-500 hover:text-blue-700">
                      <RefreshCw size={18} />
                    </button>
                  )}
                  {group.status === 'APPROVED' && (
                    <button className="text-red-500 hover:text-red-700">
                      <X size={18} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupsTable;