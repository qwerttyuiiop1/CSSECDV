import React, { useState } from "react";

import styles from "./page.module.css";
import BaseModal, { BaseModalProps } from "@/components/Modal/BaseModal";
import { useForm } from "react-hook-form";
import { FormContainer, useFormError } from "@/components/Providers/Forms";
import Dropdown, { DropdownItem } from "@/components/Dropdown/Dropdown";
import { Card, SideButton } from "@/components/CardPage/CardPage";

interface FilterProps extends BaseModalProps {
  onSubmit: (selectedOptions: DropdownItem[]) => Promise<void> | void;
}

const dropdownOptions1: DropdownItem[] = [
  { id: 0, label: "Any" },
  { id: 1, label: "Most Popular" },
  { id: 2, label: "Cheapest" },
  { id: 3, label: "Newest" },
];

const dropdownOptions2: DropdownItem[] = [
  { id: 0, label: "Alphabetical" },
  { id: 1, label: "By Rank" },
  
];

const dropdownOptions3: DropdownItem[] = [
  { id: 0, label: "Ascending" },
  { id: 1, label: "Descending" },

];

const FilterModal: React.FC<FilterProps> = ({ state, onSubmit }) => {
  const form = useForm();
  const toast = useFormError(form);
  const [selectedOptions, setSelectedOptions] = useState<DropdownItem[]>([]);
  const close = () => state[1](false);

  const handleSubmit = form.handleSubmit(async () => {
    await onSubmit(selectedOptions);
    toast.success("Options selected: " + selectedOptions.map((option) => option.label).join(", "));
    close();
    form.reset();
    setSelectedOptions([]);
  });

  

  const handleSelectionChange = (item: DropdownItem | null) => {
    if (item) {
      setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, item]);
    }
  };


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
              <SideButton color="green" onClick={handleSubmit}>Search</SideButton>
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
