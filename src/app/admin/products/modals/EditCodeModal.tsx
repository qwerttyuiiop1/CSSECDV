import React from "react";
import { 
	Title,
	Input,
	Label,
	CardRow,
	SideButton,
	Card
} from "@/components/CardPage/CardPage";
import BaseModal, { BaseModalProps } from "@/components/Modal/BaseModal";
import { useForm } from "react-hook-form";
import { FormContainer, useFormError } from "@/components/Providers/Forms";
import { useCode } from "@/components/Providers/Products/Products";

interface EditCodeProps extends BaseModalProps {
	code: string;
}

const EditCodeModal: React.FC<EditCodeProps> = ({
	state, code
}) => {
	const { updateCode, findCode, productId } = useCode();
	const form = useForm({ values: findCode(code) });
	const toast = useFormError(form);
	const close = () => state[1](false);
	const handleSubmit = form.handleSubmit(async (data) => {
		await updateCode(code, data.code!, productId!);
		close();
		form.reset();
	});
	if (!state[0]) return null;
	return (
		<BaseModal state={state}>
		<FormContainer form={form}>
		<Card>
			<Title>Edit Code</Title>
			<Label>
				Code
				<Input placeholder="Code" id="code" 
					options={{required: "code is required"}}/>
			</Label>
			<CardRow>
				<SideButton onClick={close} color="gray">
					Cancel
				</SideButton>
				<SideButton onClick={handleSubmit} color="green">
					Save
				</SideButton>
			</CardRow>
		</Card>
		</FormContainer>
		</BaseModal>
	);
}

export default EditCodeModal;