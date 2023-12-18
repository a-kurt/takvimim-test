import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Calendar from "../components/Calendar";

const CalendarAppointmentPage = ({ name, location, email }) => {
  const timeSlots = Array.from({ length: 48 }, (_, index) => {
    const hours = Math.floor(index / 2);
    const minutes = index % 2 === 0 ? '00' : '30';
    return `${String(hours).padStart(2, '0')}:${minutes}`;
  });
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    // Add your custom logic here when a time is selected
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="z-10">
        <Navbar />
      </div>
      <div className="flex-1 flex flex-row justify-between items-center">
        <div>
          <div className="mb-10 ml-32 mr-6">
            <p className="mb-2 font-bold text-4xl">Atakan Kurt</p>
            <p className="mb-2 font-medium text-xl">Karabük / Safranbolu</p>
            <p className="font-medium text-xl">atakankurtofficial@gmail.com</p>
          </div>
          <div className="w-[600px] h-[400px] border border-[#D4D5DF] overflow-y-auto shadow-md ml-32 mr-6">
            <div className="grid grid-cols-4">
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                  className={`flex justify-center items-center font-medium p-2 border cursor-pointer h-[80px] ${
                    selectedTime === time ? 'bg-blue-500 text-white' : 'bg-white'
                  }`}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-12 ml-32 mr-6">
            <button
              type="submit"
              className="w-2/3 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-sm text-sm px-5 py-4 text-center"
            >
              Randevu Al
            </button>
          </div>
        </div>
        <div className="mr-32">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default CalendarAppointmentPage;
