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
import { AdminProduct } from "../../../../lib/types/AdminShop";
import { useShops, useProducts } from "@/components/Providers/Products/Products";

const CreateProductModal: React.FC<BaseModalProps> = ({
	state
}) => {
	const { data } = useShops();
	const { createProduct } = useProducts();
	const form = useForm();
	const toast = useFormError(form);
	const close = () => state[1](false);
	const handleSubmit = form.handleSubmit(async (data) => {
		data.codes = []
		data.price = Number(data.price);
		await createProduct(data.shopName, data as AdminProduct);
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
					id="shopName"
					values={data.map(b => b.name)}/>
			</Label>
			<CardRow>
				<Label style={{flex: '1'}}>
					Product Name
					<Input placeholder="Product Name" id="name" 
						options={{required: "Product Name is required."}}/>
				</Label>
				<Label style={{flex: '1'}}>
					Price (in RP)
					<Input placeholder="Product Price" id="price" type="number"
						options={{required: "Product Price is required."}}/>
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
					options={{required: "Product Details is required."}}/>
			</Label>
			<Label>
				Terms of Service and Conditions
				<TextArea placeholder={[
						"Never gonna give you up",
						"Never gonna let you down",
						"Never gonna run around and desert you",
						"Never gonna make you cry",
						"Never gonna say goodbye",
						"Never gonna tell a lie and hurt you"
					].join('\n')} id="tos" 
					options={{required: "Terms of Service and Conditions is required."}}/>
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