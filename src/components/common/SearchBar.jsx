import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center">
      <div className="relative mr-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search..." 
          className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
      </div>
      {/* <div className="relative">
        <Bell size={20} className="text-gray-600" />
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            {notificationCount}
          </span>
        )}
      </div> */}
    </div>
  );
};

export default SearchBar;