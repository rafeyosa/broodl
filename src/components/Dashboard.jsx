"use client";
import { Fugaz_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import Login from "./Login";
import Loading from "./Loading";
import { db } from "../../firebase";
import { moods } from "@/utils";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const { currentUser, globalData, setGlobalData, isLoading } = useAuth();
  const [data, setData] = useState({});
  const now = new Date();

  const statuses = {
    ...countMoods(),
    time_remaining: `${24 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  function countMoods() {
    let total_number_of_days = 0;
    let sum_moods = 0;

    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day];
          total_number_of_days++;
          sum_moods += days_mood;
        }
      }
    }

    return {
      num_days: total_number_of_days,
      average_mood: (sum_moods / total_number_of_days).toFixed(2),
    };
  }

  async function handleSetMood(mood) {
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    try {
      const newData = { ...globalData };

      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }
      newData[year][month][day] = mood;

      setData(newData);
      setGlobalData(newData);

      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (!currentUser || !globalData) {
      return;
    }

    setData(globalData);
  }, [currentUser, globalData]);

  if (isLoading) {
    return <Loading />;
  }
  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-col felx-1 p-4 sm:p-8 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4">
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className="p-4 flex flex-col gap-1 sm:gap-2">
              <p className="font-medium capitalize text-xs sm:text-sm truncate">
                {status.replaceAll("_", " ")}
              </p>
              <p className={fugaz.className + " text-base sm:text-lg"}>
                {statuses[status]}
                {status === "num_days" ? " \uD83D\uDD25" : ""}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={fugaz.className + " text-5xl sm:text-6xl md:7xl text-center"}
      >
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="flex items-stretch flex-wrap gap-4">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              key={moodIndex}
              className={
                "bg-indigo-50 hover:bg-indigo-100 rounded-2xl purpleShadow duration-200 py-4 px-10 text-center flex flex-col items-center gap-2 flex-1 " +
                (moodIndex === 10 ? "col-span-2 sm:col-span-1" : " ")
              }
              onClick={() => handleSetMood(moodIndex + 1)}
            >
              <p className="text-4xl sm:text-5xl md:text-6xl">
                {moods[mood].emoji}
              </p>
              <p
                className={
                  fugaz.className +
                  " text-indigo-500 text-xs sm:text-sm md:text-base"
                }
              >
                {mood}
              </p>
            </button>
          );
        })}
      </div>
      <Calendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
}
