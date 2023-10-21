"use client"
import styles from "../login.module.css";
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
	CardRow
} from "@/components/CardPage/CardPage";
import CardStyles from "@/components/CardPage/card.module.css";
import { FcGoogle } from "react-icons/fc"
import Link from "next/link";


export default function Page() {
  return (
	<CardPage>
	  <Card>
		<Title className={styles.width}> Login </Title>
		<Input placeholder="Username" id="username"/>
		<Password placeholder="Password" id="password"/>
		<BigButton> 
		  <div className={styles.login_button_text}>
			Login 
		  </div>
		</BigButton>
		<Separator text="OR"/>
		<BigButton>
		  <CardRow>
		  	<FcGoogle className={styles.google_icon}/>
		  	<div className={styles.google_text}> Sign-in with Google </div>
		  </CardRow>
		</BigButton>
		<CardRow>
		  <div className={styles.no_account}> Don&apos;t have an account? </div>
		  <Link href="/profile/signup" className={CardStyles.small_button}> Sign-up </Link> 
		</CardRow>
		<Link
		  className={styles.forgot_password}
		  href="/profile/forgot-password"> 
			Forgot your password? 
		</Link>
	  </Card>
	</CardPage>
  );
}