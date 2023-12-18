import React from 'react'
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { format, parseISO,} from 'date-fns';


const Request = ({ id, appointmentName, startTime, endTime }) => {
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
      <div className="w-1/3 flex align-middle justify-end">
                <ImCross className='mr-5' size={20} />
                <FaCheck className="mr-2" size={20} />
      </div>
    </div>
    </section>

    
  )
}

export default Request

