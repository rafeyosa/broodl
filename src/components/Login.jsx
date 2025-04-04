"use client";
import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { signUp, login } = useAuth();

  async function handleSubmit() {
    if (!email || !password) {
      setErrorMessage("Email and password cannot be empty");
      return;
    }
    if (!email.includes("@")) {
      setErrorMessage("Email is not valid");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }
    if (isAuthenticating) {
      return;
    }

    try {
      setIsAuthenticating(true);

      if (isRegister) {
        await signUp(email, password);
      } else {
        await login(email, password);
      }
      clearForm();
    } catch (error) {
      setErrorMessage(
        isRegister ? "The user already exists" : "Invalid email or password"
      );
      console.log(error.message);
    } finally {
      setIsAuthenticating(false);
    }
  }

  function clearForm() {
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={fugaz.className + " text-4xl sm:text-5xl md:text-6xl"}>
        {isRegister ? "Register" : "Login"}
      </h3>
      <p>You&apos;re one step away!</p>
      <input
        type="text"
        className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded outline-indigo-400 duration-200 hover:border-indigo-600"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrorMessage("");
        }}
      />
      <input
        type="password"
        className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded outline-indigo-400 duration-200 hover:border-indigo-600"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrorMessage("");
        }}
      />
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      <div className="max-w-[400px] w-full mx-auto">
        <Button
          text={isAuthenticating ? "Submitting..." : "Submit"}
          full
          onClick={handleSubmit}
        />
      </div>
      <p className="text-center">
        {isRegister ? "Already have an account? " : "Don't have an account? "}
        <button
          className="text-indigo-600"
          onClick={() => {
            setIsRegister(!isRegister);
            setErrorMessage("");
            clearForm();
          }}
        >
          {isRegister ? "Login" : "Sign up"}
        </button>
      </p>
    </div>
  );
}
