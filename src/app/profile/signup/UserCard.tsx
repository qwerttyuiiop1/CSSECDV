"use client"
import styles from "../login.module.css";
import React from "react";
import { 
	Card, 
	Title,
	Input,
	Password,
	BigButton,
	Separator,
	CardRow,
	SideButton
} from "@/components/CardPage/CardPage";
import CardStyles from "@/components/CardPage/card.module.css";
import { FcGoogle } from "react-icons/fc"
import { LuArrowRight } from "react-icons/lu"
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { username, password, email } from '../validations'
import { ErrorContainer, FormContainer } from "@/components/Providers/Forms";
import { signIn } from "next-auth/react";

export interface UserCardOutput extends FieldValues {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}
export interface UserCardProps {
	onSubmit: (output: UserCardOutput) => void;
	data: UserCardOutput | null;
}

export default function UserCard({ onSubmit, data }: UserCardProps) {
	const form = useForm( { values: data || undefined });
	const handleSubmit = form.handleSubmit(onSubmit)
	return (
		<FormContainer form={form}>
		<ErrorContainer form={form} />
		<Card>
			<Title className={styles.width}>Sign-up</Title>
			<Input placeholder="Username" id="username"
				options={username}/>
			<Input placeholder="Email" type="email" id="email"
				options={email}/>
			<Password placeholder="Password" id="password" 
				options={password}/>
			<Password placeholder="Confirm Password" id="confirmPassword" 
				options={{
					required: "Confirm Password is required.",
					validate: value => form.watch('password') === value || "Passwords do not match."
				}}/>
			<SideButton onClick={handleSubmit} color="blue" side="right">
				<CardRow>
					Proceed
					<LuArrowRight className={styles.arrow}/>
				</CardRow>
			</SideButton>

			<Separator text="OR"/>
			<BigButton onClick={()=>{
				signIn("google", { callbackUrl: "/" });
			}}>
				<CardRow>
					<FcGoogle className={styles.google_icon}/>
					<div className={styles.google_text}> Sign-in with Google </div>
				</CardRow>
			</BigButton>

			<CardRow>
				<div className={styles.no_account}> Already have an account? </div>
				<Link href="/profile/login" className={CardStyles.small_button}> Login </Link> 
			</CardRow>
		</Card>
		</FormContainer>
	);
}