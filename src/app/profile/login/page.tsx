"use client"
import styles from "../login.module.css";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
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
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { username, password } from '../validations'
import { ErrorContainer, FormContainer } from "@/components/Providers/Forms";


// TODO: lottie animation for loading

export default function Page() {
  const form = useForm();
  const router = useRouter();
  const onSubmit = form.handleSubmit(data => {
	if (data.password === "12345678") {
	  router.push("/");
	}
  });
  return (
	<CardPage>
	  <FormContainer form={form}>
	  <ErrorContainer form={form} />
	  <Card>
		<Title className={styles.width}> Login </Title>
		<Input placeholder="Username" id="username"
			options={username}/>
		<Password placeholder="Password" id="password"
			options={password}/>
		<BigButton onClick={onSubmit}> 
		  <div className={styles.login_button_text}>
			Login 
		  </div>
		</BigButton>
		<Separator text="OR"/>
		<BigButton onClick={()=>signIn('google')}>
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
	  </FormContainer>
	</CardPage>
  );
}