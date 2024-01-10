import React, { useEffect, useState } from 'react';
import AdminSearchBar from '../components/AdminSearchBar';
import AdminPanel from '../components/AdminPanel';
import axios from '../api/axios';
import FilteredAppointmentBox from '../components/FilteredAppointmentBox';

const Admin = () => {
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(true);
  const [showAppointments, setShowAppointments] = useState(false);
  const [selectedResultId, setSelectedResultId] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/auth/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // Callback function to update users list after banning a user
  const handleUserBan = (userId) => {
    setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
  };

  const handleAppointmentClose = () => {
    setShowAppointments(false);
    setShowUsers(true);
    setAppointments(null);
  }

  const handleSelectResult = (resultId) => {
    setSelectedResultId(resultId);

    // Make a GET request to fetch appointments for the selected user
    axios.get(`/api/v1/auth/appointments/${resultId}`)
      .then((response) => {
        setAppointments(response.data);
        setShowAppointments(true);
        setShowUsers(false);
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col border-[#DDDDDD] sm:w-[36rem] w-[21rem] md:w-[45rem]'>
        <AdminSearchBar setResults={setResults} users={users} />
        { showUsers && (
          <AdminPanel results={results} handleUserBan={handleUserBan} onSelectResult={handleSelectResult}/>
        )}
        { showAppointments && (
          <FilteredAppointmentBox appointments={appointments} onClose={handleAppointmentClose} />
        )}
      </div>
    </div>
  );
};

export default Admin;