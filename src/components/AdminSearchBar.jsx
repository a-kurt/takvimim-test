import React, { useState, useEffect } from 'react';

const AdminSearchBar = ({ users, setResults }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    setResults(users);
  }, [users, setResults]);

  const filterUsers = (value) => {
    const results = users.filter((user) => {
      return (
        (user.fullName && user.fullName.toLowerCase().includes(value)) ||
        (user.nickname && user.nickname.toLowerCase().includes(value)) ||
        (user.email && user.email.toLowerCase().includes(value)) ||
        (user.phoneNumber && user.phoneNumber.includes(value)) ||
        (user.state && user.state.toLowerCase().includes(value)) ||
        (user.province && user.province.toLowerCase().includes(value))
      );
    });

    setResults(value ? results : users);
  };

  const handleChange = (value) => {
    setInput(value);
    filterUsers(value.toLowerCase());
  };

  return (
    <form>
      <label htmlFor="admin-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Admin Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          autoComplete="off"
          type="search"
          id="admin-search"
          className="block sm:w-[36rem] w-[21rem] md:w-[45rem] p-4 pl-10 text-sm text-[#252B42] border border-gray-300 rounded-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Admin Search Bar"
          required
        />
      </div>
    </form>
  );
};

export default AdminSearchBar;
