import React from 'react';
import { useAsyncDebounce } from 'react-table';
import { FaSearch } from 'react-icons/fa';

const GlobalSearchFilter = ({ globalFilter, setGlobalFilter }) => {
  const handleSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined); // Set the global filter value or undefined
  }, 300); // Debounce time in milliseconds

  const handleChange = (e) => {
    const value = e.target.value;
    handleSearchChange(value);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <input
          type="text"
          value={globalFilter || ''}
          onChange={handleChange}
          placeholder="Search"
          className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <FaSearch className="absolute top-3 right-3 text-gray-500" />
      </div>
    </div>
  );
};

export default GlobalSearchFilter;
