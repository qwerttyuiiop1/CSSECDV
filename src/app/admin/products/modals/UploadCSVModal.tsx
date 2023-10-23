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

interface UploadCSVProps extends BaseModalProps {
	onSubmit: (file: File) => Promise<void> | void;
}

const UploadCSVModal: React.FC<UploadCSVProps> = ({
	state, onSubmit
}) => {
	const form = useForm();
	const toast = useFormError(form);
	const close = () => state[1](false);
	const handleSubmit = form.handleSubmit(async (data) => {
		const file = data.file[0] as File;
		await onSubmit(file);
		toast.success("File uploaded: " + file.name);
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