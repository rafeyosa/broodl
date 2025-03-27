import { baseRating, demoData, gradients } from "@/utils";
import React from "react";

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};
const monthsArr = Object.keys(months);
const now = new Date();
const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Calendar(props) {
  const { demo } = props;

  const month = "March";
  const year = 2025;
  const monthNow = new Date(year, Object.keys(months).indexOf(month), 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(
    year,
    Object.keys(months).indexOf(month) + 1,
    0
  ).getDate();
  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
      {[...Array(numRows).keys()].map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="grid grid-cols-7 gap-1">
            {dayList.map((dayOfWeek, dayOfWeekIndex) => {
              let dayIndex =
                rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

              let dayDisplay;
              if (dayIndex > daysInMonth) {
                dayDisplay = false;
              } else if (row === 0 && dayOfWeekIndex < firstDayOfMonth) {
                dayDisplay = false;
              } else {
                dayDisplay = true;
              }

              let isToday = dayIndex === now.getDate();

              if (!dayDisplay) {
                return <div key={dayOfWeekIndex} className="bg-white"></div>;
              }

              let color;
              if (demo) {
                color = gradients.indigo[baseRating[dayIndex]];
              } else if (dayIndex in demoData) {
                color = gradients.indigo[demoData[dayIndex]];
              } else {
                color = "white";
              }

              return (
                <div
                  key={dayOfWeekIndex}
                  style={{ background: color }}
                  className={
                    "text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg " +
                    (isToday ? "border-indigo-400 " : "border-indigo-100 ") +
                    (color === "white" ? "text-indigo-400" : "text-white")
                  }
                >
                  <p>{dayIndex}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
