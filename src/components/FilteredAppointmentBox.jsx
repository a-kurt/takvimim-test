import React from 'react'
import Appointment from './Appointment'
import { ImCross } from "react-icons/im";

const FilteredAppointmentBox = ({appointments, onClose}) => {

  return (
    <div>
        <div className='w-full h-[700px] flex flex-col overflow-y-auto border-b border-r border-l border-[#DDDDDD]'>
            <div className='w-full border-b border-[#DDDDDD]'>
                <ImCross size={24} className='m-4 cursor-pointer' onClick={onClose}/>
            </div>
            {appointments.map(item => (
              <Appointment {...item} />
            ))}
        </div>
    </div>
  )
}

export default FilteredAppointmentBox