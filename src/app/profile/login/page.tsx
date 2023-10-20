"use client"
import styles from "./page.module.css";
import React from "react";
import { useSession } from "next-auth/react";
import { 
	CardPage, 
	Card, 
	Title,
	Input,
	Password,
	BigButton,
	Separator,
	CardRow,
	SmallButton
} from "@/components/CardPage/CardPage";
import { FcGoogle } from "react-icons/fc"


export default function Page() {
  return (
	<CardPage>
	  <Card>
		<Title> Login </Title>
		<Input placeholder="Username" id="username"/>
		<Password placeholder="Password" id="password"/>
		<BigButton> Login </BigButton>
		<Separator text="OR"/>
		<BigButton>
		  <CardRow>
		  	<FcGoogle className={styles.google_icon}/>
		  	<div className={styles.google_text}> Sign-in with Google </div>
		  </CardRow>
		</BigButton>
		<CardRow>
		  <div className={styles.no_account}> Don&apos;t have an account? </div>
		  <SmallButton> Sign-up </SmallButton>
		</CardRow>
		<div className={styles.forgot_password}> Forgot your password? </div>
	  </Card>
	</CardPage>
  );
}