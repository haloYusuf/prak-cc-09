const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  return (
    <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
      <div className="text-sm text-gray-500">
        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
      </div>
      <div className="flex space-x-2">
        <button 
          className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button 
          className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= totalItems}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;