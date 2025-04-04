"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";
import Button from "./Button";

export default function CallToAction() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return (
      <div className="max-w-[600px] mx-auto w-full">
        <Link href={"/dashboard"}>
          <Button text="Go to dashboard" full dark />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
      <Link href={{pathname: "/dashboard", query: { type: "signup" }}} >
        <Button text="Sign Up" />
      </Link>
      <Link href={{pathname: "/dashboard", query: { type: "login" }}}>
        <Button text="Login" dark />
      </Link>
    </div>
  );
}
