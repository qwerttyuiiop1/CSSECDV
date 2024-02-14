"use client";
import styles from "../login.module.css";
import React from "react";
import {
  Card,
  Title,
  CardRow,
  SmallButton,
  SideButton,
  FileInput,
} from "@/components/CardPage/CardPage";
import { LuArrowLeft } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { FormContainer, useFormError } from "@/components/Providers/Forms";
import ReCaptcha from "react-google-recaptcha";

export interface PfpCardOutput {
  pfp: FileList;
  recaptcha: string;
}
export interface PfpCardProps {
  onBack: (output: PfpCardOutput) => void;
  onSubmit: (output: PfpCardOutput) => void;
  data: PfpCardOutput | null;
}

export default function UserCard({ onSubmit, onBack, data }: PfpCardProps) {
  const form = useForm({ defaultValues: data || undefined });
  const [recaptcha, setRecaptcha] = React.useState<string | null>(null);
  const recaptchaRef = React.useRef<ReCaptcha>(null);

  const handleSubmit = form.handleSubmit((v) => {
    if (!recaptcha)
      form.setError("recaptcha", {
        type: "manual",
        message: "recaptcha is required",
      });
    else onSubmit({ ...v, recaptcha });
  });
  const handleBack = () => onBack(form.getValues());
  useFormError(form);
  return (
    <FormContainer form={form}>
      <Card>
        <Title>Sign-up</Title>
        <FileInput
          image
          id="pfp"
          accept="image/jpeg, image/png, image/webp"
          options={{
            required: "Profile picture is required",
            validate: {
              isImage: (file) =>
                file[0]?.type === "image/jpeg" ||
                file[0]?.type === "image/png" ||
                file[0]?.type === "image/webp" ||
                "Please upload a .jpeg, .png or .webp file.",
              maxSize: (file) =>
                file[0]?.size <= 10 * 1024 * 1024 ||
                "File size exceeds the maximum allowed limit (10MB).",
            },
          }}
        />

        <ReCaptcha
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          onChange={setRecaptcha}
        />
        <CardRow className={styles.width}>
          <SmallButton onClick={handleBack}>
            <CardRow>
              <LuArrowLeft className={styles.arrow} />
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
