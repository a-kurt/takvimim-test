import React from 'react';
import { ReactComponent as CatImg } from '../images/undraw_cat_epte.svg';
import { useNavigate, useLocation } from 'react-router-dom';

const AppointmentSuccessPage = () => {
  const navigate = useNavigate();
  
  const handleReturnHome = () => {
    navigate('/');
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='mb-48 flex items-center flex-col'>
        <CatImg className='w-[50%] h-auto' />
        <div className='flex flex-col items-center p-6'>
          <div className='p-2'><p className='text-2xl text-blue-500'>Randevu Alma Başarılı</p></div>
          <div className='p-2' onClick={handleReturnHome}><p className='text-xl cursor-pointer'>Ana Sayfaya Dön</p></div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentSuccessPage;