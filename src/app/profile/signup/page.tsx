"use client"
import React from "react";
import { CardPage } from "@/components/CardPage/CardPage";
import UserCard, { UserCardOutput } from "./UserCard";
import DetailsCard, { DetailsCardOutput } from "./DetailsCard";
import { useRouter } from "next/navigation"

export default function SignupPage() {
	const [ data1, setData1 ] = React.useState<UserCardOutput | null>(null);
	const [ data2, setData2 ] = React.useState<DetailsCardOutput | null>(null);
	const [ step, setStep ] = React.useState(0);

	const handleSubmit = (data: UserCardOutput & DetailsCardOutput) => {
		const rest = data as any;
		delete rest.confirmPassword;
		fetch('/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(rest),
		}).then(res => {
			if (res.ok)
				router.push('/profile');
		})
	}

	const router = useRouter();
	return (
		<CardPage>
			{step == 0 && <UserCard 
				onSubmit={(out) => {
					setData1(out);
					setStep(1);
				}} 
				data={data1}
			/>}
			{step == 1 && <DetailsCard 
				onSubmit={(out) => {
					setData2(out);
					handleSubmit({...data1!, ...out});
				}}
				onBack={(out) => {
					setData2(out);
					setStep(0)
				}}
				data={data2}
			/>}
		</CardPage>
	);
}