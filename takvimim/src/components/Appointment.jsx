import React from 'react';
import { MdCancel } from 'react-icons/md';
import { format, parseISO,} from 'date-fns';

const Appointment = ({id, appointmentName, startTime, endTime}) => {

  return (
<section>
    <div key={id} className='flex flex-row justify-between items-center p-3 border-b border-[#DDDDDD]'>
      <div className='w-1/3'>
        <p>{appointmentName}</p>
      </div>
      <div className='flex flex-row w-1/3 '>
        <p className='mr-3 w-1/2'>{format(parseISO(startTime), "MMMM d, yyyy hh:mm:ss")}</p>
        <p className='mr-3 w-1/2'>{format(parseISO(endTime), "MMMM d, yyyy hh:mm:ss")}</p>
      </div>
      <div className='w-1/3 flex items-center justify-end'>
        <MdCancel className='text-red-500 cursor-pointer' size={32} />
      </div>
    </div>
</section>
  );
};

export default Appointment