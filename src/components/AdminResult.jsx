import React from "react";
import { ImCross } from "react-icons/im";
import axios from '../api/axios';

const AdminResult = ({ result, handleUserBan, onSelectResult }) => {

  const handleResultClick = () => {
    onSelectResult(result.id);
  }

  const handleBanUser = async () => {
    try {
      await axios.delete(`/api/v1/auth/admin/banbyid/${result.id}`);
      console.log('User banned successfully');
      // Call the callback function to update the users list in Admin component
      handleUserBan(result.id);
    } catch (error) {
      console.error('Error: ', error.message || error);
    }
  };

  return (
    <div onClick={handleResultClick} key={result.id} className='flex flex-row justify-between items-center p-3 border-b border-[#DDDDDD]'>
      <div className='w-3/4 md:w-3/5 flex flex-col md:flex-row'>
        <div className='md:w-2/5 text-sm sm:text-base'>
          <p>{result.id}</p>
        </div>
        <div className='md:w-3/5 text-sm sm:text-base'>
          <p>{result.nickname}</p>
        </div>
      </div>
      <div className='md:w-1/5'>
        <p className={`text-sm sm:text-base`}>{result.email}</p>
      </div>
      <div className='w-1/5 flex items-center justify-end'>
        <ImCross className='text-red-500 cursor-pointer' size={24} onClick={handleBanUser}/>
      </div>
    </div>
    );
};

export default AdminResult;