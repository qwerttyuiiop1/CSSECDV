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
	CardRow
} from "@/components/CardPage/CardPage";
import CardStyles from "@/components/CardPage/card.module.css";
import { FcGoogle } from "react-icons/fc"
import { LuArrowRight } from "react-icons/lu"
import Link from "next/link";

export interface UserCardOutput {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}
export interface UserCardProps {
	onSubmit: (output: UserCardOutput) => void;
}

export default function UserCard({ onSubmit }: UserCardProps) {
	return (
		<Card>
			<Title className={styles.width}>Sign-up</Title>
			<Input placeholder="Username" id="username"/>
			<Input placeholder="Email" type="email" id="email"/>
			<Password placeholder="Password" id="password" />
			<Password placeholder="Confirm Password" id="confirm-password" />

			<button className={`${CardStyles.small_button} ${styles.left_button}`}>
				<CardRow>
					Proceed
					<LuArrowRight className={styles.arrow}/>
				</CardRow>
			</button>

			<Separator text="OR"/>
			<BigButton>
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
	);
}