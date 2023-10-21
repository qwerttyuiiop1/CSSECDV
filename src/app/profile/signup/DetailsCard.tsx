"use client"
import styles from "../login.module.css";
import React from "react";
import { 
	Card, 
	Title,
	Input,
	CardRow,
	SmallButton
} from "@/components/CardPage/CardPage";
import CardStyles from "@/components/CardPage/card.module.css";
import { LuArrowLeft } from "react-icons/lu"
import Link from "next/link";

export interface UserCardOutput {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}
export interface UserCardProps {
	onBack: (output: UserCardOutput) => void;
	onSubmit: (output: UserCardOutput) => void;
}

export default function UserCard({ onSubmit, onBack }: UserCardProps) {
	return (
		<Card>
			<Title>Sign-up</Title>
			<Input placeholder="Address Line 1" id="address1"/>
			<Input placeholder="Address Line 2" id="address2"/>
			<CardRow className={styles.width}>
				<Input placeholder="City" id="city" className={styles.input_row}/>
				<Input placeholder="Country" id="country" className={styles.input_row}/>
			</CardRow>
			<CardRow className={styles.width}>
				<Input placeholder="+63" id="phone_code" className={styles.phone_width}/>
				<Input placeholder="Mobile Number" id="phone" className={styles.input_row}/>
			</CardRow>
			<CardRow className={styles.width}>
				<SmallButton>
					<CardRow>
						<LuArrowLeft className={styles.arrow}/>
						<span className={styles.back_text}>Back</span>
					</CardRow>
				</SmallButton>
				<button className={`${CardStyles.small_button} ${styles.left_button}`}>
					Create Account
				</button>
			</CardRow>
			
		</Card>
	);
}