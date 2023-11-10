"use client"
import styles from "./page.module.css";
import React, { use, useEffect, useState } from "react";
import { 
	CardPage, 
	Card, 
	Title,
	Input,
	CardRow,
	SideButton
} from "@/components/CardPage/CardPage";
import { useForm } from "react-hook-form";
import { address, city, country, email, phone, username } from '../validations'
import { ErrorContainer, FormContainer, useFormError } from "@/components/Providers/Forms";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import User404, { UserLoading } from "@/app/profile/404";
import { UserDetail } from "@/lib/types/User";
import Link from "next/link";

type FormValues = Pick<UserDetail, "name" | "mobileno" | "country" | "city" | "address1">;
// TODO: lottie animation for loading
const Page: React.FC<{data: FormValues; id: string}> = ({ data, id }) => {
  const form = useForm({
	values: data,
  });
  const router = useRouter();
  const toast = useFormError(form);
  const onSubmit = form.handleSubmit(async data => {
	const res = await fetch(`/api/user/${id}`, {
	  method: "PATCH",
	  headers: {
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify(data),
	});
	const json = await res.json();
	if (res.ok) {
	  toast.success("Profile updated");
	} else {
	  toast.error(json.message);
	}
  });

  return (
	<CardPage>
	  <FormContainer form={form}>
	  <ErrorContainer form={form} />
	  <Card>
		<Title> Edit Profile </Title>
		<div/>
		<SideButton color="gray" side="right" className={styles.change_password_btn}>
			<Link href="/profile/password">Change Password</Link>
		</SideButton>
		<div/>
		<CardRow>
			<span className={styles.input_label}>Username</span>
			<div><Input placeholder="Username" id="name" options={username}/></div>
		</CardRow>
		<CardRow>
			<span className={styles.input_label}>Phone Number</span>
			<div><Input placeholder="Phone Number" id="mobileno" options={phone}/></div>
		</CardRow>
		<CardRow>
			<span className={styles.input_label}>Country</span>
			<div><Input placeholder="Country" id="country" options={country}/></div>
		</CardRow>
		<CardRow>
			<span className={styles.input_label}>City</span>
			<div><Input placeholder="City" id="city" options={city}/></div>
		</CardRow>
		<CardRow>
			<span className={styles.input_label}>Address</span>
			<div><Input placeholder="Address" id="address1" options={address}/></div>
		</CardRow>

		<div/>
		
		<CardRow>
			<SideButton color="green" onClick={onSubmit}>
				Save
			</SideButton>
			<SideButton color="gray">
				Cancel {/* where does this lead to? */}
			</SideButton>
		</CardRow>
	  </Card>
	  </FormContainer>
	</CardPage>
  );
}

export default function Wrapper() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserDetail | undefined>();
  useEffect(() => {
	if (!session) return;
	(async () => {
	  const res = await fetch(`/api/user/${session.user.email}?detail=true`);
	  if (res.ok) {
		const data = await res.json();
		setUser(data);
	  }
	})();
  }, [session]);

  if (status === "loading" || !user) return <UserLoading/>;
  if (!session) return <User404/>;
  return <Page data={user} id={user.email}/>;
}