"use client";
import { baseRating, gradients } from "@/utils";
import React, { useState } from "react";

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
  const { demo, completeData, handleSetMood } = props;
  const [selectedMonth, setSelectedMonth] = useState(monthsArr[now.getMonth()]);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const monthIndex = Object.keys(months).indexOf(selectedMonth);
  const monthNum = monthIndex + 1;
  // Get index of first day of month in a row of week (0 = Sunday)
  const firstDayOfMonth = new Date(selectedYear, monthIndex, 1).getDay();
  // Get total days in one month
  const daysInMonth = new Date(selectedYear, monthNum, 0).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  const data = completeData?.[selectedYear]?.[monthNum] || {};

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
              } else if (dayIndex in data) {
                color = gradients.indigo[data[dayIndex]];
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
