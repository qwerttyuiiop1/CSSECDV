"use client"
import styles from "./page.module.css";
import React from "react";
import { 
	CardPage, 
	Card, 
	Title,
	Input,
	CardRow,
	SideButton
} from "@/components/CardPage/CardPage";
import { useForm } from "react-hook-form";
import { email } from '../validations'
import { ErrorContainer, FormContainer, useFormError } from "@/components/Providers/Forms";
import { useRouter } from "next/navigation";


// TODO: lottie animation for loading

export default function Page() {
  const form = useForm();
  const router = useRouter();
  const toast = useFormError(form);
  const onSubmit = form.handleSubmit(async data => {

  });
  return (
	<CardPage>
	  <FormContainer form={form}>
	  <ErrorContainer form={form} />
	  <Card>
		<Title> Edit Profile </Title>
		<div/>
		<SideButton color="gray" side="right" className={styles.change_password_btn}>
			Change Password
		</SideButton>
		<div/>
		<CardRow>
			<span className={styles.input_label}>Username</span>
			<div><Input placeholder="Username" id="name"/></div>
		</CardRow>
		<CardRow>
			<span className={styles.input_label}>Email</span>
			<div><Input placeholder="Email" id="email"
				options={email}/></div>
		</CardRow>
		<CardRow>
			<span className={styles.input_label}>Phone Number</span>
			<div><Input placeholder="Phone Number" id="phone"/></div>
		</CardRow>
		<CardRow>
			<span className={styles.input_label}>Country</span>
			<div><Input placeholder="Country" id="Country"/></div>
		</CardRow>
		<CardRow>
			<span className={styles.input_label}>City</span>
			<div><Input placeholder="City" id="city"/></div>
		</CardRow>
		<CardRow>
			<span className={styles.input_label}>Address</span>
			<div><Input placeholder="Address" id="address"/></div>
		</CardRow>

		<div/>
		
		<CardRow>
			<SideButton color="green">
				Save
			</SideButton>
			<SideButton color="gray">
				Cancel
			</SideButton>
		</CardRow>
	  </Card>
	  </FormContainer>
	</CardPage>
  );
}