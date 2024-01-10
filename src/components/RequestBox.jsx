import React from 'react'
import Request from './Request'
import { useState, useEffect } from "react";
import UserService from '../api/UserService';
import useAuth from '../hooks/useAuth';



const RequestBox = ( {appointments} ) => {
  const { auth } = useAuth();
  const userId = auth?.id;

  return (
    <div>
        <div className='w-full h-[700px] flex flex-col overflow-y-auto border-b border-r border-l border-[#DDDDDD]'>
            {appointments.map(item => (
              item.idReceiver === userId && <Request key={item.id} {...item} />
            ))}
        </div>
    </div>
  )
}

export default RequestBox