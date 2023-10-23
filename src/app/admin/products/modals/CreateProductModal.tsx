import React from "react";
import { 
	Title,
	Input,
	Label,
	CardRow,
	SideButton,
	Dropdown,
	TextArea,
	Card
} from "@/components/CardPage/CardPage";
import BaseModal, { BaseModalProps } from "@/components/Modal/BaseModal";
import { useForm } from "react-hook-form";
import { FormContainer, useFormError } from "@/components/Providers/Forms";
import { Product } from "../Brand";

interface CreateProductProps extends BaseModalProps {
	onSubmit: (brand: Product) => Promise<void> | void;
}

const CreateProductModal: React.FC<CreateProductProps> = ({
	state, onSubmit
}) => {
	const form = useForm();
	const toast = useFormError(form);
	const close = () => state[1](false);
	const handleSubmit = form.handleSubmit(async (data) => {
		data.activeCodes = [];
		data.price = Number(data.price);
		await onSubmit(data as Product);
		toast.success("Product created: " + JSON.stringify(data));
		close();
		form.reset();
	});
	return (
		<BaseModal state={state}>
		<FormContainer form={form}>
		<Card>
			<Title>Create Product</Title>
			<Label>
				Brand Name
				<Dropdown 
					id="brand"
					values={[
						"Never gonna give you up",
						"Never gonna let you down",
						"Never gonna run around and desert you",
						"Never gonna make you cry",
						"Never gonna say goodbye",
						"Never gonna tell a lie and hurt you"
					]}/>
			</Label>
			<CardRow>
				<Label style={{flex: '1'}}>
					Product Name
					<Input placeholder="Product Name" id="name" 
						options={{required: "name is required"}}/>
				</Label>
				<Label style={{flex: '1'}}>
					Price (in RP)
					<Input placeholder="Product Price" id="price" type="number"
						options={{required: "price is required"}}/>
				</Label>
			</CardRow>
			<Label>
				Product Details
				<TextArea placeholder={[
						"Never gonna give you up",
						"Never gonna let you down",
						"Never gonna run around and desert you",
						"Never gonna make you cry",
						"Never gonna say goodbye",
						"Never gonna tell a lie and hurt you"
					].join('\n')} id="details" 
					options={{required: "details is required"}}/>
			</Label>
			<Label>
				Terms of terms and conditions
				<TextArea placeholder={[
						"Never gonna give you up",
						"Never gonna let you down",
						"Never gonna run around and desert you",
						"Never gonna make you cry",
						"Never gonna say goodbye",
						"Never gonna tell a lie and hurt you"
					].join('\n')} id="tos" 
					options={{required: "tos is required"}}/>
			</Label>
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
	)
};

export default CreateProductModal;