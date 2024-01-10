import React from "react";
import { Fragment, useState, useEffect } from "react";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import UserService from "../api/UserService";

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

const Calendar = ({
  onDayClick,
  daysOfWeek = {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  },
  meetings = [],
  isUsersCalendar,
}) => {
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
            <span>
              {months[firstDayCurrentMonth.getMonth()]}{" "}
              {firstDayCurrentMonth.getFullYear()}
            </span>
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
                  onClick={() => {
                    if (
                      daysOfWeek[getDay(day)] &&
                      !(!isUsersCalendar && day < today)
                    ) {
                      setSelectedDay(day);
                      onDayClick(day);
                    }
                  }}
                  className={classNames(
                    "w-full h-full",

                    !isEqual(day, selectedDay) &&
                      daysOfWeek[getDay(day)] &&
                      !(!isUsersCalendar && day < today) &&
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
                    isEqual(day, selectedDay) && !isToday(day) && "bg-blue-500",
                    daysOfWeek[getDay(day)]
                      ? "cursor-pointer"
                      : "cursor-not-allowed",
                    day < today &&
                      !isUsersCalendar &&
                      "bg-[#D4D5DF] cursor-not-allowed",
                    !daysOfWeek[getDay(day)] && "bg-[#D4D5DF]"
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
        </div>
      </div>
    </div>
  );
};

export default Calendar;
