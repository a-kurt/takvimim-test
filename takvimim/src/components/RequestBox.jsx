import React from 'react'
import Request from './Request'
import { useState, useEffect } from "react";
import UserService from '../api/UserService';



const RequestBox = () => {

  const [request, setRequest] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getAppointments('/api/v1/auth/appointments/2');
        setRequest(response); // Assuming response is an array or the structure you need
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
            {request.map(item => (
              item.idReceiver === 2 && <Request key={item.id} {...item} />
            ))}
        </div>
    </div>
  )
}

export default RequestBox