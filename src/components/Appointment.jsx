import React from "react";
import { MdCancel } from "react-icons/md";
import { format, parseISO } from "date-fns";
import axios from "../api/axios";

const Appointment = ({
  id,
  appointmentName,
  startTime,
  endTime,
  idSender,
  idReceiver,
  appointmentStatus,
}) => {
  const handleReject = async () => {
    try {
      // Assuming you have an API endpoint for rejecting requests
      await axios.delete(
        `/api/v1/auth/appointments/reject/${idSender}/${idReceiver}/${startTime}`
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <section>
      <div
        key={id}
        className="flex flex-row justify-between items-center p-3 border-b border-[#DDDDDD]"
      >
        <div className="w-3/4 md:w-3/5 flex flex-col md:flex-row">
          <div className="md:w-2/5 text-sm sm:text-base">
            <p>{appointmentName}</p>
          </div>
          <div className="md:w-3/5 text-sm sm:text-base">
            <p>
              {format(parseISO(startTime), "d.MM.yyyy: hh:mm")} -{" "}
              {format(parseISO(endTime), "hh:mm")}
            </p>
          </div>
        </div>
        <div className="md:w-1/5">
          <p
            className={`text-sm sm:text-base ${
              appointmentStatus === "PENDING"
                ? "text-gray-500"
                : appointmentStatus === "ACCEPTED"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {appointmentStatus}
          </p>
        </div>
        <div className="w-1/5 flex items-center justify-end">
          <MdCancel
            className="text-red-500 cursor-pointer"
            size={32}
            onClick={handleReject}
          />
        </div>
      </div>
    </section>
  );
};

export default Appointment;
