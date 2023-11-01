"use client"
import styles from "../login.module.css";
import React from "react";
import { 
	Card, 
	Title,
	Input,
	CardRow,
	SmallButton,
	SideButton,
	Dropdown
} from "@/components/CardPage/CardPage";
import { LuArrowLeft } from "react-icons/lu"
import { useForm } from "react-hook-form";
import { address1, phone_code, phone, city } from '../validations'
import {
	FormContainer,
	ErrorContainer
} from "@/components/Providers/Forms";
import countryList from "@/assets/data/countries";

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
	const handleSubmit = form.handleSubmit(onSubmit)
	const handleBack = () => onBack(form.getValues());
	return (
		<FormContainer form={form}>
		<ErrorContainer form={form}/>
		<Card>
			<Title>Sign-up</Title>
			<Input placeholder="Address Line 1" id="address1"
				options={address1}/>
			<Input placeholder="Address Line 2" id="address2"/>
			<CardRow className={styles.width}>
				<Input placeholder="City" id="city" className={styles.input_row}
					options={city}/>
				<Dropdown id="country"
					values={countryList} className={styles.input_row}/>
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
				<SideButton color="blue" onClick={handleSubmit} side="right">
					Create Account
				</SideButton>
			</CardRow>
		</Card>
		</FormContainer>
	);
}