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
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"
import { useForm } from "react-hook-form";
import { address, phone_code, phone_number, city } from '../validations'
import {
	FormContainer,
	ErrorContainer,
	useFormError
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
export interface DetailsCardProps {
	onBack: (output: DetailsCardOutput) => void;
	onSubmit: (output: DetailsCardOutput) => void;
	data: DetailsCardOutput | null;
}

export default function UserCard({ onSubmit, onBack, data }: DetailsCardProps) {
	const form = useForm({ values: data || undefined });
	const handleSubmit = form.handleSubmit(onSubmit)
	const handleBack = () => onBack(form.getValues());
	useFormError(form);
	return (
		<FormContainer form={form}>
		<Card>
			<Title>Sign-up</Title>
			<Input placeholder="Address Line 1" id="address1"
				options={address}/>
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
					className={styles.input_row} options={phone_number}/>
			</CardRow>
			<CardRow className={styles.width}>
				<SmallButton onClick={handleBack}>
					<CardRow>
						<LuArrowLeft className={styles.arrow}/>
						<span className={styles.back_text}>Back</span>
					</CardRow>
				</SmallButton>
				<SideButton onClick={handleSubmit} color="blue" side="right">
					<CardRow>
						Proceed
						<LuArrowRight className={styles.arrow}/>
					</CardRow>
				</SideButton>
			</CardRow>
		</Card>
		</FormContainer>
	);
}