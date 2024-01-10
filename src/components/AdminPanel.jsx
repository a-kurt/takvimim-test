import React from 'react';
import AdminResult from './AdminResult';

const AdminPanel = ({ results, handleUserBan, onSelectResult }) => {
  return (
    <div>
      <div className='w-full h-[700px] flex flex-col overflow-y-auto border-b border-r border-l border-[#DDDDDD]'>
        {results.map((result) => (
          <AdminResult key={result.id} result={result} handleUserBan={handleUserBan} onSelectResult={onSelectResult}/>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
