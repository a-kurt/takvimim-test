import React, { useState, useRef, useEffect } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const VerificationCodePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/verificationSuccess";
  const [codes, setCodes] = useState(['', '', '', '']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRefs = useRef([]);
  const { auth } = useAuth();
  const userId = auth?.id;
  const URL = '/api/v1/auth/checkCode';

  useEffect(() => {
    // Set focus to the initial input when the component mounts
    inputRefs.current[currentIndex].focus();
  }, [currentIndex]);

  const handleInputChange = (index, value) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value !== '') {
      if (index < codes.length - 1) {
        setCurrentIndex(index + 1);
      }
    } else {
      if (index > 0) {
        setCurrentIndex(index - 1);
      }
    }
  };


  const handleVerification = async () => { 
    try {
      const response = await axios.post(URL, {
        id: String(userId),
        verificationCode: codes.join('')
      });
      if (response.data.messageType === 'SUCCESS') {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleResendVerification = () => {
    // resend logic
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>E-Posta Doğrulama</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>E-posta adresinize bir kod gönderdik</p>
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {codes.map((code, index) => (
                    <div className="w-16 h-16" key={index}>
                      <input
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-500"
                        type="text"
                        value={code}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        disabled={index !== currentIndex}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="button"
                      className={`flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 ${codes.some(code => code === '') ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'} border-none text-white text-sm shadow-sm`}                      onClick={handleVerification}
                      disabled={codes.some(code => code === '')}
                    >
                      Hesabı Doğrula
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Kod almadınız mı?</p>{' '}
                    <a
                      className="flex flex-row items-center text-blue-500"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleResendVerification}
                    >
                      Yeniden gönder
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCodePage;
