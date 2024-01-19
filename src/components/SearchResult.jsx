import React from "react";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ result }) => {
  const linkToCalendar = `/${result.nickname}`;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(linkToCalendar);
  };

  return (
    <div
      className="bg-white p-4 border shadow-md flex flex-row"
      onClick={handleClick}
    >
      <div className="sm:w-1/3 w-1/2">{result.fullName}</div>
      <div className="sm:w-1/3 hidden sm:display">
        {result.province}/{result.state}
      </div>
      <div className="sm:w-1/3 w-1/2">{result.email}</div>
      
    </div>
  );
};

export default SearchResult;
