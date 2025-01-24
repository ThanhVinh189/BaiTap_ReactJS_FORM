import React from "react";

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Tìm kiếm sinh viên..."
      onChange={handleChange}
      className="search-bar"
    />
  );
};

export default SearchBar;
