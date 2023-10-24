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
import { Brand } from "../../../../components/Providers/Products/Brand";
import { useBrands } from "@/components/Providers/Products/Products";

interface EditBrandProps extends BaseModalProps {
	brand: Brand;
}

const EditBrandModal: React.FC<EditBrandProps> = ({
	state, brand
}) => {
	const { updateBrand } = useBrands();
	const form = useForm({ values: { name: brand.name } });
	const toast = useFormError(form);
	const close = () => state[1](false);
	const handleSubmit = form.handleSubmit(async (data) => {
		await updateBrand({ brand: brand.name, name: data.name });
		toast.success("Brand edited: " + data.name);
		close();
		form.reset();
	});
	if (!state[0]) return null;
	return (
		<BaseModal state={state}>
		<FormContainer form={form}>
		<Card>
			<Title>Edit Brand</Title>
			<Label>
				Brand Name
				<Input placeholder="Brand Name" id="name" 
					options={{required: "name is required"}}/>
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

export default EditBrandModal;