import { Fugaz_One } from "next/font/google";
import React from "react";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Button(props) {
  const { text, dark, full, onClick } = props;
  return (
    <button
      className={
        "border border-solid border-indigo-600 rounded-full overflow-hidden duration-200 hover:opacity-60 " +
        (dark ? " text-white bg-indigo-600" : "text-indigo-600") +
        (full ? " grid place-items-center w-full" : "")
      }
      onClick={onClick}
    >
      <p
        className={
          fugaz.className + " px-7 sm:px-10 whitespace-nowrap py-2 sm:py-3"
        }
      >
        {text}
      </p>
    </button>
  );
}
