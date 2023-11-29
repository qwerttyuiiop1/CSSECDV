import React from "react";
import { 
	Card,
	Title,
	Input,
	Label,
	CardRow,
	SideButton,
	FileInput
} from "@/components/CardPage/CardPage";
import BaseModal, { BaseModalProps } from "@/components/Modal/BaseModal";
import { useForm } from "react-hook-form";
import { FormContainer, useFormError } from "@/components/Providers/Forms";
import { useShops } from "@/components/Providers/Products/Products";

const UploadCSVModal: React.FC<BaseModalProps> = ({
	state
}) => {
	const form = useForm();
	const toast = useFormError(form);
	const close = () => state[1](false);
	const { uploadcsv } = useShops();
	const handleSubmit = form.handleSubmit(async (data) => {
		const file = data.file[0] as File;
		await uploadcsv(file);
		close();
		form.reset();
	});
	if (!state[0]) return null;
	return (
		<BaseModal state={state}>
		<FormContainer form={form}>
		<Card>
			<Title>Upload .CSV FIle</Title>
			<FileInput id="file" accept=".csv"
				options={{required: "File is required"}}/>
			<CardRow>
				<SideButton onClick={close} color="gray">
					Cancel
				</SideButton>
				<SideButton onClick={handleSubmit} color="blue">
					Create
				</SideButton>
			</CardRow>
		</Card>
		</FormContainer>
		</BaseModal>
	);
}

export default UploadCSVModal;