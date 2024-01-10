import React from 'react';
import { ImCross } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import axios from '../api/axios';

const Request = ({ id, appointmentName, startTime, endTime, idSender, idReceiver }) => {
  const handleAccept = async () => {
    try {
      // Assuming you have an API endpoint for accepting requests
      await axios.put(`/api/v1/auth/appointments/accept/${idSender}/${idReceiver}/${startTime}`);

      // Perform any additional actions after accepting the request

    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };
  const handleReject = async () => {
    try {
      // Assuming you have an API endpoint for rejecting requests
      await axios.delete(`/api/v1/auth/appointments/reject/${idSender}/${idReceiver}/${startTime}`);

      // Perform any additional actions after rejecting the request

    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <section>
      <div key={id} className='flex flex-row justify-between items-center p-3 border-b border-[#DDDDDD]'>
      <div className='w-3/4 flex md:w-2/3 flex-col md:flex-row'>
        <div className='md:w-1/2 text-sm'>
          <p>{appointmentName}</p>
        </div>
        <div className='md:w-1/2 text-sm sm:text-base'>
          <p>{format(parseISO(startTime), "d.MM.yyyy: hh:mm")} - {format(parseISO(endTime), "hh:mm")}</p>
        </div>
        </div>
        <div className='w-1/4 md:1/3 flex align-middle justify-end'>
          <ImCross className='mr-5 cursor-pointer' size={20} onClick={handleReject} />
          <FaCheck className='mr-2 cursor-pointer' size={20} onClick={handleAccept} />
        </div>
      </div>
    </section>
  );
};

export default Request;
