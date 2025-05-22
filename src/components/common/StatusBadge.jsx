const StatusBadge = ({ status }) => {
  let colorClass = '';
  
  switch (status) {
    case 'COMPLETED':
    case 'APPROVED':
      colorClass = 'bg-green-100 text-green-800';
      break;
    case 'UPCOMING':
    case 'REGISTRATION':
    case 'PENDING':
      colorClass = 'bg-yellow-100 text-yellow-800';
      break;
    case 'DECLINED':
      colorClass = 'bg-red-100 text-red-800';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800';
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;