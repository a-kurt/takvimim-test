import React from 'react'
import Appointment from './Appointment'
import UserService from '../api/UserService';
import { useState, useEffect } from "react";


const AppointmentsBox = () => {

  const [meetings, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getAppointments('/api/v1/auth/appointments/2');
        setAppointments(response); // Assuming response is an array or the structure you need
      } catch (error) {
        // Handle errors
        console.error('Error fetching appointments:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <div className='w-full h-[700px] flex flex-col overflow-y-auto border-b border-r border-l border-[#DDDDDD]'>
            {meetings.map(item => (
              <Appointment {...item} />
            ))}
        </div>
    </div>
  )
}

export default AppointmentsBox