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
import { FormProvider, useForm } from "react-hook-form";
import { address1, phone_code, phone, city, country } from '../validations'

export interface DetailsCardOutput {
	address1: string;
	address2?: string;
	city: string;
	country: string;
	phone_code: string;
	phone: string;
}
export interface UserCardProps {
	onBack: (output: DetailsCardOutput) => void;
	onSubmit: (output: DetailsCardOutput) => void;
	data: DetailsCardOutput | null;
}

export default function UserCard({ onSubmit, onBack, data }: UserCardProps) {
	const form = useForm({ values: data || undefined });
	const handleSubmit = form.handleSubmit(data => {
		console.log(data);
		onSubmit(data);
	})
	const handleBack = () => onBack(form.getValues());
	return (
		<FormProvider {...form}>
		<form 
		  onSubmit={e => e.preventDefault()}
		  noValidate>
		<Card>
			<Title>Sign-up</Title>
			<Input placeholder="Address Line 1" id="address1"
				options={address1}/>
			<Input placeholder="Address Line 2" id="address2"/>
			<CardRow className={styles.width}>
				<Input placeholder="City" id="city" className={styles.input_row}
					options={address1}/>
				<Input placeholder="Country" id="country" className={styles.input_row}
					options={country}/>
			</CardRow>
			<CardRow className={styles.width}>
				<Input placeholder="+63" type="number" id="phone_code" 
					className={styles.phone_width} options={phone_code}/>
				<Input placeholder="Mobile Number" type="number" id="phone" 
					className={styles.input_row} options={phone}/>
			</CardRow>
			<CardRow className={styles.width}>
				<SmallButton onClick={handleBack}>
					<CardRow>
						<LuArrowLeft className={styles.arrow}/>
						<span className={styles.back_text}>Back</span>
					</CardRow>
				</SmallButton>
				<button 
					className={`${CardStyles.small_button} ${styles.left_button}`}
					onClick={handleSubmit}>
					Create Account
				</button>
			</CardRow>
		</Card>
		</form>
		</FormProvider>
	);
}