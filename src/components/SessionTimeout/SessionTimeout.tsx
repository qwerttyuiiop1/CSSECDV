"use client";
import React, { useState, useEffect, useCallback } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

let timeoutId: NodeJS.Timeout;

const YourComponent: React.FC = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const user = session?.user;

  useEffect(() => {
	const interval = setInterval(() => {
		update();
	}, 1000 * 60 * 20); // 20 minutes
	return () => clearInterval(interval);
  }, [update]);
  useEffect(() => {
	if (session?.valid !== true) {
        signOut({ redirect: false })
		.then(() => router.push("/profile/login"));
	}
  }, [session?.valid, router]);

  const resetTime = useCallback(async () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      console.log("Session timeout");
      if (user != null) {
        console.log("Logging out user");
        await signOut({ redirect: false });
        router.push("/profile/login");
      }
    }, 10 * 60 * 1000); // 5 minutes
  }, [router, user]);


  const handleUserActivity = useCallback(() => {
    resetTime();
  }, [resetTime]);

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
  }, [handleUserActivity, resetTime]);

  return <></>;
};

export default YourComponent;
