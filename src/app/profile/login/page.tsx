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
import { email, password } from '../validations'
import { ErrorContainer, FormContainer, useFormError } from "@/components/Providers/Forms";
import { useRouter } from "next/navigation";
import ReCaptcha from "react-google-recaptcha";

// TODO: lottie animation for loading

export default function Page() {
  const form = useForm();
  const router = useRouter();
  const toast = useFormError(form);
  const recaptchaRef = React.useRef<ReCaptcha>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const onCaptchaChange = (token: string | null) => {
	setRecaptchaToken(token);
  }
  const onSubmit = form.handleSubmit(async data => {
	if (!recaptchaToken) {
	  toast.error('Please complete the captcha');
	  return;
	}
	const res = await signIn("credentials", {
	  email: data.email,
	  password: data.password,
	  recaptchaToken,
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
		<ReCaptcha
		  ref={recaptchaRef}
		  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
		  onChange={onCaptchaChange}
		/>
		<BigButton onClick={onSubmit} className={styles.login_button_text}> 
		  Login 
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