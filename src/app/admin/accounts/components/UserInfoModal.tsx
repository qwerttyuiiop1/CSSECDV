import React from "react";

import styles from "./page.module.css";
import BaseModal, { BaseModalProps } from "@/components/Modal/BaseModal";
import { useForm } from "react-hook-form";
import { FormContainer, useFormError } from "@/components/Providers/Forms";
import { Card, SideButton } from "@/components/CardPage/CardPage";
import { Account } from "../page";

interface UserInfoProps extends BaseModalProps {
  user: Account;
}

const UserInfoModal: React.FC<UserInfoProps> = ({ state, user }) => {
  const form = useForm();
  const toast = useFormError(form);
  const close = () => state[1](false);

  const handleSubmit = form.handleSubmit(async (data) => {
    toast.success("Code created: " + data.code);
    close();
    form.reset();
  });

  if (!state[0]) return null;

 
  return (
    <BaseModal state={state}>
      <FormContainer form={form}>
        <Card>
          <div className={styles.main_container}>
            <h1 className={styles.header}>User Info</h1>
            <div className={styles.details_container}>
              <h1 className={styles.name}>Username</h1>
              <h1 className={styles.details}>{user.username}</h1>
            </div>

            <div className={styles.details_container}>
              <h1 className={styles.name}>Phone Number</h1>
              <h1 className={styles.details}>{user.phoneNumber}</h1>
            </div>

            <div className={styles.details_container}>
              <h1 className={styles.name}>Country</h1>
              <h1 className={styles.details}>{user.country}</h1>
            </div>

            <div className={styles.details_container}>
              <h1 className={styles.name}>City</h1>
              <h1 className={styles.details}>{user.city}</h1>
            </div>

            <div className={styles.details_container}>
              <h1 className={styles.name}>Address</h1>
              <h1 className={styles.details}>{user.address}</h1>
            </div>

            <div className={styles.buttons_container}>
              <SideButton color="gray" onClick={close}>
                Close
              </SideButton>
            </div>
          </div>
        </Card>
      </FormContainer>
    </BaseModal>
  );
};

export default UserInfoModal;
