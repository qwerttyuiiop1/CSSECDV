"use client"
import styles from "./page.module.css";
import React from "react";
import { 
	CardPage, 
	Card, 
	Title,
	Password,
	CardRow,
	SideButton
} from "@/components/CardPage/CardPage";
import CardStyles from "@/components/CardPage/card.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { password } from '../validations'
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
		<Title className={styles.width}> Edit Profile </Title>
		<div/>

		<div className={styles.password_container}>
			<span className={styles.password_label}>Old Password</span>
			<Password placeholder="Old Password" id="old_password"
				options={password}/>
		</div>

		<div className={styles.password_container}>
			<span className={styles.password_label}>New Password</span>
			<Password placeholder="New Password" id="new_password"
				options={password}/>
		</div>

		<div className={styles.password_container}>
			<span className={styles.password_label}>Confirm Password</span>
			<Password placeholder="Confirm Password" id="confirm_password"
				options={password}/>
		</div>

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