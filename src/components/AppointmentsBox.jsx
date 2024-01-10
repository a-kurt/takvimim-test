import React from 'react'
import Appointment from './Appointment'

const AppointmentsBox = ({appointments}) => {
  return (
    <div>
        <div className='w-full h-[700px] flex flex-col overflow-y-auto border-b border-r border-l border-[#DDDDDD]'>
            {appointments.map(item => (
              <Appointment {...item} />
            ))}
        </div>
    </div>
  )
}

export default AppointmentsBox