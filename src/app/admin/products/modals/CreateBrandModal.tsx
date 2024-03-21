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

const CreateBrandModal: React.FC<BaseModalProps> = ({
	state
}) => {
	const { createShop } = useShops();
	const form = useForm();
	const toast = useFormError(form);
	const close = () => state[1](false);
	const handleSubmit = form.handleSubmit(async (data) => {
		const file = data.image[0] as File;
		await createShop(data.name, file);
		form.reset();
		close();
	});
	return (
		<BaseModal state={state}>
		<FormContainer form={form}>
		<Card>
			<Title>Create Brand</Title>
			<Label>
				Brand Name
				<Input placeholder="Brand Name" id="name" 
					options={{required: "name is required"}}/>
			</Label>
			<Label> Image </Label>
			<FileInput id="image" 
				accept="image/jpeg, image/png, image/webp"
				image options={{
				required: "image is required",
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
				}}/>
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

export default CreateBrandModal;