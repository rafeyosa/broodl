"use client";
import React from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Logout() {
  const { currentUser, logout } = useAuth();
  const pathName = usePathname();

  if (!currentUser) {
    return null;
  }
  if (pathName === "/") {
    return (
      <Link href={"/dashboard"}>
        <Button text="Go to dashboard" />
      </Link>
    );
  }
  return <Button text="Logout" onClick={logout} />;
}
