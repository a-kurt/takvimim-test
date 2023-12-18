import React, { useState } from 'react';
import Calendar from './Calendar';
import AppointmentsBox from './AppointmentsBox';
import RequestBox from './RequestBox';

const MainBar = () => {
  const [selectedLink, setSelectedLink] = useState('Takvimim');

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };
  
  
  return (
    <section>
      <div className='flex flex-row border rounded-sm border-[#DDDDDD] sm:w-[36rem] w-[21rem] md:w-[45rem]'>
        <div className={`sm:w-36 sm:h-16 w-28 h-14 ${selectedLink === 'Takvimim' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-[#252B42]'}`}>
          <a href='#' className='h-full w-full flex items-center justify-center font-medium hover:bg-gray-100' onClick={() => handleLinkClick('Takvimim')}>
            Takvimim
          </a>
        </div>
        <div className={`sm:w-36 sm:h-16 w-28 h-14 ${selectedLink === 'Randevularım' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-[#252B42]'}`}>
          <a href='#' className='h-full w-full flex items-center justify-center font-medium hover:bg-gray-100' onClick={() => handleLinkClick('Randevularım')}>
            Randevularım
          </a>
        </div>
        <div className={`sm:w-36 sm:h-16 w-28 h-14 ${selectedLink === 'İstekler' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-[#252B42]'}`}>
          <a href='#' className='h-full w-full flex items-center justify-center font-medium hover:bg-gray-100' onClick={() => handleLinkClick('İstekler')}>
            İstekler
          </a>
        </div>
        <div className='w-36 h-16 hidden sm:block'>
          <a href='#' className='h-full w-full flex items-center justify-center text-[#252B42] font-medium hover:text-blue-500 hover:bg-gray-100'>Takvim Paylaş</a>
        </div>
        <div className='sm:w-36 sm:h-16 w-28 h-14 hidden md:block'></div>
      </div>
      {selectedLink === 'Takvimim' && <Calendar />}
      {selectedLink === 'Randevularım' && <AppointmentsBox />}
      {selectedLink === 'İstekler' && <RequestBox />}
    </section>
  );
};

export default MainBar;
