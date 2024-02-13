import React from "react";
import { 
	Card,
	Title,
	Input,
	Label,
	CardRow,
	SideButton
} from "@/components/CardPage/CardPage";
import BaseModal, { BaseModalProps } from "@/components/Modal/BaseModal";
import { useForm } from "react-hook-form";
import { FormContainer, useFormError } from "@/components/Providers/Forms";
import { useCode } from "@/components/Providers/Products/Products";

const CreateCodeModal: React.FC<BaseModalProps> = ({
	state
}) => {
	const { createCode, productId } = useCode();
	const form = useForm();
	const toast = useFormError(form);
	const close = () => state[1](false);
	const handleSubmit = form.handleSubmit(async (data) => {
		if (!productId) {
			toast.error("No product selected");
			return;
		}
		await createCode(data.code, productId);
		close();
		form.reset();
	});
	if (!state[0]) return null;
	return (
		<BaseModal state={state}>
		<FormContainer form={form}>
		<Card>
			<Title>Add Single Code</Title>
			<Label>
				Code
				<Input placeholder="Code" id="code" 
					options={{required: "code is required"}}/>
			</Label>
			<CardRow>
				<SideButton onClick={close} color="gray">
					Cancel
				</SideButton>
				<SideButton onClick={handleSubmit} color="blue">
					Add
				</SideButton>
			</CardRow>
		</Card>
		</FormContainer>
		</BaseModal>
	);
}

export default CreateCodeModal;