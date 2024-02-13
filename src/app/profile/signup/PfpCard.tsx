"use client";
import styles from "../login.module.css";
import React from "react";
import { 
	Card, 
	Title,
	Input,
	CardRow,
	SmallButton,
	SideButton,
	Dropdown,
	FileInput
} from "@/components/CardPage/CardPage";
import { LuArrowLeft } from "react-icons/lu"
import { useForm } from "react-hook-form";
import { address, phone_code, phone_number, city } from '../validations'
import {
	FormContainer,
	ErrorContainer,
	useFormError
} from "@/components/Providers/Forms";
import countryList from "@/assets/data/countries";

export interface PfpCardOutput {
	pfp: FileList;
}
export interface PfpCardProps {
	onBack: (output: PfpCardOutput) => void;
	onSubmit: (output: PfpCardOutput) => void;
	data: PfpCardOutput | null;
}

export default function UserCard({ onSubmit, onBack, data }: PfpCardProps) {
	const form = useForm({ defaultValues: data || undefined });
	const handleSubmit = form.handleSubmit(onSubmit)
	const handleBack = () => onBack(form.getValues());
	useFormError(form);
	return (
		<FormContainer form={form}>
		<Card>
			<Title>Sign-up</Title>
			<FileInput image id="pfp" accept="image/*" options={{ required: "Please upload a profile picture" }}/>
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