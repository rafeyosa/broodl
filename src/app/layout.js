import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const opensans = Open_Sans({ subsets: ["latin"] });
const fugasOne = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Broodl",
  description: "Track your daily mood every day of the year!",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={"/"}>
        <h1
          className={fugasOne.className + " text-base sm:text-lg textGradient"}
        >
          Broodl
        </h1>
      </Link>
      <div className="flex items-center justify-between">PLACEHOLDER</div>
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={fugasOne.className + " text-indigo-600"}>
        Created with &hearts;
      </p>
    </footer>
  );

  return (
    <html lang="en">
      <body
        className={
          opensans.className +
          " w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800"
        }
      >
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
