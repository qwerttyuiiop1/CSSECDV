"use client";
import React, { useState, useEffect } from "react";
import SessionTimeoutModal from "./SessionTimeoutModal";
import { signOut, useSession } from "next-auth/react";

let timeoutId: NodeJS.Timeout;

const YourComponent: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const resetTime = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      console.log("Session timeout");
      if (user != null) {
        console.log("Logging out user");
        signOut();
      }
    }, 1 * 1 * 1000); // 1 minute || time in milliseconds
  };

  const handleUserActivity = () => {
    resetTime();
  };

  useEffect(() => {
    resetTime();

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
    };
  }, []);

  return <div>Session Timeout Component</div>;
};

export default YourComponent;
