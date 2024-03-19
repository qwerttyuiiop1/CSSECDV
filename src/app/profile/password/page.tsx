"use client";
import styles from "./page.module.css";
import React from "react";
import {
  CardPage,
  Card,
  Title,
  Password,
  CardRow,
  SideButton,
} from "@/components/CardPage/CardPage";
import CardStyles from "@/components/CardPage/card.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { password } from "../validations";
import {
  ErrorContainer,
  FormContainer,
  useFormError,
} from "@/components/Providers/Forms";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import User404, { UserLoading } from "../404";
import { toast } from "react-toastify";

// TODO: lottie animation for loading

function Page({ id }: { id: string }) {
  const form = useForm();
  const onSubmit = form.handleSubmit(async (data) => {
    const { old_password, new_password } = data;
    const res = await fetch(`/api/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: old_password,
        password: new_password,
      }),
    });
    const json = await res.json();
    if (res.ok) {
      toast.success("Password updated");
    } else {
      toast.error(json.error);
    }
  });
  return (
    <CardPage>
      <FormContainer form={form}>
        <ErrorContainer form={form} />
        <Card>
          <Title className={styles.width}> Edit Profile </Title>
          <div />

          <div className={styles.password_container}>
            <span className={styles.password_label}>Old Password</span>
            <Password placeholder="Old Password" id="old_password" />
          </div>

          <div className={styles.password_container}>
            <span className={styles.password_label}>New Password</span>
            <Password
              placeholder="New Password"
              id="new_password"
              options={password}
            />
          </div>

          <div className={styles.password_container}>
            <span className={styles.password_label}>Confirm Password</span>
            <Password
              placeholder="Confirm Password"
              id="confirm_password"
              options={{
                required: "Confirm Password is required.",
                validate: (value) =>
                  form.watch("new_password") === value ||
                  "Passwords do not match.",
              }}
            />
          </div>

          <div />

          <CardRow>
            <SideButton color="green" onClick={onSubmit}>
              Save
            </SideButton>
            <SideButton color="gray" onClick={() => window.history.back()}>
              Cancel
            </SideButton>
          </CardRow>
        </Card>
      </FormContainer>
    </CardPage>
  );
}

export default function Wrapper() {
  const { data: session, status } = useSession();
  if (status === "loading") return <UserLoading />;
  if (!session) return <User404 />;
  return <Page id={session.user.email} />;
}
