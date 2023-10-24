import React from "react";

import styles from "./page.module.css";
import BaseModal, { BaseModalProps } from "@/components/Modal/BaseModal";
import { useForm } from "react-hook-form";
import { FormContainer, useFormError } from "@/components/Providers/Forms";
import Dropdown, { DropdownItem } from "@/components/Dropdown/Dropdown";
import { Card, SideButton } from "@/components/CardPage/CardPage";

interface CreateCodeProps extends BaseModalProps {
  onSubmit: (name: string) => Promise<void> | void;
}

const FilterModal: React.FC<CreateCodeProps> = ({ state, onSubmit }) => {
  const form = useForm();
  const toast = useFormError(form);
  const close = () => state[1](false);

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data.name);
    toast.success("Code created: " + data.code);
    close();
    form.reset();
  });

  if (!state[0]) return null;

  const dropdownOptions1: DropdownItem[] = [
    { id: 0, label: "Recommended" },
    { id: 1, label: "Most Popular" },
    { id: 2, label: "Cheapest" },
    { id: 3, label: "Newest" },
  ];

  const dropdownOptions2: DropdownItem[] = [
    { id: 0, label: "Alphabetical" },
    { id: 1, label: "By Rank" },
    
  ];

  const dropdownOptions3: DropdownItem[] = [
    { id: 0, label: "Random" },
    { id: 1, label: "Option1" },

  ];

  const handleSelectionChange = (item: DropdownItem | null) => {};

  return (
    <BaseModal state={state}>
      <FormContainer form={form}>
        <Card>
          <div className={styles.main_container}>
            <h1 className={styles.header}>Filter</h1>
            <div className={styles.horizontal_container}>
              <h1 className={styles.name}>Rank</h1>
              <div className={styles.dropdown}>
                <Dropdown
                  onSelectionChange={handleSelectionChange}
                  options={dropdownOptions1}
                  isBorder={true}
                />
              </div>
            </div>

            <div className={styles.horizontal_container}>
              <h1 className={styles.name}>Sort by</h1>
              <div className={styles.dropdown}>
                <Dropdown
                  onSelectionChange={handleSelectionChange}
                  options={dropdownOptions2}
                  isBorder={true}
                />
              </div>
            </div>

            <div className={styles.horizontal_container}>
              <h1 className={styles.name}>Order</h1>
              <div className={styles.dropdown}>
                <Dropdown
                  onSelectionChange={handleSelectionChange}
                  options={dropdownOptions3}
                  isBorder={true}
                />
              </div>
            </div>

            <div className={styles.buttons_container}>
              <SideButton color="green">Search</SideButton>
              <SideButton color="gray" onClick={close}>
                Cancel
              </SideButton>
            </div>
          </div>
        </Card>
      </FormContainer>
    </BaseModal>
  );
};

export default FilterModal;
