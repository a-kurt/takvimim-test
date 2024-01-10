import React from 'react';
import { ReactComponent as Mail } from '../images/undraw_mail_sent_re_0ofv.svg';
import { useNavigate, useLocation } from 'react-router-dom';

const VerificationSuccess = () => {
  const navigate = useNavigate();
  
  const handleReturnLogin = () => {
    navigate('/login');
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='mb-48 flex items-center flex-col'>
        <Mail className='w-[50%] h-auto' />
        <div className='flex flex-col items-center p-6'>
          <div className='p-2'><p className='text-2xl text-blue-500'>Hesap Başarıyla Doğrulandı</p></div>
          <div className='p-2' onClick={handleReturnLogin}><p className='text-xl cursor-pointer'>Giriş Sayfasına Dön</p></div>
        </div>
      </div>
    </div>
  );
}

export default VerificationSuccess