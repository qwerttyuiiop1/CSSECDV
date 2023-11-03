"use client"
import styles from "../login.module.css";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
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
import { email, password } from '../validations'
import { ErrorContainer, FormContainer, useFormError } from "@/components/Providers/Forms";
import { useRouter } from "next/navigation";


// TODO: lottie animation for loading

export default function Page() {
  const form = useForm();
  const router = useRouter();
  const toast = useFormError(form);
  const onSubmit = form.handleSubmit(async data => {
	const res = await signIn("credentials", {
	  email: data.email,
	  password: data.password,
	  redirect: false
	});
	if (res?.error)
	  toast.error('Invalid email or password');
	else
	  router.push('/');
  });
  return (
	<CardPage>
	  <FormContainer form={form}>
	  <ErrorContainer form={form} />
	  <Card>
		<Title className={styles.width}> Login </Title>
		<Input placeholder="Email" id="email"
			options={email}/>
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