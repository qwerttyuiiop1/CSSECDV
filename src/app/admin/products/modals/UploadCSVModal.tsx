import React, { useEffect } from "react";
import {
  Card,
  Title,
  CardRow,
  SideButton,
  FileInput,
  XButton,
  Upload,
} from "@/components/CardPage/CardPage";
import BaseModal, { BaseModalProps } from "@/components/Modal/BaseModal";
import { useForm } from "react-hook-form";
import { FormContainer, useFormError } from "@/components/Providers/Forms";
import { useShops } from "@/components/Providers/Products/Products";

const UploadCSVModal: React.FC<BaseModalProps> = ({ state }) => {
  const form = useForm();
  const toast = useFormError(form);
  const close = () => {
    state[1](false);
    form.reset();
  };
  const { uploadcsv } = useShops();
  const handleSubmit = form.handleSubmit(async (data) => {
    const file = data.file[0] as File;
    const isValid = await uploadcsv(file);
    if (isValid !== undefined && isValid) {
      close();
      form.reset();
    }
  });

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const modal = document.querySelector(".modal-container");
      if (modal && !modal.contains(event.target as Node)) {
        form.reset();
        close();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (!state[0]) return null;
  return (
    <BaseModal state={state}>
      <FormContainer form={form}>
        <Card className="modal-container">
          <Title>Upload .CSV FIle</Title>
          <Upload>
            <FileInput
              id="file"
              accept=".csv"
              options={{
                required: "CSV File is required",
                validate: {
                  isCSV: (file) =>
                    file[0]?.type === "text/csv" || "Please upload a .csv file",
                  maxSize: (file) =>
                    file[0]?.size <= 50 * 1024 * 1024 ||
                    "File size exceeds the maximum allowed limit (50MB).",
                },
              }}
            />
            <XButton onClick={() => form.reset()}>X</XButton>
          </Upload>
          <CardRow>
            <SideButton onClick={close} color="gray">
              Cancel
            </SideButton>
            <SideButton onClick={handleSubmit} color="blue">
              Upload
            </SideButton>
          </CardRow>
        </Card>
      </FormContainer>
    </BaseModal>
  );
};

export default UploadCSVModal;
