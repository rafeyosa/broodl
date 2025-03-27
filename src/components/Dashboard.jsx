import { Fugaz_One } from "next/font/google";
import React from "react";
import Calendar from "./Calendar";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const statuses = {
    num_days: 14,
    time_remaining: "13:14:26",
    date: new Date().toDateString(),
  };

  const moods = {
    "&*@#$": "😭",
    Sad: "🥲",
    Existing: "😶",
    Good: "😊",
    Elated: "😍",
  };

  return (
    <div className="flex flex-col felx-1 p-4 sm:p-8 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4 rounded-lg">
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className="p-4 flex flex-col gap-1 sm:gap-2">
              <p className="font-medium uppercase text-xs sm:text-sm truncate">
                {status.replaceAll("_", " ")}
              </p>
              <p className={fugaz.className + " text-base sm:text-lg"}>
                {statuses[status]}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={
          fugaz.className + " text-5xl sm:text-6xl md:7xl text-center"
        }
      >
        How do you <span className="textGradient">feel</span> today?
      </h4>
      {/* <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              key={moodIndex}
              className={
                "bg-indigo-50 hover:bg-indigo-100 rounded-2xl purpleShadow duration-200 p-4 text-center flex flex-col items-center gap-2 " +
                (moodIndex === 4 ? "col-span-2 sm:col-span-1" : " ")
              }
            >
              <p className="text-4xl sm:text-5xl md:text-6xl">{moods[mood]}</p>
              <p className={fugaz.className + " text-indigo-500 text-xs sm:text-sm md:text-base"}>{mood}</p>
            </button>
          );
        })}
      </div> */}
      <div className="flex items-stretch flex-wrap gap-4">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              key={moodIndex}
              className={
                "bg-indigo-50 hover:bg-indigo-100 rounded-2xl purpleShadow duration-200 py-4 px-10 text-center flex flex-col items-center gap-2 flex-1 " +
                (moodIndex === 10 ? "col-span-2 sm:col-span-1" : " ")
              }
            >
              <p className="text-4xl sm:text-5xl md:text-6xl">{moods[mood]}</p>
              <p className={fugaz.className + " text-indigo-500 text-xs sm:text-sm md:text-base"}>{mood}</p>
            </button>
          );
        })}
      </div>
      <Calendar />
    </div>
  );
}
