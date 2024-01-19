import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Calendar from "../components/Calendar";
import { useLocation, useNavigate, useParams } from "react-router-dom"; // Import the useParams hook
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../components/Loading";

const CalendarAppointmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from =  location.state?.from?.pathname || "/appointmentSuccessPage";
  const [loading, setLoading] = useState(false);

  const { nickname } = useParams();
  const [userData, setUserData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const { auth } = useAuth();
  const userIdSender = auth?.id;
  const userIdReceiver = userData?.id;
  const [appointmentDate, setAppointmentDate] = useState(null);
  const USER_DATA_URL = `/api/v1/auth/user/${nickname}`;
  const GET_APPOINTMENT_URL = `/api/v1/auth/appointment`; // TODO: Change this to valid URL, ask murat.

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      // Add a delay of 500 ms using setTimeout
      setTimeout(async () => {
        try {
          const response = await axios.get(USER_DATA_URL);
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        } finally {
          // Set loading to false after the API call is completed
          setLoading(false);
        }
      }, 300);
    };

    fetchUser();
  }, [nickname]);

  const {
    fullName = "Default Name",
    email = "Default Email",
    state = "Default State",
    province = "Default Province",
    monday = true,
    tuesday = true,
    wednesday = true,
    thursday = true,
    friday = true,
    saturday = true,
    sunday = true,
    timeRangeIsOneHour = false,
    availableTimeBegin = "00:00:00",
    availableTimeEnd = "00:00:00",
    appointments = [],
  } = userData || {};
  const [hour, minute, second] = availableTimeBegin.split(":").map(Number);

  const availableTimeBeginObj = {
    hour: hour || 0,
    minute: minute || 0,
    second: second || 0,
  };

  const [endHour, endMinute, endSecond] = availableTimeEnd.split(":").map(Number);

  const availableTimeEndObj = {
    hour: endHour || 0,
    minute: endMinute || 0,
    second: endSecond || 0,
  };

  const daysOfWeek = {
    0:monday,
    1:tuesday,
    2:wednesday,
    3:thursday,
    4:friday,
    5:saturday,
    6:sunday
  };

  const generateTimeSlots = (begin, end, isOneHour) => {
    const timeSlots = [];

    let currentTime = { ...begin };

    while (
      currentTime.hour < end.hour ||
      (currentTime.hour === end.hour && currentTime.minute <= end.minute)
    ) {
      const formattedTime = `${String(currentTime.hour).padStart(
        2,
        "0"
      )}:${String(currentTime.minute).padStart(2, "0")}`;
      timeSlots.push(formattedTime);

      if (isOneHour) {
        currentTime.hour += 1;
      } else {
        currentTime.minute += 30;
        if (currentTime.minute === 60) {
          currentTime.hour += 1;
          currentTime.minute = 0;
        }
      }
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots(
    availableTimeBeginObj,
    availableTimeEndObj,
    timeRangeIsOneHour
  );
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    // Add your custom logic here when a time is selected
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handleAppointmentRequest = async () => {
    if (!selectedTime) {
      console.error("Please select a time before making an appointment.");
      return;
    }
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    // Combine date and time to create startTime and endTime
    const startTime = `${formattedDate}T${selectedTime}:00`; // Add ':00' for seconds

    let endTime;
    const startDateTime = new Date(startTime);

    if (timeRangeIsOneHour) {
      endTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
    } else {
      endTime = new Date(startDateTime.getTime() + 30 * 60 * 1000); // Adding 30 minutes
    }
    const formattedEndTime = `${endTime.getFullYear()}-${String(
      endTime.getMonth() + 1
    ).padStart(2, "0")}-${String(endTime.getDate()).padStart(2, "0")}T${endTime
      .toTimeString()
      .slice(0, 5)}`;

    try {
      const response = await axios.post(GET_APPOINTMENT_URL, {
        appointmentName: "test_atakan",
        idSender: userIdSender,
        idReceiver: userIdReceiver,
        startTime: startTime,
        endTime: formattedEndTime,
      });

      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Randevu Alınamadı!", {
        position: toast.POSITION.TOP_RIGHT,
    });
    }
  };

  const hasAppointmentOnSelectedDate =
    selectedDate &&
    appointments.some(
      (appointment) =>
        new Date(appointment.startTime).toDateString() ===
        selectedDate.toDateString()
    );

  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col h-screen">
          <div className="z-10">
            <Navbar />
          </div>
          <div className="flex-1 flex flex-row justify-between items-center">
            <div>
              <div className="mb-10 ml-32 mr-6">
                <p className="mb-2 font-bold text-4xl">{fullName.toUpperCase()}</p>
                <p className="mb-2 font-medium text-xl">
                  {province} / {state}
                </p>
                <p className="font-medium text-xl">{email}</p>
              </div>
              <div className="w-[600px] h-[400px] border border-[#D4D5DF] overflow-y-auto shadow-md ml-32 mr-6">
                <div className="grid grid-cols-4">
                  {timeSlots.map((time, index) => {
                    // Check if the time slot corresponds to an existing appointment on the selected day
                    const isDisabled =
                      hasAppointmentOnSelectedDate &&
                      appointments.some((appointment) => {
                        const appointmentDate = new Date(appointment.startTime);
                        const selectedDateTime = new Date(selectedDate);
  
                        return (
                          appointmentDate.getFullYear() === selectedDateTime.getFullYear() &&
                          appointmentDate.getMonth() === selectedDateTime.getMonth() &&
                          appointmentDate.getDate() === selectedDateTime.getDate() &&
                          appointmentDate.getHours() === parseInt(time.split(":")[0]) &&
                          appointmentDate.getMinutes() === parseInt(time.split(":")[1])
                        );
                      });
  
                    return (
                      <div
                        key={index}
                        className={`flex justify-center items-center font-medium p-2 border cursor-pointer h-[80px] ${
                          selectedTime === time
                            ? "bg-blue-500 text-white"
                            : isDisabled
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-white"
                        }`}
                        onClick={() => !isDisabled && handleTimeClick(time)} // Only invoke handleTimeClick if the slot is not disabled
                      >
                        {time}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-center mt-12 ml-32 mr-6">
                <button
                  onClick={handleAppointmentRequest}
                  type="submit"
                  className={`w-2/3 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-sm text-sm px-5 py-4 text-center ${
                    !selectedTime ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Randevu Al
                </button>
                <ToastContainer />
              </div>
            </div>
            <div className="mr-32">
              <Calendar onDayClick={handleDayClick} daysOfWeek={daysOfWeek} isUsersCalendar={false} />
            </div>
          </div>
        </div>
      )}
    </>
  );
                }

export default CalendarAppointmentPage;
