"use client"
import styles from "./login.module.css";
import React from "react";
import { useSession } from "next-auth/react";
import { CardPage, Card, Title } from "@/components/CardPage/CardPage";


export default function Page() {
  return (
	<CardPage>
	  <Card>
		<Title> Login Page </Title>
	  </Card>
	</CardPage>
  );
}