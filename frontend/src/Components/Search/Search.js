// SearchBar.js

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex  items-center justify-center">
      <input
        type="text"
        placeholder="Enter the title of song"
        value={query}
        onChange={handleInputChange}
        className="border w-full max-w-md text-center my-2 md:my-0 mx-2 md:mx-4 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
