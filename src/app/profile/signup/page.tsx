"use client"
import React from "react";
import { CardPage } from "@/components/CardPage/CardPage";
import UserCard, { UserCardOutput } from "./UserCard";
import DetailsCard, { DetailsCardOutput } from "./DetailsCard";
import { useRouter } from "next/navigation"
import { DefaultToastContainer } from "@/components/Providers/Forms";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import PfpCard, { PfpCardOutput } from "./PfpCard";

export default function SignupPage() {
	const [ data1, setData1 ] = React.useState<UserCardOutput | null>(null);
	const [ data2, setData2 ] = React.useState<DetailsCardOutput | null>(null);
	const [ data3, setData3 ] = React.useState<PfpCardOutput | null>(null);
	const [ step, setStep ] = React.useState(0);

	const handleSubmit = async (data: UserCardOutput & DetailsCardOutput & PfpCardOutput) => {
		const formData = new FormData();
		for (const key in data) {
			if (key === "confirmPassword" || key === "recaptcha") continue;
			if (key === "pfp") {
				formData.append(key, data[key][0]);
				continue;
			}
			formData.append(key, data[key]);
		}
		const res = await fetch('/api/profile', {
			method: 'POST',
			body: formData
		})
		const json = await res.json();
		if (res.ok) {
			const res = await signIn("credentials", {
				email: data.email,
				password: data.password,
				recaptchaToken: data.recaptcha,
				redirect: false
			  });
			if (res?.error)
				toast.error(res.error);
			else
				router.push('/');
		} else {
			toast.error(json.error)
		}
	}

	const router = useRouter();
	return (
		<>
		<DefaultToastContainer/>
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
					setStep(2);
				}}
				onBack={(out) => {
					setData2(out);
					setStep(0)
				}}
				data={data2}
			/>}
			{step == 2 && <PfpCard 
				onSubmit={(out) => {
					setData3(out);
					handleSubmit({...data1!, ...data2!, ...out});
				}}
				onBack={(out) => {
					setData3(out);
					setStep(1);
				}}
				data={data3}
			/>}
		</CardPage>
		</>
	);
}