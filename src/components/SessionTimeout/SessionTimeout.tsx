"use client";
import React, { useState, useEffect, useCallback } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const YourComponent: React.FC = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const user = session?.user;
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  useEffect(() => {
	const interval = setInterval(() => {
		update();
	}, 1000 * 60 * 20); // 20 minutes
	return () => clearInterval(interval);
  }, [update]);
  useEffect(() => {
	if (session && session.valid !== true) {
        signOut({ redirect: false })
		.then(() => router.push("/profile/timeout?session=invalid"));
	}
  }, [session, session?.valid, router]);

  const resetTime = useCallback(async () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      if (user != null) {
        await signOut({ redirect: false });
        router.push("/profile/timeout?session=expired");
      }
    }, 10 * 60 * 1000); // 5 minutes
  }, [router, user]);

  useEffect(() => {
    resetTime();

    window.addEventListener("mousemove", resetTime);
    window.addEventListener("scroll", resetTime);
    window.addEventListener("keydown", resetTime);
    window.addEventListener("click", resetTime);

    return () => {
      clearTimeout(timeoutRef.current);
      window.removeEventListener("mousemove", resetTime);
      window.removeEventListener("scroll", resetTime);
      window.removeEventListener("keydown", resetTime);
      window.removeEventListener("click", resetTime);
    };
  }, [resetTime]);

  return <></>;
};

export default YourComponent;
