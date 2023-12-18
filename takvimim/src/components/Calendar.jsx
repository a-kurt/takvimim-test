import React from "react";
import { Fragment, useState, useEffect } from "react";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import UserService from '../api/UserService';
 

import {
  add,
  eachDayOfInterval,
  endOfWeek,
  startOfWeek,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  startOfMonth,
} from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


const Calendar = ({}) => {  
  
    const [meetings, setAppointments] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await UserService.getAppointments('/api/v1/auth/appointments/2');
          setAppointments(response); // Assuming response is an array or the structure you need
        } catch (error) {
          // Handle errors
          console.error('Error fetching appointments:', error);
        }
      };
  
      fetchData();
    }, []);
  

  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [CurrentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(CurrentMonth, "MMM-yyyy", new Date());
  let colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];
  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(firstDayCurrentMonth)),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startTime), selectedDay)
  );

  return (
    <div>
      <div className="items-center justify-center md:w-[700px] sm:w-[574px] w-[336px]">
        <div className="flex flex-row w-full h-16 justify-between items-center">
          <div className="text-2xl font-medium h-full flex items-center justify-center pl-4">
            <span>{format(firstDayCurrentMonth, "MMMM yyyy")}</span>
          </div>
          <div className="flex flex-row h-full items-center">
            <button
              onClick={previousMonth}
              type="button"
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-black"
            >
              <span className="sr-only">Previous Month</span>
              <BiChevronLeft className="w-10 h-10" aria-hidden="true" />
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-black"
            >
              <span className="sr-only">Next Month</span>
              <BiChevronRight className="w-10 h-10" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="items-center w-full">
          <div className="flex flex-row md:h-[100px] sm:h-[82px] h-[48px] items-center pointer-events-none">
            <span className="h-full w-full flex justify-center items-center font-medium">
              Pzt
            </span>
            <span className="h-full w-full flex justify-center items-center font-medium">
              Sal
            </span>
            <span className="h-full w-full flex justify-center items-center font-medium">
              Çar
            </span>
            <span className="h-full w-full flex justify-center items-center font-medium">
              Per
            </span>
            <span className="h-full w-full flex justify-center items-center font-medium">
              Cum
            </span>
            <span className="h-full w-full flex justify-center items-center font-medium">
              Cts
            </span>
            <span className="h-full w-full flex justify-center items-center font-medium">
              Paz
            </span>
          </div>
          <div className="grid grid-cols-7 w-full text-center text-black">
            {" "}
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={classNames(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  "md:h-[100px] sm:h-[82px] h-[48px] w-full flex justify-center items-center border-[#D4D5DF]"
                )}
              >
                <div className="absolute flex items-center justify-center">
                  {meetings.some((meeting) =>
                    isSameDay(parseISO(meeting.startTime), day)
                  ) && (
                    <div className="absolute top-5 flex items-center justify-center w-1 h-1 rounded-full bg-blue-500"></div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={classNames(
                    "w-full h-full", //
                    
                    !isEqual(day, selectedDay) &&
                      "hover:bg-blue-500 hover:text-white",
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      "flex items-center justify-center",
                    dayIdx === 0 && "border-t",
                    dayIdx === days.length - 1 && "border-r",
                    "border-b border-r ",
                    dayIdx % 7 === 0 && "border-l",
                    dayIdx < 7 && "border-t",
                    isEqual(day, selectedDay) && "text-white",
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "text-blue-500",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, today) &&
                      day >= today &&
                      "text-[#000000]",
                    isEqual(day, selectedDay) && isToday(day) && "bg-blue-500",
                    isEqual(day, selectedDay) && !isToday(day) && "bg-blue-500"
                  )}
                >
                  <time
                    className="flex justify-center items-center"
                    dateTime={format(day, "yyyy-MM-dd")}
                  >
                    {format(day, "d")}
                  </time>
                </button>
              </div>
            ))}
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-900">
              Schedule for{" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "MMM dd, yyy")}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting meeting={meeting} key={meeting.id} />
                ))
              ) : (
                <p>No meetings for today.</p>
              )}
            </ol>
          </section>

        </div>
      </div>
    </div>
  );
};
function Meeting({ meeting }) {
  let startTime = parseISO(meeting.startTime);
  let endTime = parseISO(meeting.endTime);

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <img
        src={meeting.imageUrl}
        alt=""
        className="flex-none w-10 h-10 rounded-full"
      />
      <div className="flex-auto">
        <p className="text-gray-900">{meeting.appointmentName}</p>
        <p className="mt-0.5">
          <time dateTime={meeting.startTime}>
            {format(startTime, "hh:mm a")}
          </time>{" "}
          -{" "}
          <time dateTime={meeting.endTime}>
            {format(endTime, "hh:mm a")}
          </time>
        </p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Cancel
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
}

export default Calendar;