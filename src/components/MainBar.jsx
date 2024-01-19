import React, { useEffect, useState } from 'react';
import Calendar from './Calendar';
import AppointmentsBox from './AppointmentsBox';
import RequestBox from './RequestBox';
import useAuth from '../hooks/useAuth';
import UserService from '../api/UserService';
import { format, parse } from 'date-fns';
import FilteredAppointmentBox from './FilteredAppointmentBox';

const MainBar = () => {
  const [selectedLink, setSelectedLink] = useState('Takvimim');
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const { auth } = useAuth();
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [showFilteredAppointments, setShowFilteredAppointments] = useState(false);

  const handleLinkClick = (link) => {
    setShowFilteredAppointments(false);
    setSelectedLink(link);
  };
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  
  const handleDayClick = (date) => {
    setSelectedDate(date);
  
    const formattedSelectedDate = formatDate(date);
  
    const temp = appointments.filter(appointment => {
      const formattedAppointmentDate = formatDate(new Date(appointment.startTime));
  
      return formattedAppointmentDate === formattedSelectedDate;
    });
    
    setFilteredAppointments(temp);
    setShowFilteredAppointments(true);
  };

  useEffect(() => {
    const userId = auth?.id;
    const fetchData = async () => {
      try {
        const response = await UserService.getAppointments(
          `/api/v1/auth/appointments/${userId}`
        );
        setAppointments(response); // Assuming response is an array or the structure you need
      } catch (error) {
        // Handle errors
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilteredAppointmentsClose = () => {
    setShowFilteredAppointments(false);
  };
  
  return (
    <section>
      <div className='flex flex-row border rounded-sm border-[#DDDDDD] sm:w-[36rem] w-[21rem] md:w-[45rem]'>
        <div className={`cursor-pointer sm:w-36 sm:h-16 w-28 h-14 ${selectedLink === 'Takvimim' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-[#252B42]'}`}>
          <a className='h-full w-full flex items-center justify-center font-medium hover:bg-gray-100' onClick={() => handleLinkClick('Takvimim')}>
            Takvimim
          </a>
        </div>
        <div className={`cursor-pointer sm:w-36 sm:h-16 w-28 h-14 ${selectedLink === 'Randevularım' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-[#252B42]'}`}>
          <a className='h-full w-full flex items-center justify-center font-medium hover:bg-gray-100' onClick={() => handleLinkClick('Randevularım')}>
            Randevularım
          </a>
        </div>
        <div className={`cursor-pointer sm:w-36 sm:h-16 w-28 h-14 ${selectedLink === 'İstekler' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-[#252B42]'}`}>
          <a className='h-full w-full flex items-center justify-center font-medium hover:bg-gray-100' onClick={() => handleLinkClick('İstekler')}>
            İstekler
          </a>
        </div>
        <div className='w-36 h-16 hidden sm:block'>
          <a href='/music' className='h-full w-full flex items-center justify-center text-[#252B42] font-medium hover:text-blue-500 hover:bg-gray-100'>Takvim Paylaş</a>
        </div>
        <div className='sm:w-36 sm:h-16 w-28 h-14 hidden md:block'></div>
      </div>
        {selectedLink === 'Takvimim' && !showFilteredAppointments && (
          <Calendar onDayClick={handleDayClick} meetings={appointments} isUsersCalendar={true} />
        )}
        {selectedLink === 'Takvimim' && showFilteredAppointments && (
          <FilteredAppointmentBox appointments={filteredAppointments} onClose={handleFilteredAppointmentsClose}/>
        )}
        {selectedLink === 'Randevularım' && <AppointmentsBox appointments={appointments}/>}
        {selectedLink === 'İstekler' && <RequestBox appointments={appointments}/>}
    </section>
  );
};

export default MainBar;
